// @flow

import type {
  MatrixT,
  VectorT,
  CoordsT,
  AbsoluteCoordsT,
  PointT,
  PointCodeT,
  PointParamsT,
  PathT,
  PathTransformOptionsT,
  RectT,
  ArcT,
} from '../types'

import {
  identity,
  multiply,
  multiplyVec,
} from '../math/matrix'

import { vec } from '../math/vector'
import { transformArc } from '../math/arc'

import { rect } from '../primitives/rect'
import { arc } from '../primitives/arc'

import { boundingBox } from '../properties/bounding-box'
import { translate3d } from './translate'
import { point, defaultPoint, L, l } from '../point'
import { isH, isV, isT, isS, isRelative } from '../point/is'

import { absoluteCoords } from '../utils/absolute'
import { degToRad, radToDeg } from '../utils/angle'

export function transformOptions(
  options : {} = {},
) : PathTransformOptionsT {
  return {
    indices: [],
    transformOrigin: { x: 0, y: 0 },
    ...options,
  }
}

export function transformList(
  ...matrices: Array<Function>
) : Function {
  return (
    path : PathT,
  ) : MatrixT => {
    const bbox : RectT = boundingBox(path)

    return matrices.reduce(
      (
        acc : MatrixT,
        matrix : Function,
      ) : MatrixT => matrix(acc, transformBoundingBox(bbox, acc)),
      identity(),
    )
  }
}

export function transform(
  ...matrices: Array<Function>
) : Function {
  const makeMatrix : Function = transformList(...matrices)

  return (
    path : PathT,
    options : {} = {},
  ) : PathT => {
    const opt : PathTransformOptionsT = transformOptions(options)
    const matrix : MatrixT = makeMatrix(path)

    return transformPath(path, matrix, opt)
  }
}

export function transformPath(
  path : PathT,
  matrix : MatrixT,
  options : {} = {},
) : PathT {
  const opt : PathTransformOptionsT = transformOptions(options)

  if (
    opt.transformOrigin.x !== 0
    || opt.transformOrigin.y !== 0
    || (typeof opt.transformOrigin.z !== 'undefined' && opt.transformOrigin.z !== 0)
  ) {
    const bbox : RectT = boundingBox(path)
    const origin : AbsoluteCoordsT = absoluteCoords(opt.transformOrigin, bbox)

    const forward : MatrixT = translate3d(origin.x, origin.y, origin.z)()
    const backward : MatrixT = translate3d(-origin.x, -origin.y, -origin.z)()

    const translatedBackward : PathT = applyMatrix(path, backward, opt)
    const transformed : PathT = applyMatrix(translatedBackward, matrix, opt)
    const translatedForward : PathT = applyMatrix(transformed, forward, opt)

    return translatedForward
  }

  return applyMatrix(path, matrix, opt)
}

export function applyMatrix(
  path : PathT,
  T : MatrixT,
  options : {} = {},
) : PathT {
  const opt : PathTransformOptionsT = transformOptions(options)

  return path.reduce(
    (
      acc : PathT,
      current : PointT,
      index : number,
    ) : PathT => {
      if (opt.indices.length > 0 && !opt.indices.includes(index)) {
        acc.push(current)
      } else {
        const previous : PointT = index > 0 ? path[index - 1] : defaultPoint
        const tCurrent : PointT = transformPoint(current, previous, T)
        const tPrevious : PointT = acc[acc.length - 1]

        acc.push(correctPointCode(tCurrent, tPrevious))
      }

      return acc
    },
    [],
  )
}

export function correctPointCode(
  current : PointT,
  previous : PointT,
) : PointT {
  if (
    (isH(current) && current.y !== previous.y)
    || (isV(current) && current.x !== previous.x)
  ) {
    return point(
      isRelative(current) ? 'l' : 'L',
      current.x,
      current.y,
      current.parameters,
    )
  }

  if (
    isT(current) && (
      current.parameters.x1 !== previous.parameters.x1
      || current.parameters.y1 !== previous.parameters.y1
    )
  ) {

  }

  if (
    isS(current) && (
      current.parameters.x2 !== previous.parameters.x2
      || current.parameters.y2 !== previous.parameters.y2
    )
  ) {

  }

  return current
}

export function transformPoint(
  current : PointT,
  previous : PointT,
  T : MatrixT,
) : PointT {
  const vPosition : VectorT = vec(current.x, current.y, 0, 1)
  const [x, y, , w] : VectorT = multiplyVec(T, vPosition)

  return point(
    current.code,
    x / w,
    y / w,
    transformPointParams(current, previous, T),
  )
}

export const transformPointAnchor1 = transformPointAnchor(1)
export const transformPointAnchor2 = transformPointAnchor(2)

export function transformPointParams(
  current : PointT,
  previous : PointT,
  T : MatrixT,
) : PointParamsT {
  return {
    ...transformPointAnchor1(current, T),
    ...transformPointAnchor2(current, T),
    ...transformPointArc(current, previous, T),
  }
}

export function transformPointAnchor(
  n : number = 1,
) : Function {
  const xn : string = `x${ n }`
  const yn : string = `y${ n }`

  return function transformPointAnchor(
    current : PointT,
    T : MatrixT,
  ) : PointParamsT {
    const ax : number = current.parameters[xn]
    const ay : number = current.parameters[yn]

    if (typeof ax !== 'undefined' && typeof ay !== 'undefined') {
      const vPosition : VectorT = vec(ax, ay, 0, 1)
      const [x, y, , w] : VectorT = multiplyVec(T, vPosition)

      return {
        [xn]: x / w,
        [yn]: y / w,
      }
    }

    return {}
  }
}

export function transformPointArc(
  current : PointT,
  previous : PointT,
  T : MatrixT,
) : PointParamsT {
  const {
    rx,
    ry,
    rotation,
    large,
    sweep,
  } : PointParamsT = current.parameters

  if (
    typeof rx !== 'undefined'
    && typeof ry !== 'undefined'
    && typeof rotation !== 'undefined'
    && typeof large !== 'undefined'
    && typeof sweep !== 'undefined'
  ) {
    const [_rx, _ry, _phi] : VectorT = transformArc(arc(
      previous.x, previous.y,
      rx, ry, degToRad(rotation), large, sweep,
      current.x, current.y,
    ), T)

    return {
      rx: _rx,
      ry: _ry,
      rotation: radToDeg(_phi),
      large,
      sweep,
    }
  }

  return {}
}

export function transformBoundingBox(
  bbox : RectT,
  T : MatrixT,
) : RectT {
  const vMin : VectorT = vec(bbox.x, bbox.y, 0, 1)
  const [x0, y0] : VectorT = multiplyVec(T, vMin)

  const vMax : VectorT = vec(bbox.x + bbox.width, bbox.y + bbox.height, 0, 1)
  const [x1, y1] : VectorT = multiplyVec(T, vMax)

  return rect(x0, y0, x1 - x0, y1 - y0)
}
