// @flow

import type { PointT } from '../../types'

export function distance(
  p1: PointT,
  p2: PointT,
): number {
  return Math.sqrt(((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2))
}
