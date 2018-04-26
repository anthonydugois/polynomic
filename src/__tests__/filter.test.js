import { filter } from "../filter";

test("should apply `filter` on a segment list", () => {
  const f = jest.fn((seg, index) => index % 2 === 0);

  expect(filter(f, [], "M0 0 L50 50")).toEqual([[2, 0, 0]]);
  expect(f).toHaveBeenCalled();
});

test("should apply `filter` on a segment list (with additional arguments)", () => {
  const f = (seg, index, segs, params, foo) => (foo + index) % 2 === 0;

  expect(filter(f, [42], "M0 0 L50 50")).toEqual([[2, 0, 0]]);
});
