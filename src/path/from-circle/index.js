import { M, A, Z } from "../../point/points"

export default function fromCircle(node) {
  if (node.nodeName.toLowerCase() !== "circle") {
    throw new Error("The element you provided in the `fromCircle` function is not a valid SVG circle node.")
  }

  const cx = parseFloat(node.getAttribute("cx"))
  const cy = parseFloat(node.getAttribute("cy"))
  const r = parseFloat(node.getAttribute("r"))

  const first = M(cx - r, cy)

  return [
    first,
    A(r, r, 0, 0, 0, cx + r, cy),
    A(r, r, 0, 0, 0, cx - r, cy),
    Z(first),
  ]
}
