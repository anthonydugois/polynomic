import parse from "../../pathstring/parse"
import build from "../../pathstring/build"
import isEqual from "../is-equal"
import ensureMoveTo from "./index"

test("should ensure that the first point is a M point", () => {
  const path = parse("L0 0L100 100")
  const test = ensureMoveTo(path)
  const expected = "M0 0L100 100"

  expect(isEqual(test, expected)).toBe(true)
})

test("should ensure that all Z points are followed by a M point", () => {
  const path = parse("M0 0 z L100 100 L150 150")
  const test = ensureMoveTo(path)
  const expected = "M0 0z M100 100L150 150"

  expect(isEqual(test, expected)).toBe(true)
})
