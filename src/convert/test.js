import { parse } from '../parse'
import { isEqual } from '../is-equal'
import { toCubics } from './index'

test('should convert points into cubic curves', () => {
  const path = parse('M0 0L100 0L100 100')
  const test = toCubics(path)
  const expected = 'M0 0C0 0 100 0 100 0C100 0 100 100 100 100'

  expect(isEqual(test, expected)).toBe(true)
})
