// @flow

import type { Matrix4T } from '../../types'

import { mat, multiply } from '../../math/matrix'
import { angle } from '../../utils/angle'

export function skew(
  alpha: number | string,
  beta: number | string = 0,
): Function {
  return (
    matrix : Matrix4T,
  ) : Matrix4T => {
    const skewMatrix : Matrix4T = mat(
      1, Math.tan(angle(beta)), 0, 0,
      Math.tan(angle(alpha)), 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )

    return typeof matrix !== 'undefined' ?
      multiply(matrix, skewMatrix) :
      skewMatrix
  }
}

export function skewX(
  alpha: number | string,
): Function {
  return skew(alpha, 0)
}

export function skewY(
  beta: number | string,
): Function {
  return skew(0, beta)
}
