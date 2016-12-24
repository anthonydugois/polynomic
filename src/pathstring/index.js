// @flow

import type { PointT, PathT } from '../types'

import { point } from '../core/point'
import * as strings from '../strings'
import { defaultPrecision } from '../core/utils/round'
import { format } from '../core/utils/format'

export function build(
  path: PathT,
  precision: number = defaultPrecision,
): string {
  return path.reduce(
    (
      acc: string,
      current: PointT,
      index: number,
    ): string => {
      if (current.code === '') {
        return acc
      }

      const fn: Function = strings[current.code]
      const previous: PointT = index > 0 ?
        path[index - 1] :
        point()

      return format`
        ${ acc }
        ${ fn(current, previous, precision) }
      `
    },
    '',
  )
}
