import { defaultPoint } from "lib/point"

/**
 * This object references all the functions which build pathstring segments.
 * Every functions take the same signature (point, prev) and return a string.
 * e.g. builder.l(
 *   { code: "l", x: 150, y: 150, parameters: {} }, <-- the point you want
 *   { code: "m", x: 100, y: 100, parameters: {} }, <-- the previous point used to compute relative coords
 * )
 * --> "l50 50"
 */
const builder = {
  m({ x, y }, prev) {
    return `${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  M({ x, y }) {
    return `${ r(x) } ${ r(y) }`
  },

  l({ x, y }, prev) {
    return `${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  L({ x, y }) {
    return `${ r(x) } ${ r(y) }`
  },

  h({ x }, prev) {
    return `${ r(x - prev.x) }`
  },

  H({ x }) {
    return `${ r(x) }`
  },

  v({ y }, prev) {
    return `${ r(y - prev.y) }`
  },

  V({ y }) {
    return `${ r(y) }`
  },

  q({ x, y, parameters }, prev) {
    return `${ r(parameters.x1 - prev.x) } ${ r(parameters.y1 - prev.y) } ${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  Q({ x, y, parameters }) {
    return `${ r(parameters.x1) } ${ r(parameters.y1) } ${ r(x) } ${ r(y) }`
  },

  t({ x, y, parameters }, prev) {
    return `${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  T({ x, y, parameters }) {
    return `${ r(x) } ${ r(y) }`
  },

  c({ x, y, parameters }, prev) {
    return `${ r(parameters.x1 - prev.x) } ${ r(parameters.y1 - prev.y) } ${ r(parameters.x2 - prev.x) } ${ r(parameters.y2 - prev.y) } ${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  C({ x, y, parameters }) {
    return `${ r(parameters.x1) } ${ r(parameters.y1) } ${ r(parameters.x2) } ${ r(parameters.y2) } ${ r(x) } ${ r(y) }`
  },

  s({ x, y, parameters }, prev) {
    return `${ r(parameters.x2 - prev.x) } ${ r(parameters.y2 - prev.y) } ${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  S({ x, y, parameters }) {
    return `${ r(parameters.x2) } ${ r(parameters.y2) } ${ r(x) } ${ r(y) }`
  },

  a({ x, y, parameters }, prev) {
    return `${ r(parameters.rx) } ${ r(parameters.ry) } ${ r(parameters.rotation) } ${ parameters.large } ${ parameters.sweep } ${ r(x - prev.x) } ${ r(y - prev.y) }`
  },

  A({ x, y, parameters }) {
    return `${ r(parameters.rx) } ${ r(parameters.ry) } ${ r(parameters.rotation) } ${ parameters.large } ${ parameters.sweep } ${ r(x) } ${ r(y) }`
  },

  z() {
    return ""
  },

  Z() {
    return ""
  },
}

function r(n, precision = 3) {
  const coef = 10 ** precision
  return Math.round(n * coef) / coef
}

/**
 * Transforms a formatted point list into pathstring
 * e.g. [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "l", x: 50, y: 50, parameters: {} },
 *   { code: "q", x: 150, y: 150, parameters: { x1: 100, y1: 100 } },
 * ]
 * --> "M0 0 l50 50 q50 50 100 100"
 */
export default function buildPathstring(points) {
  return points.reduce(
    (acc, point, index) => `${ acc }${ point.code }${ builder[point.code](point, index > 0 ? points[index - 1] : defaultPoint) }`,
    "",
  ).replace(/\s+/g, " ")
}
