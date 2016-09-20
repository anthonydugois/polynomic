import { xmlns } from "../../constants"
import isEqual from "../is-equal"
import _from from "./index"

test("should get the corresponding path from the SVG path node", () => {
  const path = "M0 0L100 100"
  const node = document.createElementNS(xmlns, "path")

  node.setAttributeNS(xmlns, "d", path)

  const test = _from(node)
  const expected = path

  expect(isEqual(test, expected)).toBe(true)
})

test("should get the corresponding path from the SVG line node", () => {
  const node = document.createElementNS(xmlns, "line")

  node.setAttributeNS(xmlns, "x1", 0)
  node.setAttributeNS(xmlns, "y1", 0)
  node.setAttributeNS(xmlns, "x2", 100)
  node.setAttributeNS(xmlns, "y2", 100)

  const test = _from(node)
  const expected = "M0 0L100 100"

  expect(isEqual(test, expected)).toBe(true)
})

test("should get the corresponding path from the SVG polyline node", () => {
  const node = document.createElementNS(xmlns, "polyline")

  node.setAttributeNS(xmlns, "points", "0 0 100,100 150-150 5e-14-4")

  const test = _from(node)
  const expected = "M0 0L100 100L150 -150L5e-14 -4"

  expect(isEqual(test, expected)).toBe(true)
})

test("should get the corresponding path from the SVG polygon node", () => {
  const node = document.createElementNS(xmlns, "polygon")

  node.setAttributeNS(xmlns, "points", "0 0 100,100 150-150 5e-14-4")

  const test = _from(node)
  const expected = "M0 0L100 100L150 -150L5e-14 -4Z"

  expect(isEqual(test, expected)).toBe(true)
})

test("should get the corresponding path from the SVG rect node", () => {
  const node = document.createElementNS(xmlns, "rect")

  node.setAttributeNS(xmlns, "x", 0)
  node.setAttributeNS(xmlns, "y", 0)
  node.setAttributeNS(xmlns, "width", 100)
  node.setAttributeNS(xmlns, "height", 100)

  const test = _from(node)
  const expected = "M0 0L100 0L100 100L0 100Z"

  expect(isEqual(test, expected)).toBe(true)
})

test("should get the corresponding path from the SVG circle node", () => {
  const node = document.createElementNS(xmlns, "circle")

  node.setAttributeNS(xmlns, "cx", 50)
  node.setAttributeNS(xmlns, "cy", 50)
  node.setAttributeNS(xmlns, "r", 50)

  const test = _from(node)
  const expected = "M0 50A50 50 0 0 0 100 50A50 50 0 0 0 0 50Z"

  expect(isEqual(test, expected)).toBe(true)
})

test("should get the corresponding path from the SVG ellipse node", () => {
  const node = document.createElementNS(xmlns, "ellipse")

  node.setAttributeNS(xmlns, "cx", 100)
  node.setAttributeNS(xmlns, "cy", 50)
  node.setAttributeNS(xmlns, "rx", 100)
  node.setAttributeNS(xmlns, "ry", 50)

  const test = _from(node)
  const expected = "M0 50A100 50 0 0 0 200 50A100 50 0 0 0 0 50Z"

  expect(isEqual(test, expected)).toBe(true)
})
