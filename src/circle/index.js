// @flow

import type { PrimitiveCircleT } from '../types'

export const circle : Function = (
  cx : number = 0,
  cy : number = 0,
  r : number = 0,
) : PrimitiveCircleT => Object.freeze({
  type: 'circle',
  cx,
  cy,
  r,
})
