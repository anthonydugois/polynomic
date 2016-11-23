/* @flow */

import type { PointT } from './Point'
import type { CoordsT } from './Coords'

export type PathT = Array<PointT>

export type PathBoundingBoxT = {
  x: number,
  y: number,
  width: number,
  height: number,
}

export type PathTransformOptionsT = {
  indices: Array<number>,
  transformOrigin: CoordsT,
}
