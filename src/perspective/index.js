// @flow

import type { MatrixT } from '../../types'

import { mat, multiply } from '../../math/matrix'

export function perspective(
  d : number,
) : Function {
  return (
    matrix : MatrixT,
  ) : MatrixT => {
    const perspectiveMatrix : MatrixT = mat(
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
