import { assert } from "chai"
import parse from "lib/pathstring/parse"
import isEqual from "lib/path/is-equal"
import matrix, { multiply3x1 } from "lib/transforms/matrix"

describe("matrix-path", function () {
  it("should multiply two matrix", function () {
    assert.deepEqual(multiply3x1(
      [
        1, 2, 3,
        2, 1, 3,
        3, 2, 1,
      ],
      [2, 2, 2]
    ), [12, 12, 12])
  })

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
