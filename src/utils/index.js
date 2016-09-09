import boundingBox from "../path/bounding-box"

// alias for relative positions (%)
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

  return bbox.x + ((bbox.width * x) / 100)
}

function relativeToAbsoluteY(y, bbox) {
  y = y.toLowerCase()
  y = Object.keys(POSITIONS).indexOf(y) > -1 ? POSITIONS[y] : parseRelative(y)

  return bbox.y + ((bbox.height * y) / 100)
}

function parseRelative(str) {
  return parseFloat(str.replace("%", ""))
}

export function absoluteCoords(path, x, y) {
  if (typeof x === "string" || typeof y === "string") {
    const bbox = boundingBox(path)

    if (typeof x === "string") {
      x = relativeToAbsoluteX(x, bbox)
    }

    if (typeof y === "string") {
      y = relativeToAbsoluteY(y, bbox)
    }
  }

  return { x, y }
}

export function parseDeg(str) {
  return parseFloat(str.replace("deg", ""))
}

export function degToRad(deg) {
  return (Math.PI / 180) * deg
}
