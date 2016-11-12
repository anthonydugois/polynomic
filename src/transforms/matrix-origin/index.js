/* @flow */

import type { PathT } from "../../types/Path"

import matrix from "../matrix"
import translate from "../translate"
import { absoluteCoords } from "../../utils"

export default function matrixOrigin(
  path: PathT,
  m: Array<number>,
  x: string | number = 0,
  y: string | number = 0,
): PathT {
  const coords: { x: number, y: number } = absoluteCoords(path, x, y)

  if (coords.x !== 0 || coords.y !== 0) {
    path = translate(path, -coords.x, -coords.y)
    path = matrix(path, m)
    path = translate(path, coords.x, coords.y)
  } else {
    path = matrix(path, m)
  }

  return path
}
