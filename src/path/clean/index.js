/* @flow */

import type { PointT } from '../../types/Point'
import type { PathT } from '../../types/Path'

import { z, defaultPoint } from '../../point/points'
import { isM, isL, isH, isV } from '../../point/is'
import { ensureMoveTo } from '../ensure-move-to'

export function clean(
  path: PathT,
): PathT {
  return simplifyClosures(ensureMoveTo(removeConsecutiveSamePoints(path)))
}

function simplifyClosures(
  path: PathT,
): PathT {
  let lastM: PointT = defaultPoint

  return path.map(
    (
      current: PointT,
    ): PointT => {
      if (isM(current)) {
        lastM = current
      }

      const isLine: boolean = isL(current) || isH(current) || isV(current)
      const shouldClose: boolean = isLine
        && lastM.x === current.x
        && lastM.y === current.y

      if (shouldClose) {
        return z()(lastM)
      }

      return current
    }
  )
}

function removeConsecutiveSamePoints(
  path: PathT,
): PathT {
  return path.reduce(
    (
      acc: PathT,
      current: PointT,
      index: number,
    ) => {
      const previous: PointT = index > 0 ?
        acc[acc.length - 1] :
        defaultPoint

      const sameCoordinates: boolean = previous.x === current.x
        && previous.y === current.y

      if (index === 0 || !sameCoordinates) {
        acc.push(current)
      }

      return acc
    },
    [],
  )
}
