// @flow

import type { PointT, PathT, RectT } from '../../types'

import { point } from '../../point'
import { isM, isZ } from '../../point/is'
import { toCubic } from '../../effects/to-cubics'

type BoundingBoxT = {
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
}

export function boundingBox(
  path: PathT,
): RectT {
  const first: PointT = path[0]
  const bbox: BoundingBoxT = toCubic(path).reduce(
    (
      acc: BoundingBoxT,
      current: PointT,
      index: number,
      cubicPath: PathT,
    ): BoundingBoxT => {
      if (isM(current) || isZ(current)) {
        acc.xMin = Math.min(acc.xMin, current.x)
        acc.xMax = Math.max(acc.xMax, current.x)
        acc.yMin = Math.min(acc.yMin, current.y)
        acc.yMax = Math.max(acc.yMax, current.y)
      } else {
        const bbox: BoundingBoxT = cubicBoundingBox(
          cubicPath[index - 1],
          current,
        )

        acc.xMin = Math.min(acc.xMin, bbox.xMin)
        acc.xMax = Math.max(acc.xMax, bbox.xMax)
        acc.yMin = Math.min(acc.yMin, bbox.yMin)
        acc.yMax = Math.max(acc.yMax, bbox.yMax)
      }

      return acc
    },
    {
      xMin: first.x,
      xMax: first.x,
      yMin: first.y,
      yMax: first.y,
    },
  )

  return {
    x: bbox.xMin,
    y: bbox.yMin,
    width: bbox.xMax - bbox.xMin,
    height: bbox.yMax - bbox.yMin,
  }
}

function cubicBoundingBox(
  previous: PointT,
  current: PointT,
): BoundingBoxT {
  const p0: PointT = point(
    '',
    previous.x,
    previous.y,
  )

  const p1: PointT = point(
    '',
    typeof current.parameters.x1 !== 'undefined' ?
      current.parameters.x1 :
      0,
    typeof current.parameters.y1 !== 'undefined' ?
      current.parameters.y1 :
      0,
  )

  const p2: PointT = point(
    '',
    typeof current.parameters.x2 !== 'undefined' ?
      current.parameters.x2 :
      0,
    typeof current.parameters.y2 !== 'undefined' ?
      current.parameters.y2 :
      0,
  )

  const p3: PointT = point(
    '',
    current.x,
    current.y,
  )

  const x: { min: number, max: number } = getMinMax(p0.x, p1.x, p2.x, p3.x)
  const y: { min: number, max: number } = getMinMax(p0.y, p1.y, p2.y, p3.y)

  return {
    xMin: x.min,
    xMax: x.max,
    yMin: y.min,
    yMax: y.max,
  }
}

function getMinMax(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
): { min: number, max: number } {
  const a: number = ((3 * p3) - (9 * p2)) + ((9 * p1) - (3 * p0))
  const b: number = ((6 * p0) - (12 * p1)) + (6 * p2)
  const c: number = (3 * p1) - (3 * p0)
  const delta: number = (b ** 2) - (4 * a * c)

  let min: number = Math.min(p0, p3)
  let max: number = Math.max(p0, p3)

  if (a === 0) {
    if (b !== 0) {
      const t: number = -c / b
      const p: number = bezier(p0, p1, p2, p3, t)

      min = Math.min(min, p)
      max = Math.max(max, p)
    }
  } else if (delta >= 0) {
    const t1: number = (-b + Math.sqrt(delta)) / (2 * a)
    const t2: number = (-b - Math.sqrt(delta)) / (2 * a)

    if (t1 > 0 && t1 < 1) {
      const p: number = bezier(p0, p1, p2, p3, t1)

      min = Math.min(min, p)
      max = Math.max(max, p)
    }

    if (t2 > 0 && t2 < 1) {
      const p: number = bezier(p0, p1, p2, p3, t2)

      min = Math.min(min, p)
      max = Math.max(max, p)
    }
  }

  return { min, max }
}

function bezier(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number,
): number {
  return (p0 * ((1 - t) ** 3))
    + (p1 * 3 * t * ((1 - t) ** 2))
    + (p2 * 3 * (t ** 2) * (1 - t))
    + (p3 * (t ** 3))
}
