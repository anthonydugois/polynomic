import {
  skew,
  skewX,
  skewY,
} from "./index"

import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"

test('should return a function', () => {
  const test = typeof skew(0, 0)
  const expected = 'function'

  expect(test).toBe(expected)
})

/*import parse from "../../pathstring/parse"
import build from "../../pathstring/build"
import isEqual from "../../path/is-equal"
import skew from "./index"

test("should skew the path of PI/6 on x and y", () => {
  const path = parse("M0 0L100 0L100 100")
  const test = build(skew(path, Math.PI / 6, Math.PI / 6))
  const expected = "M0 0L100 57.735L157.735 157.735"

  expect(isEqual(test, expected)).toBe(true)
})

test("should skew the path of PI/6 on x", () => {
  const path = parse("M0 0L100 0L100 100")
  const test = build(skew(path, Math.PI / 6, 0))
  const expected = "M0 0L100 0L157.735 100"

  expect(isEqual(test, expected)).toBe(true)
})

test("should skew the path of PI/6 on y", () => {
  const path = parse("M0 0L100 0L100 100")
  const test = build(skew(path, 0, Math.PI / 6))
  const expected = "M0 0L100 57.735L100 157.735"

  expect(isEqual(test, expected)).toBe(true)
})*/
