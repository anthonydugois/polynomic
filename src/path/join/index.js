/* @flow */

import type { PointT } from '../../types/Point'
import type { PathT } from '../../types/Path'

export default function join(
  paths: Array<PathT>,
  makeJoin: Function = () => [],
): PathT {
  return paths.reduce(
    (
      acc: PathT,
      path: PathT,
      index: number,
    ): PathT => {
      if (index < paths.length - 1) {
        const prevPath: PathT = path
        const nextPath: PathT = paths[index + 1]
        const segment: PointT | PathT = makeJoin(prevPath, nextPath)
        const segments: PathT = Array.isArray(segment) ? segment : [segment]

        acc.push(...path)
        acc.push(...segments)
      } else {
        acc.push(...path)
      }

      return acc
    },
    [],
  )
}
