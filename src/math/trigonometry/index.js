// @flow

import type { CoordsT, AnglesT, Vector4T } from '../../types'

import { angle } from '../vector'

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

  const c : number = Math.cos(rotation)
  const s : number = Math.sin(rotation)

  const n : CoordsT = normalizedCenter(x1, y1, rx, ry, rotation, large, sweep, x2, y2)
  const cx : number = parseFloat(n.x)
  const cy : number = parseFloat(n.y)

  return {
    x: ((c * cx) - (s * cy)) + ((x1 + x2) / 2),
    y: ((s * cx) + (c * cy)) + ((y1 + y2) / 2),
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
) : AnglesT {
  if (rx === 0 || ry === 0) {
    return {
      start: 0,
      end: 0,
      delta: 0,
    }
  }

  const c : number = Math.cos(rotation)
  const s : number = Math.sin(rotation)
  const x : number = (c * (x1 - x2) / 2) + (s * (y1 - y2) / 2)
  const y : number = (c * (y1 - y2) / 2) - (s * (x1 - x2) / 2)

  const n : CoordsT = normalizedCenter(x1, y1, rx, ry, rotation, large, sweep, x2, y2)
  const cx : number = parseFloat(n.x)
  const cy : number = parseFloat(n.y)

  const v1 : Vector4T = [1, 0, 0, 1]
  const v2 : Vector4T = [(x - cx) / rx, (y - cy) / ry, 0, 1]
  const v3 : Vector4T = [(-x - cx) / rx, (-y - cy) / ry, 0, 1]

  const start : number = angle(v1, v2)
  const delta : number = normalizedAngleDelta(angle(v2, v3), sweep)
  const end : number = (start + delta) % (2 * Math.PI)

  return { start, end, delta }
}

function normalizedCenter(
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
  const c : number = Math.cos(rotation)
  const s : number = Math.sin(rotation)
  const x : number = (c * (x1 - x2) / 2) + (s * (y1 - y2) / 2)
  const y : number = (c * (y1 - y2) / 2) - (s * (x1 - x2) / 2)

  const xx : number = x ** 2
  const yy : number = y ** 2
  const rxx : number = rx ** 2
  const ryy : number = ry ** 2

  const sign : -1 | 1 = large === sweep ? -1 : 1
  const num : number = (rxx * ryy) - (rxx * yy) - (ryy * xx)
  const den : number = (rxx * yy) + (ryy * xx)
  const coef : number = sign * Math.sqrt(num / den)

  return {
    x: coef * ((rx * y) / ry),
    y: coef * ((-ry * x) / rx),
  }
}

function normalizedAngleDelta(
  delta : number,
  sweep : 0 | 1 = 0,
) : number {
  const d : number = delta % (2 * Math.PI)

  if (sweep === 0 && d > 0) {
    return d - (2 * Math.PI)
  } else if (sweep !== 0 && d < 0) {
    return d + (2 * Math.PI)
  }

  return d
}
