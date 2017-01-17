// @flow

import type { PrimitiveLineT } from '../types'

export const line : Function = (
  x1 : number = 0,
  y1 : number = 0,
  x2 : number = 0,
  y2 : number = 0,
) : PrimitiveLineT => Object.freeze({
  type: 'line',
  x1,
  y1,
  x2,
  y2,
})
