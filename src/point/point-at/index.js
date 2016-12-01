// @flow

import type { PointT } from '../../types'

import {
  linear,
  quadratic,
  cubic,
  arc,
} from '../../math/basis'

import { isL, isH, isV, isQ, isT, isC, isS, isA } from '../is'
import { degToRad } from '../../utils/angle'

export function pointAt(
  previous : PointT,
  current : PointT,
) : Function {
  switch (true) {
  case isL(current):
  case isH(current):
  case isV(current):
    return linearPointAt(previous, current)

  case isQ(current):
  case isT(current):
    return quadraticPointAt(previous, current)

  case isC(current):
  case isS(current):
    return cubicPointAt(previous, current)

  case isA(current):
    return arcPointAt(previous, current)

  default:
    return () => null
  }
}

export function linearPointAt(
  previous : PointT,
  current : PointT,
) : Function {
  const f : Function = linear(
    previous.x,
    previous.y,
    current.x,
    current.y,
  )

  return function linearPointAt(
    t : number,
  ) : PointT {
    return f(t)
  }
}

export function quadraticPointAt(
  previous : PointT,
  current : PointT,
) : Function {
  const f : Function = quadratic(
    previous.x,
    previous.y,
    current.parameters.x1,
    current.parameters.y1,
    current.x,
    current.y,
  )

  return function quadraticPointAt(
    t : number,
  ) : PointT {
    return f(t)
  }
}

export function cubicPointAt(
  previous : PointT,
  current : PointT,
) : Function {
  const f : Function = cubic(
    previous.x,
    previous.y,
    current.parameters.x1,
    current.parameters.y1,
    current.parameters.x2,
    current.parameters.y2,
    current.x,
    current.y,
  )

  return function cubicPointAt(
    t : number,
  ) : PointT {
    return f(t)
  }
}

export function arcPointAt(
  previous : PointT,
  current : PointT,
) : Function {
  const f : Function = arc(
    previous.x,
    previous.y,
    current.parameters.rx,
    current.parameters.ry,
    degToRad(current.parameters.rotation),
    current.parameters.large,
    current.parameters.sweep,
    current.x,
    current.y,
  )

  return function arcPointAt(
    t : number,
  ) : PointT {
    return f(t)
  }
}
