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

import { degToRad, radToDeg } from '../core/angle'
import { identity, multiplyVec } from '../core/matrix'
import { vec } from '../core/vector'
import { point } from '../core/point'
import { adjust } from '../core/adjust'
import { absolute } from '../core/absolute'
import { transformArcParameters } from '../core/arc'
import { rect } from '../rect'
import { arc } from '../arc'
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
    const { transformOrigin } : PathTransformOptionsT = transformOptions(options)
    const origin : AbsoluteCoordsT = absolute(transformOrigin, bbox)

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
          const previous : PointT = index > 0 ? path[index - 1] : point()
          const tPrevious : PointT = acc.length > 0 ? acc[acc.length - 1] : point()

          const tCurrent : PointT = adjust(
            transformPoint(previous)(current, T),
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

const anchor1 : Function = transformAnchor(1)
const anchor2 : Function = transformAnchor(2)

function transformPoint(
  previous : PointT,
) : Function {
  const parameters : Function = transformParameters(previous)

  return function transformPoint(
    current : PointT,
    T : MatrixT,
  ) : PointT {
    const vPosition : VectorT = vec(current.x, current.y, 0, 1)
    const [x, y, , w] : VectorT = multiplyVec(T, vPosition)

    return point(
      current.code,
      x / w,
      y / w,
      parameters(current, T),
    )
  }
}

function transformParameters(
  previous : PointT,
) : Function {
  const arc : Function = transformArc(previous)

  return function transformParameters(
    current : PointT,
    T : MatrixT,
  ) : PointParamsT {
    return {
      ...anchor1(current, T),
      ...anchor2(current, T),
      ...arc(current, T),
    }
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
  previous : PointT,
) : Function {
  return function transformArc(
    current : PointT,
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
