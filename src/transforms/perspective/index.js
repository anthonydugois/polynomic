/* @flow */

import type { Matrix4x4T } from '../../types/Matrix'

export function perspective(
  d: number,
): Matrix4x4T {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, -1 / d, 1,
  ]
}
