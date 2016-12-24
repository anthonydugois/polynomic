import { ellipse } from './index'

test('should return the object representation of an ellipse', () => {
  const test = ellipse(0, 0, 50, 100, Math.PI / 2, 0, Math.PI)
  const expected = {
    cx: 0,
    cy: 0,
    rx: 50,
    ry: 100,
    phi: Math.PI / 2,
    start: 0,
    end: Math.PI,
  }

  expect(test).toEqual(expected)
})
