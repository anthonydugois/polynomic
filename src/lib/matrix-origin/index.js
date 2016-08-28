import matrix from "lib/matrix"
import translate from "lib/translate"
import boundingBox from "lib/bounding-box"

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

export default function matrixOrigin(path, m, x = 0, y = 0) {
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
    path = matrix(path, m)
    path = translate(path, x, y)
  } else {
    path = matrix(path, m)
  }

  return path
}
