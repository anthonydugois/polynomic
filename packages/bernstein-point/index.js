import * as pointTypes from "./pointTypes"
import * as assertTypes from "bernstein-point-is"

import isRelative from "bernstein-point-is-relative"
import isInside from "bernstein-point-is-inside"
import distance, { distanceSegment } from "bernstein-point-distance"

import lineToCubic from "bernstein-point-l-to-c"
import quadraticToCubic from "bernstein-point-q-to-c"
import arcToCubic from "bernstein-point-a-to-c"

export default class Point {
  constructor(code, x, y, parameters = {}) {
    this.code = code
    this.x = x
    this.y = y
    this.parameters = parameters
  }

  toCubic(prev) {
    if (this.isL() || this.isH() || this.isV()) {
      return lineToCubic(prev, this)
    }

    if (this.isQ() || this.isT()) {
      return quadraticToCubic(prev, this)
    }

    if (this.isA()) {
      return arcToCubic(prev, this)
    }

    return this
  }

  distance(point) {
    return distance(this, point)
  }

  distanceSegment(l1, l2) {
    return distanceSegment(this, l1, l2)
  }

  isInside(path) {
    return isInside(this, path)
  }

  isRelative() {
    return isRelative(this)
  }

  isM() {
    return assertTypes.isM(this)
  }

  isL() {
    return assertTypes.isL(this)
  }

  isH() {
    return assertTypes.isH(this)
  }

  isV() {
    return assertTypes.isV(this)
  }

  isQ() {
    return assertTypes.isQ(this)
  }

  isT() {
    return assertTypes.isT(this)
  }

  isC() {
    return assertTypes.isC(this)
  }

  isS() {
    return assertTypes.isS(this)
  }

  isA() {
    return assertTypes.isA(this)
  }

  isZ() {
    return assertTypes.isZ(this)
  }
}

export const defaultPoint = new Point(null, 0, 0)

export function m(dx, dy, prev = defaultPoint) {
  return new Point(pointTypes.m, prev.x + dx, prev.y + dy)
}

export function M(x, y, prev = defaultPoint) {
  return new Point(pointTypes.M, x, y)
}

export function l(dx, dy, prev = defaultPoint) {
  return new Point(pointTypes.l, prev.x + dx, prev.y + dy)
}

export function L(x, y, prev = defaultPoint) {
  return new Point(pointTypes.L, x, y)
}

export function h(dx, prev = defaultPoint) {
  return new Point(pointTypes.h, prev.x + dx, prev.y)
}

export function H(x, prev = defaultPoint) {
  return new Point(pointTypes.H, x, prev.y)
}

export function v(dy, prev = defaultPoint) {
  return new Point(pointTypes.v, prev.x, prev.y + dy)
}

export function V(y, prev = defaultPoint) {
  return new Point(pointTypes.V, prev.x, y)
}

export function q(dx1, dy1, dx, dy, prev = defaultPoint) {
  return new Point(pointTypes.q, prev.x + dx, prev.y + dy, {
    x1: prev.x + dx1,
    y1: prev.y + dy1,
  })
}

export function Q(x1, y1, x, y, prev = defaultPoint) {
  return new Point(pointTypes.Q, x, y, {
    x1,
    y1,
  })
}

export function t(dx, dy, prev = defaultPoint) {
  let parameters = {
    x1: prev.x,
    y1: prev.y,
  }

  if (prev.isQ() || prev.isT()) {
    parameters = {
      x1: (2 * prev.x) - prev.parameters.x1,
      y1: (2 * prev.y) - prev.parameters.y1,
    }
  }

  return new Point(pointTypes.t, prev.x + dx, prev.y + dy, parameters)
}

export function T(x, y, prev = defaultPoint) {
  let parameters = {
    x1: prev.x,
    y1: prev.y,
  }

  if (prev.isQ() || prev.isT()) {
    parameters = {
      x1: (2 * prev.x) - prev.parameters.x1,
      y1: (2 * prev.y) - prev.parameters.y1,
    }
  }

  return new Point(pointTypes.T, x, y, parameters)
}

export function c(dx1, dy1, dx2, dy2, dx, dy, prev = defaultPoint) {
  return new Point(pointTypes.c, prev.x + dx, prev.y + dy, {
    x1: prev.x + dx1,
    y1: prev.y + dy1,
    x2: prev.x + dx2,
    y2: prev.y + dy2,
  })
}

export function C(x1, y1, x2, y2, x, y, prev = defaultPoint) {
  return new Point(pointTypes.C, x, y, {
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

  if (prev.isC() || prev.isS()) {
    parameters = {
      ...parameters,
      x1: (2 * prev.x) - prev.parameters.x2,
      y1: (2 * prev.y) - prev.parameters.y2,
    }
  }

  return new Point(pointTypes.s, prev.x + dx, prev.y + dy, parameters)
}

export function S(x2, y2, x, y, prev = defaultPoint) {
  let parameters = {
    x1: prev.x,
    y1: prev.y,
    x2,
    y2,
  }

  if (prev.isC() || prev.isS()) {
    parameters = {
      ...parameters,
      x1: (2 * prev.x) - prev.parameters.x2,
      y1: (2 * prev.y) - prev.parameters.y2,
    }
  }

  return new Point(pointTypes.S, x, y, parameters)
}

export function a(rx, ry, rotation, large, sweep, dx, dy, prev = defaultPoint) {
  return new Point(pointTypes.a, prev.x + dx, prev.y + dy, {
    rx,
    ry,
    rotation,
    large,
    sweep,
  })
}

export function A(rx, ry, rotation, large, sweep, x, y, prev = defaultPoint) {
  return new Point(pointTypes.A, x, y, {
    rx,
    ry,
    rotation,
    large,
    sweep,
  })
}

export function z(firstPoint = defaultPoint) {
  return new Point(pointTypes.z, firstPoint.x, firstPoint.y)
}

export function Z(firstPoint = defaultPoint) {
  return new Point(pointTypes.Z, firstPoint.x, firstPoint.y)
}
