/* @flow */

import type { PointT } from "../../types/Point"
import type { PathT } from "../../types/Path"

export default function split(
  path: PathT,
  shouldSplit: Function,
  shouldKeep: '' | 'before' | 'after' = '',
): Array<PathT> {
  return path.reduce(
    (
      paths: Array<PathT>,
      current: PointT,
      index: number,
    ): Array<PathT> => {
      if (index > 0 && shouldSplit(current, index)) {
        switch (shouldKeep) {
        case 'before':
          return addNewPath(addToLastPath(paths, current))

        case 'after':
          return addToLastPath(addNewPath(paths), current)

        default:
          return addNewPath(paths)
        }
      }

      return addToLastPath(paths, current)
    },
    [[]],
  )
}

function addToLastPath(
  paths: Array<PathT>,
  point: PointT,
): Array<PathT> {
  const lastPathIndex: number = paths.length - 1
  const lastPath: PathT = paths[lastPathIndex]

  return [
    ...paths.slice(0, lastPathIndex),
    [
      ...lastPath,
      point,
    ],
  ]
}

function addNewPath(
  paths: Array<PathT>,
): Array<PathT> {
  return [
    ...paths,
    [],
  ]
}
