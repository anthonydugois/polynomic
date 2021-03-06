import { Point, M } from "../points"
import { min, max } from "./index"

test("should give the min point", () => {
  const test = min(M(0, 100), M(100, 0))
  const expected = Point(null, 0, 0)

  expect(test).toEqual(expected)
})

test("should give the max point", () => {
  const test = max(M(0, 100), M(100, 0))
  const expected = Point(null, 100, 100)

  expect(test).toEqual(expected)
})
