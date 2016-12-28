// @flow

import type { CircleT } from '../types'

import { curry } from 'lodash/fp'

export const circle : Function = curry((
  cx : number = 0,
  cy : number = 0,
  r : number = 0,
) : CircleT => ({
  cx,
  cy,
  r,
}))
