/* @flow */

import type { PointT } from "../../types/Point"
import type { PathT } from "../../types/Path"

import { defaultPoint } from "../../point/points"
import * as points from "../points"
import { defaultPrecision } from "../../utils/round"
import format from "../../utils/format"

export default function build(
  path: PathT,
  precision: number = defaultPrecision,
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

      return format`
        ${ acc }
        ${ fn(point, prev, precision) }
      `
    },
    '',
  )
}
