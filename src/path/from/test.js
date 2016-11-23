import isEqual from '../is-equal'
import _from from './index'

test('should get the corresponding path from the SVG path node', () => {
  const path = 'M0 0L100 100'
  const node = document.createElement('path')

  node.setAttribute('d', path)

  const test = _from(node)
  const expected = path

  expect(isEqual(test, expected)).toBe(true)
})

test('should get the corresponding path from the SVG line node', () => {
  const node = document.createElement('line')

  node.setAttribute('x1', 0)
  node.setAttribute('y1', 0)
  node.setAttribute('x2', 100)
  node.setAttribute('y2', 100)

  const test = _from(node)
  const expected = 'M0 0L100 100'

  expect(isEqual(test, expected)).toBe(true)
})

test('should get the corresponding path from the SVG polyline node', () => {
  const node = document.createElement('polyline')

  node.setAttribute('points', '0 0 100,100 150-150 5e-14-4')

  const test = _from(node)
  const expected = 'M0 0L100 100L150 -150L5e-14 -4'

  expect(isEqual(test, expected)).toBe(true)
})

test('should get the corresponding path from the SVG polygon node', () => {
  const node = document.createElement('polygon')

  node.setAttribute('points', '0 0 100,100 150-150 5e-14-4')

  const test = _from(node)
  const expected = 'M0 0L100 100L150 -150L5e-14 -4Z'

  expect(isEqual(test, expected)).toBe(true)
})

test('should get the corresponding path from the SVG rect node', () => {
  const node = document.createElement('rect')

  node.setAttribute('x', 0)
  node.setAttribute('y', 0)
  node.setAttribute('width', 100)
  node.setAttribute('height', 100)

  const test = _from(node)
  const expected = 'M0 0L100 0L100 100L0 100Z'

  expect(isEqual(test, expected)).toBe(true)
})

test('should get the corresponding path from the SVG circle node', () => {
  const node = document.createElement('circle')

  node.setAttribute('cx', 50)
  node.setAttribute('cy', 50)
  node.setAttribute('r', 50)

  const test = _from(node)
  const expected = 'M0 50A50 50 0 0 0 100 50A50 50 0 0 0 0 50Z'

  expect(isEqual(test, expected)).toBe(true)
})

test('should get the corresponding path from the SVG ellipse node', () => {
  const node = document.createElement('ellipse')

  node.setAttribute('cx', 100)
  node.setAttribute('cy', 50)
  node.setAttribute('rx', 100)
  node.setAttribute('ry', 50)

  const test = _from(node)
  const expected = 'M0 50A100 50 0 0 0 200 50A100 50 0 0 0 0 50Z'

  expect(isEqual(test, expected)).toBe(true)
})
