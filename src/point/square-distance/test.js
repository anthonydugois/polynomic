import { M } from "../points"
import squareDistance from "./index"

test("should give the square distance between two points", () => {
  const test = squareDistance(M(0, 0), M(100, 0))
  const expected = 10000

  expect(test).toBe(expected)
})
