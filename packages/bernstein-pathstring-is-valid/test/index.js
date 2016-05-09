import { assert } from "chai"
import isValid from "bernstein-pathstring-is-valid"

describe("pathstring-is-valid", function () {
  describe("check valid pathstrings", function () {
    it("should check that pathstrings are valid", function () {
      assert.isTrue(isValid("M0,0"))
      assert.isTrue(isValid("M0,0l0 0"))
      assert.isTrue(isValid("M0,0l0 0a50 50, 0,1,0 -10 10"))
    })
  })

  describe("check invalid pathstrings", function () {
    it("should check that there is a missing M point", function () {
      assert.isFalse(isValid("l10,10"))
    })

    it("should check that there is not the correct number of parameters", function () {
      assert.isFalse(isValid("M0"))
      assert.isFalse(isValid("q10 20,30"))
    })

    it("should check that there are invalid characters", function () {
      assert.isFalse(isValid("M/10__10"))
    })
  })
})
