import { path } from './index'
import { M, L, l, z } from '../point'

test('should return an array of points', () => {
  const test = path(
    M(0, 0),
    l(50, 50),
    l(50, 50),
    l(50, 50),
    z(),
  )
  const expected = [
    M(0, 0)(),
    l(50, 50)(M(0, 0)()),
    l(50, 50)(l(50, 50)(M(0, 0)())),
    l(50, 50)(l(50, 50)(l(50, 50)(M(0, 0)()))),
    z()(M(0, 0)()),
  ]

  expect(test).toEqual(expected)
})

test('should accept functions or points', () => {
  const test = path(
    M(0, 0)(),
    l(50, 50),
    L(50, 50)(),
    l(50, 50),
    z(),
  )
  const expected = [
    M(0, 0)(),
    l(50, 50)(M(0, 0)()),
    L(50, 50)(),
    l(50, 50)(L(50, 50)()),
    z()(M(0, 0)()),
  ]

  expect(test).toEqual(expected)
})
