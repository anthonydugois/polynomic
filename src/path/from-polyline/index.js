import { xmlns } from "../../constants"
import { M, L } from "../../point/points"
import segments from "../../pathstring/segments"

export default function fromPolyline(node) {
  if (node.nodeName.toLowerCase() !== "polyline") {
    throw new Error("The element you provided in the `fromPolyline` function is not a valid SVG polyline node.")
  }

  const points = node.getAttributeNS(xmlns, "points")
  const coords = segments(points)[0]

  return coords.reduce(
    (acc, coord, index) => {
      // x coordinate
      if (index % 2 === 0) {
        const x = coord
        const y = coords[index + 1]

        // first point
        if (index === 0) {
          return [
            ...acc,
            M(x, y),
          ]
        }

        return [
          ...acc,
          L(x, y),
        ]
      }

      return acc
    },
    [],
  )
}
