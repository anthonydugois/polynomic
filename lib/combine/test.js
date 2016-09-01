import { assert } from "chai"
import parse from "lib/pathstring/parse"
import isEqual from "lib/is-equal"
import combine from "lib/combine"

describe("combine-path", function () {
  it("should combine compound path", function () {
    const path = parse("M0 0h50v50z m100 100h100v100z")
    const test = combine(path)
    const expected = "M0 0h50v50 l50 50h100v100z"

    assert.isTrue(isEqual(test, expected))
  })
})
