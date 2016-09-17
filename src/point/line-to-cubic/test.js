import { M, L, C } from "../points"
import lineToCubic from "./index"

test("should convert the line into a cubic curve", () => {
  const prev = M(0, 0)
  const point = L(100, 0)
  const test = lineToCubic(prev, point)
  const expected = C(0, 0, 100, 0, 100, 0)

  expect(test).toEqual(expected)
})
