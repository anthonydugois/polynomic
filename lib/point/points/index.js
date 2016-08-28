import * as types from "lib/point/points/types"
import { isQ, isT, isC, isS } from "lib/point/is"

export default function Point(code, x, y, parameters = {}) {
  return {
    code,
    x,
    y,
    parameters,
  }
}

export const defaultPoint = Point(null, 0, 0)

export function m(dx, dy, prev = defaultPoint) {
  return Point(types.m, prev.x + dx, prev.y + dy)
}

export function M(x, y, prev = defaultPoint) {
  return Point(types.M, x, y)
}

export function l(dx, dy, prev = defaultPoint) {
  return Point(types.l, prev.x + dx, prev.y + dy)
}

export function L(x, y, prev = defaultPoint) {
  return Point(types.L, x, y)
}

export function h(dx, prev = defaultPoint) {
  return Point(types.h, prev.x + dx, prev.y)
}

export function H(x, prev = defaultPoint) {
  return Point(types.H, x, prev.y)
}

export function v(dy, prev = defaultPoint) {
  return Point(types.v, prev.x, prev.y + dy)
}

export function V(y, prev = defaultPoint) {
  return Point(types.V, prev.x, y)
}

export function q(dx1, dy1, dx, dy, prev = defaultPoint) {
  return Point(types.q, prev.x + dx, prev.y + dy, {
    x1: prev.x + dx1,
    y1: prev.y + dy1,
  })
}

export function Q(x1, y1, x, y, prev = defaultPoint) {
  return Point(types.Q, x, y, {
    x1,
    y1,
  })
}

export function t(dx, dy, prev = defaultPoint) {
  let parameters = {
    x1: prev.x,
    y1: prev.y,
  }

  if (isQ(prev) || isT(prev)) {
    parameters = {
      x1: (2 * prev.x) - prev.parameters.x1,
      y1: (2 * prev.y) - prev.parameters.y1,
    }
  }

  return Point(types.t, prev.x + dx, prev.y + dy, parameters)
}

export function T(x, y, prev = defaultPoint) {
  let parameters = {
    x1: prev.x,
    y1: prev.y,
  }

  if (isQ(prev) || isT(prev)) {
    parameters = {
      x1: (2 * prev.x) - prev.parameters.x1,
      y1: (2 * prev.y) - prev.parameters.y1,
    }
  }

  return Point(types.T, x, y, parameters)
}

export function c(dx1, dy1, dx2, dy2, dx, dy, prev = defaultPoint) {
  return Point(types.c, prev.x + dx, prev.y + dy, {
    x1: prev.x + dx1,
    y1: prev.y + dy1,
    x2: prev.x + dx2,
    y2: prev.y + dy2,
  })
}

export function C(x1, y1, x2, y2, x, y, prev = defaultPoint) {
  return Point(types.C, x, y, {
    x1,
    y1,
    x2,
    y2,
  })
}

export function s(dx2, dy2, dx, dy, prev = defaultPoint) {
  let parameters = {
    x1: prev.x,
    y1: prev.y,
    x2: prev.x + dx2,
    y2: prev.y + dy2,
  }

  if (isC(prev) || isS(prev)) {
    parameters = {
      ...parameters,
      x1: (2 * prev.x) - prev.parameters.x2,
      y1: (2 * prev.y) - prev.parameters.y2,
    }
  }

  return Point(types.s, prev.x + dx, prev.y + dy, parameters)
}

export function S(x2, y2, x, y, prev = defaultPoint) {
  let parameters = {
    x1: prev.x,
    y1: prev.y,
    x2,
    y2,
  }

  if (isC(prev) || isS(prev)) {
    parameters = {
      ...parameters,
      x1: (2 * prev.x) - prev.parameters.x2,
      y1: (2 * prev.y) - prev.parameters.y2,
    }
  }

  return Point(types.S, x, y, parameters)
}

export function a(rx, ry, rotation, large, sweep, dx, dy, prev = defaultPoint) {
  return Point(types.a, prev.x + dx, prev.y + dy, {
    rx,
    ry,
    rotation,
    large,
    sweep,
  })
}

export function A(rx, ry, rotation, large, sweep, x, y, prev = defaultPoint) {
  return Point(types.A, x, y, {
    rx,
    ry,
    rotation,
    large,
    sweep,
  })
}

export function z(firstPoint = defaultPoint) {
  return Point(types.z, firstPoint.x, firstPoint.y)
}

export function Z(firstPoint = defaultPoint) {
  return Point(types.Z, firstPoint.x, firstPoint.y)
}
