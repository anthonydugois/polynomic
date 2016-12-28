// @flow

import type {
  CoordsT,
  AbsoluteCoordsT,
  RectT,
} from '../../types'

import { parseUnit } from '../utils/units'
import * as positions from '../positions'

export function absolute(
  coords : CoordsT,
  box : RectT,
) : AbsoluteCoordsT {
  return {
    x: absoluteX(coords.x, box),
    y: absoluteY(coords.y, box),
    z: typeof coords.z !== 'undefined' ? coords.z : 0,
  }
}

function absoluteX(
  x : number | string,
  box : RectT,
) : number {
  if (typeof x !== 'string') {
    return x
  }

  const lx : string = x.toLowerCase()
  const t : number = Object.keys(positions).includes(lx) ?
    positions[lx] :
    parseUnit(lx)[0] / 100

  return box.x + (box.width * t)
}

function absoluteY(
  y : number | string,
  box : RectT,
) : number {
  if (typeof y !== 'string') {
    return y
  }

  const ly : string = y.toLowerCase()
  const t : number = Object.keys(positions).includes(ly) ?
    positions[ly] :
    parseUnit(ly)[0] / 100

  return box.y + (box.height * t)
}
