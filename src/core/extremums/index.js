// @flow

import type {
  WeakCoordsT,
  ArcT,
  EllipseT,
} from '../../types'

import { curry, map, filter } from 'lodash/fp'
import { normalize } from '../utils/normalize'
import { arcToEllipse } from '../arc'

import {
  linear,
  quadratic,
  cubic,
  elliptic,
} from '../parametric'

export const linearExtremums : Function = curry((
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
) : Array<WeakCoordsT> => extremums(linear(x1, y1, x2, y2), [0, 1]))

export const quadraticExtremums : Function = curry((
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
  x3 : number,
  y3 : number,
) : Array<WeakCoordsT> => extremums(quadratic(x1, y1, x2, y2, x3, y3), [
  0,
  1,
  dQuadraticRoot(x1, x2, x3),
  dQuadraticRoot(y1, y2, y3),
]))

export const cubicExtremums : Function = curry((
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
  x3 : number,
  y3 : number,
  x4 : number,
  y4 : number,
) : Array<WeakCoordsT> => extremums(cubic(x1, y1, x2, y2, x3, y3, x4, y4), [
  0,
  1,
  ...dCubicRoots(x1, x2, x3, x4),
  ...dCubicRoots(y1, y2, y3, y4),
]))

export const ellipticExtremums : Function = (a : ArcT) : Array<WeakCoordsT> => {
  const { start, end } : EllipseT = arcToEllipse(a)
  const [ax, ay] : Array<number> = dEllipticRoots(a.rx, a.ry, a.phi)

  return extremums(elliptic(a), [
    0,
    1,
    normalize(ax, start, end),
    normalize(ax + Math.PI, start, end),
    normalize(ax - Math.PI, start, end),
    normalize(ay, start, end),
    normalize(ay + Math.PI, start, end),
    normalize(ay - Math.PI, start, end),
  ])
}

const extremums : Function = curry((
  f : Function,
  inputs : Array<number>,
) : Array<WeakCoordsT> => map(
  (t) => f(t),
  filter(
    (t) => t >= 0 && t <= 1,
    inputs,
  ),
))

const dQuadraticRoot : Function = curry((
  c1 : number,
  c2 : number,
  c3 : number,
) : number => {
  const a : number = (c1 - (2 * c2)) + c3
  const b : number = c2 - c1

  return -b / a
})

const dCubicRoots : Function = curry((
  c1 : number,
  c2 : number,
  c3 : number,
  c4 : number,
) : Array<number> => {
  const a : number = ((3 * c4) - (9 * c3)) + ((9 * c2) - (3 * c1))
  const b : number = ((6 * c3) - (12 * c2)) + (6 * c1)
  const c : number = (3 * c2) - (3 * c1)
  const delta : number = (b ** 2) - (4 * a * c)

  if (a === 0) {
    return [-c / b]
  }

  return [
    (-b + Math.sqrt(delta)) / (2 * a),
    (-b - Math.sqrt(delta)) / (2 * a),
  ]
})

const dEllipticRoots : Function = curry((
  rx : number,
  ry : number,
  phi : number,
) : Array<number> => [
  Math.atan((-ry * Math.tan(phi)) / rx),
  Math.atan(ry / (rx * Math.tan(phi))),
])
