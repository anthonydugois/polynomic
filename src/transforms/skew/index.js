import type { PathT } from "../../types/Path"
import type { CoordsT } from "../../types/Coords"
import type { Matrix4x4T } from "../../types/Matrix"

import { transformPath, transformOrigin, makeMatrix } from "../transform"
import { angle } from "../../utils"

export function skew(
  alpha: number | string,
  beta: number | string = 0,
): Function {
  const matrix: Matrix4x4T = makeMatrix(
    1, Math.tan(angle(beta)), 0, 0,
    Math.tan(angle(alpha)), 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  )

  return (
    path: PathT,
    indices: Array<number> = [],
    origin: CoordsT = { x: 0, y: 0, z: 0 },
  ): PathT => transformOrigin(
    transformPath(matrix, indices),
    origin,
  )(path)
}

export function skewX(
  alpha: number | string,
): Function {
  return skew(alpha, 0)
}

export function skewY(
  beta: number | string,
): Function {
  return skew(0, beta)
}
