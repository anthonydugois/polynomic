import isEqual from "../is-equal"
import fromLine from "./index"

test('should get the corresponding path from the SVG line node', () => {
  const node = document.createElement('line')

  node.setAttribute('x1', 0)
  node.setAttribute('y1', 0)
  node.setAttribute('x2', 100)
  node.setAttribute('y2', 100)

  const test = fromLine(node)
  const expected = 'M0 0L100 100'

  expect(isEqual(test, expected)).toBe(true)
})
