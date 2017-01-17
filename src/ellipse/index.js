// @flow

import type { PrimitiveEllipseT } from '../types'

export const ellipse : Function = (
  cx : number = 0,
  cy : number = 0,
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
  start : number = 0,
  end : number = 0,
) : PrimitiveEllipseT => Object.freeze({
  type: 'ellipse',
  cx,
  cy,
  rx,
  ry,
  phi: phi % (2 * Math.PI),
  start,
  end,
})
