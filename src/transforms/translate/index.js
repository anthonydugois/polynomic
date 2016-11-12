/* @flow */

import type { PathT } from "../../types/Path"

import matrix from "../matrix"
import { absoluteCoords } from "../../utils"

export default function translate(
  path: PathT,
  dx: string | number,
  dy: string | number,
): PathT {
  const coords: { x: number, y: number } = absoluteCoords(path, dx, dy)

  return matrix(path, [
    1, 0, coords.x,
    0, 1, coords.y,
    0, 0, 1,
  ])
}
