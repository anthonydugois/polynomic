import { C, c } from "bernstein-point"

export default function quadraticToCubic(prev, point) {
  const x1 = ((1 / 3) * prev.x) + ((2 / 3) * point.parameters.x1)
  const y1 = ((1 / 3) * prev.y) + ((2 / 3) * point.parameters.y1)
  const x2 = ((1 / 3) * point.x) + ((2 / 3) * point.parameters.x1)
  const y2 = ((1 / 3) * point.y) + ((2 / 3) * point.parameters.y1)

  return point.isRelative() ?
    c(x1, y1, x2, y2, point.x, point.y) :
    C(x1, y1, x2, y2, point.x, point.y)
}
