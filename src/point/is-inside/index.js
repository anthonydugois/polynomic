/* @flow */

import type { PointT } from '../../types/Point'
import type { PathT } from '../../types/Path'

export function isInside(
  point: PointT,
  path: PathT,
): boolean {
  return path.reduce(
    (
      acc: boolean,
      current: PointT,
      index: number,
    ): boolean => {
      const previous: PointT = index === 0 ?
        path[path.length - 1] :
        path[index - 1]

      const isVerticallyBefore: boolean = previous.y > point.y
      const isVerticallyAfter: boolean = current.y > point.y
      const isVerticallyBetween: boolean = isVerticallyBefore !== isVerticallyAfter

      const diff: number = point.y - current.y
      const slope: number = (previous.y - current.y) / (previous.x - current.x)
      const position: number = current.x + (diff / slope)
      const isHorizontallyBefore: boolean = point.x < position

      if (isVerticallyBetween && isHorizontallyBefore) {
        return !acc
      }

      return acc
    },
    false,
  )
}
