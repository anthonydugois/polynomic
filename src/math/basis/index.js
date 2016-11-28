// @flow

import type { CoordsT } from '../../types'

export function linear(
  x0 : number,
  y0 : number,
  x1 : number,
  y1 : number,
) : Function {
  return function linear(
    t : number,
  ) : CoordsT {
    return {
      x: (x0 * (1 - t))
        + (x1 * t),
      y: (y0 * (1 - t))
        + (y1 * t),
    }
  }
}

export function quadratic(
  x0 : number,
  y0 : number,
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
) : Function {
  return function quadratic(
    t : number,
  ) : CoordsT {
    return {
      x: (x0 * ((1 - t) ** 2))
        + (x1 * 2 * (1 - t) * t)
        + (x2 * (t ** 2)),
      y: (y0 * ((1 - t) ** 2))
        + (y1 * 2 * (1 - t) * t)
        + (y2 * (t ** 2)),
    }
  }
}

export function cubic(
  x0 : number,
  y0 : number,
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
  x3 : number,
  y3 : number,
) : Function {
  return function cubic(
    t : number,
  ) : CoordsT {
    return {
      x: (x0 * ((1 - t) ** 3))
        + (x1 * 3 * ((1 - t) ** 2) * t)
        + (x2 * 3 * (1 - t) * (t ** 2))
        + (x3 * (t ** 3)),
      y: (y0 * ((1 - t) ** 3))
        + (y1 * 3 * ((1 - t) ** 2) * t)
        + (y2 * 3 * (1 - t) * (t ** 2))
        + (y3 * (t ** 3)),
    }
  }
}

/*export function arc(
  x0 : number,
  y0 : number,
  rx : number,
  ry : number,
  rotation : number,
  large : 0 | 1,
  sweep : 0 | 1,
  x1 : number,
  y1 : number,
) : Function {
  const alpha : number = Math.atan2(cy - y0, x0 - cx)
  const beta : number = Math.atan2(cy - y1, x1 - cx)

  return function arc(
    t : number,
  ) : CoordsT {
    return {
      x: 0,
      y: 0,
    }
  }
}*/
