/* @flow */

import type { PointT } from "../../types/Point"

import { C, c } from "../points"
import isRelative from "../is-relative"

export default function lineToCubic(
  prev: PointT,
  point: PointT,
): PointT {
  const cubic: Function = isRelative(point) ? c : C

  return cubic(prev.x, prev.y, point.x, point.y, point.x, point.y)
}
