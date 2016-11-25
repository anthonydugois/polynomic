// @flow

import type { PointT, PathT } from '../../types'

import { point, z, Z } from '../../point'
import { isM, isZ, isRelative } from '../../point/is'

export function combine(
  path: PathT,
): PathT {
  return path.reduce(
    (
      acc: PathT,
      current: PointT,
      index: number,
    ): PathT => {
      if (index > 0 && isM(current)) {
        acc.push(point(
          isRelative(current) ? 'l' : 'L',
          current.x,
          current.y,
        ))
      } else if (!isZ(current)) {
        acc.push(current)
      } else if (index === path.length - 1) {
        const first: PointT = path[0]
        const close: Function = isRelative(current) ? z() : Z()

        acc.push(close(first))
      }

      return acc
    },
    [],
  )
}
