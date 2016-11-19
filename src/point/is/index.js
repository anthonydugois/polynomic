/* @flow */

import type { PointT } from "../../types/Point"

import * as types from "../points/types"

export function is(
  current: PointT,
  code: string,
): boolean {
  return current.code.toLowerCase() === code.toLowerCase()
}

export function isM(
  current: PointT,
): boolean {
  return is(current, types.M)
}

export function isL(
  current: PointT,
): boolean {
  return is(current, types.L)
}

export function isH(
  current: PointT,
): boolean {
  return is(current, types.H)
}

export function isV(
  current: PointT,
): boolean {
  return is(current, types.V)
}

export function isQ(
  current: PointT,
): boolean {
  return is(current, types.Q)
}

export function isT(
  current: PointT,
): boolean {
  return is(current, types.T)
}

export function isC(
  current: PointT,
): boolean {
  return is(current, types.C)
}

export function isS(
  current: PointT,
): boolean {
  return is(current, types.S)
}

export function isA(
  current: PointT,
): boolean {
  return is(current, types.A)
}

export function isZ(
  current: PointT,
): boolean {
  return is(current, types.Z)
}
