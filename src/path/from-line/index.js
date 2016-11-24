// @flow

import type { PathT } from '../../types/Path'
import type { LineT } from '../../types/Line'

import { path } from '../path'
import { M, L } from '../../point/points'

export function fromLine(
  line: LineT | HTMLElement,
): PathT {
  if (line instanceof HTMLElement && line.nodeName.toLowerCase() !== 'line') {
    throw new Error('The element you provided in the `fromLine` function should be a valid SVG line node.')
  }

  const x1: number = line instanceof HTMLElement ?
    parseFloat(line.getAttribute('x1')) :
    line.x1

  const y1: number = line instanceof HTMLElement ?
    parseFloat(line.getAttribute('y1')) :
    line.y1

  const x2: number = line instanceof HTMLElement ?
    parseFloat(line.getAttribute('x2')) :
    line.x2

  const y2: number = line instanceof HTMLElement ?
    parseFloat(line.getAttribute('y2')) :
    line.y2

  return path(
    M(x1, y1),
    L(x2, y2),
  )
}
