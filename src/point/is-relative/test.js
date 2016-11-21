import { m, M } from "../points"
import isRelative from "./index"

test("should check that the command `m` is relative", () => {
  const point = m(0, 0)()
  const test = isRelative(point)

  expect(test).toBe(true)
})

test("should check that the command `M` is absolute", () => {
  const point = M(0, 0)()
  const test = isRelative(point)

  expect(test).toBe(false)
})
