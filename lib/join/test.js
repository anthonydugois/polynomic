import { assert } from "chai"
import parse from "lib/pathstring/parse"
import isEqual from "lib/is-equal"
import join from "lib/join"

describe("join-paths", function () {
  const p1 = parse("M0 0L100 0")
  const p2 = parse("L100 100L100 200")
  const p3 = parse("M200 200h50v50")

  it("should join the paths without closing them", function () {
    const test = join([p1, p2, p3])
    const expected = "M0 0L100 0 L100 100L100 200 M200 200h50v50"

    assert.isTrue(isEqual(test, expected))
  })

  it("should join the paths and close them", function () {
    const test = join([p1, p2, p3], true)
    const expected = "M0 0L100 0z M100 100L100 200z M200 200h50v50z"

    assert.isTrue(isEqual(test, expected))
  })
})
