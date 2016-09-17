import { M } from "../points"
import distance from "./index"

test("should give the distance between two points", () => {
  const test = distance(M(0, 0), M(0, 100))
  const expected = 100

  expect(test).toBe(expected)
})
