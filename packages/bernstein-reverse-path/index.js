import Point from "bernstein-point"
import isRelative from "bernstein-point-is-relative"

export default function reverse(path) {
  const reversed = []
  let firstPointIndex

  for (let i = 0, len = path.length ; i < len ; i++) {
    let insert = reversed.length
    let point = path[i]

    if (point.isM()) {
      firstPointIndex = i
    }

    let next = i < len - 1 && !path[i + 1].isZ() ?
      path[i + 1] :
      path[firstPointIndex]

    if (point.isZ()) {
      insert = firstPointIndex
      next = point
      point = path[i - 1]
    }

    let code = next.code
    let parameters = next.parameters

    if (next.isT()) {
      code = isRelative(next) ? "q" : "Q"
    }

    if (next.isS()) {
      code = isRelative(next) ? "c" : "C"
    }

    if (next.isC() || next.isS()) {
      parameters = reverseAnchors(parameters)
    }

    if (next.isA()) {
      parameters = reverseArc(parameters)
    }

    reversed.splice(insert, 0, new Point(code, point.x, point.y, parameters))
  }

  return reversed.reverse()
}

function reverseAnchors(parameters) {
  return {
    ...parameters,
    x1: parameters.x2,
    y1: parameters.y2,
    x2: parameters.x1,
    y2: parameters.y1,
  }
}

function reverseArc(parameters) {
  return {
    ...parameters,
    sweep: parameters.sweep ^ 1,
  }
}
