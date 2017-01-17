// @flow

import type {
  PrimitivePointT,
  PointT,
} from '../types'

import { hydrate as hydratePoint } from '../core/point'
import * as codes from '../core/codes'

export const is : Function =
  (code : string) : Function =>
    (cmd : PointT) : boolean =>
      hydratePoint(cmd).code.toLowerCase() === code.toLowerCase()

export const isM : Function = is(codes.M)
export const isL : Function = is(codes.L)
export const isH : Function = is(codes.H)
export const isV : Function = is(codes.V)
export const isQ : Function = is(codes.Q)
export const isT : Function = is(codes.T)
export const isC : Function = is(codes.C)
export const isS : Function = is(codes.S)
export const isA : Function = is(codes.A)
export const isZ : Function = is(codes.Z)

export const isRelative : Function = (cmd : PointT) : boolean => {
  const current : PrimitivePointT = hydratePoint(cmd)
  return current.code.toLowerCase() === current.code
}

export const isAbsolute : Function = (cmd : PointT) : boolean =>
  !isRelative(cmd)
