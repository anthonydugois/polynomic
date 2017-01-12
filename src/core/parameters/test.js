import {
  anchor,
  anchors,
  implicitAnchor,
  implicitAnchors,
  arc,
} from './index'

import { point } from '../point'

test('should return the object representation of an anchor', () => {
  const test = anchor(50, 50)
  const expected = {
    x1: 50,
    y1: 50,
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of two anchors', () => {
  const test = anchors(50, 50, 100, 100)
  const expected = {
    x1: 50,
    y1: 50,
    x2: 100,
    y2: 100,
  }

  expect(test).toEqual(expected)
})

test('should compute the anchor from previous point', () => {
  const test = implicitAnchor(point('Q', 100, 100, anchor(50, 50)))
  const expected = {
    x1: 150,
    y1: 150,
  }

  expect(test).toEqual(expected)
})

test('should compute the anchors from previous point', () => {
  const test = implicitAnchors(
    point('C', 100, 100, anchors(25, 25, 75, 75)),
    175,
    175,
  )
  const expected = {
    x1: 125,
    y1: 125,
    x2: 175,
    y2: 175,
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of arc parameters', () => {
  const test = arc(100, 50, -460, 5, 0)
  const expected = {
    rx: 100,
    ry: 50,
    rotation: 260,
    large: 1,
    sweep: 0,
  }

  expect(test).toEqual(expected)
})
