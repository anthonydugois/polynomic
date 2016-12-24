// @flow

import type { LineT } from '../../types'

export function line(
  x1 : number = 0,
  y1 : number = 0,
  x2 : number = 0,
  y2 : number = 0,
) : LineT {
  return {
    x1,
    y1,
    x2,
    y2,
  }
}
