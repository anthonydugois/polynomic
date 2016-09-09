import { assert } from "chai"
import parse from "pathstring/parse"
import isEqual from "path/is-equal"
import clean, {
  simplifyClosures,
  makeSureFirstPointsAreM,
  removeConsecutiveSamePoints,
} from "path/clean"

describe("clean-path", function () {
  it("should simplify the closures of the path", function () {
    const path = parse("M0 0L100 0L100 100l-100 -100 M50 50h50v50l-50-50")
    const test = simplifyClosures(path)
    const expected = "M0 0L100 0L100 100z M50 50h50v50z"

    assert.isTrue(isEqual(test, expected))
  })

  it("should make the path start with a M point", function () {
    const path = parse("L0 0zL0 0")
    const test = makeSureFirstPointsAreM(path)
    const expected = "M0 0zM0 0"

    assert.isTrue(isEqual(test, expected))
  })

  it("should delete the two consecutive same points", function () {
    const path = parse("M0 0L50 50L50 50L50 50")
    const test = removeConsecutiveSamePoints(path)
    const expected = "M0 0L50 50"

    assert.isTrue(isEqual(test, expected))
  })

  it("should clean the invalid path", function () {
    const path = parse("L0 0l50 50l0 0h50v50 L0 0")
    const test = clean(path)
    const expected = "M0 0l50 50h50v50z"

    assert.isTrue(isEqual(test, expected))
  })
})
