// @flow

import type { MatrixT } from '../types'

import { curry } from 'lodash/fp'
import { mat, multiply } from '../core/matrix'

export const perspective : Function = curry(_perspective)

function _perspective(
  d : number,
  matrix : MatrixT,
) : MatrixT {
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
