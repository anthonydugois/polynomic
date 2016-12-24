import { adjust } from './index'
import { M, L, H, V, Q, T, C, S, A, Z } from '../../points'

test('should convert the first point into a M point', () => {
  const test = adjust(L(50, 50)(), undefined, 0)
  const expected = M(50, 50)()

  expect(test).toEqual(expected)
})

test('should convert the point into a M point', () => {
  const test = adjust(L(50, 50)(), Z()(), 1)
  const expected = M(50, 50)()

  expect(test).toEqual(expected)
})

test('should not convert the point into a M point', () => {
  const test = adjust(M(50, 50)(), Z()(), 1)
  const expected = M(50, 50)()

  expect(test).toEqual(expected)
})

test('should convert the H point into a L point', () => {
  const test = adjust(
    H(50)(M(25, 25)()),
    M(0, 0)(),
    1,
  )
  const expected = L(50, 25)()

  expect(test).toEqual(expected)
})

test('should convert the V point into a L point', () => {
  const test = adjust(
    V(50)(M(25, 25)()),
    M(0, 0)(),
    1,
  )
  const expected = L(25, 50)()

  expect(test).toEqual(expected)
})

test('should convert the T point into a Q point', () => {
  const test = adjust(
    T(100, 100)(Q(25, 25, 50, 50)()),
    M(0, 0)(),
    1,
  )
  const expected = Q(75, 75, 100, 100)()

  expect(test).toEqual(expected)
})

test('should convert the T point into a Q point', () => {
  const test = adjust(
    T(100, 100)(Q(25, 25, 50, 50)()),
    Q(25, 25, 75, 75)(),
    1,
  )
  const expected = Q(75, 75, 100, 100)()

  expect(test).toEqual(expected)
})

test('should convert the S point into a C point', () => {
  const test = adjust(
    S(125, 125, 150, 150)(C(25, 25, 50, 50, 75, 75)()),
    M(0, 0)(),
    1,
  )
  const expected = C(100, 100, 125, 125, 150, 150)()

  expect(test).toEqual(expected)
})

test('should convert the S point into a C point', () => {
  const test = adjust(
    S(125, 125, 150, 150)(C(25, 25, 50, 50, 75, 75)()),
    C(50, 50, 60, 60, 70, 70)(),
    1,
  )
  const expected = C(100, 100, 125, 125, 150, 150)()

  expect(test).toEqual(expected)
})
