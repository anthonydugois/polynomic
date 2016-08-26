import matrix from "bernstein-matrix-path"
import makeOriginAware from "bernstein-path-origin"

function scale(path, sx, sy) {
  return matrix(path, [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1,
  ])
}

export default (path, sx, sy, ...origin) => makeOriginAware(
  scale,
  ...origin,
)(path, sx, sy)
