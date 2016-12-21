// @flow

import type {
  CoordsT,
  MatrixT,
  VectorT,
  EllipseT,
  ArcT,
} from '../../types'

import { arc } from '../../primitives/arc'
import { ellipse } from '../../primitives/ellipse'
import { mat, det, inverse, multiply } from '../matrix'

export function arcToEllipse(
  a : ArcT,
) : EllipseT {
  const [rx, ry] : [number, number] = correctRadii(a)

  const _x1 : number = ((a.x1 * Math.cos(a.phi))
    + (a.y1 * Math.sin(a.phi))) / rx
  const _y1 : number = ((a.y1 * Math.cos(a.phi))
    - (a.x1 * Math.sin(a.phi))) / ry
  const _x2 : number = ((a.x2 * Math.cos(a.phi))
    + (a.y2 * Math.sin(a.phi))) / rx
  const _y2 : number = ((a.y2 * Math.cos(a.phi))
    - (a.x2 * Math.sin(a.phi))) / ry

  const dx : number = _x1 - _x2
  const dy : number = _y1 - _y2
  const xm : number = (_x1 + _x2) / 2
  const ym : number = (_y1 + _y2) / 2
  const d : number = Math.sqrt((1 / ((dx ** 2) + (dy ** 2))) - (1 / 4))

  const _cx1 : number = xm + (d * dy)
  const _cy1 : number = ym - (d * dx)
  const _cx2 : number = xm - (d * dy)
  const _cy2 : number = ym + (d * dx)

  const _cx : number = a.large === a.sweep ? _cx2 : _cx1
  const _cy : number = a.large === a.sweep ? _cy2 : _cy1

  const cx : number = (rx * _cx * Math.cos(a.phi))
    - (ry * _cy * Math.sin(a.phi))
  const cy : number = (rx * _cx * Math.sin(a.phi))
    + (ry * _cy * Math.cos(a.phi))

  const start : number = Math.atan2(_y1 - _cy, _x1 - _cx)
  let end : number = Math.atan2(_y2 - _cy, _x2 - _cx)

  if (a.sweep === 0 && end > start) {
    end -= 2 * Math.PI
  }

  if (a.sweep === 1 && end < start) {
    end += 2 * Math.PI
  }

  return ellipse(cx, cy, a.rx, a.ry, a.phi, start, end)
}

export function ellipseToArc(
  e : EllipseT,
) : ArcT {
  const x1 : number = e.cx
    + (e.rx * Math.cos(e.start) * Math.cos(e.phi))
    - (e.ry * Math.sin(e.start) * Math.sin(e.phi))
  const y1 : number = e.cy
    + (e.ry * Math.sin(e.start) * Math.cos(e.phi))
    + (e.rx * Math.cos(e.start) * Math.sin(e.phi))
  const x2 : number = e.cx
    + (e.rx * Math.cos(e.end) * Math.cos(e.phi))
    - (e.ry * Math.sin(e.end) * Math.sin(e.phi))
  const y2 : number = e.cy
    + (e.ry * Math.sin(e.end) * Math.cos(e.phi))
    + (e.rx * Math.cos(e.end) * Math.sin(e.phi))

  const large : number = Math.abs(e.end - e.start) > Math.PI ? 1 : 0
  const sweep : number = e.end - e.start > 0 ? 1 : 0

  return arc(x1, y1, e.rx, e.ry, e.phi, large, sweep, x2, y2)
}

export function transformArcParameters(
  a : ArcT,
  T : MatrixT,
) : VectorT {
  const e : EllipseT = arcToEllipse(a)
  const E : MatrixT = mat(
    e.rx * Math.cos(e.phi), e.rx * Math.sin(e.phi), 0, 0,
    -e.ry * Math.sin(e.phi), e.ry * Math.cos(e.phi), 0, 0,
    0, 0, 1, 0,
    e.cx, e.cy, 0, 1,
  )

  const M : MatrixT = inverse(multiply(T, E))
  const A : number = (M[0] ** 2) + (M[4] ** 2)
  const B : number = 2 * ((M[0] * M[1]) + (M[4] * M[5]))
  const C : number = (M[1] ** 2) + (M[5] ** 2)
  const AC : number = A - C

  if (B === 0) {
    return [
      1 / Math.sqrt(A),
      1 / Math.sqrt(C),
      0,
      1,
    ]
  }

  if (AC === 0) {
    return [
      1 / Math.sqrt(A + (B / 2)),
      1 / Math.sqrt(A - (B / 2)),
      Math.PI / 4,
      1,
    ]
  }

  const K : number = Math.sqrt(1 + ((B / AC) ** 2))
  const _A : number = (A + C + (K * AC)) / 2
  const _C : number = (A + C - (K * AC)) / 2

  return [
    1 / Math.sqrt(_A),
    1 / Math.sqrt(_C),
    Math.atan(B / AC) / 2,
    1,
  ]
}

export function foci(
  e : EllipseT,
) : [CoordsT, CoordsT] {
  const major : number = Math.max(e.rx, e.ry)
  const minor : number = Math.min(e.rx, e.ry)
  const f : number = Math.sqrt(Math.abs((major ** 2) - (minor ** 2)))
  const theta : number = major === e.rx ? e.phi : e.phi + (Math.PI / 2)

  const f1 : CoordsT = {
    x: e.cx - (f * Math.cos(theta)),
    y: e.cy - (f * Math.sin(theta)),
  }

  const f2 : CoordsT = {
    x: e.cx + (f * Math.cos(theta)),
    y: e.cy + (f * Math.sin(theta)),
  }

  return [f1, f2]
}

export function correctRadii(
  a : ArcT,
) : [number, number] {
  if (a.rx === 0 || a.ry === 0) {
    return [a.rx, a.ry]
  }

  const xm : number = (a.x1 - a.x2) / 2
  const ym : number = (a.y1 - a.y2) / 2
  const x : number = (Math.cos(a.phi) * xm) + (Math.sin(a.phi) * ym)
  const y : number = (Math.cos(a.phi) * ym) - (Math.sin(a.phi) * xm)
  const root : number = Math.sqrt(
    ((x ** 2) / (Math.abs(a.rx) ** 2))
    + ((y ** 2) / (Math.abs(a.ry) ** 2))
  )

  return [
    Math.max(1, root) * Math.abs(a.rx),
    Math.max(1, root) * Math.abs(a.ry),
  ]
}
