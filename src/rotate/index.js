// @flow

import type { MatrixT } from '../../types'

import { identity, mat, multiply } from '../../math/matrix'
import { angle } from '../../utils/angle'

export function rotate3d(
  x : number,
  y : number,
  z : number,
  alpha : number | string,
) : Function {
  return (
    matrix : MatrixT,
  ) : MatrixT => {
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

    return typeof matrix !== 'undefined' ?
      multiply(matrix, rotateMatrix) :
      rotateMatrix
  }
}

export function rotate(
  alpha : number | string,
) : Function {
  return rotateZ(alpha)
}

export function rotateX(
  alpha : number | string,
) : Function {
  return rotate3d(1, 0, 0, alpha)
}

export function rotateY(
  alpha : number | string,
) : Function {
  return rotate3d(0, 1, 0, alpha)
}

export function rotateZ(
  alpha : number | string,
) : Function {
  return rotate3d(0, 0, 1, alpha)
}