// @flow

import type { EndpointParameterizationT } from '../../types'

export function endpointParameterization(
  x1 : number = 0,
  y1 : number = 0,
  rx : number = 0,
  ry : number = 0,
  _phi : number = 0,
  _large : number = 0,
  _sweep : number = 0,
  x2 : number = x1,
  y2 : number = y1,
) : EndpointParameterizationT {
  const phi : number = _phi % (2 * Math.PI)
  const large : 0 | 1 = _large === 0 ? 0 : 1
  const sweep : 0 | 1 = _sweep === 0 ? 0 : 1

  return {
    x1,
    y1,
    rx,
    ry,
    phi,
    large,
    sweep,
    x2,
    y2,
  }
}
