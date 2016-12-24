// @flow

import type { MatrixT } from '../../types'

import { mat, multiply } from '../../math/matrix'

export function scale3d(
  sx : number,
  sy : number,
  sz : number,
) : Function {
  return (
    matrix : MatrixT,
  ) : MatrixT => {
    const scaleMatrix : MatrixT = mat(
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1,
    )

    return typeof matrix !== 'undefined' ?
      multiply(matrix, scaleMatrix) :
      scaleMatrix
  }
}

export function scale(
  sx : number,
  sy : number = sx,
) : Function {
  return scale3d(sx, sy, 1)
}

export function scaleX(
  sx : number,
) : Function {
  return scale3d(sx, 1, 1)
}

export function scaleY(
  sy : number,
) : Function {
  return scale3d(1, sy, 1)
}

export function scaleZ(
  sz : number,
) : Function {
  return scale3d(1, 1, sz)
}
