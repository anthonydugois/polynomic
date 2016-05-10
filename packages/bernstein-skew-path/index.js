import matrix from "bernstein-matrix-path"

export default function skew(path, thetaX, thetaY) {
  return matrix(path, [
    1, Math.tan(thetaX), 0,
    Math.tan(thetaY), 1, 0,
    0, 0, 1,
  ])
}
