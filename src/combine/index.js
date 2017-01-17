// @flow

import type {
  PrimitivePointT,
  PathT,
} from '../types'

import { point } from '../core/point'
import { reduce } from '../reduce'
import { z, Z } from '../points'
import { isM, isZ, isRelative } from '../is'

export const combine : Function = (path : PathT) : PathT => reduce((
  acc : PathT,
  current : PrimitivePointT,
  index : number,
) : PathT => {
  if (index > 0 && isM(current)) {
    acc.push(point(isRelative(current) ? 'l' : 'L', current.x, current.y))
  } else if (!isZ(current)) {
    acc.push(current)
  } else if (index === path.length - 1) {
    acc.push(isRelative(current) ? z() : Z())
  }

  return acc
}, [], path)
