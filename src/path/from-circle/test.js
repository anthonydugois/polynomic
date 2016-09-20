import { xmlns } from "../../constants"
import isEqual from "../is-equal"
import fromCircle from "./index"

test("should get the corresponding path from the SVG circle node", () => {
  const node = document.createElementNS(xmlns, "circle")

  node.setAttributeNS(xmlns, "cx", 50)
  node.setAttributeNS(xmlns, "cy", 50)
  node.setAttributeNS(xmlns, "r", 50)

  const test = fromCircle(node)
  const expected = "M0 50A50 50 0 0 0 100 50A50 50 0 0 0 0 50Z"

  expect(isEqual(test, expected)).toBe(true)
})
