// @flow

import type {
  PointT,
  PathT,
  RectT,
} from '../../types'

import { rect } from '../../primitives/rect'
import { boundingBox as pointBoundingBox } from '../../point/bounding-box'

export function boundingBox(
  path: PathT,
): RectT {
  const bb : Array<RectT> = path.reduce(
    (
      acc : Array<RectT>,
      current : PointT,
      index : number,
    ) : Array<RectT> => {
      if (index > 0) {
        acc.push(pointBoundingBox(current, path[index - 1]))
      }

      return acc
    },
    [],
  )

  const x : number = Math.min(...bb.map(({ x }) => x))
  const y : number = Math.min(...bb.map(({ y }) => y))
  const width : number = Math.max(...bb.map(({ x, width }) => x + width)) - x
  const height : number = Math.max(...bb.map(({ y, height }) => y + height)) - y

  return rect(x, y, width, height)
}
