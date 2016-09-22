import isEqual from "../is-equal"
import fromPath from "./index"

test("should get the corresponding path from the SVG path node", () => {
  const path = "M0 0L100 100"
  const node = document.createElement("path")

  node.setAttribute("d", path)

  const test = fromPath(node)
  const expected = path

  expect(isEqual(test, expected)).toBe(true)
})
