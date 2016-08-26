import matrix from "bernstein-matrix-path"
import makeOriginAware from "bernstein-path-origin"

function skew(path, thetaX, thetaY) {
  return matrix(path, [
    1, Math.tan(thetaX), 0,
    Math.tan(thetaY), 1, 0,
    0, 0, 1,
  ])
}

export default (path, thetaX, thetaY, ...origin) => makeOriginAware(
  skew,
  ...origin,
)(path, thetaX, thetaY)
