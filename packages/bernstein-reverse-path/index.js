import Point from "bernstein-core"
import { isM, isC, isA, isZ } from "bernstein-point-is"

export default function reverse(path) {
  const reversed = []
  let firstPointIndex

  for (let i = 0, len = path.length ; i < len ; i++) {
    let insert = reversed.length
    let point = path[i]

    if (isM(point)) {
      firstPointIndex = i
    }

    let next = i < len - 1 && !isZ(path[i + 1]) ?
      path[i + 1] :
      path[firstPointIndex]

    if (isZ(point)) {
      insert = firstPointIndex
      next = point
      point = path[i - 1]
    }

    if (isC(next)) {
      next = reverseAnchors(next)
    } else if (isA(next)) {
      next = reverseArc(next)
    }

    reversed.splice(insert, 0, Point(next.code, point.x, point.y, next.parameters))
  }

  return reversed.reverse()
}

function reverseAnchors(point) {
  return {
    ...point,
    parameters: {
      ...point.parameters,
      x1: point.parameters.x2,
      y1: point.parameters.y2,
      x2: point.parameters.x1,
      y2: point.parameters.y1,
    },
  }
}

function reverseArc(point) {
  return {
    ...point,
    parameters: {
      ...point.parameters,
      large: point.parameters.large ^ 1,
      sweep: point.parameters.sweep ^ 1,
    },
  }
}
