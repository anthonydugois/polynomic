import { assert } from "chai"
import segments from "./index"

describe("pathstring/segments", function () {
  it("should parse the code and return an array of segments", function () {
    const test = segments("M0 0l50 50 20 -20Q 30, 30, 60, 60t20 20C80 80 60,60 5 5s -5 6 2,2 zm 50 50z")
    const expected = [
      ["M", 0, 0],
      ["l", 50, 50, 20, -20],
      ["Q", 30, 30, 60, 60],
      ["t", 20, 20],
      ["C", 80, 80, 60, 60, 5, 5],
      ["s", -5, 6, 2, 2],
      ["z"],
      ["m", 50, 50],
      ["z"],
    ]

    assert.deepEqual(test, expected)
  })
})
