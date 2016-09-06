import { assert } from "chai"
import parse from "lib/pathstring/parse"
import isEqual from "lib/path/is-equal"
import simplify from "lib/path/simplify"

describe("path/simplify", function () {
  it("should simplify the path", function () {
    const path = parse("M0 0 L50 0 L100 5")
    const test = simplify(path, 5)
    const expected = "M0 0 L100 5"

    assert.isTrue(isEqual(test, expected))
  })

  it("shouldn't simplify the path", function () {
    const path = parse("M0 0 L50 0 L100 5")
    const test = simplify(path, 1)
    const expected = "M0 0 L50 0 L100 5"

    assert.isTrue(isEqual(test, expected))
  })
})
