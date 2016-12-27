import {
  anyToRad,
  degToRad,
  gradToRad,
  turnToRad,
  radToDeg,
} from './index'

test('should parse the string and convert the angle in the correct unit', () => {
  const test = anyToRad('45deg')
  const expected = 0.785398

  expect(test).toBeCloseTo(expected, 6)
})

test('should convert the angle from deg to rad', () => {
  const test = degToRad(45)
  const expected = 0.785398

  expect(test).toBeCloseTo(expected, 6)
})

test('should convert the angle from grad to rad', () => {
  const test = gradToRad(20)
  const expected = 0.314159

  expect(test).toBeCloseTo(expected, 6)
})

test('should convert the angle from turn to rad', () => {
  const test = turnToRad(0.25)
  const expected = 1.570796

  expect(test).toBeCloseTo(expected, 6)
})

test('should convert the angle from rad to deg', () => {
  const test = radToDeg(Math.PI / 4)
  const expected = 45

  expect(test).toBeCloseTo(expected, 6)
})
