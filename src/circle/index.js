// @flow

import type { CircleT } from '../../types'

export function circle(
  cx : number = 0,
  cy : number = 0,
  r : number = 0,
) : CircleT {
  return {
    cx,
    cy,
    r,
  }
}
