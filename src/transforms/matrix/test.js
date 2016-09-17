import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"
import matrix from "./index"

test("should apply the matrix to each coordinate", () => {
  const path = parse("M0 0L100 100Q150 150 200 200")
  const test = matrix(path, [1, 0, 100, 0, 1, 100, 0, 0, 1])
  const expected = "M100 100L200 200Q250 250 300 300"

  expect(isEqual(test, expected)).toBe(true)
})
