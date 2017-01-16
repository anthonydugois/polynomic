// @flow

import { parseUnit } from '../utils/units'
import * as units from '../units'

export const anyToRad : Function = (alpha : number | string) : number => {
  if (typeof alpha === 'string') {
    const [value, unit] : [number, string] = parseUnit(alpha)

    switch (unit) {
    case units.deg:
      return degToRad(value)

    case units.grad:
      return gradToRad(value)

    case units.turn:
      return turnToRad(value)

    default:
      return value
    }
  }

  return alpha
}

export const degToRad : Function = (deg : number) : number =>
  (Math.PI / 180) * deg

export const gradToRad : Function = (grad : number) : number =>
  (Math.PI / 200) * grad

export const turnToRad : Function = (turn : number) : number =>
  (2 * Math.PI) * turn

export const radToDeg : Function = (rad : number) : number =>
  (180 / Math.PI) * rad
