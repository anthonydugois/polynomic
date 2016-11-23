/* @flow */

import type { PointT } from '../../types/Point'
import type { PathT } from '../../types/Path'

import { defaultPoint } from '../../point/points'
import { isM, isZ } from '../../point/is'

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
