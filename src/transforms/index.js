// @flow

import type {
  Matrix4T,
  Vector4T,
  AbsoluteCoordsT,
  PointT,
  PointCodeT,
  PointParamsT,
  PathT,
  PathTransformOptionsT,
  RectT,
} from '../types'

import {
  identity,
  multiply,
  multiplyVec,
} from '../math/matrix'

import { vec } from '../math/vector'

import { boundingBox } from '../properties/bounding-box'
import { translate3d } from './translate'
import { point, defaultPoint } from '../point'
import { isH, isV, isRelative } from '../point/is'
import { absoluteCoords } from '../utils/absolute'

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
  ) : Matrix4T => {
    const bbox : RectT = boundingBox(path)

    return matrices.reduce(
      (
        acc : Matrix4T,
        matrix : Function,
      ) : Matrix4T => matrix(acc, transformBoundingBox(bbox, acc)),
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
    const matrix : Matrix4T = makeMatrix(path)

    return transformPath(path, matrix, opt)
  }
}

export function transformPath(
  path : PathT,
  matrix : Matrix4T,
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

    const forward : Matrix4T = translate3d(origin.x, origin.y, origin.z)()
    const backward : Matrix4T = translate3d(-origin.x, -origin.y, -origin.z)()

    const translatedBackward : PathT = applyMatrix(path, backward, opt)
    const transformed : PathT = applyMatrix(translatedBackward, matrix, opt)
    const translatedForward : PathT = applyMatrix(transformed, forward, opt)

    return translatedForward
  }

  return applyMatrix(path, matrix, opt)
}

export function applyMatrix(
  path : PathT,
  matrix : Matrix4T,
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
        return [
          ...acc,
          current,
        ]
      }

      const [_x, _y, , w] : Vector4T = multiplyVec(
        matrix,
        vec(current.x, current.y, 0, 1),
      )

      if (w <= 0) {
        return acc
      }

      const x : number = _x / w
      const y : number = _y / w

      const shouldConvertH : boolean = isH(current) && y !== acc[acc.length - 1].y
      const shouldConvertV : boolean = isV(current) && x !== acc[acc.length - 1].x
      const shouldConvertCode : boolean = shouldConvertH || shouldConvertV

      const code : PointCodeT = shouldConvertCode ?
        (isRelative(current) ? 'l' : 'L') :
        current.code

      const anchors : PointParamsT = {}

      if (
        typeof current.parameters.x1 !== 'undefined'
        && typeof current.parameters.y1 !== 'undefined'
      ) {
        const [x1, y1, , w1] : Vector4T = multiplyVec(
          matrix,
          vec(current.parameters.x1, current.parameters.y1, 0, 1),
        )

        anchors.x1 = x1 / w1
        anchors.y1 = y1 / w1
      }

      if (
        typeof current.parameters.x2 !== 'undefined'
        && typeof current.parameters.y2 !== 'undefined'
      ) {
        const [x2, y2, , w2] : Vector4T = multiplyVec(
          matrix,
          vec(current.parameters.x2, current.parameters.y2, 0, 1),
        )

        anchors.x2 = x2 / w2
        anchors.y2 = y2 / w2
      }

      return [
        ...acc,
        point(code, x, y, {
          ...current.parameters,
          ...anchors,
        }),
      ]
    },
    [],
  )
}

export function transformBoundingBox(
  bbox : RectT,
  matrix : Matrix4T,
) : RectT {
  const [x0, y0] : Vector4T = multiplyVec(
    matrix,
    vec(bbox.x, bbox.y, 0, 1),
  )

  const [x1, y1] : Vector4T = multiplyVec(
    matrix,
    vec(bbox.x + bbox.width, bbox.y + bbox.height, 0, 1),
  )

  return {
    x: x0,
    y: y0,
    width: x1 - x0,
    height: y1 - y0,
  }
}
