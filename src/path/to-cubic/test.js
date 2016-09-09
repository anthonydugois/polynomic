import { assert } from "chai"
import parse from "pathstring/parse"
import isEqual from "path/is-equal"
import toCubic from "path/to-cubic"

describe("path/to-cubics", function () {
  it("should convert points into cubic curves", function () {
    const path = parse("M0 0L100 0L100 100")
    const test = toCubic(path)
    const expected = "M0 0C0 0 100 0 100 0C100 0 100 100 100 100"

    assert.isTrue(isEqual(test, expected))
  })
})
