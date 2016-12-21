import { transform } from './index'

import { translate } from './translate'
import { scale, scaleX } from './scale'
import { parse } from '../pathstring/parse'
import { isEqual } from '../path/is-equal'

test('should apply the transform on the arc', () => {
  const path = parse('M50 0A100 50 45 1 0 150 0')
  const test = transform(scaleX(2))(path)

  console.log(test)
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

test('should return a function and apply the transform on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')

  const test = transform(translate(100, 100))(path)
  const expected = 'M100 100L200 200Q250 250 300 300'

  expect(isEqual(test, expected)).toBe(true)
})
