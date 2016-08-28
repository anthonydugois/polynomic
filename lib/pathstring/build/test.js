import { assert } from "chai"
import parsePathstring from "lib/pathstring/parse"
import buildPathstring from "lib/pathstring/build"
import isEqual from "lib/is-equal"
import isValid from "lib/pathstring/is-valid"

describe("build-pathstring", function () {
  const expected = "M0 0l10 10z m0 0L100,56Q10 10 50 60t10,10c10 20 30 40 50 60s400 350 236 241a50,50,0,1,0,50,50Z"
  const test = buildPathstring(parsePathstring(expected))

  it("should build a pathstring from array of points", function () {
    assert.isTrue(isEqual(test, expected))
  })

  it("should build a valid pathstring", function () {
    assert.isTrue(isValid(test))
  })
})
