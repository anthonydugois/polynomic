import { point } from './index'
import * as codes from '../codes'

test('should return the object representation of a point', () => {
  const test = point(codes.q, 0, 0, {
    x1: 50,
    y1: 50,
  })
  const expected = {
    code: codes.q,
    x: 0,
    y: 0,
    parameters: {
      x1: 50,
      y1: 50,
    },
  }

  expect(test).toEqual(expected)
})
