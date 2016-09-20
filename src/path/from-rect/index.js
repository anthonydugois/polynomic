import { xmlns } from "../../constants"
import { M, L, A, Z } from "../../point/points"

export default function fromRect(node) {
  if (node.nodeName.toLowerCase() !== "rect") {
    throw new Error("The element you provided in the `fromLine` function is not a valid SVG rect node.")
  }

  const x = parseFloat(node.getAttributeNS(xmlns, "x"))
  const y = parseFloat(node.getAttributeNS(xmlns, "y"))
  const width = parseFloat(node.getAttributeNS(xmlns, "width"))
  const height = parseFloat(node.getAttributeNS(xmlns, "height"))
  const rx = parseFloat(node.getAttributeNS(xmlns, "rx"))
  const ry = parseFloat(node.getAttributeNS(xmlns, "ry"))

  if (isNaN(rx) && isNaN(ry)) {
    const first = M(x, y)

    return [
      first,
      L(x + width, y),
      L(x + width, y + height),
      L(x, y + height),
      Z(first),
    ]
  }

  const first = M(x + rx, y)

  return [
    first,
    L(x + width - rx, y),
    A(rx, ry, 0, 0, 1, x + width, y + ry),
    L(x + width, y + height - ry),
    A(rx, ry, 0, 0, 1, x + width - rx, y + height),
    L(x + rx, y + height),
    A(rx, ry, 0, 0, 1, x, y + height - ry),
    L(x, y + ry),
    A(rx, ry, 0, 0, 1, x + rx, y),
    Z(first),
  ]
}
