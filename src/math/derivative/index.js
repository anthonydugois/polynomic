// @flow

import type { CoordsT, ArcParamsT, AnglesT } from '../../types'

import { normalize } from '../../utils/normalize'
import { arcParameters, angles } from '../arc'
import * as parametric from '../parametric'

export function linearExtremums(
  x1 : number,
  y1 : number,
  x2 : number = x1,
  y2 : number = y1,
) : Array<CoordsT> {
  return extremums(
    parametric.linear(x1, y1, x2, y2),
    [0, 1],
  )
}

export function quadraticExtremums(
  x1 : number,
  y1 : number,
  x2 : number = x1,
  y2 : number = y1,
  x3 : number = x1,
  y3 : number = y1,
) : Array<CoordsT> {
  const tx : number = dQuadraticComponent(x1, x2, x3)
  const ty : number = dQuadraticComponent(y1, y2, y3)

  return extremums(
    parametric.quadratic(x1, y1, x2, y2, x3, y3),
    [0, 1, tx, ty],
  )
}

export function cubicExtremums(
  x1 : number,
  y1 : number,
  x2 : number = x1,
  y2 : number = y1,
  x3 : number = x1,
  y3 : number = y1,
  x4 : number = x1,
  y4 : number = y1,
) : Array<CoordsT> {
  const tx : Array<number> = dCubicComponent(x1, x2, x3, x4)
  const ty : Array<number> = dCubicComponent(y1, y2, y3, y4)

  return extremums(
    parametric.cubic(x1, y1, x2, y2, x3, y3, x4, y4),
    [0, 1, ...tx, ...ty],
  )
}

export function arcExtremums(
  x1 : number,
  y1 : number,
  _rx : number = 0,
  _ry : number = 0,
  _phi : number = 0,
  _large : number = 0,
  _sweep : number = 0,
  x2 : number = x1,
  y2 : number = y1,
) : Array<CoordsT> {
  const { rx, ry, phi, large, sweep } : ArcParamsT = arcParameters(
    x1, y1,
    _rx, _ry, _phi, _large, _sweep,
    x2, y2,
  )

  const { start, end } : AnglesT = angles(
    x1, y1,
    rx, ry, phi, large, sweep,
    x2, y2,
  )

  const min : number = Math.min(start, end)
  const max : number = Math.max(start, end)

  const angleX : Function = dArcComponentX(rx, ry, phi)
  const angleY : Function = dArcComponentY(rx, ry, phi)

  const tXMax : number = normalize(angleX(0), min, max)
  const tXMin : number = normalize(angleX(1), min, max)
  const tYMax : number = normalize(angleY(0), min, max)
  const tYMin : number = normalize(angleY(1), min, max)

  return extremums(
    parametric.arc(x1, y1, rx, ry, phi, large, sweep, x2, y2),
    [0, 1, tXMax, tXMin, tYMax, tYMin],
  )
}

function extremums(
  f : Function,
  inputs : Array<number>,
) : Array<CoordsT> {
  return inputs.filter((t) => t >= 0 && t <= 1).map((t) => f(t))
}

function dQuadraticComponent(
  c1 : number,
  c2 : number = c1,
  c3 : number = c1,
) : number {
  const a : number = (c1 - (2 * c2)) + c3
  const b : number = c2 - c1

  return -b / a
}

function dCubicComponent(
  c1 : number,
  c2 : number = c1,
  c3 : number = c1,
  c4 : number = c1,
) : Array<number> {
  const a: number = ((3 * c4) - (9 * c3)) + ((9 * c2) - (3 * c1))
  const b: number = ((6 * c3) - (12 * c2)) + (6 * c1)
  const c: number = (3 * c2) - (3 * c1)
  const delta: number = (b ** 2) - (4 * a * c)

  if (a === 0) {
    return [-c / b]
  }

  return [
    (-b + Math.sqrt(delta)) / (2 * a),
    (-b - Math.sqrt(delta)) / (2 * a),
  ]
}

function dArcComponentX(
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
) : Function {
  const t : number = Math.atan((-ry * Math.tan(phi)) / rx)

  return (n : number = 0) : number => t + (n * Math.PI)
}

function dArcComponentY(
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
) : Function {
  const t : number = Math.atan(ry / (rx * Math.tan(phi)))

  return (n : number = 0) : number => t + (n * Math.PI)
}
