import { assert } from "chai"
import { M, L } from "bernstein-point"
import { segmentSegment } from "bernstein-intersections"

describe("intersections", function () {
  it("should give the intersection point between two segments", function () {
    assert.deepEqual(segmentSegment(
      M(0, 0),
      L(100, 100),
      M(100, 0),
      L(0, 100)
    ), { x: 50, y: 50 })
  })

  it("should give the intersection point between a segment and a quad Bezier curve", function () {

  })

  it("should give the intersection point between two quad Bezier curves", function () {

  })

  it("should give the intersection point between a segment and a cub Bezier curve", function () {

  })

  it("should give the intersection point between two cub Bezier curves", function () {

  })

  it("should give the intersection point between a quad Bezier curve and a cub Bezier curve", function () {

  })
})
