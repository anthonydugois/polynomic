import { assert } from "chai"
import parsePathstring from "bernstein-parse-pathstring"
import isEqual from "bernstein-path-is-equal"
import join from "bernstein-join-paths"

describe("join-paths", function () {
  const p1 = parsePathstring("M0 0L100 0")
  const p2 = parsePathstring("L100 100L100 200")
  const p3 = parsePathstring("M200 200h50v50")

  it("should join two paths without close them", function () {
    const test = join([p1, p2, p3])
    const expected = "M0 0L100 0 L100 100L100 200 M200 200h50v50"

    assert.isTrue(isEqual(test, expected))
  })

  it("should join two paths and close them", function () {
    const test = join([p1, p2, p3], true)
    const expected = "M0 0L100 0z M100 100L100 200z M200 200h50v50z"

    assert.isTrue(isEqual(test, expected))
  })
})
