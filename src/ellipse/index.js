// @flow

import type { EllipseT } from '../types'

import { curry } from 'lodash/fp'

export const ellipse : Function = curry((
  cx : number = 0,
  cy : number = 0,
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
  start : number = 0,
  end : number = 0,
) : EllipseT => Object.freeze({
  cx,
  cy,
  rx,
  ry,
  phi: phi % (2 * Math.PI),
  start,
  end,
}))
