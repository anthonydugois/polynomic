import { xmlns } from "../../constants"
import isEqual from "../is-equal"
import _from from "./index"

test("should get the corresponding path from the SVG path node", () => {
  const path = "M0 0L100 100"
  const node = document.createElementNS(xmlns, "path")

  node.setAttributeNS(xmlns, "d", path)

  const test = _from(node)
  const expected = path

  expect(isEqual(test, expected)).toBe(true)
})

test("should get the corresponding path from the SVG line node", () => {
  const node = document.createElementNS(xmlns, "line")

  node.setAttributeNS(xmlns, "x1", 0)
  node.setAttributeNS(xmlns, "y1", 0)
  node.setAttributeNS(xmlns, "x2", 100)
  node.setAttributeNS(xmlns, "y2", 100)

  const test = _from(node)
  const expected = "M0 0L100 100"

  expect(isEqual(test, expected)).toBe(true)
})
