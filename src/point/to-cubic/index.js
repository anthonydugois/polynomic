import { isL, isH, isV, isQ, isT, isA } from "../is"
import lineToCubic from "../line-to-cubic"
import quadraticToCubic from "../quadratic-to-cubic"
import arcToCubic from "../arc-to-cubic"

export default function toCubic(prev, point) {
  if (isL(point) || isH(point) || isV(point)) {
    return lineToCubic(prev, point)
  }

  if (isQ(point) || isT(point)) {
    return quadraticToCubic(prev, point)
  }

  if (isA(point)) {
    return arcToCubic(prev, point)
  }

  return point
}
