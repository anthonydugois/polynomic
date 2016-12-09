// @flow

import type {
  CoordsT,
  RadiiT,
  MatrixT,
  CenterParameterizationT,
  EndpointParameterizationT,
  EllipseParameterizationT,
} from '../../types'

import { mat, inverse } from '../matrix'

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

export function centerToEndpoint(
  cx : number = 0,
  cy : number = 0,
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
  start : number = 0,
  end : number = 0,
) : EndpointParameterizationT {
  return {
    x1: cx + (rx * Math.cos(start) * Math.cos(phi)) - (ry * Math.sin(start) * Math.sin(phi)),
    y1: cy + (ry * Math.sin(start) * Math.cos(phi)) + (rx * Math.cos(start) * Math.sin(phi)),
    x2: cx + (rx * Math.cos(end) * Math.cos(phi)) - (ry * Math.sin(end) * Math.sin(phi)),
    y2: cy + (ry * Math.sin(end) * Math.cos(phi)) + (rx * Math.cos(end) * Math.sin(phi)),
    large: Math.abs(end - start) > Math.PI ? 1 : 0,
    sweep: end - start > 0 ? 1 : 0,
  }
}

export function endpointToCenter(
  x1 : number,
  y1 : number,
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
  large : 0 | 1,
  sweep : 0 | 1,
  x2 : number,
  y2 : number,
) : CenterParameterizationT {
  const r : RadiiT = correctRadii(x1, y1, rx, ry, phi, x2, y2)
  const fl : 0 | 1 = flag(large)
  const fs : 0 | 1 = flag(sweep)

  const _x1 : number = ((x1 * Math.cos(phi)) + (y1 * Math.sin(phi))) / r.rx
  const _y1 : number = ((y1 * Math.cos(phi)) - (x1 * Math.sin(phi))) / r.ry
  const _x2 : number = ((x2 * Math.cos(phi)) + (y2 * Math.sin(phi))) / r.rx
  const _y2 : number = ((y2 * Math.cos(phi)) - (x2 * Math.sin(phi))) / r.ry

  const dx : number = _x1 - _x2
  const dy : number = _y1 - _y2
  const xm : number = (_x1 + _x2) / 2
  const ym : number = (_y1 + _y2) / 2
  const d : number = Math.sqrt((1 / ((dx ** 2) + (dy ** 2))) - (1 / 4))

  const _cx1 : number = xm + (d * dy)
  const _cy1 : number = ym - (d * dx)
  const _cx2 : number = xm - (d * dy)
  const _cy2 : number = ym + (d * dx)

  const _cx : number = fl === fs ? _cx2 : _cx1
  const _cy : number = fl === fs ? _cy2 : _cy1

  const cx : number = (r.rx * _cx * Math.cos(phi))
    - (r.ry * _cy * Math.sin(phi))
  const cy : number = (r.rx * _cx * Math.sin(phi))
    + (r.ry * _cy * Math.cos(phi))

  const start : number = Math.atan2(_y1 - _cy, _x1 - _cx)
  let end : number = Math.atan2(_y2 - _cy, _x2 - _cx)

  if (fs === 0 && end > start) {
    end -= 2 * Math.PI
  }

  if (fs === 1 && end < start) {
    end += 2 * Math.PI
  }

  return {
    cx,
    cy,
    start,
    end,
  }
}

export function centerToMatrix(
  cx : number = 0,
  cy : number = 0,
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
) : MatrixT {
  return mat(
    rx * Math.cos(phi), rx * Math.sin(phi), 0, 0,
    -ry * Math.sin(phi), ry * Math.cos(phi), 0, 0,
    cx, cy, 1, 0,
    0, 0, 0, 1,
  )
}

export function matrixToImplicit(
  matrix : MatrixT,
) : Array<number> {
  const m : MatrixT = inverse(matrix)

  const A : number = (m[0] ** 2) + (m[4] ** 2)
  const B : number = 2 * ((m[0] * m[1]) + (m[4] * m[5]))
  const C : number = (m[1] ** 2) + (m[5] ** 2)
  const D : number = 2 * ((m[0] * m[2]) + (m[4] * m[6]))
  const E : number = 2 * ((m[1] * m[2]) + (m[5] * m[6]))
  const F : number = (m[2] ** 2) + (m[6] ** 2) - 1

  return [A, B, C, D, E, F]
}

export function implicitToEllipse(
  A : number,
  B : number,
  C : number,
  D : number,
  E : number,
  F : number,
) : EllipseParameterizationT {
  const d : number = (B ** 2) - (4 * A * C)

  if (d >= 0) {
    return {
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0,
      phi: 0,
    }
  }

  const cx : number = ((2 * C * D) - (B * E)) / d
  const cy : number = ((2 * A * E) - (B * D)) / d
  const phi : number = B === 0 ?
    0 :
    B !== 0 && A === C ?
      Math.PI / 4 :
      Math.atan(B / (A - C)) / 2

  const K : number = Math.sqrt(1 + ((B / (A - C)) ** 2))
  const _A : number = B === 0 ?
    A :
    B !== 0 && A === C ?
      A + (B / 2) :
      (A + C + (K * (A - C))) / 2
  const _C : number = B === 0 ?
    C :
    B !== 0 && A === C ?
      A - (B / 2) :
      (A + C - (K * (A - C))) / 2

  const rx : number = 1 / Math.sqrt(_A)
  const ry : number = 1 / Math.sqrt(_C)

  return {
    cx,
    cy,
    rx,
    ry,
    phi,
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

export function correctRadii(
  x1 : number = 0,
  y1 : number = 0,
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
  x2 : number = 0,
  y2 : number = 0,
) : RadiiT {
  if (rx === 0 || ry === 0) {
    return { rx, ry }
  }

  const xm : number = (x1 - x2) / 2
  const ym : number = (y1 - y2) / 2
  const x : number = (Math.cos(phi) * xm) + (Math.sin(phi) * ym)
  const y : number = (Math.cos(phi) * ym) - (Math.sin(phi) * xm)
  const root : number = Math.sqrt(
    ((x ** 2) / (Math.abs(rx) ** 2))
    + ((y ** 2) / (Math.abs(ry) ** 2))
  )

  return {
    rx: Math.max(1, root) * Math.abs(rx),
    ry: Math.max(1, root) * Math.abs(ry),
  }
}
