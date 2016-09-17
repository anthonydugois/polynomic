import * as points from "../../point/points"
import parse from "./index"

test("should parse the code and return an array of points", () => {
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

  expect(test).toEqual(expected)
})

test("should parse the invalid code and return an empty array", () => {
  const test = parse("___:(___")
  const expected = []

  expect(test).toEqual(expected)
})
