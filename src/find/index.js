// @flow

import type { PathT, PointT } from '../types'

import {
  curry,
  last,
  findLast,
} from 'lodash/fp'

import {
  isM,
  isL,
  isH,
  isV,
  isQ,
  isT,
  isC,
  isS,
  isA,
  isZ,
  isRelative,
  isAbsolute,
} from '../is'

import { point } from '../core/point'

export const findLastPoint : Function = curry((
  path : PathT,
) : PointT => path.length > 0 ? last(path) : point())

export const findLastM : Function = findLast(isM)
export const findLastL : Function = findLast(isL)
export const findLastH : Function = findLast(isH)
export const findLastV : Function = findLast(isV)
export const findLastQ : Function = findLast(isQ)
export const findLastT : Function = findLast(isT)
export const findLastC : Function = findLast(isC)
export const findLastS : Function = findLast(isS)
export const findLastA : Function = findLast(isA)
export const findLastZ : Function = findLast(isZ)
export const findLastRelative : Function = findLast(isRelative)
export const findLastAbsolute : Function = findLast(isAbsolute)
