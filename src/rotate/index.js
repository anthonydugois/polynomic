// @flow

import type { MatrixT } from '../types'

import { curry } from 'lodash'
import { identity, mat, multiply } from '../core/matrix'
import { angle } from '../core/angle'

export const rotate3d : Function = curry(function rotate3d(
  x : number,
  y : number,
  z : number,
  alpha : number | string,
  matrix : MatrixT,
) : MatrixT {
  if (x === 0 && y === 0 && z === 0) {
    return typeof matrix !== 'undefined' ?
      matrix :
      identity()
  }

  const a : number = angle(alpha)

  const sc : number = Math.sin(a / 2) * Math.cos(a / 2)
  const sq : number = Math.sin(a / 2) ** 2

  const m00 : number = 1 - (2 * ((y ** 2) + z ** 2) * sq)
  const m01 : number = 2 * ((x * y * sq) - (z * sc))
  const m02 : number = 2 * ((x * z * sq) + (y * sc))

  const m10 : number = 2 * ((x * y * sq) + (z * sc))
  const m11 : number = 1 - (2 * ((x ** 2) + (z ** 2)) * sq)
  const m12 : number = 2 * ((y * z * sq) - (x * sc))

  const m20 : number = 2 * ((x * z * sq) - (y * sc))
  const m21 : number = 2 * ((y * z * sq) + (x * sc))
  const m22 : number = 1 - (2 * ((x ** 2) + (y ** 2)) * sq)

  const rotateMatrix : MatrixT = mat(
    m00, m10, m20, 0,
    m01, m11, m21, 0,
    m02, m12, m22, 0,
    0, 0, 0, 1,
  )

  return multiply(matrix, rotateMatrix)
})

export const rotateX : Function = curry(function rotateX(
  alpha : number | string,
  matrix : MatrixT,
) : MatrixT {
  return rotate3d(1, 0, 0, alpha, matrix)
})

export const rotateY : Function = curry(function rotateY(
  alpha : number | string,
  matrix : MatrixT,
) : MatrixT {
  return rotate3d(0, 1, 0, alpha, matrix)
})

export const rotateZ : Function = curry(function rotateZ(
  alpha : number | string,
  matrix : MatrixT,
) : MatrixT {
  return rotate3d(0, 0, 1, alpha, matrix)
})

export const rotate : Function = rotateZ
