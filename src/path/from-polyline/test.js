import isEqual from "../is-equal"
import fromPolyline from "./index"

test("should get the corresponding path from the SVG polyline node", () => {
  const node = document.createElement("polyline")

  node.setAttribute("points", "0 0 100,100 150-150 5e-14-4")

  const test = fromPolyline(node)
  const expected = "M0 0L100 100L150 -150L5e-14 -4"

  expect(isEqual(test, expected)).toBe(true)
})
