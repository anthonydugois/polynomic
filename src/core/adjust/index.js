// @flow

import type {
  PointT,
  PointCodeT,
  PointParamsT,
} from '../../types'

import { curry } from 'lodash/fp'
import { point } from '../point'
import { implicitAnchor, implicitAnchors } from '../parameters'

import {
  isM,
  isH,
  isV,
  isQ,
  isT,
  isC,
  isS,
  isZ,
  isRelative,
} from '../../is'

export const adjust : Function = curry((
  current : PointT,
  previous : PointT,
  index : number = -1,
) : PointT => shouldAdjustCode(current, previous, index) ?
  point(
    adjustCode(current, previous, index),
    current.x,
    current.y,
    current.parameters,
  ) :
  current
)

const adjustCode : Function = curry((
  current : PointT,
  previous : PointT,
  index : number,
) : PointCodeT => {
  switch (true) {
    case shouldAdjustMoveTo(current, previous, index):
      return isRelative(current) ? 'm' : 'M'

    case shouldAdjustLineTo(current, previous):
      return isRelative(current) ? 'l' : 'L'

    case shouldAdjustQuadraticTo(current, previous):
      return isRelative(current) ? 'q' : 'Q'

    case shouldAdjustCubicTo(current, previous):
      return isRelative(current) ? 'c' : 'C'

    default:
      return current.code
  }
})

const shouldAdjustCode : Function = curry((
  current : PointT,
  previous : PointT,
  index : number,
) : boolean => shouldAdjustMoveTo(current, previous, index)
  || shouldAdjustLineTo(current, previous)
  || shouldAdjustQuadraticTo(current, previous)
  || shouldAdjustCubicTo(current, previous))

const shouldAdjustMoveTo : Function = curry((
  current : PointT,
  previous : PointT,
  index : number,
) : boolean => !isM(current) && (index === 0 || isZ(previous)))

const shouldAdjustLineTo : Function = curry((
  current : PointT,
  previous : PointT,
) : boolean => (isH(current) && current.y !== previous.y)
  || (isV(current) && current.x !== previous.x))

const shouldAdjustQuadraticTo : Function = curry((
  current : PointT,
  previous : PointT,
) : boolean => {
  const { x1, y1 } : PointParamsT = implicitAnchor(previous)

  return isT(current) && (
    !isQ(previous)
    || current.parameters.x1 !== x1
    || current.parameters.y1 !== y1
  )
})

const shouldAdjustCubicTo : Function = curry((
  current : PointT,
  previous : PointT,
) : boolean => {
  const { x1, y1 } : PointParamsT = implicitAnchors(previous)

  return isS(current) && (
    !isC(previous)
    || current.parameters.x1 !== x1
    || current.parameters.y1 !== y1
  )
})
