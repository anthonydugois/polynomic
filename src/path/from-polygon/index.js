import { xmlns } from "../../constants"
import { M, L, Z } from "../../point/points"
import segments from "../../pathstring/segments"

export default function fromPolygon(node) {
  if (node.nodeName.toLowerCase() !== "polygon") {
    throw new Error("The element you provided in the `fromPolygon` function is not a valid SVG polygon node.")
  }

  const points = node.getAttributeNS(xmlns, "points")
  const coords = segments(points)[0]

  let first

  return coords.reduce(
    (acc, coord, index) => {
      // x coordinate
      if (index % 2 === 0) {
        const x = coord
        const y = coords[index + 1]

        return [
          ...acc,
          index === 0 ? first = M(x, y) : L(x, y),
        ]
      }

      // close the polygon
      if (index === coords.length - 1) {
        return [
          ...acc,
          Z(first),
        ]
      }

      return acc
    },
    [],
  )
}
