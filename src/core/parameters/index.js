// @flow

import type {
  PrimitivePointT,
  PointParamsT,
} from '../../types'

import { isQ, isT, isC, isS } from '../../is'

export const anchor : Function = (
  x1 ?: number = 0,
  y1 ?: number = 0,
) : PointParamsT => Object.freeze({ x1, y1 })

export const anchors : Function = (
  x1 ?: number = 0,
  y1 ?: number = 0,
  x2 ?: number = 0,
  y2 ?: number = 0,
) : PointParamsT => Object.freeze({ x1, y1, x2, y2 })

export const implicitAnchor : Function = (
  previous : PrimitivePointT,
) : PointParamsT => {
  const isQuadratic : boolean = isQ(previous) || isT(previous)

  return anchor(
    isQuadratic && typeof previous.parameters.x1 !== 'undefined' ?
      (2 * previous.x) - previous.parameters.x1 :
      previous.x,
    isQuadratic && typeof previous.parameters.y1 !== 'undefined' ?
      (2 * previous.y) - previous.parameters.y1 :
      previous.y,
  )
}

export const implicitAnchors : Function = (
  previous : PrimitivePointT,
  x2 ?: number = 0,
  y2 ?: number = 0,
) : PointParamsT => {
  const isCubic : boolean = isC(previous) || isS(previous)

  return anchors(
    isCubic && typeof previous.parameters.x2 !== 'undefined' ?
      (2 * previous.x) - previous.parameters.x2 :
      previous.x,
    isCubic && typeof previous.parameters.y2 !== 'undefined' ?
      (2 * previous.y) - previous.parameters.y2 :
      previous.y,
    x2,
    y2,
  )
}

export const arc : Function = (
  rx ?: number = 0,
  ry ?: number = 0,
  rotation ?: number = 0,
  large ?: number = 0,
  sweep ?: number = 0,
) : PointParamsT => {
  const angle : number = rotation % 360

  return Object.freeze({
    rx,
    ry,
    rotation: angle < 0 ? angle + 360 : angle,
    large: large === 0 ? 0 : 1,
    sweep: sweep === 0 ? 0 : 1,
  })
}
