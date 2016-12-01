// @flow

import type {
  CoordsT,
  AnglesT,
  ArcParamsT,
} from '../../types'

import {
  arcParameters,
  center,
  angles,
} from '../arc'

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
  x1 : number,
  y1 : number,
  _rx : number = 0,
  _ry : number = 0,
  _phi : number = 0,
  _large : number = 0,
  _sweep : number = 0,
  x2 : number = x1,
  y2 : number = y1,
) : Function {
  if (_rx === 0 || _ry === 0) {
    return linear(x1, y1, x2, y2)
  }

  const { rx, ry, phi } : ArcParamsT = arcParameters(
    x1, y1,
    _rx, _ry, _phi, _large, _sweep,
    x2, y2,
  )

  const { start, delta } : AnglesT = angles(
    x1, y1,
    _rx, _ry, _phi, _large, _sweep,
    x2, y2,
  )

  const { x, y } : CoordsT = center(
    x1, y1,
    _rx, _ry, _phi, _large, _sweep,
    x2, y2,
  )

  const cx = parseFloat(x)
  const cy = parseFloat(y)

  return function arc(
    t : number,
  ) : CoordsT {
    const theta : number = start + (t * delta)

    return {
      x: cx
        + (rx * Math.cos(theta) * Math.cos(phi))
        - (ry * Math.sin(theta) * Math.sin(phi)),
      y: cy
        + (rx * Math.cos(theta) * Math.sin(phi))
        + (ry * Math.sin(theta) * Math.cos(phi)),
    }
  }
}
