import { add } from './index'
import { l, T, S, Z } from '../points'
import { parse } from '../parse'

test('should add and hydrate the point on the path', () => {
  const test = add(
    Z(),
    parse('M0 0L50 50'),
  )
  const expected = 'M0 0L50 50Z'

  expect(test).toEqualPath(expected)
})

test('should keep the path integrity by inserting a M point after the Z point', () => {
  const test = add(
    l(10, 10),
    parse('M0 0L50 50z'),
  )
  const expected = 'M0 0L50 50z M0 0l10 10'

  expect(test).toEqualPath(expected)
})

test('should add and hydrate the point on the path at the provided index', () => {
  const test = add(
    l(10, 10),
    parse('M0 0L50 50'),
    1,
  )
  const expected = 'M0 0l10 10L50 50'

  expect(test).toEqualPath(expected)
})

test('should add the path to the path at the provided index', () => {
  const test = add(
    parse('M100 100l50 50z'),
    parse('M0 0L50 50z M200 200l50 50z'),
    3,
  )
  const expected = 'M0 0L50 50z M100 100l50 50z M200 200l50 50z'

  expect(test).toEqualPath(expected)
})
