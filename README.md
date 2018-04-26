## Grammars

```
pathstring
  : WhiteSpace? group* WhiteSpace?

group
  : segMoveto command*

command
  : segClosepath
  | segLineto
  | segCurvetoCubic
  | segCurvetoQuadratic
  | segArc
  | segLinetoHorizontal
  | segLinetoVertical
  | segCurvetoCubicSmooth
  | segCurvetoQuadraticSmooth

segClosepath
  : SegClosepath

segMoveto
  : (SegMovetoAbs | SegMovetoRel) WhiteSpace? (segMovetoParams sep?)+

segMovetoParams
  : coordinates

segLineto
  : (SegLinetoAbs | SegLinetoRel) WhiteSpace? (segLinetoParams sep?)+

segLinetoParams
  : coordinates

segCurvetoCubic
  : (SegCurvetoCubicAbs | SegCurvetoCubicRel) WhiteSpace? (segCurvetoCubicParams sep?)+

segCurvetoCubicParams
  : coordinates sep? coordinates sep? coordinates

segCurvetoQuadratic
  : (SegCurvetoQuadraticAbs | SegCurvetoQuadraticRel) WhiteSpace? (segCurvetoQuadraticParams sep?)+

segCurvetoQuadraticParams
  : coordinates sep? coordinates

segArc
  : (SegArcAbs | SegArcRel) WhiteSpace? (segArcParams sep?)+

segArcParams
  : NumberLiteral sep? NumberLiteral sep? NumberLiteral sep? Flag sep? Flag sep? coordinates

segLinetoHorizontal
  : (SegLinetoHorizontalAbs | SegLinetoHorizontalRel) WhiteSpace? (segLinetoHorizontalParams sep?)+

segLinetoHorizontalParams
  : NumberLiteral

segLinetVerticalo
  : (SegLinetoVerticalAbs | SegLinetoVerticalRel) WhiteSpace? (segLinetoVerticalParams sep?)+

segLinetoVerticalParams
  : NumberLiteral

segCurvetoCubicSmooth
  : (SegCurvetoCubicSmoothAbs | SegCurvetoCubicSmoothRel) WhiteSpace? (segCurvetoCubicSmoothParams sep?)+

segCurvetoCubicSmoothParams
  : coordinates sep? coordinates

segCurvetoQuadraticSmooth
  : (SegCurvetoQuadraticSmoothAbs | SegCurvetoQuadraticSmoothRel) WhiteSpace ? (segCurvetoQuadraticSmoothParams sep?)+

segCurvetoQuadraticSmoothParams
  : coordinates

coordinates
  : NumberLiteral sep? NumberLiteral

sep
  : (WhiteSpace Comma? | Comma) WhiteSpace?
```

```
points
  : WhiteSpace? pairs? WhiteSpace?

pairs
  : coordinates (sep coordinates)*

coordinates
  : NumberLiteral sep? NumberLiteral

sep
  : (WhiteSpace Comma? | Comma) WhiteSpace?
```
