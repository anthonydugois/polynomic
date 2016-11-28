import { length, dot, angle } from './index'

test('should return the length of the vector', () => {
  const test = length([5, 0, 0, 1])
  const expected = 5

  expect(test).toBe(expected)
})

test('should return the dot product of the vectors', () => {
  const test = dot(
    [5, 0, 0, 1],
    [2, 5, 0, 1],
  )
  const expected = 10

  expect(test).toBe(expected)
})

test('should return the angle between the vectors', () => {
  const test = angle(
    [5, 0, 0, 1],
    [0, -5, 0, 1],
  )
  const expected = -Math.PI / 2

  expect(test).toBe(expected)
})
