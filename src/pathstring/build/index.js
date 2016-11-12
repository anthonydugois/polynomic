/* @flow */

import type { PointT } from "../../types/Point"
import type { PathT } from "../../types/Path"

import { defaultPoint } from "../../point/points"
import * as points from "../points"

export default function build(
  path: PathT,
  precision: number,
): string {
  return path.reduce(
    (
      acc: string,
      point: PointT,
      index: number,
    ): string => {
      if (point.code === '') {
        return acc
      }

      const fn = points[point.code]
      const prev = index > 0 ?
        path[index - 1] :
        defaultPoint

      return `
        ${ acc }
        ${ fn(point, prev, precision) }
      `
    },
    '',
  ).replace(/\s+/g, ' ')
}
