import {
  makeMod,
  flag,
  arcParameters,
  center,
  angles,
} from './index'

test('should make a function that returns the mod of a number', () => {
  const test = typeof makeMod(3)
  const expected = 'function'

  expect(test).toBe(expected)
})

test('should return the mod of a given number', () => {
  const test = makeMod(3)(5)
  const expected = 2

  expect(test).toBe(expected)
})

test('should normalize a number to have the flag 0', () => {
  const test = flag(0)
  const expected = 0

  expect(test).toBe(expected)
})

test('should normalize a number to have the flag 1', () => {
  const test = flag(8)
  const expected = 1

  expect(test).toBe(expected)
})

test('should find the center of the ellipse', () => {
  const test = center(150, 0, 150, 100, 0, 1, 0, 300, 100)
  const expected = { x: 150, y: 100 }

  expect(test).toEqual(expected)
})

test('should find the center of the inversed ellipse', () => {
  const test = center(150, 0, 150, 100, 0, 1, 1, 300, 100)
  const expected = { x: 300, y: 0 }

  expect(test).toEqual(expected)
})

test('should find the center of the line', () => {
  const test = center(0, 0, 0, 0, 0, 1, 0, 300, 0)
  const expected = { x: 150, y: 0 }

  expect(test).toEqual(expected)
})

test('should find the center of the rotated ellipse', () => {
  const test = center(100, 0, 100, 150, Math.PI / 2, 1, 0, 200, 150)
  const expected = { x: 71.69029566002413, y: 98.20287535999285 }

  expect(test).toEqual(expected)
})

test('should find the angles of the points on the ellipse', () => {
  const test = angles(150, 0, 150, 100, 0, 1, 0, 300, 100)
  const expected = {
    start: -Math.PI / 2,
    end: -0,
    delta: -3 / 2 * Math.PI,
  }

  expect(test).toEqual(expected)
})

test('should find the angles of the points on the inversed ellipse', () => {
  const test = angles(150, 0, 150, 100, 0, 1, 1, 300, 100)
  const expected = {
    start: Math.PI,
    end: Math.PI / 2,
    delta: 3 / 2 * Math.PI,
  }

  expect(test).toEqual(expected)
})

test('should find the angles of the points on the line', () => {
  const test = angles(0, 0, 0, 0, 0, 1, 0, 300, 0)
  const expected = {
    start: 0,
    end: 0,
    delta: 0,
  }

  expect(test).toEqual(expected)
})

test('should find the angles of the points on the rotated ellipse', () => {
  const test = angles(100, 0, 50, 150, Math.PI / 2, 1, 1, 100, 300)
  const expected = {
    start: -Math.PI,
    end: 0,
    delta: Math.PI,
  }

  expect(test).toEqual(expected)
})
