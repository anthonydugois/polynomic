import { z } from "../../point/points"
import { isZ } from "../../point/is"
import ensureMoveTo from "../ensure-move-to"

function defaultMakeJoin() {
  return []
}

export default function join(paths, makeJoin = defaultMakeJoin) {
  return paths.reduce(
    (acc, path, index) => {
      if (index >= paths.length - 1) {
        return [
          ...acc,
          ...path,
        ]
      }

      const prevPath = path
      const nextPath = paths[index + 1]
      const segment = makeJoin(prevPath, nextPath)

      return [
        ...acc,
        ...path,
        ...Array.isArray(segment) ? segment : [segment],
      ]
    },
    [],
  )
}
