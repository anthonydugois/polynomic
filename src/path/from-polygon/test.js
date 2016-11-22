import isEqual from "../is-equal"
import fromPolygon from "./index"

test('should get the corresponding path from the SVG polygon node', () => {
  const node = document.createElement('polygon')

  node.setAttribute('points', '0 0 100,100 150-150 5e-14-4')

  const test = fromPolygon(node)
  const expected = 'M0 0L100 100L150 -150L5e-14 -4Z'

  expect(isEqual(test, expected)).toBe(true)
})
