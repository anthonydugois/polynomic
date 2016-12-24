// @flow

import type {
  CoordsT,
  AbsoluteCoordsT,
  RectT,
} from '../types'

const positions = {
  left: 0,
  right: 100,
  top: 0,
  bottom: 100,
  center: 50,
}

export function absoluteCoords(
  coords: CoordsT,
  bbox: RectT,
) : AbsoluteCoordsT {
  return {
    x: typeof coords.x === 'string' ?
      absoluteX(coords.x, bbox) :
      coords.x,
    y: typeof coords.y === 'string' ?
      absoluteY(coords.y, bbox) :
      coords.y,
    z: typeof coords.z === 'undefined' ?
      0 :
      coords.z,
  }
}

function absoluteX(
  x: string,
  bbox: RectT,
): number {
  const _x: string = x.toLowerCase()
  const X: number = Object.keys(positions).includes(_x) ?
    positions[_x] :
    parseRelative(_x)

  return bbox.x + ((bbox.width * X) / 100)
}

function absoluteY(
  y: string,
  bbox: RectT,
): number {
  const _y: string = y.toLowerCase()
  const Y: number = Object.keys(positions).includes(_y) ?
    positions[_y] :
    parseRelative(_y)

  return bbox.y + ((bbox.height * Y) / 100)
}

function parseRelative(
  str: string,
): number {
  return parseFloat(str.replace('%', ''))
}
