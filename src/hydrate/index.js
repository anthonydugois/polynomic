// @flow

import type { PathT, PointT } from '../types'

import { reduce } from 'lodash/fp'
import { hydrate as _hydrate } from '../core/point'
import { isZ } from '../is'
import { findLastPoint, findLastM } from '../find'

export const hydrate : Function =
  (func : Function) : Function =>
    (...args : Array<any>) : PathT =>
      reduce(
        (
          acc : PathT,
          cmd : PointT,
        ) : PathT => {
          const last : Function = isZ(cmd) ?
            findLastM :
            findLastPoint

          acc.push(_hydrate(cmd, last(acc)))

          return acc
        },
        [],
        func(...args),
      )
