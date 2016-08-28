import { C, c } from "lib/point"
import isRelative from "lib/point/is-relative"

export default function lineToCubic(prev, point) {
  return isRelative(point) ?
    c(prev.x, prev.y, point.x, point.y, point.x, point.y) :
    C(prev.x, prev.y, point.x, point.y, point.x, point.y)
}
