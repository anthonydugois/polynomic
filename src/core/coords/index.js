// @flow

import type {
  CoordsT,
  RectT,
} from '../../types'

import { rect } from '../../rect'
import { parseUnit } from '../utils/units'
import * as positions from '../positions'

export const coords : Function = (
  x ?: number = 0,
  y ?: number = 0,
  z ?: number = 0,
) : CoordsT => Object.freeze({ x, y, z })

export const relativeCoords : Function = (
  boundary ?: RectT = rect(),
  x ?: number | string = 0,
  y ?: number | string = 0,
  z ?: number = 0,
) : CoordsT => coords(
  relativeCoordX(boundary, x),
  relativeCoordY(boundary, y),
  z,
)

const relativeCoordX : Function = (
  boundary ?: RectT = rect(),
  x ?: number | string = 0,
) : number => {
  if (typeof x !== 'string') {
    return x
  }

  const lx : string = x.toLowerCase()
  const t : number = Object.keys(positions).includes(lx) ?
    positions[lx] :
    parseUnit(lx)[0] / 100

  return boundary.x + (boundary.width * t)
}

const relativeCoordY : Function = (
  boundary ?: RectT = rect(),
  y ?: number | string = 0,
) : number => {
  if (typeof y !== 'string') {
    return y
  }

  const ly : string = y.toLowerCase()
  const t : number = Object.keys(positions).includes(ly) ?
    positions[ly] :
    parseUnit(ly)[0] / 100

  return boundary.y + (boundary.height * t)
}
