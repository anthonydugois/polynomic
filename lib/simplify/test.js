import { assert } from "chai"
import parse from "lib/pathstring/parse"
import isEqual from "lib/is-equal"
import simplify from "lib/simplify"

describe("simplify-path", function () {
  it("should simplify the path and delete points with a distance greater than the given tolerance", function () {
    const path = parse("M0 0 L50 0 L100 5")
    const test = simplify(path, 5)
    const expected = "M0 0 L100 5"

    assert.isTrue(isEqual(test, expected))
  })

  it("shouldn't simplify the path because the tolerance is too short", function () {
    const path = parse("M0 0 L50 0 L100 5")
    const test = simplify(path, 1)
    const expected = "M0 0 L50 0 L100 5"

    assert.isTrue(isEqual(test, expected))
  })
})
