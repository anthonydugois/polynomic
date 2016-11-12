/* @flow */

import type { PathT } from "../../types/Path"

import matrixOrigin from "../matrix-origin"

export default function scale(
  path: PathT,
  sx: string | number,
  sy: string | number,
  x: string | number = 0,
  y: string | number = 0,
): PathT {
  if (typeof sy === 'undefined') {
    sy = sx
  }

  return matrixOrigin(path, [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1,
  ], x, y)
}
