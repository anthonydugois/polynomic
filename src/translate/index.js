// @flow

import type {
  MatrixT,
  CoordsT,
  AbsoluteCoordsT,
  RectT,
} from '../types'

import { mat, multiply } from '../core/matrix'
import { absolute } from '../core/absolute'

export function translate3d(
  tx : number | string,
  ty : number | string = 0,
  tz : number = 0,
) : Function {
  return (
    matrix : MatrixT,
    bbox : RectT,
  ) : MatrixT => {
    const coords : CoordsT = { x: tx, y: ty, z: tz }
    const { x, y, z } : AbsoluteCoordsT = absolute(coords, bbox)
    const translateMatrix : MatrixT = mat(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1,
    )

    return typeof matrix !== 'undefined' ?
      multiply(matrix, translateMatrix) :
      translateMatrix
  }
}

export function translate(
  tx : number | string,
  ty : number | string = 0,
) : Function {
  return translate3d(tx, ty, 0)
}

export function translateX(
  tx : number | string,
) : Function {
  return translate3d(tx, 0, 0)
}

export function translateY(
  ty : number | string,
) : Function {
  return translate3d(0, ty, 0)
}

export function translateZ(
  tz : number,
) : Function {
  return translate3d(0, 0, tz)
}
