import { reduce } from './index'
import { parse } from '../parse'
import { l } from '../points'

test('should behave like a normal reduce function, but automatically hydrate the resulting path', () => {
  const test = reduce(
    (acc, point, index) => {
      acc.push(index > 0 ? l(point.x, point.y) : point)
      return acc
    },
    [],
    parse('M10 10L50 50Q100 100 150 150'),
  )
  const expected = 'M10 10l50 50l150 150'

  expect(test).toEqualPath(expected)
})
