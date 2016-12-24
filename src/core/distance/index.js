// @flow

import type { PointT } from '../../types'

import { point } from '../point'

export function distanceToPoint(
  from: PointT,
  to: PointT,
): number {
  return Math.sqrt(((from.x - to.x) ** 2) + ((from.y - to.y) ** 2))
}

export function distanceToLine(
  from: PointT,
  previous: PointT,
  current: PointT,
): number {
  const d: number = distanceToPoint(previous, current)

  if (d === 0) {
    return distanceToPoint(from, previous)
  }

  const t: number = Math.max(
    0,
    Math.min(
      1,
      (((from.x - previous.x) * (current.x - previous.x)) + ((from.y - previous.y) * (current.y - previous.y))) / (d ** 2),
    ),
  )

  const p: PointT = point(
    '',
    previous.x + (t * (current.x - previous.x)),
    previous.y + (t * (current.y - previous.y)),
  )

  return distanceToPoint(from, p)
}
