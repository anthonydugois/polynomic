import { reduce } from "../reduce";

test("should apply `reduce` on a segment list", () => {
  const f = jest.fn((seg, index, segs, params, acc) => acc + index);

  expect(reduce(f, [], 0, "M0 0 L50 50")).toBe(1);
  expect(f).toHaveBeenCalled();
});

test("should apply `reduce` on a segment list (with additional arguments)", () => {
  const f = (seg, index, segs, params, acc, foo) => acc + foo + index;

  expect(reduce(f, [42], 0, "M0 0 L50 50")).toBe(85);
});
