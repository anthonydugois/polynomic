import { point } from "../points"
import { min, max } from "./index"

test("should give the min point", () => {
  const test = min(
    point('', 0, 100),
    point('', 100, 0),
  )
  const expected = point('', 0, 0)

  expect(test).toEqual(expected)
})

test("should give the max point", () => {
  const test = max(
    point('', 0, 100),
    point('', 100, 0),
  )
  const expected = point('', 100, 100)

  expect(test).toEqual(expected)
})
