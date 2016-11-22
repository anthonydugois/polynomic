import { M, L, H, V, Q, T, C, A } from "../points"
import toCubic from "./index"

test("should convert the line into a cubic curve", () => {
  const prev = M(0, 0)()
  const point = L(100, 0)()
  const test = toCubic(prev, point)
  const expected = C(0, 0, 100, 0, 100, 0)()

  expect(test).toEqual(expected)
})

test("should convert the horizontal line into a cubic curve", () => {
  const prev = M(0, 0)()
  const point = H(100)(prev)
  const test = toCubic(prev, point)
  const expected = C(0, 0, 100, 0, 100, 0)()

  expect(test).toEqual(expected)
})

test("should convert the vertical line into a cubic curve", () => {
  const prev = M(0, 0)()
  const point = V(100)(prev)
  const test = toCubic(prev, point)
  const expected = C(0, 0, 0, 100, 0, 100)()

  expect(test).toEqual(expected)
})

test("should convert the quadratic curve into a cubic curve", () => {
  const prev = M(0, 0)()
  const point = Q(75, 25, 100, 100)()
  const test = toCubic(prev, point)
  const expected = C(50, 16.666666666666664, 83.33333333333333, 49.99999999999999, 100, 100)()

  expect(test).toEqual(expected)
})

test("should convert the computed quadratic curve into a cubic curve", () => {
  const prev = M(0, 0)()
  const point = T(200, 0)(Q(0, 100, 100, 100)())
  const test = toCubic(prev, point)
  const expected = C(133.33333333333331, 66.66666666666666, 199.99999999999997, 66.66666666666666, 200, 0)()

  expect(test).toEqual(expected)
})

test("should convert the arc into a cubic curve", () => {
  const prev = M(0, 0)()
  const point = A(50, 50, 0, 0, 1, 0, 100)()
  const test = toCubic(prev, point)
  const expected = [
    C(38.49001794597504, 2.3568338638331258e-15, 62.54627916220945, 41.66666666666667, 43.30127018922194, 75)(),
    C(34.36963044151785, 90.47005383792515, 17.863279495408182, 100, 0, 100)(),
  ]

  expect(test).toEqual(expected)
})

test("should return the exact same point if it's already a cubic curve", () => {
  const prev = M(0, 0)()
  const point = C(25, 25, 25, 75, 0, 100)()
  const test = toCubic(prev, point)
  const expected = point

  expect(test).toEqual(expected)
})
