import { renderPathstring } from "../renderers";

test("should convert a seg list into a pathstring", () => {
  expect(renderPathstring([[2, 50, 50], [4, 100, 100]])).toBe("M50 50L100 100");
});
