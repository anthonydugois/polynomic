// @flow

import type { PointT } from '../../types'

import { point } from '../points'

export function distanceSegment(
  p1: PointT,
  p2: PointT,
  p3: PointT,
): number {
  const segment: number = ((p2.x - p3.x) ** 2) + ((p2.y - p3.y) ** 2)

  if (segment === 0) {
    return ((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2)
  }

  const t: number = Math.max(0, Math.min(1, (((p1.x - p2.x) * (p3.x - p2.x)) + ((p1.y - p2.y) * (p3.y - p2.y))) / segment))
  const p4: PointT = point('', p2.x + (t * (p3.x - p2.x)), p2.y + (t * (p3.y - p2.y)))

  return Math.sqrt(((p1.x - p4.x) ** 2) + ((p1.y - p4.y) ** 2))
}
