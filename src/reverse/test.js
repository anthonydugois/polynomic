import { parse } from '../parse'
import { isEqual } from '../is-equal'
import { reverse } from './index'

test('should reverse the path', () => {
  const path = parse('M 0 0 H 100 Q 150 0 150 100 T 200 150 T 250 200 V 200 A 50 50 0 0 1 250 250 V 350 H 350 C 400 350 400 450 400 550 S 400 700 300 700 z M 500 350 L 450 250 V 100 H 600 L 650 250 T 655 250 S 20 20 20 20 z')
  const test = reverse(path)
  const expected = 'M20 20C20 20 655 250 655 250Q650 250 650 250L600 100H450V250L500 350zM300 700C400 700 400 650 400 550C400 450 400 350 350 350H250V250A50 50 0 0 0 250 200V200Q250 100 200 150Q150 200 150 100Q150 0 100 0H0z'

  expect(isEqual(test, expected)).toBe(true)
})

test('should reverse the reversed path and give the exact initial path', () => {
  const path = parse('M0 0 L100 0z M50 50 L100 100')
  const reversed = reverse(path)
  const test = reverse(reversed)
  const expected = path

  expect(isEqual(test, expected)).toBe(true)
})
