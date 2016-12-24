// @flow

import type { PointT, PathT } from '../../types'

export function split(
  path: PathT,
  shouldSplit: Function,
  shouldKeep: '' | 'before' | 'after' = '',
): Array<PathT> {
  return path.reduce(
    (
      acc: Array<PathT>,
      current: PointT,
      index: number,
    ): Array<PathT> => {
      if (index > 0 && shouldSplit(current, index)) {
        switch (shouldKeep) {
        case 'before':
          acc[acc.length - 1].push(current)
          acc.push([])
          break

        case 'after':
          acc.push([current])
          break

        default:
          acc.push([])
          break
        }
      } else {
        acc[acc.length - 1].push(current)
      }

      return acc
    },
    [[]],
  )
}
