import matrix from "transforms/matrix"
import { absoluteCoords } from "utils"

export default function translate(path, dx, dy) {
  const coords = absoluteCoords(path, dx, dy)

  return matrix(path, [
    1, 0, coords.x,
    0, 1, coords.y,
    0, 0, 1,
  ])
}
