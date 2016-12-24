// @flow

import type {
  PointT,
  PointParamsT,
  PointCodeT,
  ArcT,
} from '../types'

import * as codes from './codes'
import { isQ, isT, isC, isS } from './is'
import { arc } from '../primitives/arc'
import { degToRad, radToDeg } from '../utils/angle'

export const defaultPoint: PointT = point('', 0, 0)

export function point(
  code: PointCodeT,
  x: number,
  y: number,
  parameters: PointParamsT = {},
): PointT {
  return {
    code,
    x,
    y,
    parameters,
  }
}

export function m(
  dx: number,
  dy: number,
): Function {
  return function m(
    prev: PointT = defaultPoint,
  ): PointT {
    return point(codes.m, prev.x + dx, prev.y + dy)
  }
}

export function M(
  x: number,
  y: number,
): Function {
  return function M(): PointT {
    return point(codes.M, x, y)
  }
}

export function l(
  dx: number,
  dy: number,
): Function {
  return function l(
    prev: PointT = defaultPoint,
  ): PointT {
    return point(codes.l, prev.x + dx, prev.y + dy)
  }
}

export function L(
  x: number,
  y: number,
): Function {
  return function L(): PointT {
    return point(codes.L, x, y)
  }
}

export function h(
  dx: number,
): Function {
  return function h(
    prev: PointT = defaultPoint,
  ): PointT {
    return point(codes.h, prev.x + dx, prev.y)
  }
}

export function H(
  x: number,
): Function {
  return function H(
    prev: PointT = defaultPoint,
  ): PointT {
    return point(codes.H, x, prev.y)
  }
}

export function v(
  dy: number,
): Function {
  return function v(
    prev: PointT = defaultPoint,
  ): PointT {
    return point(codes.v, prev.x, prev.y + dy)
  }
}

export function V(
  y: number,
): Function {
  return function V(
    prev: PointT = defaultPoint,
  ): PointT {
    return point(codes.V, prev.x, y)
  }
}

export function q(
  dx1: number,
  dy1: number,
  dx: number,
  dy: number,
): Function {
  return function q(
    prev: PointT = defaultPoint,
  ): PointT {
    return point(codes.q, prev.x + dx, prev.y + dy, {
      x1: prev.x + dx1,
      y1: prev.y + dy1,
    })
  }
}

export function Q(
  x1: number,
  y1: number,
  x: number,
  y: number,
): Function {
  return function Q(): PointT {
    return point(codes.Q, x, y, {
      x1,
      y1,
    })
  }
}

export function t(
  dx: number,
  dy: number,
): Function {
  return function t(
    prev: PointT = defaultPoint,
  ): PointT {
    const parameters: PointParamsT = { x1: prev.x, y1: prev.y }

    if (isQ(prev) || isT(prev)) {
      parameters.x1 = typeof prev.parameters.x1 !== 'undefined' ?
        (2 * prev.x) - prev.parameters.x1 :
        parameters.x1

      parameters.y1 = typeof prev.parameters.y1 !== 'undefined' ?
        (2 * prev.y) - prev.parameters.y1 :
        parameters.y1
    }

    return point(codes.t, prev.x + dx, prev.y + dy, parameters)
  }
}

export function T(
  x: number,
  y: number,
): Function {
  return function T(
    prev: PointT = defaultPoint,
  ): PointT {
    const parameters: PointParamsT = { x1: prev.x, y1: prev.y }

    if (isQ(prev) || isT(prev)) {
      parameters.x1 = typeof prev.parameters.x1 !== 'undefined' ?
        (2 * prev.x) - prev.parameters.x1 :
        parameters.x1

      parameters.y1 = typeof prev.parameters.y1 !== 'undefined' ?
        (2 * prev.y) - prev.parameters.y1 :
        parameters.y1
    }

    return point(codes.T, x, y, parameters)
  }
}

export function c(
  dx1: number,
  dy1: number,
  dx2: number,
  dy2: number,
  dx: number,
  dy: number,
): Function {
  return function c(
    prev: PointT = defaultPoint,
  ): PointT {
    return point(codes.c, prev.x + dx, prev.y + dy, {
      x1: prev.x + dx1,
      y1: prev.y + dy1,
      x2: prev.x + dx2,
      y2: prev.y + dy2,
    })
  }
}

export function C(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number,
): Function {
  return function C(): PointT {
    return point(codes.C, x, y, {
      x1,
      y1,
      x2,
      y2,
    })
  }
}

export function s(
  dx2: number,
  dy2: number,
  dx: number,
  dy: number,
): Function {
  return function s(
    prev: PointT = defaultPoint,
  ): PointT {
    const parameters: PointParamsT = {
      x1: prev.x,
      y1: prev.y,
      x2: prev.x + dx2,
      y2: prev.y + dy2,
    }

    if (isC(prev) || isS(prev)) {
      parameters.x1 = typeof prev.parameters.x2 !== 'undefined' ?
        (2 * prev.x) - prev.parameters.x2 :
        parameters.x1

      parameters.y1 = typeof prev.parameters.y2 !== 'undefined' ?
        (2 * prev.y) - prev.parameters.y2 :
        parameters.y1
    }

    return point(codes.s, prev.x + dx, prev.y + dy, parameters)
  }
}

export function S(
  x2: number,
  y2: number,
  x: number,
  y: number,
): Function {
  return function S(
    prev: PointT = defaultPoint,
  ): PointT {
    const parameters: PointParamsT = {
      x1: prev.x,
      y1: prev.y,
      x2,
      y2,
    }

    if (isC(prev) || isS(prev)) {
      parameters.x1 = typeof prev.parameters.x2 !== 'undefined' ?
        (2 * prev.x) - prev.parameters.x2 :
        parameters.x1

      parameters.y1 = typeof prev.parameters.y2 !== 'undefined' ?
        (2 * prev.y) - prev.parameters.y2 :
        parameters.y1
    }

    return point(codes.S, x, y, parameters)
  }
}

export function a(
  rx: number,
  ry: number,
  rotation: number,
  large: number,
  sweep: number,
  dx: number,
  dy: number,
): Function {
  return function a(
    prev: PointT = defaultPoint,
  ): PointT {
    const e : ArcT = arc(
      prev.x, prev.y,
      rx, ry, degToRad(rotation), large, sweep,
      prev.x + dx, prev.y + dy,
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
  rx: number,
  ry: number,
  rotation: number,
  large: number,
  sweep: number,
  x: number,
  y: number,
): Function {
  return function A(
    prev : PointT = defaultPoint,
  ): PointT {
    const e : ArcT = arc(
      prev.x, prev.y,
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

export function z(): Function {
  return function z(
    related: PointT = defaultPoint,
  ): PointT {
    return point(codes.z, related.x, related.y)
  }
}

export function Z(): Function {
  return function Z(
    related: PointT = defaultPoint,
  ): PointT {
    return point(codes.Z, related.x, related.y)
  }
}