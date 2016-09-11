import { assert } from "chai"
import { m, L, Q } from "../points"
import { isM, isQ, isZ } from "./index"

describe("point/is", function () {
  it("should check that the point is M", function () {
    assert.isTrue(isM(m(0, 0)))
  })

  it("should check that the point is Q", function () {
    assert.isTrue(isQ(Q(20, 20, 0, 0)))
  })

  it("should check that the point is not Z", function () {
    assert.isFalse(isZ(L(0, 0)))
  })
})
