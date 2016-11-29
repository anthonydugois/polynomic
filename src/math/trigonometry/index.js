// @flow

import type { CoordsT, AnglesT, Vector4T, ArcParamsT } from '../../types'

import { angle } from '../vector'

export function correctedArcParameters(
  x1 : number,
  y1 : number,
  rx : number,
  ry : number,
  phi : number,
  large : 0 | 1,
  sweep : 0 | 1,
  x2 : number,
  y2 : number,
) : ArcParamsT {
  const x_2 : number = ((x1 - x2) / 2)
  const y_2 : number = ((y1 - y2) / 2)
  const x : number = (Math.cos(phi) * x_2) + (Math.sin(phi) * y_2)
  const y : number = (Math.cos(phi) * y_2) - (Math.sin(phi) * x_2)

  const prx : number = Math.abs(rx)
  const pry : number = Math.abs(ry)
  const coef : number = ((x ** 2) / (prx ** 2)) + ((y ** 2) / (pry ** 2))
  const root : number = Math.sqrt(coef)

  return {
    rx: root > 1 ? root * prx : prx,
    ry: root > 1 ? root * pry : pry,
    phi: phi % (2 * Math.PI),
    large: large === 0 ? 0 : 1,
    sweep: sweep === 0 ? 0 : 1,
  }
}

export function center(
  x1 : number,
  y1 : number,
  _rx : number,
  _ry : number,
  _phi : number,
  _large : 0 | 1,
  _sweep : 0 | 1,
  x2 : number,
  y2 : number,
) : CoordsT {
  const { rx, ry, phi, large, sweep } : ArcParamsT = correctedArcParameters(x1, y1, _rx, _ry, _phi, _large, _sweep, x2, y2)

  if (rx === 0 || ry === 0) {
    return {
      x: (x2 - x1) / 2,
      y: (y2 - y1) / 2,
    }
  }

  const { x, y } : CoordsT = normalizedCenter(x1, y1, rx, ry, phi, large, sweep, x2, y2)
  const cx : number = parseFloat(x)
  const cy : number = parseFloat(y)

  return {
    x: ((Math.cos(phi) * cx) - (Math.sin(phi) * cy)) + ((x1 + x2) / 2),
    y: ((Math.sin(phi) * cx) + (Math.cos(phi) * cy)) + ((y1 + y2) / 2),
  }
}

export function angles(
  x1 : number,
  y1 : number,
  _rx : number,
  _ry : number,
  _phi : number,
  _large : 0 | 1,
  _sweep : 0 | 1,
  x2 : number,
  y2 : number,
) : AnglesT {
  const { rx, ry, phi, large, sweep } : ArcParamsT = correctedArcParameters(x1, y1, _rx, _ry, _phi, _large, _sweep, x2, y2)

  if (rx === 0 || ry === 0) {
    return {
      start: 0,
      end: 0,
      delta: 0,
    }
  }

  const x_2 : number = ((x1 - x2) / 2)
  const y_2 : number = ((y1 - y2) / 2)
  const x : number = (Math.cos(phi) * x_2) + (Math.sin(phi) * y_2)
  const y : number = (Math.cos(phi) * y_2) - (Math.sin(phi) * x_2)

  const n : CoordsT = normalizedCenter(x1, y1, rx, ry, phi, large, sweep, x2, y2)
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
  const x : number = (c * ((x1 - x2) / 2)) + (s * ((y1 - y2) / 2))
  const y : number = (c * ((y1 - y2) / 2)) - (s * ((x1 - x2) / 2))

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
