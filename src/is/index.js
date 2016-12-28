// @flow

import type { PointT } from '../types'

import { curry } from 'lodash/fp'
import * as codes from '../core/codes'

export const is : Function = curry((
  current : PointT,
  code : string,
) : boolean => current.code.toLowerCase() === code.toLowerCase())

export const isM : Function = curry((
  current : PointT,
) : boolean => is(current, codes.M))

export const isL : Function = curry((
  current : PointT,
) : boolean => is(current, codes.L))

export const isH : Function = curry((
  current : PointT,
) : boolean => is(current, codes.H))

export const isV : Function = curry((
  current : PointT,
) : boolean => is(current, codes.V))

export const isQ : Function = curry((
  current : PointT,
) : boolean => is(current, codes.Q))

export const isT : Function = curry((
  current : PointT,
) : boolean => is(current, codes.T))

export const isC : Function = curry((
  current : PointT,
) : boolean => is(current, codes.C))

export const isS : Function = curry((
  current : PointT,
) : boolean => is(current, codes.S))

export const isA : Function = curry((
  current : PointT,
) : boolean => is(current, codes.A))

export const isZ : Function = curry((
  current : PointT,
) : boolean => is(current, codes.Z))

export const isRelative : Function = curry((
  current : PointT,
) : boolean => current.code.toLowerCase() === current.code)

export const isAbsolute : Function = curry((
  current : PointT,
) : boolean => !isRelative(current))
