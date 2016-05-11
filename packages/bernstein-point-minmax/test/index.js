import { assert } from "chai"
import Point, { M } from "bernstein-point"
import { min, max } from "bernstein-point-minmax"

describe("point-minmax", function () {
  it("should give the min point", function () {
    assert.deepEqual(min(M(0, 100), M(100, 0)), Point(null, 0, 0))
  })

  it("should give the max point", function () {
    assert.deepEqual(max(M(0, 100), M(100, 0)), Point(null, 100, 100))
  })
})
