/* @flow */

import type { PathT } from "../../types/Path"
import type { CoordsT } from "../../types/Coords"
import type { Matrix4x4T } from "../../types/Matrix"

import { transformPath, transformOrigin, makeMatrix } from "../transform"

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
): Function {
  const mat: Matrix4x4T = makeMatrix(
    m11, m12, m13, m14,
    m21, m22, m23, m24,
    m31, m32, m33, m34,
    m41, m42, m43, m44,
  )

  return (
    path: PathT,
    indices: Array<number> = [],
    origin: CoordsT = { x: 0, y: 0, z: 0 },
  ): PathT => transformOrigin(
    transformPath(mat, indices),
    origin,
  )(path)
}

export function matrix(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
): Function {
  return matrix3d(
    a, b, 0, 0,
    c, d, 0, 0,
    0, 0, 1, 0,
    e, f, 0, 1,
  )
}
