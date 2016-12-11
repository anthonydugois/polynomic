// @flow

import type { CenterParameterizationT } from '../../types'

export function centerParameterization(
  cx : number = 0,
  cy : number = 0,
  rx : number = 0,
  ry : number = 0,
  _phi : number = 0,
  start : number = 0,
  end : number = 0,
) : CenterParameterizationT {
  const phi : number = _phi % (2 * Math.PI)

  return {
    cx,
    cy,
    rx,
    ry,
    phi,
    start,
    end,
  }
}
