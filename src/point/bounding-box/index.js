// @flow

import type { CoordsT, PointT, RectT, ArcParamsT, AnglesT } from '../../types'

import { point } from '../../primitives/point'
import { rect } from '../../primitives/rect'
import { arcParameters, angles } from '../../math/arc'
import { arc } from '../../math/parametric'
import { degToRad } from '../../utils/angle'
import { normalize } from '../../utils/normalize'
import { isQ, isT, isC, isS, isA } from '../is'

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
  const x : number = Math.min(current.x, previous.x)
  const y : number = Math.min(current.y, previous.y)
  const width : number = Math.max(current.x, previous.x) - x
  const height : number = Math.max(current.y, previous.y) - y

  return rect(x, y, width, height)
}

export function quadraticBoundingBox(
  current : PointT,
  previous : PointT = point(),
) : RectT {
  return rect()
}

export function cubicBoundingBox(
  current : PointT,
  previous : PointT = point(),
) : RectT {
  return rect()
}

export function arcBoundingBox(
  current : PointT,
  previous : PointT = point(),
) : RectT {
  const { rx, ry, phi, large, sweep } : ArcParamsT = arcParameters(
    previous.x,
    previous.y,
    current.parameters.rx,
    current.parameters.ry,
    degToRad(current.parameters.rotation),
    current.parameters.large,
    current.parameters.sweep,
    current.x,
    current.y,
  )

  const parametric : Function = arc(
    previous.x, previous.y,
    rx, ry, phi, large, sweep,
    current.x, current.y,
  )

  const { start, end } : AnglesT = angles(
    previous.x, previous.y,
    rx, ry, phi, large, sweep,
    current.x, current.y,
  )

  const aMin : number = Math.min(start, end)
  const aMax : number = Math.max(start, end)

  const aXMax : number = Math.atan((-ry * Math.tan(phi)) / rx)
  const aXMin : number = aXMax + Math.PI
  const aYMax : number = Math.atan(ry / (rx * Math.tan(phi)))
  const aYMin : number = aYMax + Math.PI

  const positions : Array<CoordsT> = [aXMax, aXMin, aYMax, aYMin]
    .filter((angle) => angle > aMin && angle < aMax)
    .map((angle) => parametric(normalize(angle, aMin, aMax)))

  const xPositions : Array<number> = [
    previous.x,
    current.x,
    ...positions.map((position) => parseFloat(position.x)),
  ]

  const yPositions : Array<number> = [
    previous.y,
    current.y,
    ...positions.map((position) => parseFloat(position.y)),
  ]

  const x : number = Math.min(...xPositions)
  const y : number = Math.min(...yPositions)
  const width : number = Math.max(...xPositions) - x
  const height : number = Math.max(...yPositions) - y

  return rect(x, y, width, height)
}
