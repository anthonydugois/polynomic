import { M, L, A, Z } from "../../point/points"

export default function fromRect(node) {
  if (node.nodeName.toLowerCase() !== "rect") {
    throw new Error("The element you provided in the `fromLine` function is not a valid SVG rect node.")
  }

  const x = parseFloat(node.getAttribute("x"))
  const y = parseFloat(node.getAttribute("y"))
  const width = parseFloat(node.getAttribute("width"))
  const height = parseFloat(node.getAttribute("height"))

  let rx = parseFloat(node.getAttribute("rx"))
  let ry = parseFloat(node.getAttribute("ry"))

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

  rx = isNaN(rx) ? ry : rx
  ry = isNaN(ry) ? rx : ry

  const first = M(x + rx, y)

  return [
    first,
    L((x + width) - rx, y),
    A(rx, ry, 0, 0, 1, x + width, y + ry),
    L(x + width, (y + height) - ry),
    A(rx, ry, 0, 0, 1, (x + width) - rx, y + height),
    L(x + rx, y + height),
    A(rx, ry, 0, 0, 1, x, (y + height) - ry),
    L(x, y + ry),
    A(rx, ry, 0, 0, 1, x + rx, y),
    Z(first),
  ]
}
