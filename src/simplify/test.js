import { parse } from '../parse'
import { isEqual } from '../is-equal'
import { simplify } from './index'

test('should simplify the path', () => {
  const path = parse('M0 0 L50 0 L100 5')
  const test = simplify(path, 5)
  const expected = 'M0 0 L100 5'

  expect(isEqual(test, expected)).toBe(true)
})

test('should not simplify the path', () => {
  const path = parse('M0 0 L50 0 L100 5')
  const test = simplify(path, 1)
  const expected = 'M0 0 L50 0 L100 5'

  expect(isEqual(test, expected)).toBe(true)
})
