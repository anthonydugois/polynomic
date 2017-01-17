import { circle } from './index'

test('should return the object representation of a circle', () => {
  const test = circle(0, 0, 50)
  const expected = {
    type: 'circle',
    cx: 0,
    cy: 0,
    r: 50,
  }

  expect(test).toEqual(expected)
})
