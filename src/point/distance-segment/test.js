import { assert } from "chai"
import { M } from "../points"
import distanceSegment from "./index"

describe("point/distance-segment", function () {
  it("should give the distance between a point and a segment", function () {
    const test = distanceSegment(M(100, 50), M(0, 0), M(0, 100))
    const expected = 100

    assert.strictEqual(test, expected)
  })
})
