import { assert } from "chai"
import parse from "lib/pathstring/parse"
import build from "lib/pathstring/build"
import isEqual from "lib/is-equal"
import skew from "lib/skew"

describe("skew-path", function () {
  const path = parse("M0 0L100 0L100 100")

  it("should skew the path of PI/6 on x and y", function () {
    const test = build(skew(path, Math.PI / 6, Math.PI / 6))
    const expected = "M0 0L100 57.735L157.735 157.735"

    assert.isTrue(isEqual(test, expected))
  })

  it("should skew the path of PI/6 on x", function () {
    const test = build(skew(path, Math.PI / 6, 0))
    const expected = "M0 0L100 0L157.735 100"

    assert.isTrue(isEqual(test, expected))
  })

  it("should skew the path of PI/6 on y", function () {
    const test = build(skew(path, 0, Math.PI / 6))
    const expected = "M0 0L100 57.735L100 157.735"

    assert.isTrue(isEqual(test, expected))
  })
})
