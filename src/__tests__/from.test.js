import { from } from "../from";

test("should convert a pathstring into a segment list", () => {
  expect(from("M50 50 L100 100")).toEqual([[2, 50, 50], [4, 100, 100]]);
});

test("should return an empty segment list if it fails to parse the pathstring", () => {
  expect(from("foobar")).toEqual([]);
});

test("should convert a primitive object into a segment list", () => {
  expect(
    from({
      type: "PRIMITIVE_LINE",
      x1: 50,
      y1: 50,
      x2: 100,
      y2: 100,
    }),
  ).toEqual([[2, 50, 50], [4, 100, 100]]);
});

test("should convert an SVG element into a segment list", () => {});
