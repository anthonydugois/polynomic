/* @flow */

import type { PointT } from "../../types/Point"

import { C, c } from "../points"
import isRelative from "../is-relative"

export default function quadraticToCubic(
  prev: PointT,
  point: PointT
): PointT {
  const x1: number = typeof point.parameters.x1 !== "undefined" ?
    ((1 / 3) * prev.x) + ((2 / 3) * point.parameters.x1) :
    prev.x

  const y1: number = typeof point.parameters.y1 !== "undefined" ?
    ((1 / 3) * prev.y) + ((2 / 3) * point.parameters.y1) :
    prev.y

  const x2: number = typeof point.parameters.x1 !== "undefined" ?
    ((1 / 3) * point.x) + ((2 / 3) * point.parameters.x1) :
    point.x

  const y2: number = typeof point.parameters.y1 !== "undefined" ?
    ((1 / 3) * point.y) + ((2 / 3) * point.parameters.y1) :
    point.y

  const cubic = isRelative(point) ? c : C

  return cubic(x1, y1, x2, y2, point.x, point.y)
}
