import { center } from './index'
import { M, A } from '../../point'

test('should find the center of the ellipse', () => {
  const test = center(
    M(150, 0),
    A(150, 100, 0, 1, 0, 300, 100),
  )
  const expected = { x: 150, y: 100 }

  expect(test).toEqual(expected)
})

test('should find the center of the sweeped ellipse', () => {
  const test = center(
    M(150, 0),
    A(150, 100, 0, 1, 1, 300, 100),
  )
  const expected = { x: 300, y: 0 }

  expect(test).toEqual(expected)
})

test('should find the center of the linear ellipse', () => {
  const test = center(
    M(0, 0),
    A(0, 0, 0, 1, 0, 300, 0),
  )
  const expected = { x: 150, y: 0 }

  expect(test).toEqual(expected)
})

test('should find the center of the rotated ellipse', () => {
  const test = center(
    M(100, 0),
    A(100, 150, 90, 1, 0, 200, 150),
  )
  const expected = { x: 71.69029566002413, y: 98.20287535999285 }

  expect(test).toEqual(expected)
})
