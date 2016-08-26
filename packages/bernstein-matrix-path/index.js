import Point, { defaultPoint } from "bernstein-point"
import translate from "bernstein-translate-path"
import boundingBox from "bernstein-path-boundingbox"

const POSITIONS = {
  left: 0,
  right: 100,
  top: 0,
  bottom: 100,
  center: 50,
}

function relativeToAbsoluteX(x, bbox) {
  x = x.toLowerCase()
  x = Object.keys(POSITIONS).indexOf(x) > -1 ? POSITIONS[x] : parseRelative(x)

  return bbox.xMin + ((bbox.width * x) / 100)
}

function relativeToAbsoluteY(y, bbox) {
  y = y.toLowerCase()
  y = Object.keys(POSITIONS).indexOf(y) > -1 ? POSITIONS[y] : parseRelative(y)

  return bbox.yMin + ((bbox.height * y) / 100)
}

function parseRelative(str) {
  return parseFloat(str.replace("%", ""))
}

export default function matrix(path, m, x = 0, y = 0) {
  if (typeof x === "string" || typeof y === "string") {
    const bbox = boundingBox(path)

    if (typeof x === "string") {
      x = relativeToAbsoluteX(x, bbox)
    }

    if (typeof y === "string") {
      y = relativeToAbsoluteY(y, bbox)
    }
  }

  if (x !== 0 || y !== 0) {
    path = translate(path, -x, -y)
    path = transformer(path, m)
    path = translate(path, x, y)
  } else {
    path = transformer(path, m)
  }

  return path
}

function transformer(path, m) {
  let lastComputedPoint = defaultPoint

  return path.map((p, i) => {
    const prev = i > 0 && path[i - 1]
    const px = typeof p.x === "number" ? p.x : prev.x
    const py = typeof p.y === "number" ? p.y : prev.y
    const px1 = typeof p.parameters.x1 === "number" && p.parameters.x1
    const py1 = typeof p.parameters.y1 === "number" && p.parameters.y1
    const px2 = typeof p.parameters.x2 === "number" && p.parameters.x2
    const py2 = typeof p.parameters.y2 === "number" && p.parameters.y2

    // compute position
    const [x, y] = multiply3x1(m, [px, py, 1])

    // get point code
    let code = p.code

    if (
      (p.isH() && y !== lastComputedPoint.y)
      || (p.isV() && x !== lastComputedPoint.x)
    ) {
      code = p.isRelative() ? "l" : "L"
    }

    // compute parameters
    let x1, y1, x2, y2

    if (px1 !== false && py1 !== false) {
      [x1, y1] = multiply3x1(m, [px1, py1, 1])
    }

    if (px2 !== false && py2 !== false) {
      [x2, y2] = multiply3x1(m, [px2, py2, 1])
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
    lastComputedPoint = new Point(code, x, y, parameters)

    return lastComputedPoint
  })
}

export function multiply3x1(a, b) {
  const a00 = a[(0 * 3) + 0]
  const a01 = a[(0 * 3) + 1]
  const a02 = a[(0 * 3) + 2]
  const a10 = a[(1 * 3) + 0]
  const a11 = a[(1 * 3) + 1]
  const a12 = a[(1 * 3) + 2]
  const a20 = a[(2 * 3) + 0]
  const a21 = a[(2 * 3) + 1]
  const a22 = a[(2 * 3) + 2]
  const b0 = b[0]
  const b1 = b[1]
  const b2 = b[2]

  return [
    (a00 * b0) + (a01 * b1) + (a02 * b2),
    (a10 * b0) + (a11 * b1) + (a12 * b2),
    (a20 * b0) + (a21 * b1) + (a22 * b2),
  ]
}
