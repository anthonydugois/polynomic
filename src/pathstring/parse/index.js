import * as points from "../../point/points"
import { isM } from "../../point/is"
import segments from "../segments"

/**
 * Transforms a pathstring in a formatted point list
 * and converts relative positions into absolute positions.
 * e.g. parse("M0 0 l50 50 q100 100 150 150 z")
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "l", x: 50, y: 50, parameters: {} },
 *   { code: "q", x: 200, y: 200, parameters: { x1: 150, y1: 150 } },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 * ]
 */
export default function parse(d) {
  return buildPointList(segments(d))
}

/**
 * Transforms an array of segments in a formatted point list
 * and converts relative positions into absolute positions.
 * e.g. buildPointList([["M", 0, 0], ["l", 50, 50], ["q", 100, 100, 150, 150], ["z"]])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "l", x: 50, y: 50, parameters: {} },
 *   { code: "q", x: 200, y: 200, parameters: { x1: 150, y1: 150 } },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 * ]
 */
function buildPointList(segments) {
  let firstPoint

  return segments.reduce(
    (acc, [code, ...parameters]) => {
      const p = points[code]
      let pointList, prev

      if (acc.length > 0) {
        prev = acc[acc.length - 1]
      }

      if (prev && isM(prev)) {
        firstPoint = prev
      }

      if (p.length > 0) {
        pointList = chunks(parameters, p.length)
        pointList = pointList.map((chunk) => prev = p(...chunk, prev))
      } else {
        pointList = [p(firstPoint)]
      }

      return [...acc, ...pointList]
    },
    [],
  )
}

/**
 * Cuts the given array every n values
 * e.g. chunks([0, 1, 2, 0, 1, 2, 0, 1, 2], 3)
 * --> [[0, 1, 2], [0, 1, 2], [0, 1, 2]]
 */
function chunks(array, n) {
  const tmp = []

  for (let i = 0, j = array.length ; i < j ; i += n) {
    const chunk = array.slice(i, i + n)

    if (chunk.length === n) {
      tmp.push(chunk)
    }
  }

  return tmp
}
