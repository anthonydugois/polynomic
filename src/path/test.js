import { path } from './index'
import { M, l, z } from '../points'

test('should return an array of points', () => {
  const test = path([
    M(0, 0),
    l(50, 50),
    l(50, 50),
    l(50, 50),
    z(),
  ])
  const expected = [
    M(0, 0),
    l(50, 50, M(0, 0)),
    l(50, 50, l(50, 50, M(0, 0))),
    l(50, 50, l(50, 50, l(50, 50, M(0, 0)))),
    z(M(0, 0)),
  ]

  expect(test).toEqual(expected)
})
