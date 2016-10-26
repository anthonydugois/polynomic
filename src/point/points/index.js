/* @flow */

import type {
  PointCodeT,
  PointT,
  PointParamsT,
} from "../../types/Point"

import * as types from "../points/types"
import { isQ, isT, isC, isS } from "../is"

export function Point(
  code: PointCodeT,
  x: number,
  y: number,
  parameters: PointParamsT = {}
): PointT {
  return {
    code,
    x,
    y,
    parameters,
  }
}

export const defaultPoint: PointT = Point("", 0, 0)

export function m(
  dx: number,
  dy: number,
  prev: PointT = defaultPoint
): PointT {
  return Point(types.m, prev.x + dx, prev.y + dy)
}

export function M(
  x: number,
  y: number
): PointT {
  return Point(types.M, x, y)
}

export function l(
  dx: number,
  dy: number,
  prev: PointT = defaultPoint
): PointT {
  return Point(types.l, prev.x + dx, prev.y + dy)
}

export function L(
  x: number,
  y: number
): PointT {
  return Point(types.L, x, y)
}

export function h(
  dx: number,
  prev: PointT = defaultPoint
): PointT {
  return Point(types.h, prev.x + dx, prev.y)
}

export function H(
  x: number,
  prev: PointT = defaultPoint
): PointT {
  return Point(types.H, x, prev.y)
}

export function v(
  dy: number,
  prev: PointT = defaultPoint
): PointT {
  return Point(types.v, prev.x, prev.y + dy)
}

export function V(
  y: number,
  prev: PointT = defaultPoint
): PointT {
  return Point(types.V, prev.x, y)
}

export function q(
  dx1: number,
  dy1: number,
  dx: number,
  dy: number,
  prev: PointT = defaultPoint
): PointT {
  return Point(types.q, prev.x + dx, prev.y + dy, {
    x1: prev.x + dx1,
    y1: prev.y + dy1,
  })
}

export function Q(
  x1: number,
  y1: number,
  x: number,
  y: number
): PointT {
  return Point(types.Q, x, y, {
    x1,
    y1,
  })
}

export function t(
  dx: number,
  dy: number,
  prev: PointT = defaultPoint
): PointT {
  let parameters: PointParamsT = {
    x1: prev.x,
    y1: prev.y,
  }

  if (
    (isQ(prev) || isT(prev))
    && typeof prev.parameters.x1 !== "undefined"
    && typeof prev.parameters.y1 !== "undefined"
  ) {
    parameters.x1 = (2 * prev.x) - prev.parameters.x1
    parameters.y1 = (2 * prev.y) - prev.parameters.y1
  }

  return Point(types.t, prev.x + dx, prev.y + dy, parameters)
}

export function T(
  x: number,
  y: number,
  prev: PointT = defaultPoint
): PointT {
  let parameters = {
    x1: prev.x,
    y1: prev.y,
  }

  if (
    (isQ(prev) || isT(prev))
    && typeof prev.parameters.x1 !== "undefined"
    && typeof prev.parameters.y1 !== "undefined"
  ) {
    parameters.x1 = (2 * prev.x) - prev.parameters.x1
    parameters.y1 = (2 * prev.y) - prev.parameters.y1
  }

  return Point(types.T, x, y, parameters)
}

export function c(
  dx1: number,
  dy1: number,
  dx2: number,
  dy2: number,
  dx: number,
  dy: number,
  prev: PointT = defaultPoint
): PointT {
  return Point(types.c, prev.x + dx, prev.y + dy, {
    x1: prev.x + dx1,
    y1: prev.y + dy1,
    x2: prev.x + dx2,
    y2: prev.y + dy2,
  })
}

export function C(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number
): PointT {
  return Point(types.C, x, y, {
    x1,
    y1,
    x2,
    y2,
  })
}

export function s(
  dx2: number,
  dy2: number,
  dx: number,
  dy: number,
  prev: PointT = defaultPoint
): PointT {
  let parameters = {
    x1: prev.x,
    y1: prev.y,
    x2: prev.x + dx2,
    y2: prev.y + dy2,
  }

  if (
    (isC(prev) || isS(prev))
    && typeof prev.parameters.x2 !== "undefined"
    && typeof prev.parameters.y2 !== "undefined"
  ) {
    parameters.x1 = (2 * prev.x) - prev.parameters.x2
    parameters.y1 = (2 * prev.y) - prev.parameters.y2
  }

  return Point(types.s, prev.x + dx, prev.y + dy, parameters)
}

export function S(
  x2: number,
  y2: number,
  x: number,
  y: number,
  prev: PointT = defaultPoint
): PointT {
  let parameters = {
    x1: prev.x,
    y1: prev.y,
    x2,
    y2,
  }

  if (
    (isC(prev) || isS(prev))
    && typeof prev.parameters.x2 !== "undefined"
    && typeof prev.parameters.y2 !== "undefined"
  ) {
    parameters.x1 = (2 * prev.x) - prev.parameters.x2
    parameters.y1 = (2 * prev.y) - prev.parameters.y2
  }

  return Point(types.S, x, y, parameters)
}

export function a(
  rx: number,
  ry: number,
  rotation: number,
  large: 0 | 1,
  sweep: 0 | 1,
  dx: number,
  dy: number,
  prev: PointT = defaultPoint
): PointT {
  return Point(types.a, prev.x + dx, prev.y + dy, {
    rx,
    ry,
    rotation,
    large,
    sweep,
  })
}

export function A(
  rx: number,
  ry: number,
  rotation: number,
  large: 0 | 1,
  sweep: 0 | 1,
  x: number,
  y: number
): PointT {
  return Point(types.A, x, y, {
    rx,
    ry,
    rotation,
    large,
    sweep,
  })
}

export function z(
  related: PointT = defaultPoint
): PointT {
  return Point(types.z, related.x, related.y)
}

export function Z(
  related: PointT = defaultPoint
): PointT {
  return Point(types.Z, related.x, related.y)
}
