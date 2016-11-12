/* @flow */

import type { PointT } from "../../types/Point"
import type { PathT } from "../../types/Path"

import { isL, isH, isV, isQ, isT, isA } from "../is"
import lineToCubic from "../line-to-cubic"
import quadraticToCubic from "../quadratic-to-cubic"
import arcToCubic from "../arc-to-cubic"

export default function toCubic(
  prev: PointT,
  point: PointT
): PointT | PathT {
  switch (true) {
  case isL(point):
  case isH(point):
  case isV(point):
    return lineToCubic(prev, point)

  case isQ(point):
  case isT(point):
    return quadraticToCubic(prev, point)

  case isA(point):
    return arcToCubic(prev, point)

  default:
    return point
  }
}
