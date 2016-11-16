/* @flow */

import type { Matrix4x4T } from "../../types/Matrix"

import { angle } from "../../utils"

export function skew(
  alpha: number | string,
  beta: number | string = 0,
): Matrix4x4T {
  return [
    1, Math.tan(angle(alpha)), 0, 0,
    Math.tan(angle(beta)), 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]
}

export function skewX(
  alpha: number | string,
): Matrix4x4T {
  return skew(alpha, 0)
}

export function skewY(
  beta: number | string,
): Matrix4x4T {
  return skew(0, beta)
}
