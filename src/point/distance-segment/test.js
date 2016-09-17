import { M } from "../points"
import distanceSegment from "./index"

test("should give the distance between a point and a segment", () => {
  const test = distanceSegment(M(100, 50), M(0, 0), M(0, 100))
  const expected = 100

  expect(test).toBe(expected)
})
