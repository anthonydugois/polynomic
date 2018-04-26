import { map } from "../map";

test("should apply `map` on a segment list", () => {
  const f = jest.fn((seg, index) => index);

  expect(map(f, [], "M0 0 L50 50")).toEqual([0, 1]);
  expect(f).toHaveBeenCalled();
});

test("should apply `map` on a segment list (with additional arguments)", () => {
  const f = (seg, index, segs, params, foo) => foo + index;

  expect(map(f, [42], "M0 0 L50 50")).toEqual([42, 43]);
});
