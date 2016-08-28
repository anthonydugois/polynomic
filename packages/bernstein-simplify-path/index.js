import { distanceSegment } from "bernstein-point-distance"

export default function simplify(path, tolerance) {
  return douglasPeucker(path, tolerance)
}

function douglasPeucker(path, tolerance) {
  let simplified
  let max = 0
  let index = 0

  for (let i = 1, len = path.length ; i < len - 1 ; i++) {
    const point = path[i]
    const distance = distanceSegment(point, path[0], path[path.length - 1])

    if (distance > max) {
      index = i
      max = distance
    }
  }

  if (max >= tolerance) {
    const res1 = douglasPeucker(path.slice(0, index + 1), tolerance)
    const res2 = douglasPeucker(path.slice(index, path.length), tolerance)

    simplified = [
      ...res1.slice(0, res1.length - 1),
      ...res2,
    ]
  } else {
    simplified = [
      path[0],
      path[path.length - 1],
    ]
  }

  return simplified
}
