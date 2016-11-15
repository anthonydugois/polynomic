import {
  rotate3d,
  rotate,
  rotateX,
  rotateY,
  rotateZ,
} from "./index"

import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"

test('should return a function', () => {
  const test = typeof rotate3d(0, 0, 1, 0)
  const expected = 'function'

  expect(test).toBe(expected)
})

/*import parse from "../../pathstring/parse"
import build from "../../pathstring/build"
import isEqual from "../../path/is-equal"
import rotate from "./index"

test("should rotate the path of PI/2", () => {
  const path = parse("M0 0L100 0")
  const test = build(rotate(path, Math.PI / 2))
  const expected = "M0 0L0 100"

  expect(isEqual(test, expected)).toBe(true)
})

test("should rotate the path of 90°", () => {
  const path = parse("M0 0L100 0")
  const test = build(rotate(path, "90deg"))
  const expected = "M0 0L0 100"

  expect(isEqual(test, expected)).toBe(true)
})

test("should rotate the path of PI/2 with a set origin", () => {
  const path = parse("M0 0L100 0")
  const test = build(rotate(path, Math.PI / 2, "50%", 0))
  const expected = "M50 -50L50 50"

  expect(isEqual(test, expected)).toBe(true)
})*/
