import { M, C, A } from "../points"
import arcToCubic from "./index"

test("should convert the arc into a cubic curve", () => {
  const prev = M(0, 0)
  const point = A(50, 50, 0, 0, 1, 0, 100)
  const test = arcToCubic(prev, point)
  const expected = [
    C(38.49001794597504, 2.3568338638331258e-15, 62.54627916220945, 41.66666666666667, 43.30127018922194, 75),
    C(34.36963044151785, 90.47005383792515, 17.863279495408182, 100, 0, 100),
  ]

  expect(test).toEqual(expected)
})
test("should convert the arc into a cubic curve (even with floating point errors)", () => {
  const prev = M(22.759, -46.5)
  const point = A(10, 10, 0, 0, 1, 22.759, 46.5)
  const test = arcToCubic(prev, point)

  const expected = [
    C(58.55471668975679, -46.5, 80.92703896456277, -7.7500000000000036, 23.24999999999999, 75),
    C(61.24285267014358, 26.34401076758502, 26.331655899081635, 46.5, 22.759, 46.5),
  ]

  expect(test).toEqual(expected)
})
