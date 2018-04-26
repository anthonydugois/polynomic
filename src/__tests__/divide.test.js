import { divide } from "../divide";

test("should divide each segment in the segment list", () => {
  expect(divide(2, [], "M50 50 L100 100")).toEqual([
    [2, 50, 50],
    [4, 75, 75],
    [4, 100, 100],
  ]);
});
