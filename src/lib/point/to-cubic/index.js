import { isL, isH, isV, isQ, isT, isA } from "lib/point/is"
import lineToCubic from "lib/point/line-to-cubic"
import quadraticToCubic from "lib/point/quadratic-to-cubic"
import arcToCubic from "lib/point/arc-to-cubic"

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
