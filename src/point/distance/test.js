import { assert } from "chai"
import { M } from "../points"
import distance from "./index"

describe("point/distance", function () {
  it("should give the distance between two points", function () {
    const test = distance(M(0, 0), M(0, 100))
    const expected = 100

    assert.strictEqual(test, expected)
  })
})
