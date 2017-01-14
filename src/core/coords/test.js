import {
  coords,
  weakCoords,
  relativeCoords,
} from './index'

import { rect } from '../../rect'

test('should return the object representation of coordinates', () => {
  const test = coords(10, 20, 30)
  const expected = {
    x: 10,
    y: 20,
    z: 30,
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of weak coordinates', () => {
  const test = weakCoords(10, 20)
  const expected = {
    x: 10,
    y: 20,
  }

  expect(test).toEqual(expected)
})

test('should convert relative coords to absolute coords', () => {
  const test = relativeCoords(
    rect(0, 0, 100, 100),
    weakCoords('50%', 'center'),
  )
  const expected = {
    x: 50,
    y: 50,
    z: 0,
  }

  expect(test).toEqual(expected)
})
