// @flow

import type { PointT, PathT } from '../../types'

import { m, M, z, defaultPoint } from '../../point'
import { isM, isL, isH, isV, isZ, isRelative } from '../../point/is'

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

function ensureMoveTo(
  path: PathT,
): PathT {
  return path.map(
    (
      current: PointT,
      index: number,
    ): PointT => {
      const move: Function = isRelative(current) ? m : M

      if (index === 0 && !isM(current)) {
        return move(current.x, current.y)()
      }

      if (index > 0 && isZ(path[index - 1]) && !isM(current)) {
        return move(current.x, current.y)(path[index - 1])
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
