// @flow

import type { PointT } from '../../types'

export function distanceToPoint(
  from: PointT,
  to: PointT,
): number {
  return Math.sqrt(((from.x - to.x) ** 2) + ((from.y - to.y) ** 2))
}
