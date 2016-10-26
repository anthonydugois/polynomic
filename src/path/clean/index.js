import { z } from "../../point/points"
import { isM, isL, isH, isV } from "../../point/is"
import ensureMoveTo from "../ensure-move-to"

export default function clean(path) {
  return simplifyClosures(ensureMoveTo(removeConsecutiveSamePoints(path)))
}

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
