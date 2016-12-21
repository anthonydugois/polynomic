// @flow

import type {
  MatrixT,
  VectorT,
  PointT,
  PathT,
  RectT,
} from '../../types'

import { vec } from '../../math/vector'
import { multiplyVec } from '../../math/matrix'

import { point } from '../../primitives/point'
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

export function transformBoundingBox(
  bbox : RectT,
  T : MatrixT,
) : RectT {
  const vMin : VectorT = vec(bbox.x, bbox.y, 0, 1)
  const [x0, y0] : VectorT = multiplyVec(T, vMin)

  const vMax : VectorT = vec(bbox.x + bbox.width, bbox.y + bbox.height, 0, 1)
  const [x1, y1] : VectorT = multiplyVec(T, vMax)

  return rect(x0, y0, x1 - x0, y1 - y0)
}
