// @flow

import type { Matrix4T } from '../../types'

import { mat, multiply } from '../../math/matrix'

export function perspective(
  d: number,
): Function {
  return (
    matrix : Matrix4T,
  ) : Matrix4T => {
    const perspectiveMatrix : Matrix4T = mat(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, -1 / d,
      0, 0, 0, 1,
    )

    return typeof matrix !== 'undefined' ?
      multiply(matrix, perspectiveMatrix) :
      perspectiveMatrix
  }
}
