import parse from "../../pathstring/parse"
import boundingBox from "./index"

test("should give the bounding box of the path", () => {
  const path = parse("M0 0h100v100h-100z")
  const test = boundingBox(path)
  const expected = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  }

  expect(test).toEqual(expected)
})
