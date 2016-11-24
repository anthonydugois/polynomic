// @flow

import type { PointT, PointParamsT } from '../../types/Point'
import type { PathT } from '../../types/Path'

import { parse } from '../../pathstring/parse'
import { round, defaultPrecision } from '../../utils/round'

export function isEqual(
  d1: string | PathT,
  d2: string | PathT,
  precision: number = defaultPrecision,
): boolean {
  const path1: PathT = typeof d1 === 'string' ?
    parse(d1) :
    d1

  const path2: PathT = typeof d2 === 'string' ?
    parse(d2) :
    d2

  if (path1.length !== path2.length) {
    return false
  }

  return path1.every((
    point: PointT,
    index: number,
  ): boolean => isPointEqual(
    point,
    path2[index],
    precision,
  ))
}

export function isPointEqual(
  point1: PointT,
  point2: PointT,
  precision: number = defaultPrecision,
): boolean {
  return point1.code === point2.code
    && round(point1.x, precision) === round(point2.x, precision)
    && round(point1.y, precision) === round(point2.y, precision)
    && areParametersEqual(point1.parameters, point2.parameters)
}

export function areParametersEqual(
  parameters1: PointParamsT,
  parameters2: PointParamsT,
  precision: number = defaultPrecision,
): boolean {
  return Object.keys(parameters1).every((
    key: string,
  ): boolean => isParameterEqual(
    parameters1[key],
    parameters2[key],
    precision,
  ))
}

export function isParameterEqual(
  parameter1: any,
  parameter2: any,
  precision: number = defaultPrecision,
): boolean {
  const p1 = typeof parameter1 === 'number' ?
    round(parameter1, precision) :
    parameter1

  const p2 = typeof parameter2 === 'number' ?
    round(parameter2, precision) :
    parameter2

  return p1 === p2
}
