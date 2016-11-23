/* @flow */

import type { PointT } from '../../types/Point'

import { point } from '../points'
import isRelative from '../is-relative'

export default function quadraticToCubic(
  previous: PointT,
  current: PointT,
): PointT {
  const x1: number = typeof current.parameters.x1 !== 'undefined' ?
    ((1 / 3) * previous.x) + ((2 / 3) * current.parameters.x1) :
    previous.x

  const y1: number = typeof current.parameters.y1 !== 'undefined' ?
    ((1 / 3) * previous.y) + ((2 / 3) * current.parameters.y1) :
    previous.y

  const x2: number = typeof current.parameters.x1 !== 'undefined' ?
    ((1 / 3) * current.x) + ((2 / 3) * current.parameters.x1) :
    current.x

  const y2: number = typeof current.parameters.y1 !== 'undefined' ?
    ((1 / 3) * current.y) + ((2 / 3) * current.parameters.y1) :
    current.y

  return point(
    isRelative(current) ? 'c' : 'C',
    current.x,
    current.y,
    { x1, y1, x2, y2 },
  )
}
