// @flow

import type { PointT, PathT } from '../types'

import { defaultPoint } from '../point'
import { isM, isZ } from '../point/is'

export function path(
  ...pointFactories: Array<PointT | Function>
): PathT {
  let lastM: PointT = defaultPoint

  return pointFactories.reduce(
    (
      acc: PathT,
      pointFactory: PointT | Function,
    ): PathT => {
      let point: PointT = defaultPoint

      if (typeof pointFactory !== 'function') {
        point = pointFactory
      } else {
        const previous: PointT = acc.length > 0 ?
          acc[acc.length - 1] :
          defaultPoint

        if (isZ(pointFactory)) {
          point = pointFactory(lastM)
        } else {
          point = pointFactory(previous)
        }
      }

      if (isM(point)) {
        lastM = point
      }

      acc.push(point)

      return acc
    },
    [],
  )
}
