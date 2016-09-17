import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"
import translate from "./index"

test("should translate the path of 100px on x and y", () => {
  const path = parse("M0 0L100 0Q150 150 200 200")
  const test = translate(path, 100, 100)
  const expected = "M100 100L200 100Q250 250 300 300"

  expect(isEqual(test, expected)).toBe(true)
})

test("should translate the path of 100px on x", () => {
  const path = parse("M0 0L100 0Q150 150 200 200")
  const test = translate(path, 100, 0)
  const expected = "M100 0L200 0Q250 150 300 200"

  expect(isEqual(test, expected)).toBe(true)
})

test("should translate the path of 100px on y", () => {
  const path = parse("M0 0L100 0Q150 150 200 200")
  const test = translate(path, 0, 100)
  const expected = "M0 100L100 100Q150 250 200 300"

  expect(isEqual(test, expected)).toBe(true)
})

test("should translate the path of 50% on x and y", () => {
  const path = parse("M0 0L100 0L100 100")
  const test = translate(path, "50%", "50%")
  const expected = "M50 50L150 50L150 150"

  expect(isEqual(test, expected)).toBe(true)
})
