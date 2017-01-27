import { parse } from '../parse'
import { clean } from './index'

test('should simplify closures of the path', () => {
  const path = parse('M0 0L50 50L0 0 M50 50L100 100L50 50L150 150L50 50')
  const test = clean(path)
  const expected = 'M0 0L50 50Z M50 50L100 100L50 50L150 150Z'

  expect(test).toEqualPath(expected)
})

test('should ensure there are M points at correct locations', () => {
  const path = parse('L0 0L50 50Z L100 100L150 150')
  const test = clean(path)
  const expected = 'M0 0L50 50Z M100 100L150 150'

  expect(test).toEqualPath(expected)
})

test('should simplify consecutive points', () => {
  const path = parse('M0 0L50 50l0 0Z M50 50L100 100L100 100Z M100 100L150 150Q150 150 150 150')
  const test = clean(path)
  const expected = 'M0 0L50 50Z M50 50L100 100Z M100 100L150 150'

  expect(test).toEqualPath(expected)
})
