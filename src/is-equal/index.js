// @flow

import type {
  PrimitivePointT,
  PointParamsT,
  PointT,
  PathT,
} from '../types'

import { curry } from 'lodash/fp'
import { parse } from '../parse'
import { round, defaultPrecision } from '../core/utils/round'

export const isEqual : Function = curry((
  d1 : string | PathT,
  d2 : string | PathT,
  precision ?: number = defaultPrecision,
) : boolean => {
  const path1 : PathT = typeof d1 === 'string' ? parse(d1) : d1
  const path2 : PathT = typeof d2 === 'string' ? parse(d2) : d2

  if (path1.length !== path2.length) {
    return false
  }

  return path1.every((
    point : PointT,
    index : number,
  ) : boolean => arePointsEqual(point, path2[index], precision))
})

const arePointsEqual : Function = (
  point1 : PrimitivePointT,
  point2 : PrimitivePointT,
  precision ?: number = defaultPrecision,
) : boolean => point1.code === point2.code
  && round(point1.x, precision) === round(point2.x, precision)
  && round(point1.y, precision) === round(point2.y, precision)
  && areParametersEqual(point1.parameters, point2.parameters)

const areParametersEqual : Function = (
  params1 : PointParamsT,
  params2 : PointParamsT,
  precision ?: number = defaultPrecision,
) : boolean => Object.keys(params1).every(
  (key : string) : boolean =>
    areValuesEqual(params1[key], params2[key], precision)
)

const areValuesEqual : Function = (
  param1 : any,
  param2 : any,
  precision ?: number = defaultPrecision,
) : boolean => {
  const p1 : any = typeof param1 === 'number' ? round(param1, precision) : param1
  const p2 : any = typeof param2 === 'number' ? round(param2, precision) : param2

  return p1 === p2
}
