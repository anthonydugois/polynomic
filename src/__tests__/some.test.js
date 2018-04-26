import { some } from "../some";

test("should apply `some` on a segment list", () => {
  const f = jest.fn((seg, index) => index === 0);

  expect(some(f, [], "M0 0 L50 50")).toBe(true);
  expect(f).toHaveBeenCalled();
});

test("should apply `some` on a segment list (with additional arguments)", () => {
  const f = (seg, index, segs, params, foo) => foo + index === 0;

  expect(some(f, [42], "M0 0 L50 50")).toBe(false);
});
