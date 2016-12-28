// @flow

import type { MatrixT } from '../types'

import { curry } from 'lodash/fp'
import { mat, multiply } from '../core/matrix'

export const scale3d : Function = curry(function scale3d(
  sx : number,
  sy : number,
  sz : number,
  matrix : MatrixT,
) : MatrixT {
  const scaleMatrix : MatrixT = mat(
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1,
  )

  return multiply(matrix, scaleMatrix)
})

export const scale : Function = curry(function scale(
  sx : number,
  sy : number,
  matrix : MatrixT,
) : MatrixT {
  return scale3d(sx, sy, 1, matrix)
})

export const scaleX : Function = curry(function scaleX(
  sx : number,
  matrix : MatrixT,
) : MatrixT {
  return scale3d(sx, 1, 1, matrix)
})

export const scaleY : Function = curry(function scaleY(
  sy : number,
  matrix : MatrixT,
) : MatrixT {
  return scale3d(1, sy, 1, matrix)
})

export const scaleZ : Function = curry(function scaleZ(
  sz : number,
  matrix : MatrixT,
) : MatrixT {
  return scale3d(1, 1, sz, matrix)
})
