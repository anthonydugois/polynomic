// @flow

import type {
  CoordsT,
  PointT,
  RectT,
  ArcT,
} from '../../types'

import { degToRad } from '../angle'
import { isQ, isT, isC, isS, isA } from '../../is'
import { point } from '../point'
import { rect } from '../../rect'
import { arc } from '../../arc'

import {
  linearExtremums,
  quadraticExtremums,
  cubicExtremums,
  ellipticExtremums,
} from '../extremums'

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
  return extremumsToBoundingBox(linearExtremums(
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
  return extremumsToBoundingBox(quadraticExtremums(
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
  return extremumsToBoundingBox(cubicExtremums(
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
  return extremumsToBoundingBox(ellipticExtremums(arc(
    previous.x,
    previous.y,
    current.parameters.rx,
    current.parameters.ry,
    degToRad(current.parameters.rotation),
    current.parameters.large,
    current.parameters.sweep,
    current.x,
    current.y,
  )))
}

function extremumsToBoundingBox(
  extremums : Array<CoordsT>
) : RectT {
  const initialX : number = parseFloat(extremums[0].x)
  const initialY : number = parseFloat(extremums[0].y)

  return extremums.reduce(
    (
      acc : RectT,
      extremum : CoordsT,
    ) : RectT => {
      const x : number = parseFloat(extremum.x)
      const y : number = parseFloat(extremum.y)

      const xMin : number = Math.min(acc.x, x)
      const yMin : number = Math.min(acc.y, y)
      const xMax : number = Math.max(acc.x + acc.width, x)
      const yMax : number = Math.max(acc.y + acc.height, y)

      acc.x = xMin
      acc.y = yMin
      acc.width = xMax - xMin
      acc.height = yMax - yMin

      return acc
    },
    rect(initialX, initialY),
  )
}
