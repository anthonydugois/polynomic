import { find } from "../find";

test("should apply `find` on a segment list", () => {
  const f = jest.fn((seg, index) => index === 0);

  expect(find(f, [], "M0 0 L50 50")).toEqual([2, 0, 0]);
  expect(f).toHaveBeenCalled();
});

test("should apply `find` on a segment list (with additional arguments)", () => {
  const f = (seg, index, segs, params, foo) => foo + index === 0;

  expect(find(f, [42], "M0 0 L50 50")).toBeUndefined();
});
