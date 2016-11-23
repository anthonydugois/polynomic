import { parse } from '../../pathstring/parse'
import { boundingBox } from './index'

test('should give the bounding box of the path', () => {
  const path = parse('M 200 150 L 300 200 C 300 300 400 300 400 200')

  const test = boundingBox(path)
  const expected = {
    x: 200,
    y: 150,
    width: 200,
    height: 125,
  }

  expect(test).toEqual(expected)
})
