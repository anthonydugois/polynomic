import { createToken, tokenMatcher, Lexer, Parser } from "chevrotain";

function createSegPatternFactory() {
  let index = -1;

  return {
    getLastSegIndex: () => index,
    createSegPattern: (type, ci = false) => (text, offset, tokens) => {
      const char = text[offset];

      if (char) {
        const match = ci
          ? char.toUpperCase() === type.toUpperCase()
          : char === type;

        if (match) {
          index = tokens.length;

          return [char];
        }
      }

      return null;
    },
  };
}

const { getLastSegIndex, createSegPattern } = createSegPatternFactory();

// Common Tokens

const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /[ \n\r\t]+/,
  group: Lexer.SKIPPED,
  line_breaks: true,
});

const Comma = createToken({
  name: "Comma",
  pattern: /,/,
});

// Seg Tokens

const SegClosepath = createToken({
  name: "SegClosepath",
  pattern: createSegPattern("z", true),
});

const SegMovetoAbs = createToken({
  name: "SegMovetoAbs",
  pattern: createSegPattern("M"),
});

const SegMovetoRel = createToken({
  name: "SegMovetoRel",
  pattern: createSegPattern("m"),
});

const SegLinetoAbs = createToken({
  name: "SegLinetoAbs",
  pattern: createSegPattern("L"),
});

const SegLinetoRel = createToken({
  name: "SegLinetoRel",
  pattern: createSegPattern("l"),
});

const SegCurvetoCubicAbs = createToken({
  name: "SegCurvetoCubicAbs",
  pattern: createSegPattern("C"),
});

const SegCurvetoCubicRel = createToken({
  name: "SegCurvetoCubicRel",
  pattern: createSegPattern("c"),
});

const SegCurvetoQuadraticAbs = createToken({
  name: "SegCurvetoQuadraticAbs",
  pattern: createSegPattern("Q"),
});

const SegCurvetoQuadraticRel = createToken({
  name: "SegCurvetoQuadraticRel",
  pattern: createSegPattern("q"),
});

const SegArcAbs = createToken({
  name: "SegArcAbs",
  pattern: createSegPattern("A"),
});

const SegArcRel = createToken({
  name: "SegArcRel",
  pattern: createSegPattern("a"),
});

const SegLinetoHorizontalAbs = createToken({
  name: "SegLinetoHorizontalAbs",
  pattern: createSegPattern("H"),
});

const SegLinetoHorizontalRel = createToken({
  name: "SegLinetoHorizontalRel",
  pattern: createSegPattern("h"),
});

const SegLinetoVerticalAbs = createToken({
  name: "SegLinetoVerticalAbs",
  pattern: createSegPattern("V"),
});

const SegLinetoVerticalRel = createToken({
  name: "SegLinetoVerticalRel",
  pattern: createSegPattern("v"),
});

const SegCurvetoCubicSmoothAbs = createToken({
  name: "SegCurvetoCubicSmoothAbs",
  pattern: createSegPattern("S"),
});

const SegCurvetoCubicSmoothRel = createToken({
  name: "SegCurvetoCubicSmoothRel",
  pattern: createSegPattern("s"),
});

const SegCurvetoQuadraticSmoothAbs = createToken({
  name: "SegCurvetoQuadraticSmoothAbs",
  pattern: createSegPattern("T"),
});

const SegCurvetoQuadraticSmoothRel = createToken({
  name: "SegCurvetoQuadraticSmoothRel",
  pattern: createSegPattern("t"),
});

// Number Tokens

const Flag = createToken({
  name: "Flag",
  pattern: (text, offset, tokens) => {
    const char = text.charCodeAt(offset);

    if (char === 48 || char === 49) {
      const index = getLastSegIndex();
      const token = tokens[index];

      if (tokenMatcher(token, SegArcAbs) || tokenMatcher(token, SegArcRel)) {
        const pos = (tokens.length - index) % 7;

        if (pos === 4 || pos === 5) {
          return [text[offset]];
        }
      }
    }

    return null;
  },
});

const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/,
});

// Transform Tokens

const TransformMatrix = createToken({
  name: "TransformMatrix",
  pattern: /matrix/,
});

const TransformTranslate = createToken({
  name: "TransformTranslate",
  pattern: /translate/,
});

const TransformScale = createToken({
  name: "TransformScale",
  pattern: /scale/,
});

const TransformRotate = createToken({
  name: "TransformRotate",
  pattern: /rotate/,
});

const TransformSkewX = createToken({
  name: "TransformSkewX",
  pattern: /skewX/,
});

const TransformSkewY = createToken({
  name: "TransformSkewY",
  pattern: /skewY/,
});

// Token Lists

