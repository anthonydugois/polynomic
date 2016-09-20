import { xmlns } from "../../constants"
import { M, A, Z } from "../../point/points"

export default function fromEllipse(node) {
  if (node.nodeName.toLowerCase() !== "ellipse") {
    throw new Error("The element you provided in the `fromEllipse` function is not a valid SVG ellipse node.")
  }

  const cx = parseFloat(node.getAttributeNS(xmlns, "cx"))
  const cy = parseFloat(node.getAttributeNS(xmlns, "cy"))
  const rx = parseFloat(node.getAttributeNS(xmlns, "rx"))
  const ry = parseFloat(node.getAttributeNS(xmlns, "ry"))

  const first = M(cx - rx, cy)

  return [
    first,
    A(rx, ry, 0, 0, 0, cx + rx, cy),
    A(rx, ry, 0, 0, 0, cx - rx, cy),
    Z(first),
  ]
}
