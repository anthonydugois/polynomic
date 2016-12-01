// @flow

import type {
  Matrix4T,
  CoordsT,
  AbsoluteCoordsT,
  RectT,
} from '../../types'

import { absoluteCoords } from '../../utils/absolute'

export function translate3d(
  tx: number | string,
  ty: number | string = 0,
  tz: number = 0,
): Function {
  return (
    bbox: RectT,
  ): Matrix4T => {
    const coords : CoordsT = { x: tx, y: ty, z: tz }
    const { x, y, z } : AbsoluteCoordsT = absoluteCoords(coords, bbox)

    return [
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
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
