// @flow

import type { PointT, PathT, RectT } from '../../types'

import { point } from '../../primitives/point'
import { rect } from '../../primitives/rect'
import { boundingBox as pointBoundingBox } from '../../point/bounding-box'

export function boundingBox(
  path: PathT,
): RectT {
  return path.reduce(
    (
      acc : RectT,
      current : PointT,
      index : number,
    ) : RectT => {
      const bbox : RectT = pointBoundingBox(
        current,
        index > 0 ? path[index - 1] : point(),
      )

      return acc
    },
    rect(),
  )
}
