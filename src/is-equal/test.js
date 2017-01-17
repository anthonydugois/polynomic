import { isEqual } from './index'
import { parse } from '../parse'

test('should check that the paths are equal', () => {
  const test = isEqual(parse('M0 0l10 10'), 'M0 0l10 10')

  expect(test).toBe(true)
})

test('should check that the pathstrings are equal', () => {
  const test = isEqual('M0,000l10 10', 'M 0 0 l 10 , 10')

  expect(test).toBe(true)
})

test('should check that the paths are not equal', () => {
  const test = isEqual(parse('M0 0q10 10 20 20'), 'M0 0q15 10 20 20')

  expect(test).toBe(false)
})

test('should check that the pathstrings are not equal', () => {
  const test = isEqual('M0,0l10 10', 'M 0 0 l 10 , 10l20 20')

  expect(test).toBe(false)
})
