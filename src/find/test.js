import {
  findLastPoint,
  findLastM,
  findLastQ,
} from './index'

import { parse } from '../parse'

test('should find the last point', () => {
  const test = findLastPoint(parse('M0 0L100 100L200 200'))
  const expected = {
    code: 'L',
    x: 200,
    y: 200,
    parameters: {},
  }

  expect(test).toEqual(expected)
})

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

test('should return a point even if there is no result', () => {
  const test = findLastQ(parse('M0 0L100 100L200 200'))
  const expected = {
    code: '',
    x: 0,
    y: 0,
    parameters: {},
  }

  expect(test).toEqual(expected)
})
