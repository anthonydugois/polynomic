/* @flow */

import type { PathT } from '../../types/Path'
import type { CircleT } from '../../types/Circle'

import { path } from '../path'
import { M, A, Z } from '../../point/points'

export default function fromCircle(
  circle: CircleT | HTMLElement,
): PathT {
  if (circle instanceof HTMLElement && circle.nodeName.toLowerCase() !== 'circle') {
    throw new Error('The element you provided in the `fromCircle` function should be a valid SVG circle node.')
  }

  const cx: number = circle instanceof HTMLElement ?
    parseFloat(circle.getAttribute('cx')) :
    circle.cx

  const cy: number = circle instanceof HTMLElement ?
    parseFloat(circle.getAttribute('cy')) :
    circle.cy

  const r: number = circle instanceof HTMLElement ?
    parseFloat(circle.getAttribute('r')) :
    circle.r

  return path(
    M(cx - r, cy),
    A(r, r, 0, 0, 0, cx + r, cy),
    A(r, r, 0, 0, 0, cx - r, cy),
    Z(),
  )
}
