import matrixOrigin from "bernstein-matrix-origin-path"

export default function scale(path, sx, sy, ...origin) {
  // uniform scaling
  if (typeof sy === "undefined") {
    sy = sx
  }

  return matrixOrigin(path, [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1,
  ], ...origin)
}
