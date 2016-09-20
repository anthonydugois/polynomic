import { xmlns } from "../../constants"
import isEqual from "../is-equal"
import fromEllipse from "./index"

test("should get the corresponding path from the SVG ellipse node", () => {
  const node = document.createElementNS(xmlns, "ellipse")

  node.setAttributeNS(xmlns, "cx", 100)
  node.setAttributeNS(xmlns, "cy", 50)
  node.setAttributeNS(xmlns, "rx", 100)
  node.setAttributeNS(xmlns, "ry", 50)

  const test = fromEllipse(node)
  const expected = "M0 50A100 50 0 0 0 200 50A100 50 0 0 0 0 50Z"

  expect(isEqual(test, expected)).toBe(true)
})
