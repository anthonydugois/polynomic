import { hydrate } from './index'
import { m, l, h, v, q } from '../points'

test('should hydrate functions with correct previous points', () => {
  const test = hydrate(() => [
    m(0, 0),
    l(50, 50),
    h(50),
    v(50),
    q(25, 25, 50, 50),
  ])

  test().forEach((p) => expect(typeof p).not.toBe('function'))
})

test('should hydrate functions and return a correct path', () => {
  const test = hydrate(() => [
    m(0, 0),
    l(50, 50),
    h(50),
    v(50),
    q(25, 25, 50, 50),
  ])
  const expected = 'm0 0l50 50h50v50q25 25 50 50'

  expect(test()).toEqualPath(expected)
})
