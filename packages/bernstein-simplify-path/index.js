import { distanceSegment } from "bernstein-point-distance"

export default function simplify(path, tolerance) {
  let simplified
  let max = 0
  let index = 0

  for (let i = 1, len = path.length ; i < len ; i++) {
    const point = path[i]
    const distance = distanceSegment(point, path[0], path[path.length - 1])

    if (distance > max) {
      index = i
      max = distance
    }
  }

  if (max >= tolerance) {
    const res1 = simplify(path.slice(0, index), tolerance)
    const res2 = simplify(path.slice(index, path.length), tolerance)

    simplified = [
      ...res1.slice(0, res1.length - 1),
      ...res2.slice(0, res2.length),
    ]
  } else {
    simplified = [
      path[0],
      path[path.length - 1],
    ]
  }

  return simplified
}
