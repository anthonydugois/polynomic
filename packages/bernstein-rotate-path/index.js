import matrix from "bernstein-matrix-path"

export default function rotate(path, theta) {
  return matrix(path, [
    Math.cos(theta), -Math.sin(theta), 0,
    Math.sin(theta), Math.cos(theta), 0,
    0, 0, 1,
  ])
}
