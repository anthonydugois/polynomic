import { C, c } from "bernstein-point"

export default function lineToCubic(prev, point) {
  return point.isRelative() ?
    c(prev.x, prev.y, point.x, point.y, point.x, point.y) :
    C(prev.x, prev.y, point.x, point.y, point.x, point.y)
}
