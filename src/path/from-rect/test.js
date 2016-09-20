import { xmlns } from "../../constants"
import isEqual from "../is-equal"
import fromRect from "./index"

test("should get the corresponding path from the SVG rect node", () => {
  const node = document.createElementNS(xmlns, "rect")

  node.setAttributeNS(xmlns, "x", 0)
  node.setAttributeNS(xmlns, "y", 0)
  node.setAttributeNS(xmlns, "width", 100)
  node.setAttributeNS(xmlns, "height", 100)

  const test = fromRect(node)
  const expected = "M0 0L100 0L100 100L0 100Z"

  expect(isEqual(test, expected)).toBe(true)
})
