// @flow

import type {
  CoordsT,
  MatrixT,
  CenterParameterizationT,
  EndpointParameterizationT,
} from '../../types'

import { endpoint, center } from '../../primitives/arc'
import { mat, det, multiply } from '../matrix'

export function endpointToCenter(
  e : EndpointParameterizationT,
) : CenterParameterizationT {
  const [rx, ry] : [number, number] = correctRadii(e)

  const _x1 : number = ((e.x1 * Math.cos(e.phi)) + (e.y1 * Math.sin(e.phi))) / rx
  const _y1 : number = ((e.y1 * Math.cos(e.phi)) - (e.x1 * Math.sin(e.phi))) / ry
  const _x2 : number = ((e.x2 * Math.cos(e.phi)) + (e.y2 * Math.sin(e.phi))) / rx
  const _y2 : number = ((e.y2 * Math.cos(e.phi)) - (e.x2 * Math.sin(e.phi))) / ry

  const dx : number = _x1 - _x2
  const dy : number = _y1 - _y2
  const xm : number = (_x1 + _x2) / 2
  const ym : number = (_y1 + _y2) / 2
  const d : number = Math.sqrt((1 / ((dx ** 2) + (dy ** 2))) - (1 / 4))

  const _cx1 : number = xm + (d * dy)
  const _cy1 : number = ym - (d * dx)
  const _cx2 : number = xm - (d * dy)
  const _cy2 : number = ym + (d * dx)

  const _cx : number = e.large === e.sweep ? _cx2 : _cx1
  const _cy : number = e.large === e.sweep ? _cy2 : _cy1

  const cx : number = (rx * _cx * Math.cos(e.phi))
    - (ry * _cy * Math.sin(e.phi))
  const cy : number = (rx * _cx * Math.sin(e.phi))
    + (ry * _cy * Math.cos(e.phi))

  const start : number = Math.atan2(_y1 - _cy, _x1 - _cx)
  let end : number = Math.atan2(_y2 - _cy, _x2 - _cx)

  if (e.sweep === 0 && end > start) {
    end -= 2 * Math.PI
  }

  if (e.sweep === 1 && end < start) {
    end += 2 * Math.PI
  }

  return center(cx, cy, e.rx, e.ry, e.phi, start, end)
}

export function centerToEndpoint(
  c : CenterParameterizationT,
) : EndpointParameterizationT {
  const x1 : number = c.cx
    + (c.rx * Math.cos(c.start) * Math.cos(c.phi))
    - (c.ry * Math.sin(c.start) * Math.sin(c.phi))
  const y1 : number = c.cy
    + (c.ry * Math.sin(c.start) * Math.cos(c.phi))
    + (c.rx * Math.cos(c.start) * Math.sin(c.phi))
  const x2 : number = c.cx
    + (c.rx * Math.cos(c.end) * Math.cos(c.phi))
    - (c.ry * Math.sin(c.end) * Math.sin(c.phi))
  const y2 : number = c.cy
    + (c.ry * Math.sin(c.end) * Math.cos(c.phi))
    + (c.rx * Math.cos(c.end) * Math.sin(c.phi))

  const large : number = Math.abs(c.end - c.start) > Math.PI ? 1 : 0
  const sweep : number = c.end - c.start > 0 ? 1 : 0

  return endpoint(x1, y1, c.rx, c.ry, c.phi, large, sweep, x2, y2)
}

export function transformArc(
  e : EndpointParameterizationT,
  matrix : MatrixT,
) : [number, number, number] {
  const d : number = det(matrix)
  const m : MatrixT = multiply(matrix, mat(
    e.rx * Math.cos(e.phi), e.rx * Math.sin(e.phi), 0, 0,
    -e.ry * Math.sin(e.phi), e.ry * Math.cos(e.phi), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ))

  const A : number = (m[0] ** 2) + (m[4] ** 2)
  const B : number = 2 * ((m[0] * m[1]) + (m[4] * m[5]))
  const C : number = (m[1] ** 2) + (m[5] ** 2)
  const AC : number = A - C

  if (B === 0) {
    return [
      AC <= 0 ? Math.sqrt(C) : Math.sqrt(A),
      AC <= 0 ? Math.sqrt(A) : Math.sqrt(C),
      0,
    ]
  }

  if (AC === 0) {
    return [
      Math.sqrt(A - (B / 2)),
      Math.sqrt(A + (B / 2)),
      Math.PI / 4,
    ]
  }

  const K : number = Math.sqrt(1 + ((B / AC) ** 2))
  const _A : number = (A + C + (K * AC)) / 2
  const _C : number = (A + C - (K * AC)) / 2

  return [
    AC <= 0 ? Math.sqrt(_C) : Math.sqrt(_A),
    AC <= 0 ? Math.sqrt(_A) : Math.sqrt(_C),
    Math.atan2(-B, AC) / 2,
  ]
}

export function foci(
  c : CenterParameterizationT,
) : [CoordsT, CoordsT] {
  const major : number = Math.max(c.rx, c.ry)
  const minor : number = Math.min(c.rx, c.ry)
  const f : number = Math.sqrt(Math.abs((major ** 2) - (minor ** 2)))
  const theta : number = major === c.rx ? c.phi : c.phi + (Math.PI / 2)

  const f1 : CoordsT = {
    x: c.cx - (f * Math.cos(theta)),
    y: c.cy - (f * Math.sin(theta)),
  }

  const f2 : CoordsT = {
    x: c.cx + (f * Math.cos(theta)),
    y: c.cy + (f * Math.sin(theta)),
  }

  return [f1, f2]
}

export function correctRadii(
  e : EndpointParameterizationT,
) : [number, number] {
  if (e.rx === 0 || e.ry === 0) {
    return [e.rx, e.ry]
  }

  const xm : number = (e.x1 - e.x2) / 2
  const ym : number = (e.y1 - e.y2) / 2
  const x : number = (Math.cos(e.phi) * xm) + (Math.sin(e.phi) * ym)
  const y : number = (Math.cos(e.phi) * ym) - (Math.sin(e.phi) * xm)
  const root : number = Math.sqrt(
    ((x ** 2) / (Math.abs(e.rx) ** 2))
    + ((y ** 2) / (Math.abs(e.ry) ** 2))
  )

  return [
    Math.max(1, root) * Math.abs(e.rx),
    Math.max(1, root) * Math.abs(e.ry),
  ]
}
