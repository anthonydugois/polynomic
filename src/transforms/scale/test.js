import { assert } from "chai"
import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"
import scale from "./index"

describe("scale-path", function () {
  const path = parse("M0 0L100 0Q150 150 200 200")

  it("should scale x2 the path on x and y", function () {
    const test = scale(path, 2, 2)
    const expected = "M0 0L200 0Q300 300 400 400"

    assert.isTrue(isEqual(test, expected))
  })

  it("should scale x0.5 the path on x", function () {
    const test = scale(path, .5, 1)
    const expected = "M0 0L50 0Q75 150 100 200"

    assert.isTrue(isEqual(test, expected))
  })

  it("should scale x0.5 the path on y", function () {
    const test = scale(path, 1, .5)
    const expected = "M0 0L100 0Q150 75 200 100"

    assert.isTrue(isEqual(test, expected))
  })
})
