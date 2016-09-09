import { assert } from "chai"
import parse from "pathstring/parse"
import build from "pathstring/build"
import isEqual from "path/is-equal"
import rotate from "transforms/rotate"

describe("rotate-path", function () {
  it("should rotate the path of PI/2", function () {
    const path = parse("M0 0L100 0")
    const test = build(rotate(path, Math.PI / 2))
    const expected = "M0 0L0 100"

    assert.isTrue(isEqual(test, expected))
  })

  it("should rotate the path of 90°", function () {
    const path = parse("M0 0L100 0")
    const test = build(rotate(path, "90deg"))
    const expected = "M0 0L0 100"

    assert.isTrue(isEqual(test, expected))
  })

  it("should rotate the path of PI/2 with a set origin", function () {
    const path = parse("M0 0L100 0")
    const test = build(rotate(path, Math.PI / 2, "50%", 0))
    const expected = "M50 -50L50 50"

    assert.isTrue(isEqual(test, expected))
  })
})
