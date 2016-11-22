import parse from "../../pathstring/parse"
import isEqual from "../is-equal"
import combine from "./index"

test("should combine compound path", function () {
  const path = parse('M0 0h50v50z m100 100h100v100z')

  const test = combine(path)
  const expected = 'M0 0h50v50 l50 50h100v100z'

  expect(isEqual(test, expected)).toBe(true)
})
