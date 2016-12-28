// @flow

import type {
  MatrixT,
  VectorT,
  AbsoluteCoordsT,
  PointT,
  PointParamsT,
  PathT,
  PathTransformOptionsT,
  RectT,
} from '../types'

import { curry } from 'lodash/fp'
import { degToRad, radToDeg } from '../core/angle'
import { identity, multiply, multiplyVec } from '../core/matrix'
import { vec } from '../core/vector'
import { point } from '../core/point'
import { adjust } from '../core/adjust'
import { absolute } from '../core/absolute'
import { transformArcParameters } from '../core/arc'
import { rect } from '../rect'
import { arc } from '../arc'
import { boundingBox } from '../bounding-box'
import { translate3d } from '../translate'

export const transform : Function = curry(function transform(
  matrices : Array<MatrixT | Function>,
  path : PathT,
  options : {} = {},
) : PathT {
  const bbox : RectT = boundingBox(path)
  const { transformOrigin } : PathTransformOptionsT = transformOptions(options)
  const origin : AbsoluteCoordsT = absolute(transformOrigin, bbox)
  const transformMatrix : MatrixT = transformList(matrices, bbox, origin)

  return transformFromOrigin(
    transformPath(options),
    transformMatrix,
    path,
    origin,
  )
})

const transformOptions : Function = curry(function transformOptions(
  options : {} = {},
) : PathTransformOptionsT {
  return {
    indices: [],
    transformOrigin: { x: 0, y: 0 },
    ...options,
  }
})

const transformList : Function = curry(function transformList(
  matrices : Array<MatrixT | Function>,
  bbox : RectT,
  origin : AbsoluteCoordsT,
) : MatrixT {
  return matrices.reduce(
    (
      transformMatrix : MatrixT,
      matrix : MatrixT | Function,
    ) : MatrixT => typeof matrix === 'function' ?
      matrix(
        transformMatrix,
        transformFromOrigin(
          transformRect,
          transformMatrix,
          bbox,
          origin,
        ),
      ) :
      multiply(
        transformMatrix,
        matrix,
      ),
    identity(),
  )
})

const transformFromOrigin : Function = curry(function transformFromOrigin(
  transformer : Function,
  transformMatrix : MatrixT,
  primitive : any,
  origin : AbsoluteCoordsT,
) : any {
  if (origin.x !== 0 || origin.y !== 0 || origin.z !== 0) {
    const I : MatrixT = identity()
    const forward : MatrixT = translate3d(origin.x, origin.y, origin.z, I)
    const backward : MatrixT = translate3d(-origin.x, -origin.y, -origin.z, I)

    const translatedBackward : any = transformer(backward, primitive)
    const transformed : any = transformer(transformMatrix, translatedBackward)

    return transformer(forward, transformed)
  }

  return transformer(transformMatrix, primitive)
})

const transformPath : Function = curry(function transformPath(
  options : Object,
  transformMatrix : MatrixT,
  path : PathT,
) : PathT {
  const { indices } : PathTransformOptionsT = transformOptions(options)

  return path.reduce(
    (
      acc : PathT,
      current : PointT,
      index : number,
    ) : PathT => {
      if (indices.length > 0 && !indices.includes(index)) {
        acc.push(current)
      } else {
        const previous : PointT = index > 0 ? path[index - 1] : point()
        const tPrevious : PointT = acc.length > 0 ? acc[acc.length - 1] : point()

        const tCurrent : PointT = adjust(
          transformPoint(transformMatrix, previous, current),
          tPrevious,
          index,
        )

        acc.push(tCurrent)
      }

      return acc
    },
    [],
  )
})

const transformPoint : Function = curry(function transformPoint(
  transformMatrix : MatrixT,
  previous : PointT,
  current : PointT,
) : PointT {
  const vPosition : VectorT = vec(current.x, current.y, 0, 1)
  const [x, y, , w] : VectorT = multiplyVec(transformMatrix, vPosition)

  return point(
    current.code,
    x / w,
    y / w,
    transformParameters(transformMatrix, previous, current),
  )
})

const transformParameters : Function = curry(function transformParameters(
  transformMatrix : MatrixT,
  previous : PointT,
  current : PointT,
) : PointParamsT {
  return {
    ...transformAnchor(transformMatrix, current, 1),
    ...transformAnchor(transformMatrix, current, 2),
    ...transformArc(transformMatrix, previous, current),
  }
})

const transformAnchor : Function = curry(function transformAnchor(
  transformMatrix : MatrixT,
  current : PointT,
  n : number = 1,
) : PointParamsT {
  const xn : string = `x${ n }`
  const yn : string = `y${ n }`
  const ax : number = current.parameters[xn]
  const ay : number = current.parameters[yn]

  if (typeof ax !== 'undefined' && typeof ay !== 'undefined') {
    const vPosition : VectorT = vec(ax, ay, 0, 1)
    const [x, y, , w] : VectorT = multiplyVec(transformMatrix, vPosition)

    return {
      [xn]: x / w,
      [yn]: y / w,
    }
  }

  return {}
})

const transformArc : Function = curry(function transformArc(
  transformMatrix : MatrixT,
  previous : PointT,
  current : PointT,
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
    ), transformMatrix)

    return {
      rx: V[0],
      ry: V[1],
      rotation: radToDeg(V[2]),
      large,
      sweep,
    }
  }

  return {}
})

const transformRect : Function = curry(function transformRect(
  transformMatrix : MatrixT,
  primitive : RectT,
) : RectT {
  const vMin : VectorT = vec(primitive.x, primitive.y, 0, 1)
  const [x0, y0] : VectorT = multiplyVec(transformMatrix, vMin)

  const vMax : VectorT = vec(primitive.x + primitive.width, primitive.y + primitive.height, 0, 1)
  const [x1, y1] : VectorT = multiplyVec(transformMatrix, vMax)

  return rect(x0, y0, x1 - x0, y1 - y0)
})
