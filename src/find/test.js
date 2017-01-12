import { findLastM } from './index'
import { parse } from '../parse'

test('should find the last M point', () => {
  const test = findLastM(parse('M0 0L100 100L200 200'))
  const expected = {
    code: 'M',
    x: 0,
    y: 0,
    parameters: {},
  }

  expect(test).toEqual(expected)
})
