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

test("should get the corresponding path from the rounded SVG rect node", () => {
  const node = document.createElementNS(xmlns, "rect")

  node.setAttributeNS(xmlns, "x", 0)
  node.setAttributeNS(xmlns, "y", 0)
  node.setAttributeNS(xmlns, "width", 100)
  node.setAttributeNS(xmlns, "height", 100)
  node.setAttributeNS(xmlns, "rx", 10)
  node.setAttributeNS(xmlns, "ry", 10)

  const test = fromRect(node)
  const expected = "M10 0L90 0A10 10 0 0 1 100 10L100 90A10 10 0 0 1 90 100L10 100A10 10 0 0 1 0 90L0 10A10 10 0 0 1 10 0Z"

  expect(isEqual(test, expected)).toBe(true)
})
