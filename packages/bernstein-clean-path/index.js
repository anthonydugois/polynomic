import { m, M, z } from "bernstein-point"

/**
 * Cleans the given path
 * e.g. clean([
 *   { code: "L", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 0, y: 0, parameters: {} },
 * ])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 * ]
 */
export default function clean(path) {
  return simplifyClosures(
    makeSureFirstPointsAreM(
      removeConsecutiveSamePoints(path)
    )
  )
}

/**
 * Close the path with the "z" command if the
 * first point and the last point are the same
 * e.g. simplifyClosures([
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 0, y: 0, parameters: {} },
 * ])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 * ]
 */
export function simplifyClosures(path) {
  let first

  return path.map((point, index) => {
    if (point.isM()) {
      first = point
    }

    if (shouldSimplifyClosure(first, point)) {
      return z(first)
    }

    return point
  })
}

function shouldSimplifyClosure(first, point) {
  return (point.isL() || point.isH() || point.isV())
    && first.x === point.x
    && first.y === point.y
}

/**
 * Make sure that the path starts with the "m" command
 * e.g. makeSureFirstPointsAreM([
 *   { code: "L", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ]
 */
export function makeSureFirstPointsAreM(path) {
  return path.map((point, i) => {
    if (i === 0 && !point.isM()) {
      return point.isRelative() ?
        m(point.x, point.y) :
        M(point.x, point.y)
    }

    if (i > 0 && path[i - 1].isZ() && !point.isM()) {
      const prev = path[i - 1]

      return point.isRelative() ?
        m(point.x, point.y, prev) :
        M(point.x, point.y, prev)
    }

    return point
  })
}

/**
 * Simplifies the path by removing consecutive same points
 * e.g. removeConsecutiveSamePoints([
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ]
 */
export function removeConsecutiveSamePoints(path) {
  return path.reduce(
    (acc, point, i) => {
      const prev = i > 0 && acc[acc.length - 1]

      if (prev && prev.x === point.x && prev.y === point.y) {
        return acc
      }

      return [...acc, point]
    },
    []
  )
}
