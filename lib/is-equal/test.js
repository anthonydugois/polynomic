import { assert } from "chai"
import parse from "lib/pathstring/parse"
import isEqual from "lib/is-equal"

describe("path-is-equal", function () {
  describe("check equal paths", function () {
    it("should check that the paths are equal", function () {
      const test = parse("M0 0l10 10")

      assert.isTrue(isEqual(test, "M0 0l10 10"))
    })

    it("should check that the pathstrings are equal", function () {
      assert.isTrue(isEqual("M0,000l10 10", "M 0 0 l 10 , 10"))
    })
  })

  describe("check non-equal paths", function () {
    it("should check that the paths are not equal", function () {
      const test = parse("M0 0l10 10")

      assert.isFalse(isEqual(test, "M0 0l10 10l20 20"))
    })

    it("should check that the pathstrings are not equal", function () {
      assert.isFalse(isEqual("M0,0l10 10", "M 0 0 l 10 , 10l20 20"))
    })
  })
})
