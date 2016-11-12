
/* @flow */

import type { PointT } from "../../types/Point"

import { defaultPoint } from "../../point/points"
import * as types from "../../point/points/types"

function round(
  n: number,
  precision: number = 3,
): number {
  return +n.toFixed(precision)
}

function format(
  strings: Array<string>,
  ...values: Array<any>
): string {
  return values.join(' ')
}

export function m(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.m }
    ${ round(point.x - prev.x, precision) }
    ${ round(point.y - prev.y, precision) }
  `
}

export function M(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.M }
    ${ round(point.x, precision) }
    ${ round(point.y, precision) }
  `
}

export function l(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.l }
    ${ round(point.x - prev.x, precision) }
    ${ round(point.y - prev.y, precision) }
  `
}

export function L(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.L }
    ${ round(point.x, precision) }
    ${ round(point.y, precision) }
  `
}

export function h(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.h }
    ${ round(point.x - prev.x, precision) }
  `
}

export function H(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.H }
    ${ round(point.x, precision) }
  `
}

export function v(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.v }
    ${ round(point.y - prev.y, precision) }
  `
}

export function V(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.V }
    ${ round(point.y, precision) }
  `
}

export function q(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.q }
    ${
      typeof point.parameters.x1 !== 'undefined' ?
        round(point.parameters.x1 - prev.x, precision) :
        round((point.x - prev.x) / 2, precision)
    }
    ${
      typeof point.parameters.y1 !== 'undefined' ?
        round(point.parameters.y1 - prev.y, precision) :
        round((point.y - prev.y) / 2, precision)
    }
    ${ round(point.x - prev.x, precision) }
    ${ round(point.y - prev.y, precision) }
  `
}

export function Q(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.Q }
    ${
      typeof point.parameters.x1 !== 'undefined' ?
        round(point.parameters.x1, precision) :
        round(prev.x + ((point.x - prev.x) / 2), precision)
    }
    ${
      typeof point.parameters.y1 !== 'undefined' ?
        round(point.parameters.y1, precision) :
        round(prev.y + ((point.y - prev.y) / 2), precision)
    }
    ${ round(point.x, precision) }
    ${ round(point.y, precision) }
  `
}

export function t(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.t }
    ${ round(point.x - prev.x, precision) }
    ${ round(point.y - prev.y, precision) }
  `
}

export function T(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.T }
    ${ round(point.x, precision) }
    ${ round(point.y, precision) }
  `
}

export function c(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.c }
    ${
      typeof point.parameters.x1 !== 'undefined' ?
        round(point.parameters.x1 - prev.x, precision) :
        0
    }
    ${
      typeof point.parameters.y1 !== 'undefined' ?
        round(point.parameters.y1 - prev.y, precision) :
        0
    }
    ${
      typeof point.parameters.x2 !== 'undefined' ?
        round(point.parameters.x2 - prev.x, precision) :
        round(point.x - prev.x, precision)
    }
    ${
      typeof point.parameters.y2 !== 'undefined' ?
        round(point.parameters.y2 - prev.y, precision) :
        round(point.y - prev.y, precision)
    }
    ${ round(point.x - prev.x, precision) }
    ${ round(point.y - prev.y, precision) }
  `
}

export function C(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.C }
    ${
      typeof point.parameters.x1 !== 'undefined' ?
        round(point.parameters.x1, precision) :
        round(prev.x, precision)
    }
    ${
      typeof point.parameters.y1 !== 'undefined' ?
        round(point.parameters.y1, precision) :
        round(prev.y, precision)
    }
    ${
      typeof point.parameters.x2 !== 'undefined' ?
        round(point.parameters.x2, precision) :
        round(point.x, precision)
    }
    ${
      typeof point.parameters.y2 !== 'undefined' ?
        round(point.parameters.y2, precision) :
        round(point.y, precision)
    }
    ${ round(point.x, precision) }
    ${ round(point.y, precision) }
  `
}

export function s(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.s }
    ${
      typeof point.parameters.x2 !== 'undefined' ?
        round(point.parameters.x2 - prev.x, precision) :
        round(point.x - prev.x, precision)
    }
    ${
      typeof point.parameters.y2 !== 'undefined' ?
        round(point.parameters.y2 - prev.y, precision) :
        round(point.y - prev.y, precision)
    }
    ${ round(point.x - prev.x, precision) }
    ${ round(point.y - prev.y, precision) }
  `
}

export function S(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.S }
    ${
      typeof point.parameters.x2 !== 'undefined' ?
        round(point.parameters.x2, precision) :
        round(point.x, precision)
    }
    ${
      typeof point.parameters.y2 !== 'undefined' ?
        round(point.parameters.y2, precision) :
        round(point.y, precision)
    }
    ${ round(point.x, precision) }
    ${ round(point.y, precision) }
  `
}

export function a(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.a }
    ${
      typeof point.parameters.rx !== 'undefined' ?
        round(point.parameters.rx, precision) :
        0
    }
    ${
      typeof point.parameters.ry !== 'undefined' ?
        round(point.parameters.ry, precision) :
        0
    }
    ${
      typeof point.parameters.rotation !== 'undefined' ?
        round(point.parameters.rotation, precision) :
        0
    }
    ${
      typeof point.parameters.large !== 'undefined' ?
        point.parameters.large :
        0
    }
    ${
      typeof point.parameters.sweep !== 'undefined' ?
        point.parameters.sweep :
        0
    }
    ${ round(point.x - prev.x, precision) }
    ${ round(point.y - prev.y, precision) }
  `
}

export function A(
  point: PointT,
  prev: PointT = defaultPoint,
  precision: number,
): string {
  return format`
    ${ types.A }
    ${
      typeof point.parameters.rx !== 'undefined' ?
        round(point.parameters.rx, precision) :
        0
    }
    ${
      typeof point.parameters.ry !== 'undefined' ?
        round(point.parameters.ry, precision) :
        0
    }
    ${
      typeof point.parameters.rotation !== 'undefined' ?
        round(point.parameters.rotation, precision) :
        0
    }
    ${
      typeof point.parameters.large !== 'undefined' ?
        point.parameters.large :
        0
    }
    ${
      typeof point.parameters.sweep !== 'undefined' ?
        point.parameters.sweep :
        0
    }
    ${ round(point.x, precision) }
    ${ round(point.y, precision) }
  `
}

export function z(): string {
  return format`
    ${ types.z }
  `
}

export function Z(): string {
  return format`
    ${ types.Z }
  `
}
