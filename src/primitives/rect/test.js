import { rect } from './index'

test('should return the object representation of a rect', () => {
  const test = rect(0, 0, 50, 50)
  const expected = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    rx: 0,
    ry: 0,
  }

  expect(test).toEqual(expected)
})
