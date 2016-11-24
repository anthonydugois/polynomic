// @flow

import type { PointT, PathT } from '../../types'

import { defaultPoint } from '../../point/points'
import * as point from '../../point/to-cubic'

export function toCubic(
  path: PathT,
): PathT {
  return path.reduce(
    (
      acc: PathT,
      current: PointT,
      index: number,
    ): PathT => {
      const previous: PointT = index > 0 ? path[index - 1] : defaultPoint
      const cubic: PointT | PathT = point.toCubic(previous, current)
      const points: PathT = Array.isArray(cubic) ? cubic : [cubic]

      acc.push(...points)

      return acc
    },
    [],
  )
}
