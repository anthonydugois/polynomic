/* @flow */

import type { RectT } from '../../types/Rect'
import type { Matrix4T } from '../../types/Matrix'

import { absoluteX, absoluteY } from '../../utils/absolute'

export function translate3d(
  tx: number | string,
  ty: number | string = 0,
  tz: number = 0,
): Function {
  return (
    bbox: RectT,
  ): Matrix4T => {
    const x: number = typeof tx === 'string' ?
      absoluteX(tx, bbox) :
      tx

    const y: number = typeof ty === 'string' ?
      absoluteY(ty, bbox) :
      ty

    return [
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, tz,
      0, 0, 0, 1,
    ]
  }
}

export function translate(
  tx: number | string,
  ty: number | string = 0,
): Function {
  return translate3d(tx, ty, 0)
}

export function translateX(
  tx: number | string,
): Function {
  return translate3d(tx, 0, 0)
}

export function translateY(
  ty: number | string,
): Function {
  return translate3d(0, ty, 0)
}

export function translateZ(
  tz: number,
): Function {
  return translate3d(0, 0, tz)
}
