// @flow

import type { PointT, PathT } from '../types'

import { curry, last, findLast } from 'lodash/fp'
import { point } from '../core/point'
import { isM, isZ } from '../is'

export const path : Function = curry((
  cmds : Array<PointT | Function>,
) : PathT => cmds.reduce(
  (
    acc : PathT,
    cmd : PointT | Function,
  ) : PathT => {
    acc.push(
      typeof cmd === 'function' ?
        hydrate(cmd, acc) :
        cmd
    )

    return acc
  },
  [],
))

const findLastM : Function = findLast(isM)

const findLastPoint : Function = curry((
  path : PathT,
) : PointT => path.length > 0 ? last(path) : point())

const hydrate : Function = curry((
  cmd : Function,
  path : PathT,
) : PointT => {
  const current : PointT = cmd(findLastPoint(path))

  if (isZ(current)) {
    return cmd(findLastM(path))
  }

  return current
})
