/* @flow */

import type { PointT } from "../../types/Point"
import type { PathT } from "../../types/Path"

import { defaultPoint } from "../../point/points"
import { isM } from "../../point/is"

export function path(
  ...points: Array<Function>
): PathT {
  let lastM: PointT

  return points.reduce(
    (
      acc: PathT,
      point: Function,
    ): PathT => {
      const previous: PointT = acc.length > 0 ?
        acc[acc.length - 1] :
        defaultPoint

      if (isM(previous)) {
        lastM = previous
      }

      if (point.length > 0) {
        acc.push(point(previous))
      } else {
        acc.push(point(lastM))
      }

      return acc
    },
    [],
  )
}
