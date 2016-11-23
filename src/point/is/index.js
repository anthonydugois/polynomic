/* @flow */

import type { PointT } from '../../types/Point'

import * as types from '../points/types'

export function is(
  current: PointT | Function,
  code: string,
): boolean {
  const type: string = typeof current === 'function' ?
    current.name :
    current.code

  return type.toLowerCase() === code.toLowerCase()
}

export function isM(
  current: PointT | Function,
): boolean {
  return is(current, types.M)
}

export function isL(
  current: PointT | Function,
): boolean {
  return is(current, types.L)
}

export function isH(
  current: PointT | Function,
): boolean {
  return is(current, types.H)
}

export function isV(
  current: PointT | Function,
): boolean {
  return is(current, types.V)
}

export function isQ(
  current: PointT | Function,
): boolean {
  return is(current, types.Q)
}

export function isT(
  current: PointT | Function,
): boolean {
  return is(current, types.T)
}

export function isC(
  current: PointT | Function,
): boolean {
  return is(current, types.C)
}

export function isS(
  current: PointT | Function,
): boolean {
  return is(current, types.S)
}

export function isA(
  current: PointT | Function,
): boolean {
  return is(current, types.A)
}

export function isZ(
  current: PointT | Function,
): boolean {
  return is(current, types.Z)
}
