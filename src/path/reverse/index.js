import { point } from "../../point/points"
import { isM, isT, isC, isS, isA, isZ } from "../../point/is"
import isRelative from "../../point/is-relative"

export default function reverse(path) {
  const reversed = []
  let firstPointIndex

  for (let i = 0, len = path.length ; i < len ; i++) {
    let insert = reversed.length
    let current = path[i]

    if (isM(current)) {
      firstPointIndex = i
    }

    let next = i < len - 1 && !isZ(path[i + 1]) ?
      path[i + 1] :
      path[firstPointIndex]

    if (isZ(current)) {
      insert = firstPointIndex
      next = current
      current = path[i - 1]
    }

    let code = next.code
    let parameters = next.parameters

    if (isT(next)) {
      code = isRelative(next) ? "q" : "Q"
    }

    if (isS(next)) {
      code = isRelative(next) ? "c" : "C"
    }

    if (isC(next) || isS(next)) {
      parameters = reverseAnchors(parameters)
    }

    if (isA(next)) {
      parameters = reverseArc(parameters)
    }

    reversed.splice(insert, 0, point(code, current.x, current.y, parameters))
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
