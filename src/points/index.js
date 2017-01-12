// @flow

import type {
  PointT,
  PointParamsT,
} from '../types'

import { curry } from 'lodash/fp'
import * as codes from '../core/codes'
import { point } from '../core/point'

import {
  anchor,
  anchors,
  implicitAnchor,
  implicitAnchors,
  arc,
} from '../core/parameters'

export const m : Function = curry((
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => point(
  codes.m,
  previous.x + dx,
  previous.y + dy,
))

export const M : Function = curry((
  x : number,
  y : number,
) : PointT => point(
  codes.M,
  x,
  y,
))

export const l : Function = curry((
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => point(
  codes.l,
  previous.x + dx,
  previous.y + dy,
))

export const L : Function = curry((
  x : number,
  y : number,
) : PointT => point(
  codes.L,
  x,
  y,
))

export const h : Function = curry((
  dx : number,
  previous : PointT,
) : PointT => point(
  codes.h,
  previous.x + dx,
  previous.y,
))

export const H : Function = curry((
  x : number,
  previous : PointT,
) : PointT => point(
  codes.H,
  x,
  previous.y,
))

export const v : Function = curry((
  dy : number,
  previous : PointT,
) : PointT => point(
  codes.v,
  previous.x,
  previous.y + dy,
))

export const V : Function = curry((
  y : number,
  previous : PointT,
) : PointT => point(
  codes.V,
  previous.x,
  y,
))

export const q : Function = curry((
  dx1 : number,
  dy1 : number,
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => point(
  codes.q,
  previous.x + dx,
  previous.y + dy,
  anchor(previous.x + dx1, previous.y + dy1),
))

export const Q : Function = curry((
  x1 : number,
  y1 : number,
  x : number,
  y : number,
) : PointT => point(
  codes.Q,
  x,
  y,
  anchor(x1, y1),
))

export const t : Function = curry((
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => point(
  codes.t,
  previous.x + dx,
  previous.y + dy,
  implicitAnchor(previous),
))

export const T : Function = curry((
  x : number,
  y : number,
  previous : PointT,
) : PointT => point(
  codes.T,
  x,
  y,
  implicitAnchor(previous),
))

export const c : Function = curry((
  dx1 : number,
  dy1 : number,
  dx2 : number,
  dy2 : number,
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => point(
  codes.c,
  previous.x + dx,
  previous.y + dy,
  anchors(previous.x + dx1, previous.y + dy1, previous.x + dx2, previous.y + dy2),
))

export const C : Function = curry((
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
  x : number,
  y : number,
) : PointT => point(
  codes.C,
  x,
  y,
  anchors(x1, y1, x2, y2),
))

export const s : Function = curry((
  dx2 : number,
  dy2 : number,
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => point(
  codes.s,
  previous.x + dx,
  previous.y + dy,
  implicitAnchors(previous, previous.x + dx2, previous.y + dy2),
))

export const S : Function = curry((
  x2 : number,
  y2 : number,
  x : number,
  y : number,
  previous : PointT,
) : PointT => point(
  codes.S,
  x,
  y,
  implicitAnchors(previous, x2, y2),
))

export const a : Function = curry((
  rx : number,
  ry : number,
  rotation : number,
  large : number,
  sweep : number,
  dx : number,
  dy : number,
  previous : PointT,
) : PointT => point(
  codes.a,
  previous.x + dx,
  previous.y + dy,
  arc(rx, ry, rotation, large, sweep),
))

export const A : Function = curry((
  rx : number,
  ry : number,
  rotation : number,
  large : number,
  sweep : number,
  x : number,
  y : number,
) : PointT => point(
  codes.A,
  x,
  y,
  arc(rx, ry, rotation, large, sweep),
))

export const z : Function = curry((
  related : PointT,
) : PointT => point(
  codes.z,
  related.x,
  related.y,
))

export const Z : Function = curry((
  related : PointT,
) : PointT => point(
  codes.Z,
  related.x,
  related.y,
))
