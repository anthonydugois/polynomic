// @flow

import type {
  CenterParameterizationT,
  EndpointParameterizationT,
} from '../../types'

export function endpoint(
  x1 : number = 0,
  y1 : number = 0,
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
  large : number = 0,
  sweep : number = 0,
  x2 : number = x1,
  y2 : number = y1,
) : EndpointParameterizationT {
  return {
    x1,
    y1,
    rx,
    ry,
    phi: phi % (2 * Math.PI),
    large: large === 0 ? 0 : 1,
    sweep: sweep === 0 ? 0 : 1,
    x2,
    y2,
  }
}

export function center(
  cx : number = 0,
  cy : number = 0,
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
  start : number = 0,
  end : number = 0,
) : CenterParameterizationT {
  return {
    cx,
    cy,
    rx,
    ry,
    phi: phi % (2 * Math.PI),
    start,
    end,
  }
}
