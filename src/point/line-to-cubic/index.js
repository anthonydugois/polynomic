/* @flow */

import type { PointT } from '../../types/Point'

import { point } from '../points'
import isRelative from '../is-relative'

export default function lineToCubic(
  previous: PointT,
  current: PointT,
): PointT {
  const x1: number = previous.x
  const y1: number = previous.y
  const x2: number = current.x
  const y2: number = current.y

  return point(
    isRelative(current) ? 'c' : 'C',
    current.x,
    current.y,
    { x1, y1, x2, y2 },
  )
}
