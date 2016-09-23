import parse from "../../pathstring/parse"
import { isZ } from "../../point/is"
import isEqual from "../is-equal"
import split from "./index"

test("should split the path using a function and keep points on the previous path", () => {
  const path = parse("M0 0L100 0L100 100zM100 100L200 100L200 200zM200 200L300 200L300 300")
  const test = split(path, (point, index) => isZ(point), "before")

  expect(isEqual(test[0], "M0 0L100 0L100 100z")).toBe(true)
  expect(isEqual(test[1], "M100 100L200 100L200 200z")).toBe(true)
  expect(isEqual(test[2], "M200 200L300 200L300 300")).toBe(true)
})

test("should split the path using a string and keep points on the next path", () => {
  const path = parse("M0 0L100 0L100 100zM100 100L200 100L200 200zM200 200L300 200L300 300")
  const test = split(path, "M", "after")

  expect(isEqual(test[0], "M0 0L100 0L100 100z")).toBe(true)
  expect(isEqual(test[1], "M100 100L200 100L200 200z")).toBe(true)
  expect(isEqual(test[2], "M200 200L300 200L300 300")).toBe(true)
})

test("should split the path using an array and get rid of points", () => {
  const path = parse("M0 0L100 0L100 100ZM100 100L200 100L200 200zM200 200L300 200L300 300")
  const test = split(path, ["z", "Z"])

  expect(isEqual(test[0], "M0 0L100 0L100 100")).toBe(true)
  expect(isEqual(test[1], "M100 100L200 100L200 200")).toBe(true)
  expect(isEqual(test[2], "M200 200L300 200L300 300")).toBe(true)
})
