import { every } from "../every";

test("should apply `every` on a segment list", () => {
  const f = jest.fn((seg, index) => index === 0);

  expect(every(f, [], "M0 0 L50 50")).toBe(false);
  expect(f).toHaveBeenCalled();
});

test("should apply `every` on a segment list (with additional arguments)", () => {
  const f = (seg, index, segs, params, foo) => foo + index === 0;

  expect(every(f, [42], "M0 0 L50 50")).toBe(false);
});
