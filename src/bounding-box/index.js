// @flow

import type {
  WeakCoordsT,
  PrimitivePointT,
  PathT,
  PrimitiveRectT,
} from '../types'

import { degToRad } from '../core/angle'
import { point } from '../core/point'
import * as ex from '../core/extremums'
import { rect } from '../rect'
import { arc } from '../arc'
import { isQ, isT, isC, isS, isA } from '../is'

export const boundingBox : Function = (path : PathT) : PrimitiveRectT => {
  const { xMin, yMin, xMax, yMax } = path.reduce(
    (
      acc,
      current : PrimitivePointT,
      index : number,
    ) => {
      if (index > 0) {
        const {
          x,
          y,
          width,
          height,
        } : PrimitiveRectT = _boundingBox(current, path[index - 1])

        acc.xMin = Math.min(acc.xMin, x)
        acc.yMin = Math.min(acc.yMin, y)
        acc.xMax = Math.max(acc.xMax, x + width)
        acc.yMax = Math.max(acc.yMax, y + height)
      }

      return acc
    },
    {
      xMin: path[0].x,
      yMin: path[0].y,
      xMax: 0,
      yMax: 0,
    },
  )

  return rect(xMin, yMin, xMax - xMin, yMax - yMin)
}

const _boundingBox : Function = (
  current : PrimitivePointT,
  previous : PrimitivePointT = point(),
) : PrimitiveRectT => {
  switch (true) {
  case isQ(current):
  case isT(current):
    return extremumsToBoundingBox(ex.quadraticExtremums(
      previous.x,
      previous.y,
      current.parameters.x1,
      current.parameters.y1,
      current.x,
      current.y,
    ))

  case isC(current):
  case isS(current):
    return extremumsToBoundingBox(ex.cubicExtremums(
      previous.x,
      previous.y,
      current.parameters.x1,
      current.parameters.y1,
      current.parameters.x2,
      current.parameters.y2,
      current.x,
      current.y,
    ))

  case isA(current):
    return extremumsToBoundingBox(ex.ellipticExtremums(arc(
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

  default:
    return extremumsToBoundingBox(ex.linearExtremums(
      previous.x,
      previous.y,
      current.x,
      current.y,
    ))
  }
}

const extremumsToBoundingBox : Function = (extremums : Array<WeakCoordsT>) : PrimitiveRectT => {
  const { xMin, yMin, xMax, yMax } = extremums.reduce(
    (
      acc,
      extremum : WeakCoordsT,
    ) => {
      const x : number = parseFloat(extremum.x)
      const y : number = parseFloat(extremum.y)

      acc.xMin = Math.min(acc.xMin, x)
      acc.yMin = Math.min(acc.yMin, y)
      acc.xMax = Math.max(acc.xMax, x)
      acc.yMax = Math.max(acc.yMax, y)

      return acc
    },
    {
      xMin: parseFloat(extremums[0].x),
      yMin: parseFloat(extremums[0].y),
      xMax: 0,
      yMax: 0,
    },
  )

  return rect(xMin, yMin, xMax - xMin, yMax - yMin)
}
