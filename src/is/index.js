// @flow

import type { PointT } from '../types'

import * as codes from '../core/codes'

export function is(
  current : PointT | Function,
  code : string,
) : boolean {
  const type : string = typeof current === 'function' ?
    current.name :
    current.code

  return type.toLowerCase() === code.toLowerCase()
}

export function isM(
  current : PointT | Function,
) : boolean {
  return is(current, codes.M)
}

export function isL(
  current : PointT | Function,
) : boolean {
  return is(current, codes.L)
}

export function isH(
  current : PointT | Function,
) : boolean {
  return is(current, codes.H)
}

export function isV(
  current : PointT | Function,
) : boolean {
  return is(current, codes.V)
}

export function isQ(
  current : PointT | Function,
) : boolean {
  return is(current, codes.Q)
}

export function isT(
  current : PointT | Function,
) : boolean {
  return is(current, codes.T)
}

export function isC(
  current : PointT | Function,
) : boolean {
  return is(current, codes.C)
}

export function isS(
  current : PointT | Function,
) : boolean {
  return is(current, codes.S)
}

export function isA(
  current : PointT | Function,
) : boolean {
  return is(current, codes.A)
}

export function isZ(
  current : PointT | Function,
) : boolean {
  return is(current, codes.Z)
}

export function isRelative(
  current : PointT | Function,
) : boolean {
  const type : string = typeof current === 'function' ?
    current.name :
    current.code

  return type.toLowerCase() === type
}

export function isAbsolute(
  current : PointT | Function,
) : boolean {
  return !isRelative(current)
}
