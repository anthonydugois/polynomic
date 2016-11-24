import { isEqual } from '../../path/is-equal'
import { fromCircle } from './index'

test('should get the corresponding path from the SVG circle node', () => {
  const node = document.createElement('circle')

  node.setAttribute('cx', 50)
  node.setAttribute('cy', 50)
  node.setAttribute('r', 50)

  const test = fromCircle(node)
  const expected = 'M0 50A50 50 0 0 0 100 50A50 50 0 0 0 0 50Z'

  expect(isEqual(test, expected)).toBe(true)
})
