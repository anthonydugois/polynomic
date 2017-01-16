// @flow

import type { CircleT } from '../types'

export const circle : Function = (
  cx : number = 0,
  cy : number = 0,
  r : number = 0,
) : CircleT => Object.freeze({
  cx,
  cy,
  r,
})
