import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"
import matrixOrigin from "./index"

test("should apply the matrix to each coordinate with a given transform origin", () => {
  const path = parse("M0 0L100 100")
  const a = Math.PI / 2
  const test = matrixOrigin(path, [Math.cos(a), -Math.sin(a), 0, Math.sin(a), Math.cos(a), 0, 0, 0, 1], 50, 50)
  const expected = "M100 0L0 100"

  expect(isEqual(test, expected)).toBe(true)
})
