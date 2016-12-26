// @flow

import type {
  PointT,
  PointParamsT,
  PointCodeT,
} from '../types'

import { curry } from 'lodash'
import { point } from '../core/point'
import * as codes from '../core/codes'
import { isQ, isT, isC, isS } from '../is'

export const m : Function = curry((
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => point(codes.m, previous.x + dx, previous.y + dy))

export const M : Function = curry((
  x : number,
  y : number,
) : PointT => point(codes.M, x, y))

export const l : Function = curry((
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => point(codes.l, previous.x + dx, previous.y + dy))

export const L : Function = curry((
  x : number,
  y : number,
) : PointT => point(codes.L, x, y))

export const h : Function = curry((
  dx : number,
  previous : PointT,
) : PointT => point(codes.h, previous.x + dx, previous.y))

export const H : Function = curry((
  x : number,
  previous : PointT,
) : PointT => point(codes.H, x, previous.y))

export const v : Function = curry((
  dy : number,
  previous : PointT,
) : PointT => point(codes.v, previous.x, previous.y + dy))

export const V : Function = curry((
  y : number,
  previous : PointT,
) : PointT => point(codes.V, previous.x, y))

export const q : Function = curry((
  dx1 : number,
  dy1 : number,
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => point(codes.q, previous.x + dx, previous.y + dy, {
  x1: previous.x + dx1,
  y1: previous.y + dy1,
}))

export const Q : Function = curry((
  x1 : number,
  y1 : number,
  x : number,
  y : number,
) : PointT => point(codes.Q, x, y, {
  x1,
  y1,
}))

export const t : Function = curry((
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => {
  const parameters : PointParamsT = { x1: previous.x, y1: previous.y }

  if (isQ(previous) || isT(previous)) {
    parameters.x1 = typeof previous.parameters.x1 !== 'undefined' ?
      (2 * previous.x) - previous.parameters.x1 :
      parameters.x1

    parameters.y1 = typeof previous.parameters.y1 !== 'undefined' ?
      (2 * previous.y) - previous.parameters.y1 :
      parameters.y1
  }

  return point(codes.t, previous.x + dx, previous.y + dy, parameters)
})

export const T : Function = curry((
  x : number,
  y : number,
  previous : PointT,
) : PointT => {
  const parameters : PointParamsT = { x1: previous.x, y1: previous.y }

  if (isQ(previous) || isT(previous)) {
    parameters.x1 = typeof previous.parameters.x1 !== 'undefined' ?
      (2 * previous.x) - previous.parameters.x1 :
      parameters.x1

    parameters.y1 = typeof previous.parameters.y1 !== 'undefined' ?
      (2 * previous.y) - previous.parameters.y1 :
      parameters.y1
  }

  return point(codes.T, x, y, parameters)
})

export const c : Function = curry((
  dx1 : number,
  dy1 : number,
  dx2 : number,
  dy2 : number,
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => point(codes.c, previous.x + dx, previous.y + dy, {
  x1: previous.x + dx1,
  y1: previous.y + dy1,
  x2: previous.x + dx2,
  y2: previous.y + dy2,
}))

export const C : Function = curry((
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
  x : number,
  y : number,
) : PointT => point(codes.C, x, y, {
  x1,
  y1,
  x2,
  y2,
}))

export const s : Function = curry((
  dx2 : number,
  dy2 : number,
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => {
  const parameters : PointParamsT = {
    x1: previous.x,
    y1: previous.y,
    x2: previous.x + dx2,
    y2: previous.y + dy2,
  }

  if (isC(previous) || isS(previous)) {
    parameters.x1 = typeof previous.parameters.x2 !== 'undefined' ?
      (2 * previous.x) - previous.parameters.x2 :
      parameters.x1

    parameters.y1 = typeof previous.parameters.y2 !== 'undefined' ?
      (2 * previous.y) - previous.parameters.y2 :
      parameters.y1
  }

  return point(codes.s, previous.x + dx, previous.y + dy, parameters)
})

export const S : Function = curry((
  x2 : number,
  y2 : number,
  x : number,
  y : number,
  previous : PointT,
) : PointT => {
  const parameters : PointParamsT = {
    x1: previous.x,
    y1: previous.y,
    x2,
    y2,
  }

  if (isC(previous) || isS(previous)) {
    parameters.x1 = typeof previous.parameters.x2 !== 'undefined' ?
      (2 * previous.x) - previous.parameters.x2 :
      parameters.x1

    parameters.y1 = typeof previous.parameters.y2 !== 'undefined' ?
      (2 * previous.y) - previous.parameters.y2 :
      parameters.y1
  }

  return point(codes.S, x, y, parameters)
})

export const a : Function = curry((
  rx : number,
  ry : number,
  rotation : number,
  large : number,
  sweep : number,
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => {
  const theta : number = rotation % 360

  return point(codes.a, previous.x + dx, previous.y + dy, {
    rx,
    ry,
    rotation: theta < 0 ? theta + 360 : theta,
    large: large === 0 ? 0 : 1,
    sweep: sweep === 0 ? 0 : 1,
  })
})

export const A : Function = curry((
  rx : number,
  ry : number,
  rotation : number,
  large : number,
  sweep : number,
  x : number,
  y : number,
) : PointT => {
  const theta : number = rotation % 360

  return point(codes.A, x, y, {
    rx,
    ry,
    rotation: theta < 0 ? theta + 360 : theta,
    large: large === 0 ? 0 : 1,
    sweep: sweep === 0 ? 0 : 1,
  })
})

export const z : Function = curry((
  related : PointT,
) : PointT => point(codes.z, related.x, related.y))

export const Z : Function = curry((
  related : PointT,
) : PointT => point(codes.Z, related.x, related.y))
