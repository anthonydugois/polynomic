import { assert } from "chai"
import parsePathstring from "lib/pathstring/parse"
import isEqual from "lib/is-equal"
import translate from "lib/translate"

describe("translate-path", function () {
  const path = parsePathstring("M0 0L100 0Q150 150 200 200")

  it("should translate the path of 100px on x and y", function () {
    const test = translate(path, 100, 100)
    const expected = "M100 100L200 100Q250 250 300 300"

    assert.isTrue(isEqual(test, expected))
  })

  it("should translate the path of 100px on x", function () {
    const test = translate(path, 100, 0)
    const expected = "M100 0L200 0Q250 150 300 200"

    assert.isTrue(isEqual(test, expected))
  })

  it("should translate the path of 100px on y", function () {
    const test = translate(path, 0, 100)
    const expected = "M0 100L100 100Q150 250 200 300"

    assert.isTrue(isEqual(test, expected))
  })
})
