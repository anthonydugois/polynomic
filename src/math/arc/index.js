// @flow

import type {
  CoordsT,
  RadiiT,
  MatrixT,
  CenterParameterizationT,
  EndpointParameterizationT,
} from '../../types'

import { mat, det, multiply } from '../matrix'

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

export function endpointToCenter({
  x1 = 0,
  y1 = 0,
  rx = 0,
  ry = 0,
  phi = 0,
  large = 0,
  sweep = 0,
  x2 = x1,
  y2 = y1,
} : EndpointParameterizationT) : CenterParameterizationT {
  const r : RadiiT = correctRadii({ x1, y1, rx, ry, phi, large, sweep, x2, y2 })
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
    rx,
    ry,
    phi,
    start,
    end,
  }
}

export function centerToEndpoint({
  cx = 0,
  cy = 0,
  rx = 0,
  ry = 0,
  phi = 0,
  start = 0,
  end = 0,
} : CenterParameterizationT) : EndpointParameterizationT {
  const x1 : number = cx +
    (rx * Math.cos(start) * Math.cos(phi))
    - (ry * Math.sin(start) * Math.sin(phi))
  const y1 : number = cy
    + (ry * Math.sin(start) * Math.cos(phi))
    + (rx * Math.cos(start) * Math.sin(phi))
  const x2 : number = cx
    + (rx * Math.cos(end) * Math.cos(phi))
    - (ry * Math.sin(end) * Math.sin(phi))
  const y2 : number = cy
    + (ry * Math.sin(end) * Math.cos(phi))
    + (rx * Math.cos(end) * Math.sin(phi))
  const large : 0 | 1 = Math.abs(end - start) > Math.PI ? 1 : 0
  const sweep : 0 | 1 = end - start > 0 ? 1 : 0

  return {
    x1,
    y1,
    rx,
    ry,
    phi,
    large,
    sweep,
    x2,
    y2,
  }
}

export function transformArc({
  x1 = 0,
  y1 = 0,
  rx = 0,
  ry = 0,
  phi = 0,
  large = 0,
  sweep = 0,
  x2 = x1,
  y2 = y1,
} : EndpointParameterizationT) : Function {
  const endpoint : EndpointParameterizationT = {
    x1, y1,
    rx, ry, phi, large, sweep,
    x2, y2,
  }

  return (
    matrix : MatrixT,
  ) : EndpointParameterizationT => {
    const d : number = det(matrix)
    const m : MatrixT = multiply(matrix, mat(
      rx * Math.cos(phi), rx * Math.sin(phi), 0, 0,
      -ry * Math.sin(phi), ry * Math.cos(phi), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ))

    const A : number = (m[0] ** 2) + (m[4] ** 2)
    const B : number = 2 * ((m[0] * m[1]) + (m[4] * m[5]))
    const C : number = (m[1] ** 2) + (m[5] ** 2)
    const AC : number = A - C

    if (B === 0) {
      endpoint.rx = AC <= 0 ? Math.sqrt(C) : Math.sqrt(A)
      endpoint.ry = AC <= 0 ? Math.sqrt(A) : Math.sqrt(C)
      endpoint.phi = 0
    } else if (AC === 0) {
      endpoint.rx = Math.sqrt(A - (B / 2))
      endpoint.ry = Math.sqrt(A + (B / 2))
      endpoint.phi = Math.PI / 4
    } else {
      const K : number = Math.sqrt(1 + ((B / AC) ** 2))
      const _A : number = (A + C + (K * AC)) / 2
      const _C : number = (A + C - (K * AC)) / 2

      endpoint.rx = AC <= 0 ? Math.sqrt(_C) : Math.sqrt(_A)
      endpoint.ry = AC <= 0 ? Math.sqrt(_A) : Math.sqrt(_C)
      endpoint.phi = Math.atan2(-B, AC) / 2
    }

    if (d < 0) {
      endpoint.sweep = endpoint.sweep === 0 ? 1 : 0
    }

    return endpoint
  }
}

export function foci({
  cx = 0,
  cy = 0,
  rx = 0,
  ry = 0,
  phi = 0,
} : CenterParameterizationT) : [CoordsT, CoordsT] {
  const major : number = Math.max(rx, ry)
  const minor : number = Math.min(rx, ry)
  const f : number = Math.sqrt(Math.abs((major ** 2) - (minor ** 2)))
  const theta : number = major === rx ? phi : phi + (Math.PI / 2)

  const f1 : CoordsT = {
    x: cx - (f * Math.cos(theta)),
    y: cy - (f * Math.sin(theta)),
  }

  const f2 : CoordsT = {
    x: cx + (f * Math.cos(theta)),
    y: cy + (f * Math.sin(theta)),
  }

  return [f1, f2]
}

export function correctRadii({
  x1 = 0,
  y1 = 0,
  rx = 0,
  ry = 0,
  phi = 0,
  x2 = 0,
  y2 = 0,
} : EndpointParameterizationT) : RadiiT {
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
