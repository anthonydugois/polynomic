import { xmlns } from "../../constants"
import parse from "../../pathstring/parse"

export default function fromPath(node) {
  if (node.nodeName.toLowerCase() !== "path") {
    throw new Error("The element you provided in the `fromPath` function is not a valid SVG path node.")
  }

  const d = node.getAttributeNS(xmlns, "d")

  return parse(d)
}
