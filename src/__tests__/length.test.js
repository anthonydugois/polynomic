import { length } from "../length";

test("should compute the length of the seg list", () => {
  expect(length(1, "M50 50 L100 100")).toBe(70.71067811865476);
  expect(length(50, "M50 50 L100 100 q50 50 100 0")).toBe(185.48532137809588);
});
