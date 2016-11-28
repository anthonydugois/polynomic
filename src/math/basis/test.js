import { linear, quadratic, cubic, arc } from './index'

test('should return the point located at the provided offset on the line', () => {
  const t = 0.5

  const test = linear(0, 0, 100, 0)(t)
  const expected = { x: 50, y: 0 }

  expect(test).toEqual(expected)
})

test('should return the point located at the provided offset on the quadratic curve', () => {
  const t = 0.5

  const test = quadratic(0, 0, 50, 50, 100, 0)(t)
  const expected = { x: 50, y: 25 }

  expect(test).toEqual(expected)
})

test('should return the point located at the provided offset on the cubic curve', () => {
  const t = 0.5

  const test = cubic(0, 0, 0, 50, 100, 50, 100, 0)(t)
  const expected = { x: 50, y: 37.5 }

  expect(test).toEqual(expected)
})

/*test('should return the point located at the provided offset on the arc', () => {
  const t = 0.5

  const test = arc(0, 0, 50, 100, 0, 1, 0, 50, 0)(t)
  const expected = { x: 50, y: 37.5 }

  expect(test).toEqual(expected)
})*/
