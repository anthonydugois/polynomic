import parse from "../../pathstring/parse"
import { M, z } from "../../point/points"
import { isM, isZ } from "../../point/is"
import isEqual from "../is-equal"
import join from "./index"

test("should join the paths", () => {
  const p1 = parse("M0 0L100 0")
  const p2 = parse("L100 100L100 200")
  const p3 = parse("M200 200h50v50")

  const test = join([p1, p2, p3])
  const expected = "M0 0L100 0 L100 100L100 200 M200 200h50v50"

  expect(isEqual(test, expected)).toBe(true)
})

test("should join the paths and close them", () => {
  const p1 = parse("M0 0L100 0")
  const p2 = parse("L100 100L100 200")
  const p3 = parse("M200 200h50v50")
  const makeJoin = (prevPath, nextPath) => {
    const first = prevPath[0]
    const previous = prevPath[prevPath.length - 1]
    const next = nextPath[0]

    return [
      ...!isZ(previous) && [z()(first)],
      ...!isM(next) && [M(next.x, next.y)()],
    ]
  }

  const test = join([p1, p2, p3], makeJoin)
  const expected = "M0 0L100 0z M100 100L100 100L100 200z M200 200h50v50"

  expect(isEqual(test, expected)).toBe(true)
})
