import { matrix, translate, scale, rotate, skewX, skewY } from "../transform";

test("should apply a `matrix` transform on the segment list", () => {
  expect(matrix(2, 0, 0, 2, 50, 50, [], "M50 50 L100 100")).toEqual([
    [2, 150, 150],
    [4, 250, 250],
  ]);
});

test("should apply a `translate` transform on the segment list", () => {
  expect(translate(50, 50, [], "M50 50 L100 100")).toEqual([
    [2, 100, 100],
    [4, 150, 150],
  ]);
});

test("should apply a `scale` transform on the segment list", () => {
  expect(scale(2, 2, [], "M50 50 L100 100")).toEqual([
    [2, 100, 100],
    [4, 200, 200],
  ]);
});

test("should apply a `rotate` transform on the segment list", () => {
  expect(rotate(20, 0, 0, [], "M50 50 L100 100")).toEqual([
    [2, 29.883623873011988, 64.08563820557886],
    [4, 59.767247746023976, 128.17127641115772],
  ]);
});

test("should apply a `skewX` transform on the segment list", () => {
  expect(skewX(20, [], "M50 50 L100 100")).toEqual([
    [2, 68.19851171331013, 50],
    [4, 136.39702342662025, 100],
  ]);
});

test("should apply a `skewY` transform on the segment list", () => {
  expect(skewY(20, [], "M50 50 L100 100")).toEqual([
    [2, 50, 68.19851171331013],
    [4, 100, 136.39702342662025],
  ]);
});
