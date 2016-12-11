// @flow

import type {
  CoordsT,
  EndpointParameterizationT,
  CenterParameterizationT,
} from '../../types'

import { endpointToCenter, correctRadii } from '../arc'

export function linear(
  x1 : number,
  y1 : number,
  x2 : number = x1,
  y2 : number = y1,
) : Function {
  return function linear(
    t : number,
  ) : CoordsT {
    return {
      x: (x1 * (1 - t))
        + (x2 * t),
      y: (y1 * (1 - t))
        + (y2 * t),
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
  return function quadratic(
    t : number,
  ) : CoordsT {
    return {
      x: (x1 * ((1 - t) ** 2))
        + (x2 * 2 * (1 - t) * t)
        + (x3 * (t ** 2)),
      y: (y1 * ((1 - t) ** 2))
        + (y2 * 2 * (1 - t) * t)
        + (y3 * (t ** 2)),
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
  return function cubic(
    t : number,
  ) : CoordsT {
    return {
      x: (x1 * ((1 - t) ** 3))
        + (x2 * 3 * ((1 - t) ** 2) * t)
        + (x3 * 3 * (1 - t) * (t ** 2))
        + (x4 * (t ** 3)),
      y: (y1 * ((1 - t) ** 3))
        + (y2 * 3 * ((1 - t) ** 2) * t)
        + (y3 * 3 * (1 - t) * (t ** 2))
        + (y4 * (t ** 3)),
    }
  }
}

export function arc(
  e : EndpointParameterizationT,
) : Function {
  if (e.rx === 0 || e.ry === 0) {
    return linear(e.x1, e.y1, e.x2, e.y2)
  }

  const [rx, ry] : [number, number] = correctRadii(e)
  const c : CenterParameterizationT = endpointToCenter(e)

  return function arc(
    t : number,
  ) : CoordsT {
    const theta : number = c.start + (t * (c.end - c.start))

    return {
      x: c.cx
        + (rx * Math.cos(theta) * Math.cos(e.phi))
        - (ry * Math.sin(theta) * Math.sin(e.phi)),
      y: c.cy
        + (rx * Math.cos(theta) * Math.sin(e.phi))
        + (ry * Math.sin(theta) * Math.cos(e.phi)),
    }
  }
}
