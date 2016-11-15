import type { PathT } from "../../types/Path"
import type { CoordsT } from "../../types/Coords"
import type { Matrix4x4T } from "../../types/Matrix"

import { transformPath, transformOrigin, makeMatrix } from "../transform"

export function scale3d(
  sx: number,
  sy: number,
  sz: number,
): Function {
  const matrix: Matrix4x4T = makeMatrix(
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
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

export function scale(
  sx: number,
  sy: number,
): Function {
  if (typeof sy === 'undefined') {
    sy = sx
  }

  return scale3d(sx, sy, 1)
}

export function scaleX(
  sx: number,
): Function {
  return scale3d(sx, 1, 1)
}

export function scaleY(
  sy: number,
): Function {
  return scale3d(1, sy, 1)
}

export function scaleZ(
  sz: number,
): Function {
  return scale3d(1, 1, sz)
}
