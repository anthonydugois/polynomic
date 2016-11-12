/* @flow */

import type { PointT, PointParamsT } from "../../types/Point"
import type { PathT } from "../../types/Path"

import { Point, defaultPoint } from "../../point/points"
import { isH, isV } from "../../point/is"
import isRelative from "../../point/is-relative"

export default function matrix(
  path: PathT,
  m: Array<number>,
): PathT {
  let lastComputedPoint: PointT = defaultPoint

  return path.map((point: PointT, index: number): PointT => {
    const [x, y] = multiply3x1(m, [
      point.x,
      point.y,
      1,
    ])

    let code = point.code

    if (
      (isH(point) && y !== lastComputedPoint.y)
      || (isV(point) && x !== lastComputedPoint.x)
    ) {
      code = isRelative(point) ? 'l' : 'L'
    }

    let x1, y1, x2, y2

    if (
      typeof point.parameters.x1 !== 'undefined'
      && typeof point.parameters.y1 !== 'undefined'
    ) {
      [x1, y1] = multiply3x1(m, [
        point.parameters.x1,
        point.parameters.y1,
        1,
      ])
    }

    if (
      typeof point.parameters.x2 !== 'undefined'
      && typeof point.parameters.y2 !== 'undefined'
    ) {
      [x2, y2] = multiply3x1(m, [
        point.parameters.x2,
        point.parameters.y2,
        1,
      ])
    }

    const parameters: PointParamsT = {
      ...point.parameters,
      ...(typeof x1 !== 'undefined' ? { x1 } : {}),
      ...(typeof y1 !== 'undefined' ? { y1 } : {}),
      ...(typeof x2 !== 'undefined' ? { x2 } : {}),
      ...(typeof y2 !== 'undefined' ? { y2 } : {}),
    }

    lastComputedPoint = Point(code, x, y, parameters)

    return lastComputedPoint
  })
}

function multiply3x1(
  a: Array<number>,
  b: Array<number>,
): Array<number> {
  const a00: number = a[(0 * 3) + 0]
  const a01: number = a[(0 * 3) + 1]
  const a02: number = a[(0 * 3) + 2]
  const a10: number = a[(1 * 3) + 0]
  const a11: number = a[(1 * 3) + 1]
  const a12: number = a[(1 * 3) + 2]
  const a20: number = a[(2 * 3) + 0]
  const a21: number = a[(2 * 3) + 1]
  const a22: number = a[(2 * 3) + 2]
  const b0: number = b[0]
  const b1: number = b[1]
  const b2: number = b[2]

  return [
    (a00 * b0) + (a01 * b1) + (a02 * b2),
    (a10 * b0) + (a11 * b1) + (a12 * b2),
    (a20 * b0) + (a21 * b1) + (a22 * b2),
  ]
}
