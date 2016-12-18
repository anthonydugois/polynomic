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
import { point, defaultPoint } from '../point'
import { isH, isV, isRelative } from '../point/is'

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
  matrix : MatrixT,
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
        const [_x, _y, , w] : VectorT = multiplyVec(
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

        const parameters : PointParamsT = {}

        if (
          typeof current.parameters.x1 !== 'undefined'
          && typeof current.parameters.y1 !== 'undefined'
        ) {
          const [x1, y1, , w] : VectorT = multiplyVec(
            matrix,
            vec(current.parameters.x1, current.parameters.y1, 0, 1),
          )

          parameters.x1 = x1 / w
          parameters.y1 = y1 / w
        }

        if (
          typeof current.parameters.x2 !== 'undefined'
          && typeof current.parameters.y2 !== 'undefined'
        ) {
          const [x2, y2, , w] : VectorT = multiplyVec(
            matrix,
            vec(current.parameters.x2, current.parameters.y2, 0, 1),
          )

          parameters.x2 = x2 / w
          parameters.y2 = y2 / w
        }

        if (
          typeof current.parameters.rx !== 'undefined'
          && typeof current.parameters.ry !== 'undefined'
          && typeof current.parameters.rotation !== 'undefined'
          && typeof current.parameters.large !== 'undefined'
          && typeof current.parameters.sweep !== 'undefined'
        ) {
          const [rx, ry, phi] : [number, number, number] = transformArc(
            arc(
              path[index - 1].x,
              path[index - 1].y,
              current.parameters.rx,
              current.parameters.ry,
              degToRad(current.parameters.rotation),
              current.parameters.large,
              current.parameters.sweep,
              current.x,
              current.y,
            ),
            matrix,
          )

          parameters.rx = rx
          parameters.ry = ry
          parameters.rotation = radToDeg(phi)
        }

        acc.push(point(code, x, y, {
          ...current.parameters,
          ...parameters,
        }))
      }

      return acc
    },
    [],
  )
}

export function transformBoundingBox(
  bbox : RectT,
  matrix : MatrixT,
) : RectT {
  const [x0, y0] : VectorT = multiplyVec(
    matrix,
    vec(bbox.x, bbox.y, 0, 1),
  )

  const [x1, y1] : VectorT = multiplyVec(
    matrix,
    vec(bbox.x + bbox.width, bbox.y + bbox.height, 0, 1),
  )

  return rect(x0, y0, x1 - x0, y1 - y0)
}
