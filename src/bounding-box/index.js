// @flow

import type {
  WeakCoordsT,
  PointT,
  PathT,
  RectT,
} from '../types'

import { degToRad } from '../core/angle'
import { point } from '../core/point'
import * as ex from '../core/extremums'
import { rect } from '../rect'
import { arc } from '../arc'
import { isQ, isT, isC, isS, isA } from '../is'

export function boundingBox(
  path : PathT,
) : RectT {
  return path.reduce(
    (
      acc : RectT,
      current : PointT,
      index : number,
    ) : RectT => {
      if (index > 0) {
        const {
          x,
          y,
          width,
          height,
        } : RectT = _boundingBox(current, path[index - 1])

        const xMin : number = Math.min(acc.x, x)
        const yMin : number = Math.min(acc.y, y)
        const xMax : number = Math.max(acc.x + acc.width, x + width)
        const yMax : number = Math.max(acc.y + acc.height, y + height)

        acc.x = xMin
        acc.y = yMin
        acc.width = xMax - xMin
        acc.height = yMax - yMin
      }

      return acc
    },
    rect(
      path[0].x,
      path[0].y,
    ),
  )
}

function _boundingBox(
  current : PointT,
  previous : PointT = point(),
) : RectT {
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

function extremumsToBoundingBox(
  extremums : Array<WeakCoordsT>
) : RectT {
  return extremums.reduce(
    (
      acc : RectT,
      extremum : WeakCoordsT,
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
    rect(
      parseFloat(extremums[0].x),
      parseFloat(extremums[0].y),
    ),
  )
}
