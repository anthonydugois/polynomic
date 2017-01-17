// @flow

import type {
  MatrixT,
  CoordsT,
  PrimitiveRectT,
} from '../types'

import { curry } from 'lodash/fp'
import { mat, multiply } from '../core/matrix'
import { weakCoords, relativeCoords } from '../core/coords'
import { rect } from '../rect'

export const translate3d : Function = curry(function translate3d(
  tx : number | string,
  ty : number | string,
  tz : number,
  matrix : MatrixT,
  bbox : PrimitiveRectT = rect(),
) : MatrixT {
  const { x, y, z } : CoordsT = relativeCoords(
    bbox,
    weakCoords(tx, ty, tz),
  )
  const translateMatrix : MatrixT = mat(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1,
  )

  return multiply(matrix, translateMatrix)
})

export const translate : Function = curry(function translate(
  tx : number | string,
  ty : number | string,
  matrix : MatrixT,
  bbox : PrimitiveRectT = rect(),
) : MatrixT {
  return translate3d(tx, ty, 0, matrix, bbox)
})

export const translateX : Function = curry(function translateX(
  tx : number | string,
  matrix : MatrixT,
  bbox : PrimitiveRectT = rect(),
) : MatrixT {
  return translate3d(tx, 0, 0, matrix, bbox)
})

export const translateY : Function = curry(function translateY(
  ty : number | string,
  matrix : MatrixT,
  bbox : PrimitiveRectT = rect(),
) : MatrixT {
  return translate3d(0, ty, 0, matrix, bbox)
})

export const translateZ : Function = curry(function translateZ(
  tz : number,
  matrix : MatrixT,
  bbox : PrimitiveRectT = rect(),
) : MatrixT {
  return translate3d(0, 0, tz, matrix, bbox)
})
