import matrixOrigin from "lib/transforms/matrix-origin"
import { parseDeg, degToRad } from "lib/utils"

export default function skew(path, thetaX, thetaY, x = 0, y = 0) {
  if (typeof thetaY === "undefined") {
    thetaY = thetaX
  }

  if (typeof thetaX === "string") {
    thetaX = degToRad(parseDeg(thetaX))
  }

  if (typeof thetaY === "string") {
    thetaY = degToRad(parseDeg(thetaY))
  }

  return matrixOrigin(path, [
    1, Math.tan(thetaX), 0,
    Math.tan(thetaY), 1, 0,
    0, 0, 1,
  ], x, y)
}
