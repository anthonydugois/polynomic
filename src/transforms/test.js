import { transform } from './index'

import { translate } from './translate'
import { scale, scaleX } from './scale'
import { parse } from '../pathstring/parse'
import { isEqual } from '../path/is-equal'

test('should apply the transform on the arc', () => {
  const path = parse('M50 0A100 50 45 1 0 150 0')

  const test = transform(
    translate(100, 100),
    scale(1.5, 2),
  )(path)
  const expected = 'M175 100A83.8 178.997 -32.038 1 0 325 100'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply the transform on the arc', () => {
  const path = parse('M50 0A100 50 45 1 0 150 0')
  const test = transform(scaleX(2))(path, {
    transformOrigin: { x: 'center', y: 'center' },
  })

  console.log(test)
})

test('should apply the transform on the arc', () => {
  const path = parse('M50 0A100 50 45 1 0 150 0')
  const test = transform(translate(100, 100))(path)

  console.log(test)
})

test('should return a function and apply the transform list on the path', () => {
  const path = parse('M0 0L100 100Q200 125 200 200')

  const test = transform(
    translate(100, 100),
    scale(1.5, 2),
  )(path)
  const expected = 'M100 100L250 300Q400 350 400 500'

  expect(isEqual(test, expected)).toBe(true)
})
