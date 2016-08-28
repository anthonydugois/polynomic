import { assert } from "chai"
import { m, M } from "lib/point"
import isRelative from "lib/point/is-relative"

describe("point-is-relative", function () {
  it("should check that the command `m` is relative", function () {
    assert.isTrue(isRelative(m(0, 0)))
  })

  it("should check that the command `M` is absolute", function () {
    assert.isFalse(isRelative(M(0, 0)))
  })
})
