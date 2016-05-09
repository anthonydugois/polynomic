import { assert } from "chai"
import parsePathstring from "bernstein-parse-pathstring"
import { M } from "bernstein-core"
import isInside from "bernstein-point-is-inside"

describe("point-is-inside", function () {
  const path = parsePathstring("M0 0L100 0L100 100L0 100")

  it("should check that the point is inside the given path", function () {
    assert.isTrue(isInside(M(50, 50), path))
  })

  it("should check that the point is not inside the given path", function () {
    assert.isFalse(isInside(M(400, 50), path))
  })
})
