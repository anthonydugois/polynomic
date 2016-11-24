// @flow

import type { PointT, PathT } from '../types'

import { defaultPoint } from '../point'
import * as builders from './builders'
import { defaultPrecision } from '../utils/round'
import { format } from '../utils/format'

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

      const fn: Function = builders[current.code]
      const previous: PointT = index > 0 ?
        path[index - 1] :
        defaultPoint

      return format`
        ${ acc }
        ${ fn(current, previous, precision) }
      `
    },
    '',
  )
}
