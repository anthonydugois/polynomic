/* @flow */

import type { PointT } from "../../types/Point"

export default function isRelative(
  point: PointT,
): boolean {
  return point.code.toLowerCase() === point.code
}
