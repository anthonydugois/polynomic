/* @flow */

import type { Matrix4x4T } from '../../types/Matrix'

export function scale3d(
  sx: number,
  sy: number,
  sz: number,
): Matrix4x4T {
  return [
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1,
  ]
}

export function scale(
  sx: number,
  sy: number = sx,
): Matrix4x4T {
  return scale3d(sx, sy, 1)
}

export function scaleX(
  sx: number,
): Matrix4x4T {
  return scale3d(sx, 1, 1)
}

export function scaleY(
  sy: number,
): Matrix4x4T {
  return scale3d(1, sy, 1)
}

export function scaleZ(
  sz: number,
): Matrix4x4T {
  return scale3d(1, 1, sz)
}
