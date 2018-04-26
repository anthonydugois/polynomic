import { PathstringParserInstance } from "./_parsers";
import { createSeg } from "./_factories";

const PathstringVisitor = PathstringParserInstance.getBaseCstVisitorConstructor();

class SegsPathstringVisitor extends PathstringVisitor {
  constructor() {
    super();

    this.validateVisitor();
  }

  pathstring(ctx) {
    const list = [];

    for (const rule of ctx.group) {
      this.visit(rule, list);
    }

    return list;
  }

  group(ctx, list) {
    this.visit(ctx.segMoveto[0], list);

    for (const rule of ctx.command) {
      this.visit(rule, list);
    }
  }

  command(ctx, list) {
    if (ctx.segClosepath[0]) {
      this.visit(ctx.segClosepath[0], list);
    } else if (ctx.segLineto[0]) {
      this.visit(ctx.segLineto[0], list);
    } else if (ctx.segCurvetoCubic[0]) {
      this.visit(ctx.segCurvetoCubic[0], list);
    } else if (ctx.segCurvetoQuadratic[0]) {
      this.visit(ctx.segCurvetoQuadratic[0], list);
    } else if (ctx.segArc[0]) {
      this.visit(ctx.segArc[0], list);
    } else if (ctx.segLinetoHorizontal[0]) {
      this.visit(ctx.segLinetoHorizontal[0], list);
    } else if (ctx.segLinetoVertical[0]) {
      this.visit(ctx.segLinetoVertical[0], list);
    } else if (ctx.segCurvetoCubicSmooth[0]) {
      this.visit(ctx.segCurvetoCubicSmooth[0], list);
    } else if (ctx.segCurvetoQuadraticSmooth[0]) {
      this.visit(ctx.segCurvetoQuadraticSmooth[0], list);
    }
  }

  segClosepath(ctx, list) {
    list.push(createSeg("z"));
  }

  segMoveto(ctx, list) {
    const typeMoveTo = ctx.SegMovetoAbs[0] ? "M" : "m";
    const typeLineTo = ctx.SegMovetoAbs[0] ? "L" : "l";

    let index = 0;

    for (const rule of ctx.segMovetoParams) {
      const params = [];

      this.visit(rule, params);
      list.push(createSeg(index === 0 ? typeMoveTo : typeLineTo, ...params));

      index++;
    }
  }

  segMovetoParams(ctx, params) {
    this.visit(ctx.coordinates[0], params);
  }

  segLineto(ctx, list) {
    const type = ctx.SegLinetoAbs[0] ? "L" : "l";

    for (const rule of ctx.segLinetoParams) {
      const params = [];

      this.visit(rule, params);
      list.push(createSeg(type, ...params));
    }
  }

  segLinetoParams(ctx, params) {
    this.visit(ctx.coordinates[0], params);
  }

  segCurvetoCubic(ctx, list) {
    const type = ctx.SegCurvetoCubicAbs[0] ? "C" : "c";

    for (const rule of ctx.segCurvetoCubicParams) {
      const params = [];

      this.visit(rule, params);
      list.push(createSeg(type, ...params));
    }
  }

  segCurvetoCubicParams(ctx, params) {
    this.visit(ctx.coordinates[0], params);
    this.visit(ctx.coordinates[1], params);
    this.visit(ctx.coordinates[2], params);
  }

  segCurvetoQuadratic(ctx, list) {
    const type = ctx.SegCurvetoQuadraticAbs[0] ? "Q" : "q";

    for (const rule of ctx.segCurvetoQuadraticParams) {
      const params = [];

      this.visit(rule, params);
      list.push(createSeg(type, ...params));
    }
  }

  segCurvetoQuadraticParams(ctx, params) {
    this.visit(ctx.coordinates[0], params);
    this.visit(ctx.coordinates[1], params);
  }

  segArc(ctx, list) {
    const type = ctx.SegArcAbs[0] ? "A" : "a";

    for (const rule of ctx.segArcParams) {
      const params = [];

      this.visit(rule, params);
      list.push(createSeg(type, ...params));
    }
  }

  segArcParams(ctx, params) {
    params.push(
      Number(ctx.NumberLiteral[0].image),
      Number(ctx.NumberLiteral[1].image),
      Number(ctx.NumberLiteral[2].image),
      Number(ctx.Flag[0].image),
      Number(ctx.Flag[1].image),
    );

    this.visit(ctx.coordinates[0], params);
  }

  segLinetoHorizontal(ctx, list) {
    const type = ctx.SegLinetoHorizontalAbs[0] ? "H" : "h";

    for (const rule of ctx.segLinetoHorizontalParams) {
      const params = [];

      this.visit(rule, params);
      list.push(createSeg(type, ...params));
    }
  }

  segLinetoHorizontalParams(ctx, params) {
    params.push(Number(ctx.NumberLiteral[0].image));
  }

  segLinetoVertical(ctx, list) {
    const type = ctx.SegLinetoVerticalAbs[0] ? "V" : "v";

    for (const rule of ctx.segLinetoVerticalParams) {
      const params = [];

      this.visit(rule, params);
      list.push(createSeg(type, ...params));
    }
  }

  segLinetoVerticalParams(ctx, params) {
    params.push(Number(ctx.NumberLiteral[0].image));
  }

  segCurvetoCubicSmooth(ctx, list) {
    const type = ctx.SegCurvetoCubicSmoothAbs[0] ? "S" : "s";

    for (const rule of ctx.segCurvetoCubicSmoothParams) {
      const params = [];

      this.visit(rule, params);
      list.push(createSeg(type, ...params));
    }
  }

  segCurvetoCubicSmoothParams(ctx, params) {
    this.visit(ctx.coordinates[0], params);
    this.visit(ctx.coordinates[1], params);
  }

  segCurvetoQuadraticSmooth(ctx, list) {
    const type = ctx.SegCurvetoQuadraticSmoothAbs[0] ? "T" : "t";

    for (const rule of ctx.segCurvetoQuadraticSmoothParams) {
      const params = [];

      this.visit(rule, params);
      list.push(createSeg(type, ...params));
    }
  }

  segCurvetoQuadraticSmoothParams(ctx, params) {
    this.visit(ctx.coordinates[0], params);
  }

  coordinates(ctx, params) {
    params.push(
      Number(ctx.NumberLiteral[0].image),
      Number(ctx.NumberLiteral[1].image),
    );
  }
}

export const SegsPathstringVisitorInstance = new SegsPathstringVisitor();
