import { absolute } from './index'
import { rect } from '../../rect'

test('should convert relative coords to absolute coords', () => {
  const test = absolute(
    rect(0, 0, 100, 100),
    {
      x: '50%',
      y: 'center',
    },
  )
  const expected = {
    x: 50,
    y: 50,
    z: 0,
  }

  expect(test).toEqual(expected)
})

test('should return absolute coords in any case', () => {
  const test = absolute(
    rect(0, 0, 100, 100),
    {},
  )
  const expected = {
    x: 0,
    y: 0,
    z: 0,
  }

  expect(test).toEqual(expected)
})
