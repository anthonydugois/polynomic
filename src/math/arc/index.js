// @flow

import type {
  CoordsT,
  AnglesT,
  RadiiT,
  VectorT,
  ArcParamsT,
} from '../../types'

import { vec, angle } from '../vector'

export function makeMod(
  m : number,
) : Function {
  return function mod(
    phi : number,
  ) : number {
    return phi % m
  }
}

export const mod2PI = makeMod(2 * Math.PI)
export const modPI = makeMod(Math.PI)
export const modPI2 = makeMod(Math.PI / 2)
export const mod360 = makeMod(360)

export function flag(
  f : number,
) : 0 | 1 {
  return f === 0 ? 0 : 1
}

export function arcParameters(
  x1 : number = 0,
  y1 : number = 0,
  _rx : number = 0,
  _ry : number = 0,
  _phi : number = 0,
  _large : number = 0,
  _sweep : number = 0,
  x2 : number = 0,
  y2 : number = 0,
) : ArcParamsT {
  const phi : number = mod2PI(_phi)
  const large : 0 | 1 = flag(_large)
  const sweep : 0 | 1 = flag(_sweep)

  return {
    ...correctRadii(x1, y1, _rx, _ry, phi, x2, y2),
    phi,
    large,
    sweep,
  }
}

export function foci(
  cx : number = 0,
  cy : number = 0,
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
) : [CoordsT, CoordsT] {
  const major : number = Math.max(rx, ry)
  const minor : number = Math.min(rx, ry)
  const f : number = Math.sqrt(Math.abs((major ** 2) - (minor ** 2)))
  const theta : number = major === rx ? phi : phi + (Math.PI / 2)

  return [
    {
      x: cx - (f * Math.cos(theta)),
      y: cy - (f * Math.sin(theta)),
    },
    {
      x: cx + (f * Math.cos(theta)),
      y: cy + (f * Math.sin(theta)),
    },
  ]
}

export function radii(
  x : number = 0,
  y : number = 0,
  f1x : number = 0,
  f1y : number = 0,
  f2x : number = 0,
  f2y : number = 0,
  phi : number = 0,
) : RadiiT {
  const f : number = Math.sqrt(((f1x - f2x) ** 2) + ((f1y - f2y) ** 2))
  const a : number = Math.sqrt(((f1x - x) ** 2) + ((f1y - y) ** 2))
  const b : number = Math.sqrt(((f2x - x) ** 2) + ((f2y - y) ** 2))

  const major : number = (a + b) / 2
  const minor : number = Math.sqrt(((a + b) ** 2) - (f ** 2)) / 2

  const _f1x : number = (Math.cos(-phi) * f1x) - (Math.sin(-phi) * f1y)
  const _f1y : number = (Math.cos(-phi) * f1y) + (Math.sin(-phi) * f1x)

  const _f2x : number = (Math.cos(-phi) * f2x) - (Math.sin(-phi) * f2y)
  const _f2y : number = (Math.cos(-phi) * f2y) + (Math.sin(-phi) * f2x)

  if (_f1x === _f2x) {
    return {
      rx: minor,
      ry: major,
    }
  }

  if (_f1y === _f2y) {
    return {
      rx: major,
      ry: minor,
    }
  }

  return {
    rx: 0,
    ry: 0,
  }
}

export function center(
  x1 : number = 0,
  y1 : number = 0,
  _rx : number = 0,
  _ry : number = 0,
  _phi : number = 0,
  _large : number = 0,
  _sweep : number = 0,
  x2 : number = 0,
  y2 : number = 0,
) : CoordsT {
  const {
    rx,
    ry,
    phi,
    large,
    sweep,
  } : ArcParamsT = arcParameters(
    x1, y1,
    _rx, _ry, _phi, _large, _sweep,
    x2, y2,
  )

  if (rx === 0 || ry === 0) {
    return {
      x: (x2 - x1) / 2,
      y: (y2 - y1) / 2,
    }
  }

  const n : CoordsT = normalizedCenter(
    x1, y1,
    rx, ry, phi, large, sweep,
    x2, y2,
  )

  const cx : number = parseFloat(n.x)
  const cy : number = parseFloat(n.y)

  return {
    x: ((Math.cos(phi) * cx) - (Math.sin(phi) * cy)) + ((x1 + x2) / 2),
    y: ((Math.sin(phi) * cx) + (Math.cos(phi) * cy)) + ((y1 + y2) / 2),
  }
}

export function angles(
  x1 : number = 0,
  y1 : number = 0,
  _rx : number = 0,
  _ry : number = 0,
  _phi : number = 0,
  _large : number = 0,
  _sweep : number = 0,
  x2 : number = 0,
  y2 : number = 0,
) : AnglesT {
  const {
    rx,
    ry,
    phi,
    large,
    sweep,
  } : ArcParamsT = arcParameters(
    x1, y1,
    _rx, _ry, _phi, _large, _sweep,
    x2, y2,
  )

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

  const n : CoordsT = normalizedCenter(
    x1, y1,
    rx, ry, phi, large, sweep,
    x2, y2,
  )

  const cx : number = parseFloat(n.x)
  const cy : number = parseFloat(n.y)

  const v1 : VectorT = vec(1, 0, 0, 1)
  const v2 : VectorT = vec((x - cx) / rx, (y - cy) / ry, 0, 1)
  const v3 : VectorT = vec((-x - cx) / rx, (-y - cy) / ry, 0, 1)

  const start : number = mod2PI(angle(v1, v2))
  const _delta : number = mod2PI(angle(v2, v3))
  const delta : number = normalizedDelta(_delta, sweep)
  const end : number = mod2PI(start + delta)

  return { start, end, delta }
}

function correctRadii(
  x1 : number = 0,
  y1 : number = 0,
  _rx : number = 0,
  _ry : number = 0,
  phi : number = 0,
  x2 : number = 0,
  y2 : number = 0,
) : { rx : number, ry : number } {
  if (_rx === 0 || _ry === 0) {
    return {
      rx: 0,
      ry: 0,
    }
  }

  const x_2 : number = ((x1 - x2) / 2)
  const y_2 : number = ((y1 - y2) / 2)
  const x : number = (Math.cos(phi) * x_2) + (Math.sin(phi) * y_2)
  const y : number = (Math.cos(phi) * y_2) - (Math.sin(phi) * x_2)

  const prx : number = Math.abs(_rx)
  const pry : number = Math.abs(_ry)
  const coef : number = ((x ** 2) / (prx ** 2)) + ((y ** 2) / (pry ** 2))
  const root : number = Math.sqrt(coef)

  return {
    rx: root > 1 ? root * prx : prx,
    ry: root > 1 ? root * pry : pry,
  }
}

function normalizedCenter(
  x1 : number,
  y1 : number,
  rx : number,
  ry : number,
  phi : number,
  large : 0 | 1,
  sweep : 0 | 1,
  x2 : number,
  y2 : number,
) : CoordsT {
  const x_2 : number = ((x1 - x2) / 2)
  const y_2 : number = ((y1 - y2) / 2)
  const x : number = (Math.cos(phi) * x_2) + (Math.sin(phi) * y_2)
  const y : number = (Math.cos(phi) * y_2) - (Math.sin(phi) * x_2)

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

function normalizedDelta(
  delta : number,
  sweep : 0 | 1 = 0,
) : number {
  if (sweep === 0 && delta > 0) {
    return delta - (2 * Math.PI)
  } else if (sweep !== 0 && delta < 0) {
    return delta + (2 * Math.PI)
  }

  return delta
}
