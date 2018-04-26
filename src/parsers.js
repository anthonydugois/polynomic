// @flow

import {
  PathstringLexerInstance,
  PathstringParserInstance,
} from "./core/_parsers";

import { SegsPathstringVisitorInstance } from "./core/_visitors";

function createParserFunction(
  LexerInstance,
  ParserInstance,
  VisitorInstance,
  getCst,
): string => any {
  return text => {
    const { tokens } = LexerInstance.tokenize(text);
    ParserInstance.input = tokens;
    const cst = getCst(ParserInstance);

    if (ParserInstance.errors.length > 0) {
      return null;
    }

    return VisitorInstance.visit(cst);
  };
}

export const pathstring2segs: string => SegList = createParserFunction(
  PathstringLexerInstance,
  PathstringParserInstance,
  SegsPathstringVisitorInstance,
  instance => instance.pathstring(),
);
