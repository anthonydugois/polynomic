import { m, M } from "../points"
import isRelative from "./index"

test("should check that the command `m` is relative", () => {
  expect(isRelative(m(0, 0))).toBe(true)
})

test("should check that the command `M` is absolute", () => {
  expect(isRelative(M(0, 0))).toBe(false)
})
