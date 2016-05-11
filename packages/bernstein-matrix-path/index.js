import Point from "bernstein-point"
import { isH, isV } from "bernstein-point-is"
import isRelative from "bernstein-point-is-relative"

export default function matrix(path, a) {
  let lastComputedPoint

  return path.map((p, i) => {
    const prev = i > 0 && path[i - 1]
    const px = typeof p.x === "number" ? p.x : prev.x
    const py = typeof p.y === "number" ? p.y : prev.y
    const px1 = typeof p.parameters.x1 === "number" && p.parameters.x1
    const py1 = typeof p.parameters.y1 === "number" && p.parameters.y1
    const px2 = typeof p.parameters.x2 === "number" && p.parameters.x2
    const py2 = typeof p.parameters.y2 === "number" && p.parameters.y2

    // compute position
    const [x, y] = multiply3x1(a, [px, py, 1])

    // get point code
    let code = p.code

    if (
      (isH(p) && y !== lastComputedPoint.y)
      || (isV(p) && x !== lastComputedPoint.x)
    ) {
      code = isRelative(p) ? "l" : "L"
    }

    // compute parameters
    let x1, y1, x2, y2

    if (px1 !== false && py1 !== false) {
      [x1, y1] = multiply3x1(a, [px1, py1, 1])
    }

    if (px2 !== false && py2 !== false) {
      [x2, y2] = multiply3x1(a, [px2, py2, 1])
    }

    const parameters = {
      ...p.parameters,
      ...(typeof x1 !== "undefined" && { x1 }),
      ...(typeof y1 !== "undefined" && { y1 }),
      ...(typeof x2 !== "undefined" && { x2 }),
      ...(typeof y2 !== "undefined" && { y2 }),
    }

    // this point will be used to know if the next H or V
    // should be converted into L
    lastComputedPoint = Point(code, x, y, parameters)

    return lastComputedPoint
  })
}

export function multiply3x1(a, b) {
  const a00 = a[0 * 3 + 0]
  const a01 = a[0 * 3 + 1]
  const a02 = a[0 * 3 + 2]
  const a10 = a[1 * 3 + 0]
  const a11 = a[1 * 3 + 1]
  const a12 = a[1 * 3 + 2]
  const a20 = a[2 * 3 + 0]
  const a21 = a[2 * 3 + 1]
  const a22 = a[2 * 3 + 2]
  const b0 = b[0]
  const b1 = b[1]
  const b2 = b[2]

  return [
    a00 * b0 + a01 * b1 + a02 * b2,
    a10 * b0 + a11 * b1 + a12 * b2,
    a20 * b0 + a21 * b1 + a22 * b2,
  ]
}
