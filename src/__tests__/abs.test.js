import { abs } from "../abs";

test("should convert relative segments into absolute segments", () => {
  expect(abs([], "m50 50 l50 50")).toEqual([[2, 50, 50], [4, 100, 100]]);
});

test("should convert relative segments into absolute segments (with indices)", () => {
  expect(abs([1], "m50 50 l50 50")).toEqual([[3, 50, 50], [4, 100, 100]]);
});
