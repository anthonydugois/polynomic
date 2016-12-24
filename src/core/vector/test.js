import {
  vec,
  length,
  dot,
  cross,
  angle,
} from './index'

test('should return an array with a length of 4', () => {
  const test = vec()
  const expected = [0, 0, 0, 0]

  expect(test).toEqualCloseTo(expected)
})

test('should return the length of the vector', () => {
  const test = length(vec(5, 0, 0, 1))
  const expected = 5

  expect(test).toBeCloseTo(expected)
})

test('should return the dot product of the vectors', () => {
  const test = dot(
    vec(5, 0, 0, 1),
    vec(2, 5, 0, 1),
  )
  const expected = 10

  expect(test).toBeCloseTo(expected)
})

test('should return the cross product of the vectors', () => {
  const test = cross(
    vec(2, 3, 4, 1),
    vec(5, 6, 7, 1),
  )
  const expected = [-3, 6, -3, 1]

  expect(test).toEqualCloseTo(expected)
})

test('should return the angle between the vectors', () => {
  const test = angle(
    vec(5, 0, 0, 1),
    vec(0, -5, 0, 1),
  )
  const expected = -Math.PI / 2

  expect(test).toBeCloseTo(expected)
})
