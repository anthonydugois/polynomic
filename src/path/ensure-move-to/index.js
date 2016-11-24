// @flow

import type { PointT } from '../../types/Point'
import type { PathT } from '../../types/Path'

import { m, M } from '../../point/points'
import { isM, isZ } from '../../point/is'
import { isRelative } from '../../point/is-relative'

export function ensureMoveTo(
  path: PathT,
): PathT {
  return path.map(
    (
      current: PointT,
      index: number,
    ): PointT => {
      const move: Function = isRelative(current) ? m : M

      if (index === 0 && !isM(current)) {
        return move(current.x, current.y)()
      }

      if (index > 0 && isZ(path[index - 1]) && !isM(current)) {
        return move(current.x, current.y)(path[index - 1])
      }

      return current
    }
  )
}
