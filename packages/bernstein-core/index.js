import clean from "bernstein-clean-path"
import combine from "bernstein-combine-path"
import reverse from "bernstein-reverse-path"
import simplify from "bernstein-simplify-path"
import join from "bernstein-join-paths"

import isEqual from "bernstein-path-is-equal"

import translate from "bernstein-translate-path"
import scale from "bernstein-scale-path"
import skew from "bernstein-skew-path"
import rotate from "bernstein-rotate-path"

import parsePathstring from "bernstein-parse-pathstring"
import buildPathstring from "bernstein-build-pathstring"

export default class Bernstein {
  constructor(input) {
    this.points = this.getPointList(input)
    this.origin = { x: 0, y: 0 }
  }

  getPointList(input) {
    if (input instanceof SVGPathElement) {
      return parsePathstring(input.getAttribute("d"))
    }

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

  isEqual(path) {
    return isEqual(this.points, path)
  }

  clean() {
    this.points = clean(this.points)

    return this
  }

  combine() {
    this.points = combine(this.points)

    return this
  }

  reverse() {
    this.points = reverse(this.points)

    return this
  }

  simplify(tolerance) {
    this.points = simplify(this.points, tolerance)

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
  setOrigin(x, y) {
    this.origin = { x, y }

    return this
  }

  computeOrigin() {
    this.translate(-this.origin.x, -this.origin.y)
  }

  resetOrigin() {
    this.translate(this.origin.x, this.origin.y)
  }

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
    if (typeof dy === "undefined") {
      dy = dx
    }

    this.computeOrigin()
    this.points = scale(this.points, dx, dy)
    this.resetOrigin()

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
    this.computeOrigin()
    this.points = skew(this.points, dx, dy)
    this.resetOrigin()

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
    this.computeOrigin()
    this.points = rotate(this.points, theta)
    this.resetOrigin()

    return this
  }

  /**
   * Getters
   */
  getPoints() {
    return this.points
  }

  getPath() {
    return buildPathstring(this.getPoints())
  }
}
