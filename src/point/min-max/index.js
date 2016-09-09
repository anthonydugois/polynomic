import Point from "point/points"

export function min(p1, p2) {
  return Point(null, Math.min(p1.x, p2.x), Math.min(p1.y, p2.y))
}

export function max(p1, p2) {
  return Point(null, Math.max(p1.x, p2.x), Math.max(p1.y, p2.y))
}
