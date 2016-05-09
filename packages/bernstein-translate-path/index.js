import matrix from "bernstein-matrix-path"

export default function translate(path, dx, dy) {
  return matrix(path, [
    1, 0, dx,
    0, 1, dy,
    0, 0, 1,
  ])
}

export function translateX(path, dx) {
  return matrix(path, [
    1, 0, dx,
    0, 1, 0,
    0, 0, 1,
  ])
}

export function translateY(path, dy) {
  return matrix(path, [
    1, 0, 0,
    0, 1, dy,
    0, 0, 1,
  ])
}
