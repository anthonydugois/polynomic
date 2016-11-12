/* @flow */

import type { PointT } from "../../types/Point"

import * as types from "../points/types"

export function is(
  point: PointT,
  code: string,
): boolean {
  return point.code.toLowerCase() === code.toLowerCase()
}

export function isM(
  point: PointT,
): boolean {
  return is(point, types.M)
}

export function isL(
  point: PointT,
): boolean {
  return is(point, types.L)
}

export function isH(
  point: PointT,
): boolean {
  return is(point, types.H)
}

export function isV(
  point: PointT,
): boolean {
  return is(point, types.V)
}

export function isQ(
  point: PointT,
): boolean {
  return is(point, types.Q)
}

export function isT(
  point: PointT,
): boolean {
  return is(point, types.T)
}

export function isC(
  point: PointT,
): boolean {
  return is(point, types.C)
}

export function isS(
  point: PointT,
): boolean {
  return is(point, types.S)
}

export function isA(
  point: PointT,
): boolean {
  return is(point, types.A)
}

export function isZ(
  point: PointT,
): boolean {
  return is(point, types.Z)
}
