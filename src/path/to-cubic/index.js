/* @flow */

import type { PointT } from '../../types/Point'
import type { PathT } from '../../types/Path'

import { defaultPoint } from '../../point/points'
import pointToCubic from '../../point/to-cubic'

export default function toCubic(
  path: PathT,
): PathT {
  return path.reduce(
    (
      acc: PathT,
      current: PointT,
      index: number,
    ): PathT => {
      const previous: PointT = index > 0 ? path[index - 1] : defaultPoint
      const cubic: PointT | PathT = pointToCubic(previous, current)
      const points: PathT = Array.isArray(cubic) ? cubic : [cubic]

      acc.push(...points)

      return acc
    },
    [],
  )
}
