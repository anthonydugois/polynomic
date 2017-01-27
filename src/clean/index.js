// @flow

import type {
  PrimitivePointT,
  PathT,
} from '../types'

import { point } from '../core/point'
import { reduce } from '../reduce'
import { m, M, Z } from '../points'
import { isM, isL, isH, isV, isZ, isRelative } from '../is'
import { findLastPoint, findLastM } from '../find'

export const clean : Function = (path : PathT) : PathT => reduce(
  (
    acc : PathT,
    current : PrimitivePointT,
    index : number,
  ) : PathT => {
    const lastMoveTo : PrimitivePointT = findLastM(acc)
    const previous : PrimitivePointT = findLastPoint(acc)
    const next : PrimitivePointT = index < path.length - 1 ? path[index + 1] : point()

    if (
      !isM(current)
      && (index === 0 || isZ(previous))
    ) {
      const cmd : Function = isRelative(current) ? m : M
      acc.push(cmd(current.x, current.y))
    } else if (
      (isL(current) || isH(current) || isV(current))
      && (index === path.length - 1 || isM(next))
      && current.x === lastMoveTo.x
      && current.y === lastMoveTo.y
    ) {
      acc.push(Z())
    } else if (
      index === 0
      || current.x !== previous.x
      || current.y !== previous.y
      || (typeof current.parameters.x1 !== 'undefined' && current.parameters.x1 !== previous.x)
      || (typeof current.parameters.y1 !== 'undefined' && current.parameters.y1 !== previous.y)
      || (typeof current.parameters.x2 !== 'undefined' && current.parameters.x2 !== previous.x)
      || (typeof current.parameters.y2 !== 'undefined' && current.parameters.y2 !== previous.y)
      || (typeof current.parameters.rx !== 'undefined' && current.parameters.rx !== 0)
      || (typeof current.parameters.ry !== 'undefined' && current.parameters.ry !== 0)
    ) {
      acc.push(current)
    }

    return acc
  },
  [],
  path,
)
