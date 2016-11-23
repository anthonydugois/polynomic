/* @flow */

import type { PointT } from '../../types/Point'
import type { PathT } from '../../types/Path'

import { isL, isH, isV, isQ, isT, isA } from '../is'
import { lineToCubic } from '../line-to-cubic'
import { quadraticToCubic } from '../quadratic-to-cubic'
import { arcToCubic } from '../arc-to-cubic'

export function toCubic(
  previous: PointT,
  current: PointT,
): PointT | PathT {
  switch (true) {
  case isL(current):
  case isH(current):
  case isV(current):
    return lineToCubic(previous, current)

  case isQ(current):
  case isT(current):
    return quadraticToCubic(previous, current)

  case isA(current):
    return arcToCubic(previous, current)

  default:
    return current
  }
}
