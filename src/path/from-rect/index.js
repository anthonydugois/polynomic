/* @flow */

import type { PathT } from '../../types/Path'
import type { RectT } from '../../types/Rect'

import { path } from '../path'
import { M, L, A, Z } from '../../point/points'

export default function fromRect(
  rect: RectT | HTMLElement,
): PathT {
  if (rect instanceof HTMLElement && rect.nodeName.toLowerCase() !== 'rect') {
    throw new Error('The element you provided in the `fromRect` function should be a valid SVG rect node.')
  }

  const x: number = rect instanceof HTMLElement ?
    parseFloat(rect.getAttribute('x')) :
    rect.x

  const y: number = rect instanceof HTMLElement ?
    parseFloat(rect.getAttribute('y')) :
    rect.y

  const width: number = rect instanceof HTMLElement ?
    parseFloat(rect.getAttribute('width')) :
    rect.width

  const height: number = rect instanceof HTMLElement ?
    parseFloat(rect.getAttribute('height')) :
    rect.height

  const _rx: number = parseFloat(
    rect instanceof HTMLElement ?
      rect.getAttribute('rx') :
      rect.rx
  )

  const _ry: number = parseFloat(
    rect instanceof HTMLElement ?
      rect.getAttribute('ry') :
      rect.ry
  )

  const noRadius: boolean = (isNaN(_rx) && isNaN(_ry))
    || _rx === 0
    || _ry === 0

  if (noRadius) {
    return path(
      M(x, y),
      L(x + width, y),
      L(x + width, y + height),
      L(x, y + height),
      Z(),
    )
  }

  const rx: number = isNaN(_rx) ? _ry : _rx
  const ry: number = isNaN(_ry) ? _rx : _ry

  return path(
    M(x + rx, y),
    L((x + width) - rx, y),
    A(rx, ry, 0, 0, 1, x + width, y + ry),
    L(x + width, (y + height) - ry),
    A(rx, ry, 0, 0, 1, (x + width) - rx, y + height),
    L(x + rx, y + height),
    A(rx, ry, 0, 0, 1, x, (y + height) - ry),
    L(x, y + ry),
    A(rx, ry, 0, 0, 1, x + rx, y),
    Z(),
  )
}
