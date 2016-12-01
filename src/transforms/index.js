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

import { boundingBox } from '../properties/bounding-box'
import { translate3d } from './translate'
import { point, defaultPoint } from '../point'
import { isH, isV, isRelative } from '../point/is'
import { absoluteCoords } from '../utils/absolute'

export const identity: Matrix4T = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
]

export function transformOptions(
  options: {} = {},
): PathTransformOptionsT {
  return {
    indices: [],
    transformOrigin: { x: 0, y: 0 },
    ...options,
  }
}

export function transform(
  ...matrices: Array<Function | Matrix4T>
): Function {
  return (
    path: PathT,
    options: {} = {},
  ): PathT => {
    const opt: PathTransformOptionsT = transformOptions(options)

    const matrix: Matrix4T = matrices.reduce(
      (
        acc: Matrix4T,
        matrix: Function | Matrix4T,
      ): Matrix4T => {
        const m: Matrix4T = typeof matrix === 'function' ?
          matrix(transformBoundingBox(boundingBox(path), acc)) :
          matrix

        return multiply(acc, m)
      },
      identity,
    )

    return transformPath(path, matrix, opt)
  }
}

export function transformPath(
  path: PathT,
  matrix: Matrix4T,
  options: {} = {},
): PathT {
  const opt: PathTransformOptionsT = transformOptions(options)

  if (
    opt.transformOrigin.x !== 0
    || opt.transformOrigin.y !== 0
    || (typeof opt.transformOrigin.z !== 'undefined' && opt.transformOrigin.z !== 0)
  ) {
    const bbox : RectT = boundingBox(path)
    const origin : AbsoluteCoordsT = absoluteCoords(opt.transformOrigin, bbox)

    const forward: Matrix4T = translate3d(origin.x, origin.y, origin.z)(bbox)
    const backward: Matrix4T = translate3d(-origin.x, -origin.y, -origin.z)(bbox)

    const translatedBackward: PathT = applyMatrix(path, backward, opt)
    const transformed: PathT = applyMatrix(translatedBackward, matrix, opt)
    const translatedForward: PathT = applyMatrix(transformed, forward, opt)

    return translatedForward
  }

  return applyMatrix(path, matrix, opt)
}

export function applyMatrix(
  path: PathT,
  matrix: Matrix4T,
  options: {} = {},
): PathT {
  const opt: PathTransformOptionsT = transformOptions(options)

  return path.reduce(
    (
      acc: PathT,
      current: PointT,
      index: number,
    ): PathT => {
      if (opt.indices.length > 0 && !opt.indices.includes(index)) {
        return [
          ...acc,
          current,
        ]
      }

      const [_x, _y, , w]: Vector4T = multiplyVector(
        matrix,
        [current.x, current.y, 0, 1],
      )

      if (w <= 0) {
        return acc
      }

      const x: number = _x / w
      const y: number = _y / w

      const shouldConvertH: boolean = isH(current) && y !== acc[acc.length - 1].y
      const shouldConvertV: boolean = isV(current) && x !== acc[acc.length - 1].x
      const shouldConvertCode: boolean = shouldConvertH || shouldConvertV

      const code: PointCodeT = shouldConvertCode ?
        (isRelative(current) ? 'l' : 'L') :
        current.code

      const anchors: PointParamsT = {}

      if (
        typeof current.parameters.x1 !== 'undefined'
        && typeof current.parameters.y1 !== 'undefined'
      ) {
        const [x1, y1, , w1]: Vector4T = multiplyVector(
          matrix,
          [current.parameters.x1, current.parameters.y1, 0, 1],
        )

        anchors.x1 = x1 / w1
        anchors.y1 = y1 / w1
      }

      if (
        typeof current.parameters.x2 !== 'undefined'
        && typeof current.parameters.y2 !== 'undefined'
      ) {
        const [x2, y2, , w2]: Vector4T = multiplyVector(
          matrix,
          [current.parameters.x2, current.parameters.y2, 0, 1],
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
  bbox: RectT,
  matrix: Matrix4T,
): RectT {
  const [x0, y0]: Vector4T = multiplyVector(
    matrix,
    [bbox.x, bbox.y, 0, 1],
  )

  const [x1, y1]: Vector4T = multiplyVector(
    matrix,
    [bbox.x + bbox.width, bbox.y + bbox.height, 0, 1],
  )

  return {
    x: x0,
    y: y0,
    width: x1 - x0,
    height: y1 - y0,
  }
}

export function multiply(
  a: Matrix4T,
  b: Matrix4T,
): Matrix4T {
  return [
    (a[0] * b[0]) + (a[1] * b[4]) + (a[2] * b[8]) + (a[3] * b[12]),
    (a[0] * b[1]) + (a[1] * b[5]) + (a[2] * b[9]) + (a[3] * b[13]),
    (a[0] * b[2]) + (a[1] * b[6]) + (a[2] * b[10]) + (a[3] * b[14]),
    (a[0] * b[3]) + (a[1] * b[7]) + (a[2] * b[11]) + (a[3] * b[15]),

    (a[4] * b[0]) + (a[5] * b[4]) + (a[6] * b[8]) + (a[7] * b[12]),
    (a[4] * b[1]) + (a[5] * b[5]) + (a[6] * b[9]) + (a[7] * b[13]),
    (a[4] * b[2]) + (a[5] * b[6]) + (a[6] * b[10]) + (a[7] * b[14]),
    (a[4] * b[3]) + (a[5] * b[7]) + (a[6] * b[11]) + (a[7] * b[15]),

    (a[8] * b[0]) + (a[9] * b[4]) + (a[10] * b[8]) + (a[11] * b[12]),
    (a[8] * b[1]) + (a[9] * b[5]) + (a[10] * b[9]) + (a[11] * b[13]),
    (a[8] * b[2]) + (a[9] * b[6]) + (a[10] * b[10]) + (a[11] * b[14]),
    (a[8] * b[3]) + (a[9] * b[7]) + (a[10] * b[11]) + (a[11] * b[15]),

    (a[12] * b[0]) + (a[13] * b[4]) + (a[14] * b[8]) + (a[15] * b[12]),
    (a[12] * b[1]) + (a[13] * b[5]) + (a[14] * b[9]) + (a[15] * b[13]),
    (a[12] * b[2]) + (a[13] * b[6]) + (a[14] * b[10]) + (a[15] * b[14]),
    (a[12] * b[3]) + (a[13] * b[7]) + (a[14] * b[11]) + (a[15] * b[15]),
  ]
}

export function multiplyVector(
  a: Matrix4T,
  b: Vector4T,
): Vector4T {
  return [
    (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]),
    (a[4] * b[0]) + (a[5] * b[1]) + (a[6] * b[2]) + (a[7] * b[3]),
    (a[8] * b[0]) + (a[9] * b[1]) + (a[10] * b[2]) + (a[11] * b[3]),
    (a[12] * b[0]) + (a[13] * b[1]) + (a[14] * b[2]) + (a[15] * b[3]),
  ]
}
