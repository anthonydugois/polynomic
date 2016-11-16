/* @flow */

import type { Matrix4x4T } from "../../types/Matrix"

export function matrix3d(
  m11: number,
  m12: number,
  m13: number,
  m14: number,
  m21: number,
  m22: number,
  m23: number,
  m24: number,
  m31: number,
  m32: number,
  m33: number,
  m34: number,
  m41: number,
  m42: number,
  m43: number,
  m44: number,
): Matrix4x4T {
  return [
    m11, m21, m31, m41,
    m12, m22, m32, m42,
    m13, m23, m33, m43,
    m14, m24, m34, m44,
  ]
}

export function matrix(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
): Matrix4x4T {
  return matrix3d(
    a, b, 0, 0,
    c, d, 0, 0,
    0, 0, 1, 0,
    e, f, 0, 1,
  )
}
