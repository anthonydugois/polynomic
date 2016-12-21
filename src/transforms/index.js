// @flow

import type {
  MatrixT,
  VectorT,
  AbsoluteCoordsT,
  PointT,
  PathT,
  PathTransformOptionsT,
  RectT,
} from '../types'

import { identity } from '../math/matrix'
import { point } from '../primitives/point'
import { boundingBox, transformBoundingBox } from '../properties/bounding-box'
import { translate3d } from './translate'
import { transform as transformPoint } from '../point/transform'
import { correct } from '../point/correct'
import { absoluteCoords } from '../utils/absolute'

export function transform(
  ...matrices: Array<Function>
) : Function {
  const makeMatrix : Function = transformList(...matrices)

  return (
    path : PathT,
    options : {} = {},
  ) : PathT => {
    const opt : PathTransformOptionsT = transformOptions(options)
    const matrix : MatrixT = makeMatrix(path)

    return applyMatrix(path, matrix, opt)
  }
}

function transformOptions(
  options : {} = {},
) : PathTransformOptionsT {
  return {
    indices: [],
    transformOrigin: { x: 0, y: 0 },
    ...options,
  }
}

function transformList(
  ...matrices: Array<Function>
) : Function {
  return (
    path : PathT,
  ) : MatrixT => {
    const bbox : RectT = boundingBox(path)

    return matrices.reduce(
      (
        acc : MatrixT,
        matrix : Function,
      ) : MatrixT => matrix(acc, transformBoundingBox(bbox, acc)),
      identity(),
    )
  }
}

function applyMatrix(
  path : PathT,
  matrix : MatrixT,
  options : {} = {},
) : PathT {
  const opt : PathTransformOptionsT = transformOptions(options)
  const { transformOrigin: origin } : PathTransformOptionsT = opt
  const shouldTransform : boolean = origin.x !== 0 || origin.y !== 0 || (
    typeof origin.z !== 'undefined'
    && origin.z !== 0
  )

  if (shouldTransform) {
    const { x, y, z } : AbsoluteCoordsT = absoluteCoords(
      origin,
      boundingBox(path),
    )

    const forward : MatrixT = translate3d(x, y, z)()
    const backward : MatrixT = translate3d(-x, -y, -z)()
    const translatedBackward : PathT = transformPath(path, backward, opt)
    const transformed : PathT = transformPath(translatedBackward, matrix, opt)

    return transformPath(transformed, forward, opt)
  }

  return transformPath(path, matrix, opt)
}

function transformPath(
  path : PathT,
  T : MatrixT,
  options : {} = {},
) : PathT {
  const opt : PathTransformOptionsT = transformOptions(options)

  return path.reduce(
    (
      acc : PathT,
      current : PointT,
      index : number,
    ) : PathT => {
      if (opt.indices.length > 0 && !opt.indices.includes(index)) {
        acc.push(current)
      } else {
        const previous : PointT = index > 0 ?
          path[index - 1] :
          point()

        const tPrevious : PointT = acc.length > 0 ?
          acc[acc.length - 1] :
          point()

        const tCurrent : PointT = correct(
          transformPoint(current, previous, T),
          tPrevious,
          index,
        )

        acc.push(tCurrent)
      }

      return acc
    },
    [],
  )
}
