import { assert } from "chai"
import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"
import matrix from "./index"

describe("matrix-path", function () {
  it("should apply the matrix to each coordinate", function () {
    const m = [
      1, 0, 100,
      0, 1, 100,
      0, 0, 1,
    ]
    const path = parse("M0 0L100 100Q150 150 200 200")
    const test = matrix(path, m)
    const expected = "M100 100L200 200Q250 250 300 300"

    assert.isTrue(isEqual(test, expected))
  })
})
