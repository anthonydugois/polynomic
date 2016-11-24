// @flow

import type { PointT } from '../../types'

import { point } from '../index'

export function min(
  p1: PointT,
  p2: PointT,
): PointT {
  return point('', Math.min(p1.x, p2.x), Math.min(p1.y, p2.y))
}

export function max(
  p1: PointT,
  p2: PointT,
): PointT {
  return point('', Math.max(p1.x, p2.x), Math.max(p1.y, p2.y))
}
