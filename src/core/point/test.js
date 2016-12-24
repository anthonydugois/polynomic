import { point } from './index'
import { m } from '../codes'

test('should return the object representation of a point', () => {
  const test = point(m, 0, 0, { x1: 50, y1: 50 })
  const expected = {
    code: m,
    x: 0,
    y: 0,
    parameters: {
      x1: 50,
      y1: 50,
    },
  }

  expect(test).toEqual(expected)
})
