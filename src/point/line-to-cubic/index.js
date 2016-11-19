/* @flow */

import type { PointT } from "../../types/Point"

import { C, c } from "../points"
import isRelative from "../is-relative"

export default function lineToCubic(
  previous: PointT,
  current: PointT,
): PointT {
  const cubic: Function = isRelative(current) ? c : C

  return cubic(
    previous.x,
    previous.y,
    current.x,
    current.y,
    current.x,
    current.y,
  )
}
