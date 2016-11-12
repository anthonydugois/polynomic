/* @flow */

import type { PathT } from "../../types/Path"

import matrixOrigin from "../matrix-origin"
import { parseDeg, degToRad } from "../../utils"

export default function skew(
  path: PathT,
  thetaX: string | number,
  thetaY: string | number,
  x: string | number = 0,
  y: string | number = 0,
): PathT {
  if (typeof thetaY === 'undefined') {
    thetaY = thetaX
  }

  if (typeof thetaX === 'string') {
    thetaX = degToRad(parseDeg(thetaX))
  }

  if (typeof thetaY === 'string') {
    thetaY = degToRad(parseDeg(thetaY))
  }

  return matrixOrigin(path, [
    1, Math.tan(thetaX), 0,
    Math.tan(thetaY), 1, 0,
    0, 0, 1,
  ], x, y)
}
