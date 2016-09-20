import { xmlns } from "../../constants"
import { M, L, Z } from "../../point/points"

export default function fromRect(node) {
  if (node.nodeName.toLowerCase() !== "rect") {
    throw new Error("The element you provided in the `fromLine` function is not a valid SVG rect node.")
  }

  const x = parseFloat(node.getAttributeNS(xmlns, "x"))
  const y = parseFloat(node.getAttributeNS(xmlns, "y"))
  const width = parseFloat(node.getAttributeNS(xmlns, "width"))
  const height = parseFloat(node.getAttributeNS(xmlns, "height"))

  const first = M(x, y)

  return [
    first,
    L(x + width, y),
    L(x + width, y + height),
    L(x, y + height),
    Z(first),
  ]
}
