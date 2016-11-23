/* @flow */

import type { PointT } from '../../types/Point'

export default function squareDistance(
  p1: PointT,
  p2: PointT,
): number {
  return ((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2)
}
