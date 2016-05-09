import Point from "bernstein-core"

export default function distance(p1, p2) {
  return Math.sqrt(sqDistance(p1, p2))
}

function sqDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
}

export function distanceSegment(p1, p2, p3) {
  return Math.sqrt(sqDistanceSegment(p1, p2, p3))
}

function sqDistanceSegment(p1, p2, p3) {
  const segment = sqDistance(p2, p3)

  if (segment === 0) {
    return sqDistance(p1, p2)
  }

  const t = Math.max(0, Math.min(1, ((p1.x - p2.x) * (p3.x - p2.x) + (p1.y - p2.y) * (p3.y - p2.y)) / segment))
  const p4 = Point(null, p2.x + t * (p3.x - p2.x), p2.y + t * (p3.y - p2.y))

  return sqDistance(p1, p4)
}
