/* @flow */

import type { PointT } from "../../types/Point"
import type { PathT } from "../../types/Path"

import { point, z, Z } from "../../point/points"
import { isM, isZ } from "../../point/is"
import isRelative from "../../point/is-relative"

export default function combine(
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
