import { l, L, z, Z } from "lib/point"
import { isM, isZ } from "lib/point/is"
import isRelative from "lib/point/is-relative"

/**
 * Combines the subpaths by removing "zM" commands
 * e.g. combine([
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 *   { code: "M", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 200, y: 200, parameters: {} },
 * ])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 200, y: 200, parameters: {} },
 * ]
 */
export default function combine(path) {
  return path.reduce(
    (acc, point, index) => {
      if (index > 0 && isM(point)) {
        return [
          ...acc,
          isRelative(point) ?
            l(point.x, point.y) :
            L(point.x, point.y),
        ]
      }

      if (isZ(point)) {
        if (index === path.length - 1) {
          return [
            ...acc,
            isRelative(point) ?
              z(path[0]) :
              Z(path[0]),
          ]
        }

        return acc
      }

      return [...acc, point]
    },
    [],
  )
}
