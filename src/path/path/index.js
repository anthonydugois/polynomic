/* @flow */

import type { PointT } from "../../types/Point"
import type { PathT } from "../../types/Path"

import { defaultPoint } from "../../point/points"

export function path(
  ...points: Array<Function>
): PathT {
  return points.reduce(
    (
      acc: PathT,
      point: Function,
    ): PathT => {
      const previous: PointT = acc.length > 0 ?
        acc[acc.length - 1] :
        defaultPoint

      acc.push(point(previous))

      return acc
    },
    [],
  )
}
