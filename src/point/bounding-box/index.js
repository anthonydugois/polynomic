// @flow

import type {
  CoordsT,
  PointT,
  RectT,
} from '../../types'

import { degToRad } from '../../utils/angle'
import { isQ, isT, isC, isS, isA } from '../is'
import { point } from '../../primitives/point'
import { rect } from '../../primitives/rect'
import * as derivative from '../../math/derivative'

export function boundingBox(
  current : PointT,
  previous : PointT = point(),
) : RectT {
  switch (true) {
  case isQ(current):
  case isT(current):
    return quadraticBoundingBox(current, previous)

  case isC(current):
  case isS(current):
    return cubicBoundingBox(current, previous)

  case isA(current):
    return arcBoundingBox(current, previous)

  default:
    return linearBoundingBox(current, previous)
  }
}

export function linearBoundingBox(
  current : PointT,
  previous : PointT = point(),
) : RectT {
  return extremumsToBoundingBox(...derivative.linearExtremums(
    previous.x,
    previous.y,
    current.x,
    current.y,
  ))
}

export function quadraticBoundingBox(
  current : PointT,
  previous : PointT = point(),
) : RectT {
  return extremumsToBoundingBox(...derivative.quadraticExtremums(
    previous.x,
    previous.y,
    current.parameters.x1,
    current.parameters.y1,
    current.x,
    current.y,
  ))
}

export function cubicBoundingBox(
  current : PointT,
  previous : PointT = point(),
) : RectT {
  return extremumsToBoundingBox(...derivative.cubicExtremums(
    previous.x,
    previous.y,
    current.parameters.x1,
    current.parameters.y1,
    current.parameters.x2,
    current.parameters.y2,
    current.x,
    current.y,
  ))
}

export function arcBoundingBox(
  current : PointT,
  previous : PointT = point(),
) : RectT {
  return extremumsToBoundingBox(...derivative.arcExtremums(
    previous.x,
    previous.y,
    current.parameters.rx,
    current.parameters.ry,
    degToRad(current.parameters.rotation),
    current.parameters.large,
    current.parameters.sweep,
    current.x,
    current.y,
  ))
}

function extremumsToBoundingBox(
  ...extremums : Array<CoordsT>
) : RectT {
  const xPositions : Array<number> = extremums.map(({ x }) => parseFloat(x))
  const yPositions : Array<number> = extremums.map(({ y }) => parseFloat(y))

  const x : number = Math.min(...xPositions)
  const y : number = Math.min(...yPositions)
  const width : number = Math.max(...xPositions) - x
  const height : number = Math.max(...yPositions) - y

  return rect(x, y, width, height)
}
