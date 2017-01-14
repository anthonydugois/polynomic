// @flow

import type { PointT, PathT } from '../types'

import { point } from '../core/point'
import { toC } from '../core/convert'

export function toCubics(
  path: PathT,
): PathT {
  return path.reduce(
    (
      acc: PathT,
      current: PointT,
      index: number,
    ): PathT => {
      const previous: PointT = index > 0 ? path[index - 1] : point()
      const cubic: PointT | PathT = toC(previous, current)
      const points: PathT = Array.isArray(cubic) ? cubic : [cubic]

      acc.push(...points)

      return acc
    },
    [],
  )
}
