import * as pointTypes from "lib/point/types"

export default function is(point, code) {
  return point.code.toLowerCase() === code.toLowerCase()
}

export function isM(point) {
  return is(point, pointTypes.M)
}

export function isL(point) {
  return is(point, pointTypes.L)
}

export function isH(point) {
  return is(point, pointTypes.H)
}

export function isV(point) {
  return is(point, pointTypes.V)
}

export function isQ(point) {
  return is(point, pointTypes.Q)
}

export function isT(point) {
  return is(point, pointTypes.T)
}

export function isC(point) {
  return is(point, pointTypes.C)
}

export function isS(point) {
  return is(point, pointTypes.S)
}

export function isA(point) {
  return is(point, pointTypes.A)
}

export function isZ(point) {
  return is(point, pointTypes.Z)
}
