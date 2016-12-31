// @flow

import type { LineT } from '../types'

import { curry } from 'lodash/fp'

export const line : Function = curry((
  x1 : number = 0,
  y1 : number = 0,
  x2 : number = 0,
  y2 : number = 0,
) : LineT => Object.freeze({
  x1,
  y1,
  x2,
  y2,
}))
