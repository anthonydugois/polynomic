import { m, L, Q } from "../points"
import { isM, isQ, isZ } from "./index"

test("should check that the point is M", () => {
  expect(isM(m(0, 0))).toBe(true)
})

test("should check that the point is Q", () => {
  expect(isQ(Q(20, 20, 0, 0))).toBe(true)
})

test("should check that the point is not Z", () => {
  expect(isZ(L(0, 0))).toBe(false)
})
