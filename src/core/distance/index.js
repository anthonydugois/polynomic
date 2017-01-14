// @flow

import type { PointT, LineT } from '../../types'

import { curry, clamp } from 'lodash/fp'

export const distance : Function = curry((
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
) : number => Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2)))

export const distanceToPoint : Function = curry((
  from : PointT,
  to : PointT,
) : number => distance(from.x, from.y, to.x, to.y))

export const distanceToLine : Function = curry((
  from : PointT,
  to : LineT,
) : number => {
  const d : number = distance(to.x1, to.y1, to.x2, to.y2)

  if (d === 0) {
    return distance(from.x, from.y, to.x1, to.y1)
  }

  const ax : number = (from.x - to.x1) * (to.x2 - to.x1)
  const ay : number = (from.y - to.y1) * (to.y2 - to.y1)
  const d2 : number = d ** 2
  const t : number = clamp((ax + ay) / d2, 0, 1)

  return distance(
    from.x,
    from.y,
    to.x1 + (t * (to.x2 - to.x1)),
    to.y1 + (t * (to.y2 - to.y1)),
  )
})
