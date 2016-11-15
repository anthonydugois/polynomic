import {
  scale3d,
  scale,
  scaleX,
  scaleY,
  scaleZ,
} from "./index"

import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"

test('should return a function', () => {
  const test = typeof scale3d(0, 0, 0)
  const expected = 'function'

  expect(test).toBe(expected)
})

/*import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"
import scale from "./index"

test("should scale x2 the path on x and y", () => {
  const path = parse("M0 0L100 0Q150 150 200 200")
  const test = scale(path, 2, 2)
  const expected = "M0 0L200 0Q300 300 400 400"

  expect(isEqual(test, expected)).toBe(true)
})

test("should scale x0.5 the path on x", () => {
  const path = parse("M0 0L100 0Q150 150 200 200")
  const test = scale(path, .5, 1)
  const expected = "M0 0L50 0Q75 150 100 200"

  expect(isEqual(test, expected)).toBe(true)
})

test("should scale x0.5 the path on y", () => {
  const path = parse("M0 0L100 0Q150 150 200 200")
  const test = scale(path, 1, .5)
  const expected = "M0 0L100 0Q150 75 200 100"

  expect(isEqual(test, expected)).toBe(true)
})*/
