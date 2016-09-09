import matrixOrigin from "../matrix-origin"

export default function scale(path, sx, sy, x = 0, y = 0) {
  // uniform scaling
  if (typeof sy === "undefined") {
    sy = sx
  }

  return matrixOrigin(path, [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1,
  ], x, y)
}
