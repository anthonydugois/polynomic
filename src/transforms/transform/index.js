/* @flow */

import type { PointT, PointCodeT, PointParamsT } from "../../types/Point"
import type { PathT } from "../../types/Path"
import type { CoordsT } from "../../types/Coords"
import type { Matrix4x4T, Matrix1x4T } from "../../types/Matrix"

import { Point, defaultPoint } from "../../point/points"
import { isH, isV } from "../../point/is"
import isRelative from "../../point/is-relative"
import { translate3d } from "../translate"
import { absoluteCoords } from "../../utils"

export function transform(
  ...funcs: Array<Function>
): Function {
  return (
    path: PathT,
    indices: Array<number> = [],
    origin: CoordsT = { x: 0, y: 0, z: 0 },
  ): PathT => funcs.reduce(
    (
      acc: PathT,
      fn: Function,
    ) => fn(acc, indices, origin),
    path,
  )
}

export function transformPath(
  matrix: Matrix4x4T,
  indices: Array<number> = [],
): Function {
  return (
    path: PathT,
  ): PathT => {
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
          makeVector(point.x, point.y, 0, 1),
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
            makeVector(point.parameters.x1, point.parameters.y1, 0, 1),
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
            makeVector(point.parameters.x2, point.parameters.y2, 0, 1),
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
}

export function transformOrigin(
  transforms: Function,
  origin: CoordsT = { x: 0, y: 0, z: 0 },
): Function {
  const shouldCompute = origin.x !== 0
    || origin.y !== 0
    || (typeof origin.z !== 'undefined' && origin.z !== 0)

  if (shouldCompute) {
    return (
      path: PathT,
    ): PathT => {
      const { x, y }: { x: number, y: number } = absoluteCoords(path, origin.x, origin.y)
      const z: number = typeof origin.z !== 'undefined' ?
        origin.z :
        0

      return transform(
        translate3d(-x, -y, -z),
        transforms,
        translate3d(x, y, z),
      )(path)
    }
  }

  return (path: PathT): PathT => path
}

export function makeMatrix(
  m11: number,
  m12: number,
  m13: number,
  m14: number,
  m21: number,
  m22: number,
  m23: number,
  m24: number,
  m31: number,
  m32: number,
  m33: number,
  m34: number,
  m41: number,
  m42: number,
  m43: number,
  m44: number,
): Matrix4x4T {
  return [
    m11, m21, m31, m41,
    m12, m22, m32, m42,
    m13, m23, m33, m43,
    m14, m24, m34, m44,
  ]
}

export function makeVector(
  m11: number,
  m12: number,
  m13: number,
  m14: number,
): Matrix1x4T {
  return [
    m11,
    m12,
    m13,
    m14,
  ]
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
