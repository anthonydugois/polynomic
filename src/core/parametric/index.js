// @flow

import type {
  CoordsT,
  VectorT,
  ArcT,
  EllipseT,
} from '../../types'

import { arcToEllipse, correctRadii } from '../arc'

export function linear(
  x1 : number,
  y1 : number,
  x2 : number = x1,
  y2 : number = y1,
) : Function {
  const ax : number = x2 - x1
  const bx : number = x1

  const ay : number = y2 - y1
  const by : number = y1

  return function linear(
    t : number,
  ) : CoordsT {
    return {
      x: (ax * t) + bx,
      y: (ay * t) + by,
    }
  }
}

export function quadratic(
  x1 : number,
  y1 : number,
  x2 : number = x1,
  y2 : number = y1,
  x3 : number = x1,
  y3 : number = y1,
) : Function {
  const ax : number = x1 - (2 * x2) + x3
  const bx : number = (-2 * x1) + (2 * x2)
  const cx : number = x1

  const ay : number = y1 - (2 * y2) + y3
  const by : number = (-2 * y1) + (2 * y2)
  const cy : number = y1

  return function quadratic(
    t : number,
  ) : CoordsT {
    return {
      x: (ax * (t ** 2)) + (bx * t) + cx,
      y: (ay * (t ** 2)) + (by * t) + cy,
    }
  }
}

export function cubic(
  x1 : number,
  y1 : number,
  x2 : number = x1,
  y2 : number = y1,
  x3 : number = x1,
  y3 : number = y1,
  x4 : number = x1,
  y4 : number = y1,
) : Function {
  const ax : number = -x1 + (3 * x2) - (3 * x3) + x4
  const bx : number = (3 * x1) - (6 * x2) + (3 * x3)
  const cx : number = (-3 * x1) + (3 * x2)
  const dx : number = x1

  const ay : number = -y1 + (3 * y2) - (3 * y3) + y4
  const by : number = (3 * y1) - (6 * y2) + (3 * y3)
  const cy : number = (-3 * y1) + (3 * y2)
  const dy : number = y1

  return function cubic(
    t : number,
  ) : CoordsT {
    return {
      x: (ax * (t ** 3)) + (bx * (t ** 2)) + (cx * t) + dx,
      y: (ay * (t ** 3)) + (by * (t ** 2)) + (cy * t) + dy,
    }
  }
}

export function elliptic(
  a : ArcT,
) : Function {
  if (a.rx === 0 || a.ry === 0) {
    return linear(a.x1, a.y1, a.x2, a.y2)
  }

  const [rx, ry] : VectorT = correctRadii(a)
  const { cx, cy, start, end } : EllipseT = arcToEllipse(a)
  const delta : number = end - start

  const rxc : number = rx * Math.cos(a.phi)
  const rxs : number = rx * Math.sin(a.phi)
  const ryc : number = ry * Math.cos(a.phi)
  const rys : number = ry * Math.sin(a.phi)

  return function elliptic(
    t : number,
  ) : CoordsT {
    const theta : number = start + (t * delta)

    return {
      x: cx + (rxc * Math.cos(theta)) - (rys * Math.sin(theta)),
      y: cy + (rxs * Math.cos(theta)) + (ryc * Math.sin(theta)),
    }
  }
}
