// @flow

import type { PathT, PointT } from '../types'

import { last, findLast } from 'lodash/fp'
import { point } from '../core/point'

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

const safeFind : Function =
  (func : Function) : Function =>
    (path : PathT) =>
      func(path) || point()

export const findLastPoint : Function = safeFind(last)
export const findLastM : Function = safeFind(findLast(isM))
export const findLastL : Function = safeFind(findLast(isL))
export const findLastH : Function = safeFind(findLast(isH))
export const findLastV : Function = safeFind(findLast(isV))
export const findLastQ : Function = safeFind(findLast(isQ))
export const findLastT : Function = safeFind(findLast(isT))
export const findLastC : Function = safeFind(findLast(isC))
export const findLastS : Function = safeFind(findLast(isS))
export const findLastA : Function = safeFind(findLast(isA))
export const findLastZ : Function = safeFind(findLast(isZ))
export const findLastRelative : Function = safeFind(findLast(isRelative))
export const findLastAbsolute : Function = safeFind(findLast(isAbsolute))
