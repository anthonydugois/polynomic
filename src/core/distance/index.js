// @flow

import type { PointT, LineT } from '../../types'

export function distance(
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
) : number {
  return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2))
}

export function distanceToPoint(
  from : PointT,
  to : PointT,
) : number {
  return distance(from.x, from.y, to.x, to.y)
}

export function distanceToLine(
  from : PointT,
  to : LineT,
) : number {
  const d : number = distance(to.x1, to.y1, to.x2, to.y2)

  if (d === 0) {
    return distance(from.x, from.y, to.x1, to.y1)
  }

  const ax : number = (from.x - to.x1) * (to.x2 - to.x1)
  const ay : number = (from.y - to.y1) * (to.y2 - to.y1)
  const d2 : number = d ** 2
  const t : number = Math.max(0, Math.min(1, (ax + ay) / d2))

  return distance(
    from.x,
    from.y,
    to.x1 + (t * (to.x2 - to.x1)),
    to.y1 + (t * (to.y2 - to.y1)),
  )
}
