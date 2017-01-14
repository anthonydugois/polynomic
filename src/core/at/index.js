// @flow

import type {
  PointT,
  WeakCoordsT,
} from '../../types'

import { curry } from 'lodash/fp'
import { weakCoords } from '../coords'
import { arc } from '../../arc'
import { isL, isH, isV, isQ, isT, isC, isS, isA } from '../../is'
import { degToRad } from '../angle'

import {
  linear,
  quadratic,
  cubic,
  elliptic,
} from '../parametric'

export const pointAt : Function = curry((
  previous : PointT,
  current : PointT,
  t : number,
) : WeakCoordsT => {
  switch (true) {
  case isL(current):
  case isH(current):
  case isV(current):
    return linear(
      previous.x,
      previous.y,
      current.x,
      current.y,
      t,
    )

  case isQ(current):
  case isT(current):
    return quadratic(
      previous.x,
      previous.y,
      current.parameters.x1,
      current.parameters.y1,
      current.x,
      current.y,
      t,
    )

  case isC(current):
  case isS(current):
    return cubic(
      previous.x,
      previous.y,
      current.parameters.x1,
      current.parameters.y1,
      current.parameters.x2,
      current.parameters.y2,
      current.x,
      current.y,
      t,
    )

  case isA(current):
    return elliptic(arc(
      previous.x,
      previous.y,
      current.parameters.rx,
      current.parameters.ry,
      degToRad(current.parameters.rotation),
      current.parameters.large,
      current.parameters.sweep,
      current.x,
      current.y,
    ), t)

  default:
    return weakCoords()
  }
})
