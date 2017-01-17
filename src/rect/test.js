import { rect } from './index'

test('should return the object representation of a rect', () => {
  const test = rect(0, 0, 50, 50, 5)
  const expected = {
    type: 'rect',
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    rx: 5,
    ry: 5,
  }

  expect(test).toEqual(expected)
})
