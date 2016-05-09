import { assert } from "chai"
import parsePathstring from "bernstein-parse-pathstring"
import isEqual from "bernstein-path-is-equal"
import combine from "bernstein-combine-path"

describe("combine-path", function () {
  it("should combine compound path", function () {
    const path = parsePathstring("M0 0h50v50z m100 100h100v100z")
    const test = combine(path)
    const expected = "M0 0h50v50 l50 50h100v100z"

    assert.isTrue(isEqual(test, expected))
  })
})
