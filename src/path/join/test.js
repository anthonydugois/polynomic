import parse from "../../pathstring/parse"
import isEqual from "../is-equal"
import join from "./index"

test("should join the paths without closing them", () => {
  const p1 = parse("M0 0L100 0")
  const p2 = parse("L100 100L100 200")
  const p3 = parse("M200 200h50v50")
  const test = join([p1, p2, p3])
  const expected = "M0 0L100 0 L100 100L100 200 M200 200h50v50"

  expect(isEqual(test, expected)).toBe(true)
})

test("should join the paths and close them", () => {
  const p1 = parse("M0 0L100 0")
  const p2 = parse("L100 100L100 200")
  const p3 = parse("M200 200h50v50")
  const test = join([p1, p2, p3], true)
  const expected = "M0 0L100 0z M100 100L100 200z M200 200h50v50z"

  expect(isEqual(test, expected)).toBe(true)
})
