import { parse } from '../../pathstring/parse'
import { isEqual } from '../../path/is-equal'
import { toCubic } from './index'

test('should convert points into cubic curves', () => {
  const path = parse('M0 0L100 0L100 100')
  const test = toCubic(path)
  const expected = 'M0 0C0 0 100 0 100 0C100 0 100 100 100 100'

  expect(isEqual(test, expected)).toBe(true)
})
