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

import { identity, multiplyVec } from '../core/matrix'
import { vec } from '../core/vector'
import { point } from '../core/point'
import { transformPoint } from '../core/transform'
import { correct } from '../core/adjust'
import { absoluteCoords } from '../core/absolute'
import { rect } from '../rect'
import { boundingBox } from '../bounding-box'
import { translate3d } from '../translate'

export function transform(
  ...matrices: Array<Function>
) : Function {
  const list : Function = transformList(...matrices)

  return (
    path : PathT,
    options : {} = {},
  ) : PathT => {
    const transformer : Function = transformFromOrigin(transformPath(options))

    const bbox : RectT = boundingBox(path)
    const opt : PathTransformOptionsT = transformOptions(options)
    const origin : AbsoluteCoordsT = absoluteCoords(opt.transformOrigin, bbox)

    const T : MatrixT = list(bbox, origin)

    return transformer(path, T, origin)
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
  const transformer : Function = transformFromOrigin(transformRect())

  return (
    bbox : RectT,
    origin : AbsoluteCoordsT,
  ) : MatrixT => {
    return matrices.reduce(
      (
        T : MatrixT,
        matrix : Function,
      ) : MatrixT => matrix(T, transformer(bbox, T, origin)),
      identity(),
    )
  }
}

function transformFromOrigin(
  transformer : Function,
) : Function {
  return function transformFromOrigin(
    primitive : any,
    T : MatrixT,
    origin : AbsoluteCoordsT,
  ) : PathT {
    const shouldTransformFromOrigin : boolean = origin.x !== 0
      || origin.y !== 0
      || origin.z !== 0

    if (shouldTransformFromOrigin) {
      const forward : MatrixT = translate3d(origin.x, origin.y, origin.z)()
      const backward : MatrixT = translate3d(-origin.x, -origin.y, -origin.z)()

      const translatedBackward : any = transformer(primitive, backward)
      const transformed : any = transformer(translatedBackward, T)

      return transformer(transformed, forward)
    }

    return transformer(primitive, T)
  }
}

function transformPath(
  options : {} = {},
) : Function {
  const opt : PathTransformOptionsT = transformOptions(options)

  return function transformPath(
    path : PathT,
    T : MatrixT,
  ) : PathT {
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
}

function transformRect() : Function {
  return function transformRect(
    bbox : RectT,
    T : MatrixT,
  ) : RectT {
    const vMin : VectorT = vec(bbox.x, bbox.y, 0, 1)
    const [x0, y0] : VectorT = multiplyVec(T, vMin)

    const vMax : VectorT = vec(bbox.x + bbox.width, bbox.y + bbox.height, 0, 1)
    const [x1, y1] : VectorT = multiplyVec(T, vMax)

    return rect(x0, y0, x1 - x0, y1 - y0)
  }
}
