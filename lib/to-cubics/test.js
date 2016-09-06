import { assert } from "chai"
import parse from "lib/pathstring/parse"
import isEqual from "lib/is-equal"
import toCubics from "lib/to-cubics"

describe("path/to-cubics", function () {
  it("should convert points into cubic curves", function () {
    const path = parse("M0 0L100 0L100 100")
    const test = toCubics(path)
    const expected = "M0 0C0 0 100 0 100 0C100 0 100 100 100 100"

    assert.isTrue(isEqual(test, expected))
  })
})
