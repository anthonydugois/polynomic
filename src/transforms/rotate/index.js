import matrixOrigin from "../matrix-origin"
import { parseDeg, degToRad } from "../../utils"

export default function rotate(path, theta, x = 0, y = 0) {
  if (typeof theta === "string") {
    theta = degToRad(parseDeg(theta))
  }

  return matrixOrigin(path, [
    Math.cos(theta), -Math.sin(theta), 0,
    Math.sin(theta), Math.cos(theta), 0,
    0, 0, 1,
  ], x, y)
}
