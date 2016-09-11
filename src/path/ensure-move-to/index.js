import { m, M } from "../../point/points"
import { isM, isZ } from "../../point/is"
import isRelative from "../../point/is-relative"

/**
 * Make sure that the path starts with the "m" command
 * e.g. ensureMoveTo([
 *   { code: "L", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ]
 */
export default function ensureMoveTo(path) {
  return path.map((point, index) => {
    if (index === 0 && !isM(point)) {
      return isRelative(point) ?
        m(point.x, point.y) :
        M(point.x, point.y)
    }

    if (index > 0 && isZ(path[index - 1]) && !isM(point)) {
      const prev = path[index - 1]

      return isRelative(point) ?
        m(point.x, point.y, prev) :
        M(point.x, point.y, prev)
    }

    return point
  })
}
