import { ellipse } from './index'

test('should return the object representation of an ellipse', () => {
  const test = ellipse(0, 0, 50, 100)
  const expected = {
    cx: 0,
    cy: 0,
    rx: 50,
    ry: 100,
  }

  expect(test).toEqual(expected)
})
