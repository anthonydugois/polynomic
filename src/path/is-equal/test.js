import parse from "../../pathstring/parse"
import isEqual from "./index"

test("should check that the paths are equal", () => {
  const test = parse("M0 0l10 10")
  const expected = "M0 0l10 10"

  expect(isEqual(test, expected)).toBe(true)
})

test("should check that the pathstrings are equal", () => {
  const test = "M0,000l10 10"
  const expected = "M 0 0 l 10 , 10"

  expect(isEqual(test, expected)).toBe(true)
})

test("should check that the paths are not equal", () => {
  const test = parse("M0 0q10 10 20 20")
  const expected = "M0 0q15 10 20 20"

  expect(isEqual(test, expected)).toBe(false)
})

test("should check that the pathstrings are not equal", () => {
  const test = "M0,0l10 10"
  const expected = "M 0 0 l 10 , 10l20 20"

  expect(isEqual(test, expected)).toBe(false)
})
