// @flow

import type {
  PointT,
  PointParamsT,
  MatrixT,
  VectorT,
} from '../../types'

import { vec } from '../vector'
import { multiplyVec } from '../matrix'
import { transformArcParameters } from '../arc'
import { point } from '../point'
import { arc } from '../../arc'
import { degToRad, radToDeg } from '../angle'

const transformAnchor1 : Function = transformAnchor(1)
const transformAnchor2 : Function = transformAnchor(2)

export function transform(
  current : PointT,
  previous : PointT,
  T : MatrixT,
) : PointT {
  const vPosition : VectorT = vec(current.x, current.y, 0, 1)
  const [x, y, , w] : VectorT = multiplyVec(T, vPosition)

  return point(
    current.code,
    x / w,
    y / w,
    transformParameters(current, previous, T),
  )
}

function transformParameters(
  current : PointT,
  previous : PointT,
  T : MatrixT,
) : PointParamsT {
  return {
    ...transformAnchor1(current, T),
    ...transformAnchor2(current, T),
    ...transformArc(current, previous, T),
  }
}

function transformAnchor(
  n : number = 1,
) : Function {
  const xn : string = `x${ n }`
  const yn : string = `y${ n }`

  return function transformAnchor(
    current : PointT,
    T : MatrixT,
  ) : PointParamsT {
    const ax : number = current.parameters[xn]
    const ay : number = current.parameters[yn]

    if (typeof ax !== 'undefined' && typeof ay !== 'undefined') {
      const vPosition : VectorT = vec(ax, ay, 0, 1)
      const [x, y, , w] : VectorT = multiplyVec(T, vPosition)

      return {
        [xn]: x / w,
        [yn]: y / w,
      }
    }

    return {}
  }
}

function transformArc(
  current : PointT,
  previous : PointT,
  T : MatrixT,
) : PointParamsT {
  const {
    rx,
    ry,
    rotation,
    large,
    sweep,
  } : PointParamsT = current.parameters

  if (
    typeof rx !== 'undefined'
    && typeof ry !== 'undefined'
    && typeof rotation !== 'undefined'
    && typeof large !== 'undefined'
    && typeof sweep !== 'undefined'
  ) {
    const V : VectorT = transformArcParameters(arc(
      previous.x, previous.y,
      rx, ry, degToRad(rotation), large, sweep,
      current.x, current.y,
    ), T)

    return {
      rx: V[0],
      ry: V[1],
      rotation: radToDeg(V[2]),
      large,
      sweep,
    }
  }

  return {}
}
