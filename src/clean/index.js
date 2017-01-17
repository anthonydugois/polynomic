// @flow

import type {
  PrimitivePointT,
  PathT,
} from '../types'

import { point } from '../core/point'
import { m, M, z } from '../points'
import { isM, isL, isH, isV, isZ, isRelative } from '../is'

export const clean : Function = (path : PathT) : PathT =>
  simplifyClosures(ensureMoveTo(removeConsecutiveSamePoints(path)))

const simplifyClosures : Function = (path : PathT) : PathT => {
  let lastM: PrimitivePointT = point()

  return path.map(
    (
      current: PrimitivePointT,
    ): PrimitivePointT => {
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

const ensureMoveTo : Function = (path : PathT) : PathT => path.map(
  (
    current: PrimitivePointT,
    index: number,
  ): PrimitivePointT => {
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

const removeConsecutiveSamePoints : Function = (path : PathT) : PathT => path.reduce(
  (
    acc: PathT,
    current: PrimitivePointT,
    index: number,
  ) => {
    const previous: PrimitivePointT = index > 0 ?
      acc[acc.length - 1] :
      point()

    const sameCoordinates: boolean = previous.x === current.x
      && previous.y === current.y

    if (index === 0 || !sameCoordinates) {
      acc.push(current)
    }

    return acc
  },
  [],
)
