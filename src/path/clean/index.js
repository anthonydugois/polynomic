import { z } from "../../point/points"
import { isM, isL, isH, isV } from "../../point/is"
import ensureMoveTo from "../ensure-move-to"

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
  return simplifyClosures(ensureMoveTo(removeConsecutiveSamePoints(path)))
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
function simplifyClosures(path) {
  let first

  return path.map((point) => {
    if (isM(point)) {
      first = point
    }

    if (shouldSimplifyClosure(first, point)) {
      return z(first)
    }

    return point
  })
}

function shouldSimplifyClosure(first, point) {
  return (isL(point) || isH(point) || isV(point))
    && first.x === point.x
    && first.y === point.y
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
function removeConsecutiveSamePoints(path) {
  return path.reduce(
    (acc, point, index) => {
      const prev = index > 0 && acc[acc.length - 1]

      if (prev && prev.x === point.x && prev.y === point.y) {
        return acc
      }

      return [...acc, point]
    },
    [],
  )
}
