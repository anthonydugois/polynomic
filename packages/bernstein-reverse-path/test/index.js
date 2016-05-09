import { assert } from "chai"
import parsePathstring from "bernstein-parse-pathstring"
import isEqual from "bernstein-path-is-equal"
import reverse from "bernstein-reverse-path"

describe("reverse-path", function () {
  it("should reverse the path", function () {
    const path = parsePathstring("M0 0 h50 v50 c100 0 0 100 100 100 z M300 300 h100 v100 a50 50 0 1 0 200 200 z")
    const test = reverse(path)
    const expected = "M600 600a50 50 0 0 1 -200 -200v-100h-100zM150 150c-100 0 0 -100 -100 -100v-50h-50z"

    assert.isTrue(isEqual(test, expected))
  })
})
