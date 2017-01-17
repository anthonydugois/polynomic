import { point } from './index'
import { anchor } from '../parameters'

test('should return the object representation of a point', () => {
  const test = point('q', 0, 0, anchor(50, 50))
  const expected = {
    type: 'point',
    code: 'q',
    x: 0,
    y: 0,
    parameters: {
      x1: 50,
      y1: 50,
    },
  }

  expect(test).toEqual(expected)
})
