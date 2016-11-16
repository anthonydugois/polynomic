/* @flow */

import type { PathBoundingBoxT } from "../../types/Path"
import type { Matrix4x4T } from "../../types/Matrix"

import {
  relativeToAbsoluteX,
  relativeToAbsoluteY,
} from "../../utils"

export function translate3d(
  tx: number | string,
  ty: number | string = 0,
  tz: number = 0,
): Function {
  return (
    bbox: PathBoundingBoxT,
  ): Matrix4x4T => {
    const x: number = typeof tx === 'string' ?
      relativeToAbsoluteX(tx, bbox) :
      tx

    const y: number = typeof ty === 'string' ?
      relativeToAbsoluteY(ty, bbox) :
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
