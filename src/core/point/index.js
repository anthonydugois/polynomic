// @flow

import type {
  PointT,
  PointParamsT,
  PointCodeT,
} from '../../types'

import { curry } from 'lodash/fp'
import { isQ, isT, isC, isS } from '../../is'

export const point : Function = curry((
  code ?: PointCodeT = '',
  x ?: number = 0,
  y ?: number = 0,
  parameters ?: PointParamsT = Object.freeze({}),
) : PointT => Object.freeze({
  code,
  x,
  y,
  parameters,
}))

export const anchor : Function = curry((
  previous : ?PointT,
  x1 ?: number = 0,
  y1 ?: number = 0,
) : PointParamsT => typeof previous !== 'undefined' ?
  Object.freeze(implicitAnchor(previous, 1)) :
  Object.freeze({ x1, y1 })
)

export const anchors : Function = curry((
  previous : ?PointT,
  x1 ?: number = 0,
  y1 ?: number = 0,
  x2 ?: number = 0,
  y2 ?: number = 0,
) : PointParamsT => typeof previous !== 'undefined' ?
  Object.freeze({ ...implicitAnchor(previous, 2), x2, y2 }) :
  Object.freeze({ x1, y1, x2, y2 })
)

export const arc : Function = curry((
  rx ?: number = 0,
  ry ?: number = 0,
  rotation ?: number = 0,
  large ?: number = 0,
  sweep ?: number = 0,
) : PointParamsT => (rotation %= 360, Object.freeze({
  rx,
  ry,
  rotation: rotation < 0 ? rotation + 360 : rotation,
  large: large === 0 ? 0 : 1,
  sweep: sweep === 0 ? 0 : 1,
})))

const implicitAnchor : Function = curry((
  previous : PointT,
  n ?: number = 1,
) : PointParamsT => {
  const xn : string = `x${ n }`
  const yn : string = `y${ n }`
  const isQuadratic : boolean = isQ(previous) || isT(previous)
  const isCubic : boolean = isC(previous) || isS(previous)
  const shouldCompute : boolean = (n === 1 && isQuadratic) || (n === 2 && isCubic)

  return {
    x1: shouldCompute && typeof previous.parameters[xn] !== 'undefined' ?
      (2 * previous.x) - previous.parameters[xn] :
      previous.x,
    y1: shouldCompute && typeof previous.parameters[yn] !== 'undefined' ?
      (2 * previous.y) - previous.parameters[yn] :
      previous.y,
  }
})
