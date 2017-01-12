// @flow

import type {
  CoordsT,
  AbsoluteCoordsT,
  RectT,
} from '../../types'

import { curry } from 'lodash/fp'
import { parseUnit } from '../utils/units'
import * as positions from '../positions'

export const absolute : Function = curry((
  box : RectT,
  coords : CoordsT,
) : AbsoluteCoordsT => ({
  x: typeof coords.x !== 'undefined' ? absoluteX(box, coords.x) : 0,
  y: typeof coords.y !== 'undefined' ? absoluteY(box, coords.y) : 0,
  z: typeof coords.z !== 'undefined' ? coords.z : 0,
}))

const absoluteX : Function = curry((
  box : RectT,
  x : number | string,
) : number => {
  if (typeof x !== 'string') {
    return x
  }

  const lx : string = x.toLowerCase()
  const t : number = Object.keys(positions).includes(lx) ?
    positions[lx] :
    parseUnit(lx)[0] / 100

  return box.x + (box.width * t)
})

const absoluteY : Function = curry((
  box : RectT,
  y : number | string,
) : number => {
  if (typeof y !== 'string') {
    return y
  }

  const ly : string = y.toLowerCase()
  const t : number = Object.keys(positions).includes(ly) ?
    positions[ly] :
    parseUnit(ly)[0] / 100

  return box.y + (box.height * t)
})
