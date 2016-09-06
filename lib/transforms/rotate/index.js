import matrixOrigin from "lib/transforms/matrix-origin"

function parseDeg(str) {
  return parseFloat(str.replace("deg", ""))
}

function degToRad(deg) {
  return (Math.PI / 180) * deg
}

export default function rotate(path, theta, ...origin) {
  if (typeof theta === "string") {
    theta = degToRad(parseDeg(theta))
  }

  return matrixOrigin(path, [
    Math.cos(theta), -Math.sin(theta), 0,
    Math.sin(theta), Math.cos(theta), 0,
    0, 0, 1,
  ], ...origin)
}
