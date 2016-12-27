// @flow

import type { MatrixT } from '../types'

import { curry } from 'lodash'
import { mat, multiply } from '../core/matrix'
import { anyToRad } from '../core/angle'

export const skew : Function = curry(function skew(
  alpha : number | string,
  beta : number | string,
  matrix : MatrixT,
) : MatrixT {
  const skewMatrix : MatrixT = mat(
    1, Math.tan(anyToRad(beta)), 0, 0,
    Math.tan(anyToRad(alpha)), 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  )

  return multiply(matrix, skewMatrix)
})

export const skewX : Function = curry(function skewX(
  alpha : number | string,
  matrix : MatrixT,
) : MatrixT {
  return skew(alpha, 0, matrix)
})

export const skewY : Function = curry(function skewY(
  beta : number | string,
  matrix : MatrixT,
) : MatrixT {
  return skew(0, beta, matrix)
})
