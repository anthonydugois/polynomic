// @flow

import type { RectT } from '../types'

export function rect(
  x : number = 0,
  y : number = 0,
  width : number = 0,
  height : number = width,
  rx : number = 0,
  ry : number = rx,
) : RectT {
  const r : RectT = {
    x,
    y,
    width,
    height,
  }

  if (rx !== 0) {
    r.rx = rx
  }

  if (ry !== 0) {
    r.ry = ry
  }

  return r
}
