/* @flow */

import type { PointT } from '../../types/Point'

import { squareDistance } from '../square-distance'

export function distance(
  p1: PointT,
  p2: PointT,
): number {
  return Math.sqrt(squareDistance(p1, p2))
}
