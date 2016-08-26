import matrix from "bernstein-matrix-path"
import makeOriginAware from "bernstein-path-origin"

function parseDeg(str) {
  return parseFloat(str.replace("deg", ""))
}

function degToRad(deg) {
  return (Math.PI / 180) * deg
}

function rotate(path, theta) {
  if (typeof theta === "string") {
    theta = degToRad(parseDeg(theta))
  }

  return matrix(path, [
    Math.cos(theta), -Math.sin(theta), 0,
    Math.sin(theta), Math.cos(theta), 0,
    0, 0, 1,
  ])
}

export default (path, theta, ...origin) => makeOriginAware(
  rotate,
  ...origin,
)(path, theta)
