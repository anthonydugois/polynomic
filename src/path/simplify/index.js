// @flow

import type { PointT, PathT } from '../../types'

import { distanceSegment } from '../../point/distance-segment'

type DistanceT = {
  index: number,
  distance: number,
}

export function simplify(
  path: PathT,
  tolerance: number,
): PathT {
  const { index, distance }: DistanceT = getMaxDistance(path)

  if (distance >= tolerance) {
    const path1: PathT = simplify(path.slice(0, index + 1), tolerance)
    const path2: PathT = simplify(path.slice(index, path.length), tolerance)

    return [
      ...path1.slice(0, path1.length - 1),
      ...path2,
    ]
  }

  return [
    path[0],
    path[path.length - 1],
  ]
}

function getMaxDistance(
  path: PathT,
): DistanceT {
  const first: PointT = path[0]
  const last: PointT = path[path.length - 1]

  return path.reduce(
    (
      acc: DistanceT,
      current: PointT,
      index: number,
    ): DistanceT => {
      const distance: number = distanceSegment(current, first, last)

      if (distance > acc.distance) {
        acc.index = index
        acc.distance = distance
      }

      return acc
    },
    {
      index: 0,
      distance: 0,
    },
  )
}
