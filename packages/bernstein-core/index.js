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

import toCubics from "bernstein-path-to-cubics"
import boundingBox from "bernstein-path-boundingbox"

import parsePathstring from "bernstein-parse-pathstring"
import buildPathstring from "bernstein-build-pathstring"
import isValid from "bernstein-pathstring-is-valid"

export default class Bernstein {
  constructor(input) {
    this.path = this.getPointList(input)
    this.origin = { x: 0, y: 0 }
  }

  static isValid(pathstring) {
    return isValid(pathstring)
  }

  getPointList(input) {
    if (input instanceof SVGPathElement) {
      return parsePathstring(input.getAttribute("d"))
    }

    if (input instanceof Bernstein) {
      return input.getPath()
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
    return isEqual(this.path, path)
  }

  clean() {
    this.path = clean(this.path)

    return this
  }

  combine() {
    this.path = combine(this.path)

    return this
  }

  reverse() {
    this.path = reverse(this.path)

    return this
  }

  simplify(tolerance) {
    this.path = simplify(this.path, tolerance)

    return this
  }

  join(paths, shouldClose = false) {
    paths = this.getPointListArray(paths)

    this.path = join([
      this.path,
      ...paths
    ], shouldClose)

    return this
  }

  convertToCubics() {
    this.path = toCubics(this.path)

    return this
  }

  boundingBox() {
    return boundingBox(this.path)
  }

  /**
   * Transforms
   */
  relToAbs(n) {
    const bbox = this.boundingBox()

    return {
      x: bbox.xMin + ((bbox.width * n) / 100),
      y: bbox.yMin + ((bbox.height * n) / 100),
    }
  }

  parseRel(str) {
    return parseFloat(str.replace("%", ""))
  }

  setOrigin(x, y) {
    if (typeof x === "string") {
      switch (x) {
        case "left":
          x = this.relToAbs(0).x
        break

        case "center":
          x = this.relToAbs(50).x
        break

        case "right":
          x = this.relToAbs(100).x
        break

        default:
          x = this.relToAbs(this.parseRel(x)).x
        break
      }
    }

    if (typeof y === "string") {
      switch (y) {
        case "top":
          y = this.relToAbs(0).y
        break

        case "center":
          y = this.relToAbs(50).y
        break

        case "bottom":
          y = this.relToAbs(100).y
        break

        default:
          y = this.relToAbs(this.parseRel(y)).y
        break
      }

    }

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
    this.path = translate(this.path, dx, dy)

    return this
  }

  translateX(dx) {
    this.path = translate(this.path, dx, 0)

    return this
  }

  translateY(dy) {
    this.path = translate(this.path, 0, dy)

    return this
  }

  scale(dx, dy) {
    if (typeof dy === "undefined") {
      dy = dx
    }

    this.computeOrigin()
    this.path = scale(this.path, dx, dy)
    this.resetOrigin()

    return this
  }

  scaleX(dx) {
    this.path = scale(this.path, dx, 1)

    return this
  }

  scaleY(dy) {
    this.path = scale(this.path, 1, dy)

    return this
  }

  skew(dx, dy) {
    this.computeOrigin()
    this.path = skew(this.path, dx, dy)
    this.resetOrigin()

    return this
  }

  skewX(dx) {
    this.path = skew(this.path, dx, 0)

    return this
  }

  skewY(dy) {
    this.path = skew(this.path, 0, dy)

    return this
  }

  rotate(theta) {
    this.computeOrigin()
    this.path = rotate(this.path, theta)
    this.resetOrigin()

    return this
  }

  /**
   * Getters
   */
  getPath() {
    return this.path
  }

  getPathstring() {
    return buildPathstring(this.getPath())
  }
}
