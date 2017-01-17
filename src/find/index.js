// @flow

import type { PathT } from '../types'

import { last, findLast, findLastIndex } from 'lodash/fp'
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

export const findLastIndexM : Function = findLastIndex(isM)
export const findLastIndexL : Function = findLastIndex(isL)
export const findLastIndexH : Function = findLastIndex(isH)
export const findLastIndexV : Function = findLastIndex(isV)
export const findLastIndexQ : Function = findLastIndex(isQ)
export const findLastIndexT : Function = findLastIndex(isT)
export const findLastIndexC : Function = findLastIndex(isC)
export const findLastIndexS : Function = findLastIndex(isS)
export const findLastIndexA : Function = findLastIndex(isA)
export const findLastIndexZ : Function = findLastIndex(isZ)
export const findLastIndexRelative : Function = findLastIndex(isRelative)
export const findLastIndexAbsolute : Function = findLastIndex(isAbsolute)
