// @flow

import type {
  CoordsT,
  AbsoluteCoordsT,
  RectT,
} from '../../types'

const positions = {
  left: 0,
  right: 1,
  top: 0,
  bottom: 1,
  center: 0.5,
}

export function absoluteCoords(
  coords : CoordsT,
  bbox : RectT,
) : AbsoluteCoordsT {
  return {
    x: absoluteX(coords.x, bbox),
    y: absoluteY(coords.y, bbox),
    z: typeof coords.z !== 'undefined' ? coords.z : 0,
  }
}

function absoluteX(
  x : number | string,
  bbox : RectT,
) : number {
  if (typeof x !== 'string') {
    return x
  }

  const lx : string = x.toLowerCase()
  const t : number = Object.keys(positions).includes(lx) ?
    positions[lx] :
    parseRelative(lx)

  return bbox.x + (bbox.width * t)
}

function absoluteY(
  y : number | string,
  bbox : RectT,
) : number {
  if (typeof y !== 'string') {
    return y
  }

  const ly : string = y.toLowerCase()
  const t : number = Object.keys(positions).includes(ly) ?
    positions[ly] :
    parseRelative(ly)

  return bbox.y + (bbox.height * t)
}

function parseRelative(
  str : string,
) : number {
  return parseFloat(str.replace('%', '')) / 100
}
