/* @flow */

import type { PathT } from "../../types/Path"
import type { CoordsT } from "../../types/Coords"
import type { Matrix4x4T } from "../../types/Matrix"

import { transformPath, makeMatrix } from "../transform"
import { absoluteCoords } from "../../utils"

export function translate3d(
  tx: number | string,
  ty: number | string = 0,
  tz: number = 0,
): Function {
  const matrix: Matrix4x4T = makeMatrix(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, tz, 1,
  )

  return (
    path: PathT,
    indices: Array<number> = [],
  ): PathT => {
    const { x, y }: { x: number, y: number } = absoluteCoords(path, tx, ty)

    matrix[3] = x
    matrix[7] = y

    return transformPath(matrix, indices)(path)
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
