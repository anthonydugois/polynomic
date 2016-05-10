import matrix from "bernstein-matrix-path"

export default function scale(path, sx, sy) {
  return matrix(path, [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1,
  ])
}
