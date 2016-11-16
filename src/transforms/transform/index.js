/* @flow */

import type { PointT, PointCodeT, PointParamsT } from "../../types/Point"
import type { PathT, PathBoundingBoxT } from "../../types/Path"
import type { CoordsT } from "../../types/Coords"
import type { Matrix4x4T, Matrix1x4T } from "../../types/Matrix"

import boundingBox from "../../path/bounding-box"
import { translate3d } from "../translate"
import { Point, defaultPoint } from "../../point/points"
import { isH, isV } from "../../point/is"
import isRelative from "../../point/is-relative"

export const identity: Matrix4x4T = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
]

export function transform(
  ...matrices: Array<Function | Matrix4x4T>
): Function {
  return (
    path: PathT,
    indices: Array<number> = [],
    origin: CoordsT = { x: 0, y: 0 },
  ): PathT => {
    const bbox: PathBoundingBoxT = boundingBox(path)
    const matrix: Matrix4x4T = matrices.reduce(
      (
        acc: Matrix4x4T,
        matrix: Function | Matrix4x4T,
      ): Matrix4x4T => {
        const m: Matrix4x4T = typeof matrix === 'function' ?
          matrix(transformBoundingBox(bbox, acc)) :
          matrix

        return multiply(acc, m)
      },
      identity,
    )

    return transformOrigin(path, matrix, indices, origin)
  }
}

export function transformOrigin(
  path: PathT,
  matrix: Matrix4x4T,
  indices: Array<number> = [],
  origin: CoordsT = { x: 0, y: 0 },
): PathT {
  const shouldTransformOrigin: boolean = origin.x !== 0
    || origin.y !== 0
    || (typeof origin.z !== 'undefined' && origin.z !== 0)

  if (shouldTransformOrigin) {
    const positive: Matrix4x4T = translate3d(
      origin.x,
      origin.y,
      typeof origin.z !== 'undefined' ? origin.z : 0,
    )(boundingBox(path))

    const negative: Matrix4x4T = positive.slice()

    negative[3] = -negative[3]
    negative[7] = -negative[7]
    negative[11] = -negative[11]

    const translated = transformPath(path, negative, indices)
    const transformed = transformPath(translated, matrix, indices)

    return transformPath(transformed, positive, indices)
  }

  return transformPath(path, matrix, indices)
}

export function transformPath(
  path: PathT,
  matrix: Matrix4x4T,
  indices: Array<number> = [],
): PathT {
  let prev: PointT = defaultPoint

  return path.map(
    (
      point: PointT,
      index: number,
    ): PointT => {
      if (indices.length > 0 && !indices.includes(index)) {
        return prev = point
      }

      const [x, y]: Matrix1x4T = multiplyVector(
        matrix,
        [point.x, point.y, 0, 1],
      )

      const shouldConvertH: boolean = isH(point) && y !== prev.y
      const shouldConvertV: boolean = isV(point) && x !== prev.x
      const shouldConvertCode: boolean = shouldConvertH || shouldConvertV

      const code: PointCodeT = shouldConvertCode ?
        (isRelative(point) ? 'l' : 'L') :
        point.code

      const anchors: PointParamsT = {}

      if (
        typeof point.parameters.x1 !== 'undefined'
        && typeof point.parameters.y1 !== 'undefined'
      ) {
        const [x1, y1]: Matrix1x4T = multiplyVector(
          matrix,
          [point.parameters.x1, point.parameters.y1, 0, 1],
        )

        anchors.x1 = x1
        anchors.y1 = y1
      }

      if (
        typeof point.parameters.x2 !== 'undefined'
        && typeof point.parameters.y2 !== 'undefined'
      ) {
        const [x2, y2]: Matrix1x4T = multiplyVector(
          matrix,
          [point.parameters.x2, point.parameters.y2, 0, 1],
        )

        anchors.x2 = x2
        anchors.y2 = y2
      }

      return prev = Point(code, x, y, {
        ...point.parameters,
        ...anchors,
      })
    }
  )
}

export function transformBoundingBox(
  bbox: PathBoundingBoxT,
  matrix: Matrix4x4T,
): PathBoundingBoxT {
  const [x0, y0]: Matrix1x4T = multiplyVector(
    matrix,
    [bbox.x, bbox.y, 0, 1],
  )

  const [x1, y1]: Matrix1x4T = multiplyVector(
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
  a: Matrix4x4T,
  b: Matrix4x4T,
): Matrix4x4T {
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
  a: Matrix4x4T,
  b: Matrix1x4T,
): Matrix1x4T {
  return [
    (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]),
    (a[4] * b[0]) + (a[5] * b[1]) + (a[6] * b[2]) + (a[7] * b[3]),
    (a[8] * b[0]) + (a[9] * b[1]) + (a[10] * b[2]) + (a[11] * b[3]),
    (a[12] * b[0]) + (a[13] * b[1]) + (a[14] * b[2]) + (a[15] * b[3]),
  ]
}
