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

const findOrPoint : Function =
  (func : Function) : Function =>
    (path : PathT) =>
      func(path) || point()

export const findLastPoint : Function = findOrPoint(last)
export const findLastM : Function = findOrPoint(findLast(isM))
export const findLastL : Function = findOrPoint(findLast(isL))
export const findLastH : Function = findOrPoint(findLast(isH))
export const findLastV : Function = findOrPoint(findLast(isV))
export const findLastQ : Function = findOrPoint(findLast(isQ))
export const findLastT : Function = findOrPoint(findLast(isT))
export const findLastC : Function = findOrPoint(findLast(isC))
export const findLastS : Function = findOrPoint(findLast(isS))
export const findLastA : Function = findOrPoint(findLast(isA))
export const findLastZ : Function = findOrPoint(findLast(isZ))
export const findLastRelative : Function = findOrPoint(findLast(isRelative))
export const findLastAbsolute : Function = findOrPoint(findLast(isAbsolute))
