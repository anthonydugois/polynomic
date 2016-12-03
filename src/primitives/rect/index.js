// @flow

import type { RectT } from '../../types'

export function rect(
  x : number = 0,
  y : number = 0,
  width : number = 0,
  height : number = width,
  rx : number = 0,
  ry : number = rx,
) : RectT {
  return {
    x,
    y,
    width,
    height,
    rx,
    ry,
  }
}
