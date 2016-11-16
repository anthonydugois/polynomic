/* @flow */

import type { PointT } from "./Point"

export type PathT = Array<PointT>

export type PathBoundingBoxT = {
  x: number,
  y: number,
  width: number,
  height: number,
}
