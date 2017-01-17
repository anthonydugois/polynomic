import { line } from './index'

test('should return the object representation of a line', () => {
  const test = line(0, 0, 50, 50)
  const expected = {
    type: 'line',
    x1: 0,
    y1: 0,
    x2: 50,
    y2: 50,
  }

  expect(test).toEqual(expected)
})
