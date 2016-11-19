
/* @flow */

import type { PointT } from "../../types/Point"

import { defaultPoint } from "../../point/points"
import * as types from "../../point/points/types"
import round, { defaultPrecision } from "../../utils/round"
import format from "../../utils/format"

export function m(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.m }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function M(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.M }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function l(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.l }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function L(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.L }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function h(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.h }
    ${ round(current.x - previous.x, precision) }
  `
}

export function H(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.H }
    ${ round(current.x, precision) }
  `
}

export function v(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.v }
    ${ round(current.y - previous.y, precision) }
  `
}

export function V(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.V }
    ${ round(current.y, precision) }
  `
}

export function q(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.q }
    ${
      typeof current.parameters.x1 !== 'undefined' ?
        round(current.parameters.x1 - previous.x, precision) :
        round((current.x - previous.x) / 2, precision)
    }
    ${
      typeof current.parameters.y1 !== 'undefined' ?
        round(current.parameters.y1 - previous.y, precision) :
        round((current.y - previous.y) / 2, precision)
    }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function Q(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.Q }
    ${
      typeof current.parameters.x1 !== 'undefined' ?
        round(current.parameters.x1, precision) :
        round(previous.x + ((current.x - previous.x) / 2), precision)
    }
    ${
      typeof current.parameters.y1 !== 'undefined' ?
        round(current.parameters.y1, precision) :
        round(previous.y + ((current.y - previous.y) / 2), precision)
    }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function t(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.t }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function T(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.T }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function c(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.c }
    ${
      typeof current.parameters.x1 !== 'undefined' ?
        round(current.parameters.x1 - previous.x, precision) :
        0
    }
    ${
      typeof current.parameters.y1 !== 'undefined' ?
        round(current.parameters.y1 - previous.y, precision) :
        0
    }
    ${
      typeof current.parameters.x2 !== 'undefined' ?
        round(current.parameters.x2 - previous.x, precision) :
        round(current.x - previous.x, precision)
    }
    ${
      typeof current.parameters.y2 !== 'undefined' ?
        round(current.parameters.y2 - previous.y, precision) :
        round(current.y - previous.y, precision)
    }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function C(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.C }
    ${
      typeof current.parameters.x1 !== 'undefined' ?
        round(current.parameters.x1, precision) :
        round(previous.x, precision)
    }
    ${
      typeof current.parameters.y1 !== 'undefined' ?
        round(current.parameters.y1, precision) :
        round(previous.y, precision)
    }
    ${
      typeof current.parameters.x2 !== 'undefined' ?
        round(current.parameters.x2, precision) :
        round(current.x, precision)
    }
    ${
      typeof current.parameters.y2 !== 'undefined' ?
        round(current.parameters.y2, precision) :
        round(current.y, precision)
    }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function s(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.s }
    ${
      typeof current.parameters.x2 !== 'undefined' ?
        round(current.parameters.x2 - previous.x, precision) :
        round(current.x - previous.x, precision)
    }
    ${
      typeof current.parameters.y2 !== 'undefined' ?
        round(current.parameters.y2 - previous.y, precision) :
        round(current.y - previous.y, precision)
    }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function S(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.S }
    ${
      typeof current.parameters.x2 !== 'undefined' ?
        round(current.parameters.x2, precision) :
        round(current.x, precision)
    }
    ${
      typeof current.parameters.y2 !== 'undefined' ?
        round(current.parameters.y2, precision) :
        round(current.y, precision)
    }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function a(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.a }
    ${
      typeof current.parameters.rx !== 'undefined' ?
        round(current.parameters.rx, precision) :
        0
    }
    ${
      typeof current.parameters.ry !== 'undefined' ?
        round(current.parameters.ry, precision) :
        0
    }
    ${
      typeof current.parameters.rotation !== 'undefined' ?
        round(current.parameters.rotation, precision) :
        0
    }
    ${
      typeof current.parameters.large !== 'undefined' ?
        current.parameters.large :
        0
    }
    ${
      typeof current.parameters.sweep !== 'undefined' ?
        current.parameters.sweep :
        0
    }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function A(
  current: PointT,
  previous: PointT = defaultPoint,
  precision: number = defaultPrecision,
): string {
  return format`
    ${ types.A }
    ${
      typeof current.parameters.rx !== 'undefined' ?
        round(current.parameters.rx, precision) :
        0
    }
    ${
      typeof current.parameters.ry !== 'undefined' ?
        round(current.parameters.ry, precision) :
        0
    }
    ${
      typeof current.parameters.rotation !== 'undefined' ?
        round(current.parameters.rotation, precision) :
        0
    }
    ${
      typeof current.parameters.large !== 'undefined' ?
        current.parameters.large :
        0
    }
    ${
      typeof current.parameters.sweep !== 'undefined' ?
        current.parameters.sweep :
        0
    }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
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
