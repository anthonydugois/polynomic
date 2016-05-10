import clean from "bernstein-clean-path"
import combine from "bernstein-combine-path"
import join from "bernstein-join-paths"

import translate from "bernstein-translate-path"
import scale from "bernstein-scale-path"
import skew from "bernstein-skew-path"
import rotate from "bernstein-rotate-path"

import parsePathstring from "bernstein-parse-pathstring"
import buildPathstring from "bernstein-build-pathstring"

export class Bernstein {
  constructor(input) {
    this.points = this.getPointList(input)
  }

  getPointList(input) {
    if (input instanceof Bernstein) {
      return input.getPoints()
    }

    if (typeof input === "string") {
      return parsePathstring(input)
    }

    return input
  }

  getPointListArray(arr) {
    if (!Array.isArray(arr)) {
      arr = [arr]
    }

    return arr.map(this.getPointList)
  }

  clean() {
    this.points = clean(this.points)

    return this
  }

  combine() {
    this.points = combine(this.points)

    return this
  }

  join(paths, shouldClose = false) {
    paths = this.getPointListArray(paths)

    this.points = join([
      this.points,
      ...paths
    ], shouldClose)

    return this
  }

  /**
   * Transforms
   */
  translate(dx, dy) {
    this.points = translate(this.points, dx, dy)

    return this
  }

  translateX(dx) {
    this.points = translate(this.points, dx, 0)

    return this
  }

  translateY(dy) {
    this.points = translate(this.points, 0, dy)

    return this
  }

  scale(dx, dy) {
    this.points = scale(this.points, dx, dy)

    return this
  }

  scaleX(dx) {
    this.points = scale(this.points, dx, 1)

    return this
  }

  scaleY(dy) {
    this.points = scale(this.points, 1, dy)

    return this
  }

  skew(dx, dy) {
    this.points = skew(this.points, dx, dy)

    return this
  }

  skewX(dx) {
    this.points = skew(this.points, dx, 0)

    return this
  }

  skewY(dy) {
    this.points = skew(this.points, 0, dy)

    return this
  }

  rotate(theta) {
    this.points = rotate(this.points, theta)

    return this
  }

  /**
   * Getters
   */
  getPoints() {
    return this.points
  }

  getPath() {
    return buildPathstring(this.points)
  }
}

export default function Point(code, x, y, parameters = {}) {
  return {
    code,
    x,
    y,
    parameters,
  }
}

const defaultPoint = Point(null, 0, 0)

export function m(dx, dy, prev = defaultPoint) {
  return Point("m", prev.x + dx, prev.y + dy)
}

export function M(x, y, prev = defaultPoint) {
  return Point("M", x, y)
}

export function l(dx, dy, prev = defaultPoint) {
  return Point("l", prev.x + dx, prev.y + dy)
}

export function L(x, y, prev = defaultPoint) {
  return Point("L", x, y)
}

export function h(dx, prev = defaultPoint) {
  return Point("h", prev.x + dx, prev.y)
}

export function H(x, prev = defaultPoint) {
  return Point("H", x, prev.y)
}

export function v(dy, prev = defaultPoint) {
  return Point("v", prev.x, prev.y + dy)
}

export function V(y, prev = defaultPoint) {
  return Point("V", prev.x, y)
}

export function q(dx1, dy1, dx, dy, prev = defaultPoint) {
  return Point("q", prev.x + dx, prev.y + dy, {
    x1: prev.x + dx1,
    y1: prev.y + dy1,
  })
}

export function Q(x1, y1, x, y, prev = defaultPoint) {
  return Point("Q", x, y, {
    x1,
    y1,
  })
}

export function t(dx, dy, prev = defaultPoint) {
  return Point("t", prev.x + dx, prev.y + dy)
}

export function T(x, y, prev = defaultPoint) {
  return Point("T", x, y)
}

export function c(dx1, dy1, dx2, dy2, dx, dy, prev = defaultPoint) {
  return Point("c", prev.x + dx, prev.y + dy, {
    x1: prev.x + dx1,
    y1: prev.y + dy1,
    x2: prev.x + dx2,
    y2: prev.y + dy2,
  })
}

export function C(x1, y1, x2, y2, x, y, prev = defaultPoint) {
  return Point("C", x, y, {
    x1,
    y1,
    x2,
    y2,
  })
}

export function s(dx2, dy2, dx, dy, prev = defaultPoint) {
  return Point("s", prev.x + dx, prev.y + dy, {
    x2: prev.x + dx2,
    y2: prev.y + dy2,
  })
}

export function S(x2, y2, x, y, prev = defaultPoint) {
  return Point("S", x, y, {
    x2,
    y2,
  })
}

export function a(rx, ry, rotation, large, sweep, dx, dy, prev = defaultPoint) {
  return Point("a", prev.x + dx, prev.y + dy, {
    rx,
    ry,
    rotation,
    large,
    sweep,
  })
}

export function A(rx, ry, rotation, large, sweep, x, y, prev = defaultPoint) {
  return Point("A", x, y, {
    rx,
    ry,
    rotation,
    large,
    sweep,
  })
}

export function z(firstPoint = defaultPoint) {
  return Point("z", firstPoint.x, firstPoint.y)
}

export function Z(firstPoint = defaultPoint) {
  return Point("Z", firstPoint.x, firstPoint.y)
}
