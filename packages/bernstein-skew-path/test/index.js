import { assert } from "chai"
import parsePathstring from "bernstein-parse-pathstring"
import buildPathstring from "bernstein-build-pathstring"
import isEqual from "bernstein-path-is-equal"
import skew, { skewX, skewY } from "bernstein-skew-path"

describe("skew-path", function () {
  const path = parsePathstring("M0 0L100 0L100 100")

  it("should skew the path of PI/6 on x and y", function () {
    const test = buildPathstring(skew(path, Math.PI / 6, Math.PI / 6))
    const expected = "M0 0L100 57.735L157.735 157.735"

    assert.isTrue(isEqual(test, expected))
  })

  it("should skew the path of PI/6 on x", function () {
    const test = buildPathstring(skewX(path, Math.PI / 6))
    const expected = "M0 0L100 0L157.735 100"

    assert.isTrue(isEqual(test, expected))
  })

  it("should skew the path of PI/6 on y", function () {
    const test = buildPathstring(skewY(path, Math.PI / 6))
    const expected = "M0 0L100 57.735L100 157.735"

    assert.isTrue(isEqual(test, expected))
  })
})
