// @flow

import type { PointT, PathT } from '../types'

import { point } from '../core/point'
import { isM, isZ } from '../is'

export function path(
  ...cmds : Array<PointT | Function>
): PathT {
  let lastM : PointT = point()

  return cmds.reduce(
    (
      acc : PathT,
      cmd : PointT | Function,
    ): PathT => {
      const previous : PointT = acc.length > 0 ?
        acc[acc.length - 1] :
        point()

      if (isM(previous)) {
        lastM = previous
      }

      if (typeof cmd !== 'function') {
        acc.push(cmd)
      } else if (isZ(cmd)) {
        acc.push(cmd(lastM))
      } else {
        acc.push(cmd(previous))
      }

      return acc
    },
    [],
  )
}
