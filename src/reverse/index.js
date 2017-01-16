// @flow

import type {
  PointCodeT,
  PointParamsT,
  PointT,
  PathT,
} from '../types'

import { reduce } from 'lodash/fp'
import { point } from '../core/point'
import { anchors, arc } from '../core/parameters'
import { isM, isT, isC, isS, isA, isZ, isRelative } from '../is'

export const reverse : Function = (
  path : PathT,
) : PathT => {
  let lastMIndex: number = 0

  return reduce.convert({ cap: false })(
    (
      acc : PathT,
      current : PointT,
      index : number,
    ) : PathT => {
      if (isM(current)) {
        lastMIndex = index
      }

      const after : PointT = index < path.length - 1 && !isZ(path[index + 1]) ?
        path[index + 1] :
        path[lastMIndex]

      const close : boolean = isZ(current)
      const next : PointT = close ? current : after
      const insert : number = close ? acc.length - lastMIndex : 0
      const { x, y } : PointT = close ? path[index - 1] : current

      const code : PointCodeT = cancelSmoothCode(next)
      const parameters : PointParamsT = invertParameters(next)

      acc.splice(insert, 0, point(code, x, y, parameters))

      return acc
    },
    [],
    path,
  )
}

const cancelSmoothCode : Function = (current : PointT) : PointCodeT => {
  const relative : boolean = isRelative(current)

  switch (true) {
  case isT(current):
    return relative ? 'q' : 'Q'

  case isS(current):
    return relative ? 'c' : 'C'

  default:
    return current.code
  }
}

const invertParameters : Function = (current : PointT) : PointParamsT => {
  switch (true) {
  case isC(current):
  case isS(current):
    return anchors(
      current.parameters.x2,
      current.parameters.y2,
      current.parameters.x1,
      current.parameters.y1,
    )

  case isA(current):
    return arc(
      current.parameters.rx,
      current.parameters.ry,
      current.parameters.rotation,
      current.parameters.large,
      current.parameters.sweep === 0 ? 1 : 0,
    )

  default:
    return current.parameters
  }
}