const PathstringTokens = [
  WhiteSpace,
  Comma,

  // segs
  SegClosepath,
  SegMovetoAbs,
  SegMovetoRel,
  SegLinetoAbs,
  SegLinetoRel,
  SegCurvetoCubicAbs,
  SegCurvetoCubicRel,
  SegCurvetoQuadraticAbs,
  SegCurvetoQuadraticRel,
  SegArcAbs,
  SegArcRel,
  SegLinetoHorizontalAbs,
  SegLinetoHorizontalRel,
  SegLinetoVerticalAbs,
  SegLinetoVerticalRel,
  SegCurvetoCubicSmoothAbs,
  SegCurvetoCubicSmoothRel,
  SegCurvetoQuadraticSmoothAbs,
  SegCurvetoQuadraticSmoothRel,

  // numbers
  Flag,
  NumberLiteral,
];

const TransformTokens = [
  WhiteSpace,
  Comma,

  // transforms
  TransformMatrix,
  TransformTranslate,
  TransformScale,
  TransformRotate,
  TransformSkewX,
  TransformSkewY,

  // numbers
  NumberLiteral,
];

// Parsers

class PathstringParser extends Parser {
  constructor(input) {
    super(input, PathstringTokens, { outputCst: true });

    this.cache0 = undefined;

    this.RULE("pathstring", () => {
      this.MANY1(() => {
        this.SUBRULE1(this.group);
      });
    });

    this.RULE("group", () => {
      this.SUBRULE1(this.segMoveto);

      this.MANY1(() => {
        this.SUBRULE1(this.command);
      });
    });

    this.RULE("command", () => {
      this.OR1(
        this.cache0 ||
          (this.cache0 = [
            {
              ALT: () => {
                this.SUBRULE1(this.segClosepath);
              },
            },
            {
              ALT: () => {
                this.SUBRULE1(this.segLineto);
              },
            },
            {
              ALT: () => {
                this.SUBRULE1(this.segCurvetoCubic);
              },
            },
            {
              ALT: () => {
                this.SUBRULE1(this.segCurvetoQuadratic);
              },
            },
            {
              ALT: () => {
                this.SUBRULE1(this.segArc);
              },
            },
            {
              ALT: () => {
                this.SUBRULE1(this.segLinetoHorizontal);
              },
            },
            {
              ALT: () => {
                this.SUBRULE1(this.segLinetoVertical);
              },
            },
            {
              ALT: () => {
                this.SUBRULE1(this.segCurvetoCubicSmooth);
              },
            },
            {
              ALT: () => {
                this.SUBRULE1(this.segCurvetoQuadraticSmooth);
              },
            },
          ]),
      );
    });

    this.RULE("segClosepath", () => {
      this.CONSUME1(SegClosepath);
    });

    this.RULE("segMoveto", () => {
      this.OR1([
        {
          ALT: () => {
            this.CONSUME1(SegMovetoAbs);
          },
        },
        {
          ALT: () => {
            this.CONSUME1(SegMovetoRel);
          },
        },
      ]);

      this.AT_LEAST_ONE1(() => {
        this.SUBRULE1(this.segMovetoParams);

        this.OPTION1(() => {
          this.CONSUME1(Comma);
        });
      });
    });

    this.RULE("segMovetoParams", () => {
      this.SUBRULE1(this.coordinates);
    });

    this.RULE("segLineto", () => {
      this.OR1([
        {
          ALT: () => {
            this.CONSUME1(SegLinetoAbs);
          },
        },
        {
          ALT: () => {
            this.CONSUME1(SegLinetoRel);
          },
        },
      ]);

      this.AT_LEAST_ONE1(() => {
        this.SUBRULE1(this.segLinetoParams);

        this.OPTION1(() => {
          this.CONSUME1(Comma);
        });
      });
    });

    this.RULE("segLinetoParams", () => {
      this.SUBRULE1(this.coordinates);
    });

    this.RULE("segCurvetoCubic", () => {
      this.OR1([
        {
          ALT: () => {
            this.CONSUME1(SegCurvetoCubicAbs);
          },
        },
        {
          ALT: () => {
            this.CONSUME1(SegCurvetoCubicRel);
          },
        },
      ]);

      this.AT_LEAST_ONE1(() => {
        this.SUBRULE1(this.segCurvetoCubicParams);

        this.OPTION1(() => {
          this.CONSUME1(Comma);
        });
      });
    });

    this.RULE("segCurvetoCubicParams", () => {
      this.SUBRULE1(this.coordinates);

      this.OPTION1(() => {
        this.CONSUME1(Comma);
      });

      this.SUBRULE2(this.coordinates);

      this.OPTION2(() => {
        this.CONSUME2(Comma);
      });

      this.SUBRULE3(this.coordinates);
    });

    this.RULE("segCurvetoQuadratic", () => {
      this.OR1([
        {
          ALT: () => {
            this.CONSUME1(SegCurvetoQuadraticAbs);
          },
        },
        {
          ALT: () => {
            this.CONSUME1(SegCurvetoQuadraticRel);
          },
        },
      ]);

      this.AT_LEAST_ONE1(() => {
        this.SUBRULE1(this.segCurvetoQuadraticParams);

        this.OPTION1(() => {
          this.CONSUME1(Comma);
        });
      });
    });

    this.RULE("segCurvetoQuadraticParams", () => {
      this.SUBRULE1(this.coordinates);

      this.OPTION1(() => {
        this.CONSUME1(Comma);
      });

      this.SUBRULE2(this.coordinates);
    });

    this.RULE("segArc", () => {
      this.OR1([
        {
          ALT: () => {
            this.CONSUME1(SegArcAbs);
          },
        },
        {
          ALT: () => {
            this.CONSUME1(SegArcRel);
          },
        },
      ]);

      this.AT_LEAST_ONE1(() => {
        this.SUBRULE1(this.segArcParams);

        this.OPTION1(() => {
          this.CONSUME1(Comma);
        });
      });
    });

    this.RULE("segArcParams", () => {
      this.CONSUME1(NumberLiteral);

      this.OPTION1(() => {
        this.CONSUME1(Comma);
      });

      this.CONSUME2(NumberLiteral);

      this.OPTION2(() => {
        this.CONSUME2(Comma);
      });

      this.CONSUME3(NumberLiteral);

      this.OPTION3(() => {
        this.CONSUME3(Comma);
      });

      this.CONSUME1(Flag);

      this.OPTION4(() => {
        this.CONSUME4(Comma);
      });

      this.CONSUME2(Flag);

      this.OPTION5(() => {
        this.CONSUME5(Comma);
      });

      this.SUBRULE1(this.coordinates);
    });

    this.RULE("segLinetoHorizontal", () => {
      this.OR1([
        {
          ALT: () => {
            this.CONSUME1(SegLinetoHorizontalAbs);
          },
        },
        {
          ALT: () => {
            this.CONSUME1(SegLinetoHorizontalRel);
          },
        },
      ]);

      this.AT_LEAST_ONE1(() => {
        this.SUBRULE1(this.segLinetoHorizontalParams);

        this.OPTION1(() => {
          this.CONSUME1(Comma);
        });
      });
    });

    this.RULE("segLinetoHorizontalParams", () => {
      this.CONSUME1(NumberLiteral);
    });

    this.RULE("segLinetoVertical", () => {
      this.OR1([
        {
          ALT: () => {
            this.CONSUME1(SegLinetoVerticalAbs);
          },
        },
        {
          ALT: () => {
            this.CONSUME1(SegLinetoVerticalRel);
          },
        },
      ]);

      this.AT_LEAST_ONE1(() => {
        this.SUBRULE1(this.segLinetoVerticalParams);

        this.OPTION1(() => {
          this.CONSUME1(Comma);
        });
      });
    });

    this.RULE("segLinetoVerticalParams", () => {
      this.CONSUME1(NumberLiteral);
    });

    this.RULE("segCurvetoCubicSmooth", () => {
      this.OR1([
        {
          ALT: () => {
            this.CONSUME1(SegCurvetoCubicSmoothAbs);
          },
        },
        {
          ALT: () => {
            this.CONSUME1(SegCurvetoCubicSmoothRel);
          },
        },
      ]);

      this.AT_LEAST_ONE1(() => {
        this.SUBRULE1(this.segCurvetoCubicSmoothParams);

        this.OPTION1(() => {
          this.CONSUME1(Comma);
        });
      });
    });

    this.RULE("segCurvetoCubicSmoothParams", () => {
      this.SUBRULE1(this.coordinates);

      this.OPTION1(() => {
        this.CONSUME1(Comma);
      });

      this.SUBRULE2(this.coordinates);
    });

    this.RULE("segCurvetoQuadraticSmooth", () => {
      this.OR1([
        {
          ALT: () => {
            this.CONSUME1(SegCurvetoQuadraticSmoothAbs);
          },
        },
        {
          ALT: () => {
            this.CONSUME1(SegCurvetoQuadraticSmoothRel);
          },
        },
      ]);

      this.AT_LEAST_ONE1(() => {
        this.SUBRULE1(this.segCurvetoQuadraticSmoothParams);

        this.OPTION1(() => {
          this.CONSUME1(Comma);
        });
      });
    });

    this.RULE("segCurvetoQuadraticSmoothParams", () => {
      this.SUBRULE1(this.coordinates);
    });

    this.RULE("coordinates", () => {
      this.CONSUME1(NumberLiteral);

      this.OPTION1(() => {
        this.CONSUME1(Comma);
      });

      this.CONSUME2(NumberLiteral);
    });

    Parser.performSelfAnalysis(this);
  }
}

export const PathstringLexerInstance = new Lexer(PathstringTokens);

export const PathstringParserInstance = new PathstringParser([]);
