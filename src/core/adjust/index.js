// @flow

import type {
  PointT,
  PointCodeT,
} from '../../types'

import { point } from '../point'

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

export function adjust(
  current : PointT,
  previous : PointT,
  index : number,
) : PointT {
  return point(
    adjustCode(current, previous, index),
    current.x,
    current.y,
    current.parameters,
  )
}

function adjustCode(
  current : PointT,
  previous : PointT,
  index : number,
) : PointCodeT {
  if (shouldAdjustMoveTo(current, previous, index)) {
    return isRelative(current) ? 'm' : 'M'
  }

  if (shouldAdjustLineTo(current, previous)) {
    return isRelative(current) ? 'l' : 'L'
  }

  if (shouldAdjustQuadraticTo(current, previous)) {
    return isRelative(current) ? 'q' : 'Q'
  }

  if (shouldAdjustCubicTo(current, previous)) {
    return isRelative(current) ? 'c' : 'C'
  }

  return current.code
}

function shouldAdjustMoveTo(
  current : PointT,
  previous : PointT,
  index : number,
) : boolean {
  return !isM(current) && (
    index === 0
    || isZ(previous)
  )
}

function shouldAdjustLineTo(
  current : PointT,
  previous : PointT,
) : boolean {
  const shouldAdjustHorizontalLineTo : boolean = isH(current)
    && current.y !== previous.y
  const shouldAdjustVerticalLineTo : boolean = isV(current)
    && current.x !== previous.x

  return shouldAdjustHorizontalLineTo || shouldAdjustVerticalLineTo
}

function shouldAdjustQuadraticTo(
  current : PointT,
  previous : PointT,
) : boolean {
  const expectedX : number = typeof previous.parameters.x1 !== 'undefined' ?
    (2 * previous.x) - previous.parameters.x1 :
    previous.x

  const expectedY : number = typeof previous.parameters.y1 !== 'undefined' ?
    (2 * previous.y) - previous.parameters.y1 :
    previous.y

  return isT(current) && (
    !isQ(previous)
    || current.parameters.x1 !== expectedX
    || current.parameters.y1 !== expectedY
  )
}

function shouldAdjustCubicTo(
  current : PointT,
  previous : PointT,
) : boolean {
  const expectedX : number = typeof previous.parameters.x2 !== 'undefined' ?
    (2 * previous.x) - previous.parameters.x2 :
    previous.x

  const expectedY : number = typeof previous.parameters.y2 !== 'undefined' ?
    (2 * previous.y) - previous.parameters.y2 :
    previous.y

  return isS(current) && (
    !isC(previous)
    || current.parameters.x1 !== expectedX
    || current.parameters.y1 !== expectedY
  )
}
