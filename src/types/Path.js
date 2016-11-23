/* @flow */

import type { PointT } from './Point'
import type { CoordsT } from './Coords'

export type PathT = Array<PointT>

export type PathTransformOptionsT = {
  indices: Array<number>,
  transformOrigin: CoordsT,
}
