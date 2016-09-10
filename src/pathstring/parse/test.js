import { assert } from "chai"
import * as points from "../../point/points"
import parse, { getSegments } from "./index"

describe("parse-pathstring", function () {
  it("should parse the code and return an array of segments", function () {
    const test = getSegments("M0 0l50 50 20 -20Q 30, 30, 60, 60t20 20C80 80 60,60 5 5s -5 6 2,2 zm 50 50z")
    const expected = [
      ["M", 0, 0],
      ["l", 50, 50, 20, -20],
      ["Q", 30, 30, 60, 60],
      ["t", 20, 20],
      ["C", 80, 80, 60, 60, 5, 5],
      ["s", -5, 6, 2, 2],
      ["z"],
      ["m", 50, 50],
      ["z"],
    ]

    assert.deepEqual(test, expected)
  })

  it("should parse the code and return an array of points", function () {
    const test = parse("M0 0l50 50 20 -20Q 30, 30, 60, 60t20 20C80 80 60,60 5 5s -5 6 2,2 zm 50 50z")
    const expected = [
      points.M(0, 0),
      points.l(50, 50, points.M(0, 0)),
      points.l(20, -20, points.l(50, 50, points.M(0, 0))),
      points.Q(30, 30, 60, 60),
      points.t(20, 20, points.Q(30, 30, 60, 60)),
      points.C(80, 80, 60, 60, 5, 5),
      points.s(-5, 6, 2, 2, points.C(80, 80, 60, 60, 5, 5)),
      points.z(points.M(0, 0)),
      points.m(50, 50, points.z(points.M(0, 0))),
      points.z(points.m(50, 50, points.z(points.M(0, 0)))),
    ]

    assert.deepEqual(test, expected)
  })

  it("should parse the invalid code and return an empty array", function () {
    const test = parse("___:(___")
    const expected = []

    assert.deepEqual(test, expected)
  })
})
