import * as types from "../points/types"

function is(point, code) {
  return point.code.toLowerCase() === code.toLowerCase()
}

export function isM(point) {
  return is(point, types.M)
}

export function isL(point) {
  return is(point, types.L)
}

export function isH(point) {
  return is(point, types.H)
}

export function isV(point) {
  return is(point, types.V)
}

export function isQ(point) {
  return is(point, types.Q)
}

export function isT(point) {
  return is(point, types.T)
}

export function isC(point) {
  return is(point, types.C)
}

export function isS(point) {
  return is(point, types.S)
}

export function isA(point) {
  return is(point, types.A)
}

export function isZ(point) {
  return is(point, types.Z)
}
