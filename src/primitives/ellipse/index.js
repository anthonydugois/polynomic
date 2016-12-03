// @flow

import type { EllipseT } from '../../types'

export function ellipse(
  cx : number = 0,
  cy : number = 0,
  rx : number = 0,
  ry : number = rx,
) : EllipseT {
  return {
    cx,
    cy,
    rx,
    ry,
  }
}
