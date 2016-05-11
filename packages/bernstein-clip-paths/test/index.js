import { assert } from "chai"
import * as points from "bernstein-point"
import clip, {
  getIntersectedPaths,
  getIntersectionPoint,
} from "bernstein-clip-paths"

describe("clip-paths", function () {
  it("should get the intersection point between two lines", function () {
    const p = getIntersectionPoint(
      points.M(0, 0),
      points.L(100, 100),
      points.M(100, 0),
      points.L(0, 100)
    )

    assert.equal(p.x, 50)
    assert.equal(p.y, 50)
  })

  it("shouldn't get the point between two finite lines", function () {
    const p = getIntersectionPoint(
      points.M(0, 0),
      points.L(40, 40),
      points.M(100, 0),
      points.L(60, 40)
    )

    assert.isFalse(p)
  })

  it.skip("should get paths with intersection points", function () {
    const s = [
      points.M(0, 0),
      points.L(100, 0),
      points.L(100, 100),
      points.L(0, 100),
    ]

    const c = [
      points.M(50, 50),
      points.L(150, 50),
      points.L(150, 150),
      points.L(50, 150),
    ]

    const sInter1 = points.L(100, 50)
    const cInter1 = points.L(100, 50)
    const sInter2 = points.L(50, 100)
    const cInter2 = points.L(50, 100)

    sInter1.corresponding = 1
    sInter1.isEntry = true
    sInter1.isVisited = false

    cInter1.corresponding = 2
    cInter1.isEntry = false
    cInter1.isVisited = false

    sInter2.corresponding = 5
    sInter2.isEntry = false
    sInter2.isVisited = false

    cInter2.corresponding = 4
    cInter2.isEntry = true
    cInter2.isVisited = false

    assert.deepEqual(getIntersectedPaths(s, c, true, true), [
      [
        points.M(0, 0),
        points.L(100, 0),
        sInter1,
        points.L(100, 100),
        sInter2,
        points.L(0, 100),
      ],
      [
        points.M(50, 50),
        cInter1,
        points.L(150, 50),
        points.L(150, 150),
        points.L(50, 150),
        cInter2,
      ]
    ])
  })

  it("should clip the paths", function () {
    const s = [
      points.M(50, 0),
      points.L(150, 0),
      points.L(150, 100),
      points.L(50, 100),
    ]

    const c = [
      points.M(0, 25),
      points.L(200, 25),
      points.L(200, 75),
      points.L(0, 75),
    ]

    // getIntersectedPaths(s, c)
    // console.log("\n\nintersections ---------", getIntersectedPaths(s, c))
    // console.log("clip ---------", clip(s, c))
    assert.isTrue(true)
  })
})
