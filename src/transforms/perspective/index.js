// @flow

import type { Matrix4T } from '../../types'

export function perspective(
  d: number,
): Matrix4T {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, -1 / d, 1,
  ]
}
