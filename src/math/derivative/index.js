// @flow

import type {
  CoordsT,
  EndpointParameterizationT,
  CenterParameterizationT,
} from '../../types'

import { normalize } from '../../utils/normalize'
import { endpointToCenter } from '../arc'
import * as parametric from '../parametric'

export function linearExtremums(
  x1 : number,
  y1 : number,
  x2 : number = x1,
  y2 : number = y1,
) : Array<CoordsT> {
  return extremums(parametric.linear(x1, y1, x2, y2))(
    0,
    1,
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

  return extremums(parametric.quadratic(x1, y1, x2, y2, x3, y3))(
    0,
    1,
    tx,
    ty,
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

  return extremums(parametric.cubic(x1, y1, x2, y2, x3, y3, x4, y4))(
    0,
    1,
    ...tx,
    ...ty,
  )
}

export function arcExtremums(
  e : EndpointParameterizationT,
) : Array<CoordsT> {
  const c : CenterParameterizationT = endpointToCenter(e)
  const angleX : Function = dArcComponentX(e.rx, e.ry, e.phi)
  const angleY : Function = dArcComponentY(e.rx, e.ry, e.phi)

  return extremums(parametric.arc(e))(
    0,
    1,
    normalize(angleX(0), c.start, c.end),
    normalize(angleX(1), c.start, c.end),
    normalize(angleX(-1), c.start, c.end),
    normalize(angleY(0), c.start, c.end),
    normalize(angleY(1), c.start, c.end),
    normalize(angleY(-1), c.start, c.end),
  )
}

function extremums(
  f : Function,
) : Function {
  return (
    ...inputs : Array<number>
  ) : Array<CoordsT> => inputs.filter((t) => t >= 0 && t <= 1).map((t) => f(t))
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
