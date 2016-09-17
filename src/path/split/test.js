import parse from "../../pathstring/parse"
import isEqual from "../is-equal"
import split from "./index"

test("should split the path in three subpaths", () => {
  const path = parse("M0 0L100 0L100 100zM100 100L200 100L200 200zM200 200L300 200L300 300")
  const test = split(path, "z")

  expect(isEqual(test[0], "M0 0L100 0L100 100")).toBe(true)
  expect(isEqual(test[1], "M100 100L200 100L200 200")).toBe(true)
  expect(isEqual(test[2], "M200 200L300 200L300 300")).toBe(true)
})
