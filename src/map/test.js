import { map } from './index'
import { parse } from '../parse'
import { l } from '../points'

test('should behave like a normal map function, but automatically hydrate the resulting path', () => {
  const test = map(
    (point, index) => index > 0 ? l(point.x, point.y) : point,
    parse('M0 0L50 50Q100 100 150 150'),
  )
  const expected = 'M0 0l50 50l150 150'

  expect(test).toEqualPath(expected)
})
