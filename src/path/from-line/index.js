import { xmlns } from "../../constants"
import { M, L } from "../../points"

export default function fromLine(node) {
  if (node.nodeName.toLowerCase() !== "line") {
    throw new Error("The element you provided in the `fromLine` function is not a valid SVG line node.")
  }

  const x1 = node.getAttributeNS(xmlns, "x1")
  const y1 = node.getAttributeNS(xmlns, "y1")
  const x2 = node.getAttributeNS(xmlns, "x2")
  const y2 = node.getAttributeNS(xmlns, "y2")

  return [
    M(x1, y1),
    L(x2, y2),
  ]
}
