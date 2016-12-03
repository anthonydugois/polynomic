// @flow

import type { PointT, RectT } from '../../types'

import { defaultPoint } from '../index'
import { rect } from '../../primitives/rect'

export function linearBoundingBox(
  current : PointT,
  previous : PointT = defaultPoint,
) : RectT {
  const x : number = Math.min(current.x, previous.x)
  const y : number = Math.min(current.y, previous.y)
  const width : number = Math.max(current.x, previous.x) - x
  const height : number = Math.max(current.y, previous.y) - y

  return rect(x, y, width, height)
}

export function quadraticBoundingBox(
  current : PointT,
  previous : PointT = defaultPoint,
) : RectT {
  return rect()
}

export function cubicBoundingBox(
  current : PointT,
  previous : PointT = defaultPoint,
) : RectT {
  return rect()
}

export function arcBoundingBox(
  current : PointT,
  previous : PointT = defaultPoint,
) : RectT {
  return rect()
}
