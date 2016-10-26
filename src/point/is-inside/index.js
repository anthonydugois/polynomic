/* @flow */

import type { PointT } from "../../types/Point"
import type { PathT } from "../../types/Path"

export default function isInside(
  point: PointT,
  path: PathT
): boolean {
  return path.reduce(
    (acc: boolean, current: PointT, index: number) => {
      const previous: PointT = index === 0 ? path[path.length - 1] : path[index - 1]
      const isVerticallyBetween: boolean = ((current.y > point.y) !== (previous.y > point.y))
      const isHorizontallyBefore: boolean = point.x < current.x + ((point.y - current.y) / slope(current, previous))

      if (isVerticallyBetween && isHorizontallyBefore) {
        return !acc
      }

      return acc
    },
    false
  )
}

function slope(point: PointT, previous: PointT): number {
  return (previous.y - point.y) / (previous.x - point.x)
}
