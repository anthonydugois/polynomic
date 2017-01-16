// @flow

import type { PointT, PathT } from '../types'

import { curry, reduce } from 'lodash/fp'

export const join : Function = curry((
  joiner : Function,
  paths : Array<PathT>,
) : PathT => reduce.convert({ cap: false })(
  (
    acc : PathT,
    path : PathT,
    index : number,
  ) : PathT => {
    acc.push(...path)

    if (index < paths.length - 1) {
      const nextPath : PathT = paths[index + 1]
      const segment : PointT | PathT = joiner(path, nextPath)
      const segments : PathT = Array.isArray(segment) ? segment : [segment]

      acc.push(...segments)
    }

    return acc
  },
  [],
  paths,
))
