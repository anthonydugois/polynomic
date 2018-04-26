import { rel } from "../rel";

test("should convert absolute segments into relative segments", () => {
  expect(rel([], "M50 50 L100 100")).toEqual([[3, 50, 50], [5, 50, 50]]);
});

test("should convert absolute segments into relative segments (with indices)", () => {
  expect(rel([1], "M50 50 L100 100")).toEqual([[2, 50, 50], [5, 50, 50]]);
});
