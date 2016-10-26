/* @flow */

import type { PointT } from "../../types/Point"
import { Point } from "../points"

export function min(p1: PointT, p2: PointT): PointT {
  return Point("", Math.min(p1.x, p2.x), Math.min(p1.y, p2.y))
}

export function max(p1: PointT, p2: PointT): PointT {
  return Point("", Math.max(p1.x, p2.x), Math.max(p1.y, p2.y))
}
