// @flow

import type { PathT, PointT } from '../types'

import { curry, reduce } from 'lodash/fp'
import { point } from '../core/point'
import { isZ } from '../is'
import { findLastPoint, findLastM } from '../find'

export const hydrate : Function = curry((
  func : Function,
  length : number = 0,
) : Function => curry((...args : Array<any>) : PathT => reduce(
  (
    acc : PathT,
    cmd : PointT | Function,
  ) : PathT => {
    const last : Function = isZ(cmd) ?
      findLastM :
      findLastPoint

    acc.push(hydratePoint(cmd, last(acc)))

    return acc
  },
  [],
  func(...args),
), length))

export const hydratePoint : Function = (
  cmd : PointT | Function,
  hydratee : PointT = point(),
) : PointT => typeof cmd === 'function' ? cmd(hydratee) : cmd
