import { z } from "../../point/points"
import { isZ } from "../../point/is"
import { makeSureFirstPointsAreM } from "../clean"

/**
 * Joins the paths and returns one global path
 * e.g. join([
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ],
 * [
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 200, y: 200, parameters: {} },
 * ], true)
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 *   { code: "M", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 200, y: 200, parameters: {} },
 *   { code: "z", x: 100, y: 100, parameters: {} },
 * ]
 */
export default function join(paths, shouldClose = false) {
  return paths.reduce(
    (acc, path) => {
      if (shouldClose) {
        path = makeSureFirstPointsAreM(path)

        return [
          ...acc,
          ...path,
          ...!isZ(path[path.length - 1]) && [z(path[0])],
        ]
      }

      return [...acc, ...path]
    },
    [],
  )
}
