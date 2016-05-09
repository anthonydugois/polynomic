import matrix from "bernstein-matrix-path"

export default function scale(path, sx, sy) {
  return matrix(path, [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1,
  ])
}

export function scaleX(path, sx) {
  return matrix(path, [
    sx, 0, 0,
    0, 1, 0,
    0, 0, 1,
  ])
}

export function scaleY(path, sy) {
  return matrix(path, [
    1, 0, 0,
    0, sy, 0,
    0, 0, 1,
  ])
}
