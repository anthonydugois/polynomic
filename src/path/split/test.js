import parse from '../../pathstring/parse'
import { isM, isZ } from '../../point/is'
import isEqual from '../is-equal'
import split from './index'

test('should split the path and keep points on the previous path', () => {
  const path = parse('M0 0L100 0L100 100zM100 100L200 100L200 200zM200 200L300 200L300 300')
  const test = split(
    path,
    (point) => isZ(point),
    'before',
  )

  expect(isEqual(test[0], 'M0 0L100 0L100 100z')).toBe(true)
  expect(isEqual(test[1], 'M100 100L200 100L200 200z')).toBe(true)
  expect(isEqual(test[2], 'M200 200L300 200L300 300')).toBe(true)
})

test('should split the path and keep points on the next path', () => {
  const path = parse('M0 0L100 0L100 100zM100 100L200 100L200 200zM200 200L300 200L300 300')
  const test = split(
    path,
    (point) => isM(point),
    'after',
  )

  expect(isEqual(test[0], 'M0 0L100 0L100 100z')).toBe(true)
  expect(isEqual(test[1], 'M100 100L200 100L200 200z')).toBe(true)
  expect(isEqual(test[2], 'M200 200L300 200L300 300')).toBe(true)
})
