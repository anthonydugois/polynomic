import * as points from "bernstein-point"
import { isM } from "bernstein-point-is"

/**
 * Transforms a pathstring in a formatted point list
 * and converts relative positions into absolute positions.
 * e.g. parsePathstring("M0 0 l50 50 q100 100 150 150 z")
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "l", x: 50, y: 50, parameters: {} },
 *   { code: "q", x: 200, y: 200, parameters: { x1: 150, y1: 150 } },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 * ]
 */
export default function parsePathstring(d) {
  return buildPointList(getSegments(d))
}

/**
 * Transforms a pathstring in array of segments
 * e.g. getSegments("M0 0 l50 50 q100 100 150 150z")
 * --> [["M", 0, 0], ["l", 50, 50], ["q", 100, 100, 150, 150], ["z"]]
 */
export function getSegments(d) {
  return d
    // remove invalid characters
    .replace(/[^mlhvqtcsaz\d\s,.-]/gi, "")
    // split in segments e.g. ["M0 0", "l50 50", ...]
    .split(/([mlhvqtcsaz][\d\s,.-]*)/i)
    // remove empty segments
    .filter(isStringNotEmpty)
    // split segment by path values
    .map(splitSegment)
}

function isStringNotEmpty(str) {
  return str.trim().length > 0
}

function convertNumberLikeInActualNumber(str) {
  str = str.trim()
  return isNaN(str) ? str : parseFloat(str)
}

function splitSegment(segment) {
  return segment
    // remove extra whitespaces
    .replace(/[\s,]+/g, " ")
    // split command and parameters
    .split(/([mlhvqtcsaz]|-*[\d.]+)/i)
    // remove empty values
    .filter(isStringNotEmpty)
    // trim and parse numbers
    .map(convertNumberLikeInActualNumber)
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
