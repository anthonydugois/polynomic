import {
  findLastPoint,
  findLastM,
  findLastQ,
  findLastIndexM,
  findLastIndexQ,
} from './index'

import { parse } from '../parse'

test('should find the last point', () => {
  const test = findLastPoint(parse('M0 0L100 100L200 200'))
  const expected = {
    type: 'point',
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
    type: 'point',
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
    type: 'point',
    code: '',
    x: 0,
    y: 0,
    parameters: {},
  }

  expect(test).toEqual(expected)
})

test('should return the index of last M point', () => {
  const test = findLastIndexM(parse('M0 0H100m10 10l50 50z'))
  const expected = 2

  expect(test).toBe(expected)
})

test('should not find the index of last Q point', () => {
  const test = findLastIndexQ(parse('M0 0H100m10 10l50 50z'))
  const expected = -1

  expect(test).toBe(expected)
})
