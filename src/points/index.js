// @flow

import type {
  PointT,
  PointParamsT,
  PointCodeT,
  ArcT,
} from '../types'

import { point } from '../core/point'
import * as codes from '../core/codes'
import { degToRad, radToDeg } from '../core/angle'
import { isQ, isT, isC, isS } from '../is'
import { arc } from '../arc'

export function m(
  dx : number,
  dy : number,
) : Function {
  return function m(
    previous : PointT = point(),
  ) : PointT {
    return point(codes.m, previous.x + dx, previous.y + dy)
  }
}

export function M(
  x : number,
  y : number,
): Function {
  return function M() : PointT {
    return point(codes.M, x, y)
  }
}

export function l(
  dx : number,
  dy : number,
) : Function {
  return function l(
    previous : PointT = point(),
  ) : PointT {
    return point(codes.l, previous.x + dx, previous.y + dy)
  }
}

export function L(
  x : number,
  y : number,
) : Function {
  return function L() : PointT {
    return point(codes.L, x, y)
  }
}

export function h(
  dx : number,
) : Function {
  return function h(
    previous : PointT = point(),
  ) : PointT {
    return point(codes.h, previous.x + dx, previous.y)
  }
}

export function H(
  x : number,
) : Function {
  return function H(
    previous : PointT = point(),
  ) : PointT {
    return point(codes.H, x, previous.y)
  }
}

export function v(
  dy : number,
) : Function {
  return function v(
    previous : PointT = point(),
  ) : PointT {
    return point(codes.v, previous.x, previous.y + dy)
  }
}

export function V(
  y : number,
) : Function {
  return function V(
    previous : PointT = point(),
  ) : PointT {
    return point(codes.V, previous.x, y)
  }
}

export function q(
  dx1 : number,
  dy1 : number,
  dx : number,
  dy : number,
) : Function {
  return function q(
    previous : PointT = point(),
  ) : PointT {
    return point(codes.q, previous.x + dx, previous.y + dy, {
      x1: previous.x + dx1,
      y1: previous.y + dy1,
    })
  }
}

export function Q(
  x1 : number,
  y1 : number,
  x : number,
  y : number,
) : Function {
  return function Q() : PointT {
    return point(codes.Q, x, y, {
      x1,
      y1,
    })
  }
}

export function t(
  dx : number,
  dy : number,
) : Function {
  return function t(
    previous : PointT = point(),
  ) : PointT {
    const parameters : PointParamsT = { x1: previous.x, y1: previous.y }

    if (isQ(previous) || isT(previous)) {
      parameters.x1 = typeof previous.parameters.x1 !== 'undefined' ?
        (2 * previous.x) - previous.parameters.x1 :
        parameters.x1

      parameters.y1 = typeof previous.parameters.y1 !== 'undefined' ?
        (2 * previous.y) - previous.parameters.y1 :
        parameters.y1
    }

    return point(codes.t, previous.x + dx, previous.y + dy, parameters)
  }
}

export function T(
  x : number,
  y : number,
) : Function {
  return function T(
    previous : PointT = point(),
  ) : PointT {
    const parameters : PointParamsT = { x1: previous.x, y1: previous.y }

    if (isQ(previous) || isT(previous)) {
      parameters.x1 = typeof previous.parameters.x1 !== 'undefined' ?
        (2 * previous.x) - previous.parameters.x1 :
        parameters.x1

      parameters.y1 = typeof previous.parameters.y1 !== 'undefined' ?
        (2 * previous.y) - previous.parameters.y1 :
        parameters.y1
    }

    return point(codes.T, x, y, parameters)
  }
}

export function c(
  dx1 : number,
  dy1 : number,
  dx2 : number,
  dy2 : number,
  dx : number,
  dy : number,
) : Function {
  return function c(
    previous : PointT = point(),
  ) : PointT {
    return point(codes.c, previous.x + dx, previous.y + dy, {
      x1: previous.x + dx1,
      y1: previous.y + dy1,
      x2: previous.x + dx2,
      y2: previous.y + dy2,
    })
  }
}

export function C(
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
  x : number,
  y : number,
) : Function {
  return function C() : PointT {
    return point(codes.C, x, y, {
      x1,
      y1,
      x2,
      y2,
    })
  }
}

export function s(
  dx2 : number,
  dy2 : number,
  dx : number,
  dy : number,
) : Function {
  return function s(
    previous : PointT = point(),
  ) : PointT {
    const parameters : PointParamsT = {
      x1: previous.x,
      y1: previous.y,
      x2: previous.x + dx2,
      y2: previous.y + dy2,
    }

    if (isC(previous) || isS(previous)) {
      parameters.x1 = typeof previous.parameters.x2 !== 'undefined' ?
        (2 * previous.x) - previous.parameters.x2 :
        parameters.x1

      parameters.y1 = typeof previous.parameters.y2 !== 'undefined' ?
        (2 * previous.y) - previous.parameters.y2 :
        parameters.y1
    }

    return point(codes.s, previous.x + dx, previous.y + dy, parameters)
  }
}

export function S(
  x2 : number,
  y2 : number,
  x : number,
  y : number,
) : Function {
  return function S(
    previous : PointT = point(),
  ) : PointT {
    const parameters : PointParamsT = {
      x1: previous.x,
      y1: previous.y,
      x2,
      y2,
    }

    if (isC(previous) || isS(previous)) {
      parameters.x1 = typeof previous.parameters.x2 !== 'undefined' ?
        (2 * previous.x) - previous.parameters.x2 :
        parameters.x1

      parameters.y1 = typeof previous.parameters.y2 !== 'undefined' ?
        (2 * previous.y) - previous.parameters.y2 :
        parameters.y1
    }

    return point(codes.S, x, y, parameters)
  }
}

export function a(
  rx : number,
  ry : number,
  rotation : number,
  large : number,
  sweep : number,
  dx : number,
  dy : number,
) : Function {
  return function a(
    previous : PointT = point(),
  ) : PointT {
    const e : ArcT = arc(
      previous.x, previous.y,
      rx, ry, degToRad(rotation), large, sweep,
      previous.x + dx, previous.y + dy,
    )

    return point(codes.a, e.x2, e.y2, {
      rx: e.rx,
      ry: e.ry,
      rotation: radToDeg(e.phi),
      large: e.large,
      sweep: e.sweep,
    })
  }
}

export function A(
  rx : number,
  ry : number,
  rotation : number,
  large : number,
  sweep : number,
  x : number,
  y : number,
) : Function {
  return function A(
    previous : PointT = point(),
  ) : PointT {
    const e : ArcT = arc(
      previous.x, previous.y,
      rx, ry, degToRad(rotation), large, sweep,
      x, y,
    )

    return point(codes.A, e.x2, e.y2, {
      rx: e.rx,
      ry: e.ry,
      rotation: radToDeg(e.phi),
      large: e.large,
      sweep: e.sweep,
    })
  }
}

export function z() : Function {
  return function z(
    related : PointT = point(),
  ) : PointT {
    return point(codes.z, related.x, related.y)
  }
}

export function Z() : Function {
  return function Z(
    related : PointT = point(),
  ) : PointT {
    return point(codes.Z, related.x, related.y)
  }
}
