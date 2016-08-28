import Point from "lib/point/points"
import { isM, isZ } from "lib/point/is"
import toCubics from "lib/to-cubics"

export default function boundingBox(rawPath) {
  const path = toCubics(rawPath)
  const x = []
  const y = []

  for (let i = 0 ; i < path.length ; i++) {
    const point = path[i]
    const prev = i > 0 && path[i - 1]

    if (isM(point) || isZ(point)) {
      x.push(point.x)
      y.push(point.y)
    } else {
      const { xMin, xMax, yMin, yMax } = cubicBoundingBox(prev, point)

      x.push(xMin, xMax)
      y.push(yMin, yMax)
    }
  }

  const xMin = Math.min(...x)
  const xMax = Math.max(...x)
  const yMin = Math.min(...y)
  const yMax = Math.max(...y)

  return {
    xMin,
    xMax,
    yMin,
    yMax,
    width: xMax - xMin,
    height: yMax - yMin,
  }
}

function cubicBoundingBox(prev, point) {
  const p0 = Point(null, prev.x, prev.y)
  const p1 = Point(null, point.parameters.x1, point.parameters.y1)
  const p2 = Point(null, point.parameters.x2, point.parameters.y2)
  const p3 = Point(null, point.x, point.y)

  const x = getMinMax(p0.x, p1.x, p2.x, p3.x)
  const y = getMinMax(p0.y, p1.y, p2.y, p3.y)

  return {
    xMin: x.min,
    xMax: x.max,
    yMin: y.min,
    yMax: y.max,
  }
}

function getMinMax(p0, p1, p2, p3) {
  const a = ((3 * p3) - (9 * p2)) + ((9 * p1) - (3 * p0))
  const b = ((6 * p0) - (12 * p1)) + (6 * p2)
  const c = (3 * p1) - (3 * p0)
  const d = (b ** 2) - (4 * a * c)

  let min = p0
  let max = p0

  if (p3 < min) {
    min = p3
  }

  if (p3 > max) {
    max = p3
  }

  if (d >= 0) {
    const t1 = (-b + Math.sqrt(d)) / (2 * a)

    if (t1 > 0 && t1 < 1) {
      const p = cubic(p0, p1, p2, p3, t1)

      if (p < min) {
        min = p
      }

      if (p > max) {
        max = p
      }
    }

    const t2 = (-b - Math.sqrt(d)) / (2 * a)

    if (t2 > 0 && t2 < 1) {
      const p = cubic(p0, p1, p2, p3, t2)

      if (p < min) {
        min = p
      }

      if (p > max) {
        max = p
      }
    }
  }

  return { min, max }
}

function cubic(p0, p1, p2, p3, t) {
  return (p0 * ((1 - t) ** 3))
    + (p1 * 3 * t * ((1 - t) ** 2))
    + (p2 * 3 * (t ** 2) * (1 - t))
    + (p3 * (t ** 3))
}
