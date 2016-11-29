// @flow

import type { CoordsT, AnglesT, ArcParamsT } from '../../types'

import { center, correctedArcParameters, angles } from '../trigonometry'

export function linear(
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
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
  x2 : number,
  y2 : number,
  x3 : number,
  y3 : number,
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
  x2 : number,
  y2 : number,
  x3 : number,
  y3 : number,
  x4 : number,
  y4 : number,
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
  x1 : number,
  y1 : number,
  _rx : number,
  _ry : number,
  _phi : number,
  _large : 0 | 1,
  _sweep : 0 | 1,
  x2 : number,
  y2 : number,
) : Function {
  const { rx, ry, phi } : ArcParamsT = correctedArcParameters(x1, y1, _rx, _ry, _phi, _large, _sweep, x2, y2)
  const { x, y } : CoordsT = center(x1, y1, _rx, _ry, _phi, _large, _sweep, x2, y2)
  const cx = parseFloat(x)
  const cy = parseFloat(y)
  const { start, delta } : AnglesT = angles(x1, y1, _rx, _ry, _phi, _large, _sweep, x2, y2)

  return function arc(
    t : number,
  ) : CoordsT {
    const theta : number = start + (t * delta)

    return {
      x: cx + (rx * Math.cos(theta) * Math.cos(phi)) - (ry * Math.sin(theta) * Math.sin(phi)),
      y: cy + (rx * Math.cos(theta) * Math.sin(phi)) + (ry * Math.sin(theta) * Math.cos(phi)),
    }
  }
}
