// @flow

import type {
  PointCodeT,
  PointParamsT,
  PointT,
  PathT,
} from '../../types'

import { point } from '../../point'
import { isM, isT, isC, isS, isA, isZ, isRelative } from '../../point/is'

export function reverse(
  path: PathT,
): PathT {
  let lastMIndex: number = 0

  return path.reduce(
    (
      acc: PathT,
      current: PointT,
      index: number,
    ): PathT => {
      if (isM(current)) {
        lastMIndex = index
      }

      const after: PointT = index < path.length - 1 && !isZ(path[index + 1]) ?
        path[index + 1] :
        path[lastMIndex]

      const close: boolean = isZ(current)
      const next: PointT = close ? current : after
      const insert: number = close ? acc.length - lastMIndex : 0
      const { x, y }: PointT = close ? path[index - 1] : current

      const code: PointCodeT = absoluteCode(next)
      const parameters: PointParamsT = reverseParameters(next)

      acc.splice(insert, 0, point(code, x, y, parameters))

      return acc
    },
    [],
  )
}

function absoluteCode(
  current: PointT,
): PointCodeT {
  const relative: boolean = isRelative(current)

  switch (true) {
  case isT(current):
    return relative ? 'q' : 'Q'

  case isS(current):
    return relative ? 'c' : 'C'

  default:
    return current.code
  }
}

function reverseParameters(
  current: PointT,
): PointParamsT {
  switch (true) {
  case isC(current):
  case isS(current):
    return {
      ...current.parameters,
      x1: current.parameters.x2,
      y1: current.parameters.y2,
      x2: current.parameters.x1,
      y2: current.parameters.y1,
    }

  case isA(current):
    return {
      ...current.parameters,
      sweep: typeof current.parameters.sweep !== 'undefined' ?
        (current.parameters.sweep === 0 ? 1 : 0) :
        0,
    }

  default:
    return current.parameters
  }
}
