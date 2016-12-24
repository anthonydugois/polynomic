// @flow

import type {
  PointT,
  PointParamsT,
  PointCodeT,
} from '../../types'

export function point(
  code : PointCodeT = '',
  x : number = 0,
  y : number = 0,
  parameters : PointParamsT = {},
) : PointT {
  return {
    code,
    x,
    y,
    parameters,
  }
}
