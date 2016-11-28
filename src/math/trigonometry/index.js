// @flow

import type { CoordsT, Vector4T } from '../../types'

import { angle } from '../vector'

function rotatedCenter(
  x1 : number,
  y1 : number,
  rx : number,
  ry : number,
  rotation : number,
  large : 0 | 1,
  sweep : 0 | 1,
  x2 : number,
  y2 : number,
) : CoordsT {
  const _x : number = (Math.cos(rotation) * (x1 - x2) / 2)
    + (Math.sin(rotation) * (y1 - y2) / 2)
  const _y : number = (Math.cos(rotation) * (y1 - y2) / 2)
    - (Math.sin(rotation) * (x1 - x2) / 2)

  const _x2 : number = _x ** 2
  const _y2 : number = _y ** 2
  const rx2 : number = rx ** 2
  const ry2 : number = ry ** 2

  const n : number = (rx2 * ry2) - (rx2 * _y2) - (ry2 * _x2)
  const d : number = (rx2 * _y2) + (ry2 * _x2)

  const sign : -1 | 1 = large === sweep ? -1 : 1
  const coef : number = sign * Math.sqrt(n / d)

  return {
    x: coef * ((rx * _y) / ry),
    y: coef * ((-ry * _x) / rx),
  }
}

export function center(
  x1 : number,
  y1 : number,
  rx : number,
  ry : number,
  rotation : number,
  large : 0 | 1,
  sweep : 0 | 1,
  x2 : number,
  y2 : number,
) : CoordsT {
  if (rx === 0 || ry === 0) {
    return {
      x: (x2 - x1) / 2,
      y: (y2 - y1) / 2,
    }
  }

  const c : CoordsT = rotatedCenter(
    x1, y1,
    rx, ry, rotation, large, sweep,
    x2, y2,
  )
  const cx : number = parseFloat(c.x)
  const cy : number = parseFloat(c.y)

  return {
    x: ((Math.cos(rotation) * cx) - (Math.sin(rotation) * cy))
      + ((x1 + x2) / 2),
    y: ((Math.sin(rotation) * cx) + (Math.cos(rotation) * cy))
      + ((y1 + y2) / 2),
  }
}

export function angles(
  x1 : number,
  y1 : number,
  rx : number,
  ry : number,
  rotation : number,
  large : 0 | 1,
  sweep : 0 | 1,
  x2 : number,
  y2 : number,
) : { start : number, delta : number } {
  if (rx === 0 || ry === 0) {
    return {
      start: 0,
      delta: 0,
    }
  }

  const c : CoordsT = rotatedCenter(
    x1, y1,
    rx, ry, rotation, large, sweep,
    x2, y2,
  )

  const cx : number = parseFloat(c.x)
  const cy : number = parseFloat(c.y)
  const x : number = (Math.cos(rotation) * (x1 - x2) / 2)
    + (Math.sin(rotation) * (y1 - y2) / 2)
  const y : number = (Math.cos(rotation) * (y1 - y2) / 2)
    - (Math.sin(rotation) * (x1 - x2) / 2)

  const v1 : Vector4T = [1, 0, 0, 1]
  const v2 : Vector4T = [(x - cx) / rx, (y - cy) / ry, 0, 1]
  const v3 : Vector4T = [(-x - cx) / rx, (-y - cy) / ry, 0, 1]

  const start : number = angle(v1, v2)
  let delta : number = angle(v2, v3) % (2 * Math.PI)

  if (sweep === 0 && delta > 0) {
    delta -= (2 * Math.PI)
  }

  if (sweep !== 0 && delta < 0) {
    delta += (2 * Math.PI)
  }

  return { start, delta }
}
