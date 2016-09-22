import { M, A, Z } from "../../point/points"

export default function fromEllipse(node) {
  if (node.nodeName.toLowerCase() !== "ellipse") {
    throw new Error("The element you provided in the `fromEllipse` function is not a valid SVG ellipse node.")
  }

  const cx = parseFloat(node.getAttribute("cx"))
  const cy = parseFloat(node.getAttribute("cy"))
  const rx = parseFloat(node.getAttribute("rx"))
  const ry = parseFloat(node.getAttribute("ry"))

  const first = M(cx - rx, cy)

  return [
    first,
    A(rx, ry, 0, 0, 0, cx + rx, cy),
    A(rx, ry, 0, 0, 0, cx - rx, cy),
    Z(first),
  ]
}
