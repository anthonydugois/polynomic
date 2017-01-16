// @flow

import type { PathT, PointT } from '../types'

import { curry, first, last } from 'lodash/fp'
import { hydrate as hydratePoint } from '../core/point'
import { isM, isZ } from '../is'
import { M } from '../points'
import { path } from '../path'

export const add : Function = curry((
  primitive : PointT | PathT | Function,
  _path : PathT,
  index : number = _path.length,
) : PathT => {
  const first : PathT = _path.slice(0, index)
  const second : PathT = _path.slice(index)
  const inserted : PathT = Array.isArray(primitive) ? primitive : [primitive]

  return path([
    ...first,
    ...keepIntegrity(first, inserted),
    ...inserted,
    ...keepIntegrity(inserted, second),
    ...second,
  ])
})

const keepIntegrity : Function = curry((
  path1 : PathT,
  path2 : PathT,
) : PathT => {
  const lastPoint : PointT = last(path1)
  const firstPoint : PointT = first(path2)

  if (isZ(lastPoint) && !isM(firstPoint)) {
    return path([
      M(lastPoint.x, lastPoint.y),
    ])
  }

  return path([])
})
