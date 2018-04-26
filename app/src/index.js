import React from "react";
import { render } from "react-dom";
import { injectGlobal, ThemeProvider } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";

import App from "./components/App";

const theme = {
  colors: {
    white: {
      prim: "#ffffff",
      sec: "#e8e8e9",
      ter: "#d1d2d3",
      quat: "#bbbcbd",
    },
    black: {
      prim: "#070c0f",
      sec: "#1d2224",
      ter: "#34383a",
      quat: "#4a4e50",
    },
    blue: {
      prim: "#00b2aa",
      sec: "#17b9b1",
      ter: "#2ec0b9",
      quat: "#45c7c1",
    },
    green: {
      prim: "#008751",
      sec: "#179160",
      ter: "#2e9c70",
      quat: "#45a780",
    },
    red: {
      prim: "#af1e2d",
      sec: "#b63240",
      ter: "#bd4653",
      quat: "#c45b66",
    },
  },
};

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500|Roboto+Mono:400,400i,500');
  
  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
  }

  .CodeMirror {
    height: auto;
    width: 100%;
    background: none;
    font-family: "Roboto Mono", monospace;
    font-size: .8rem;
    color: ${theme.colors.white.quat};
  }
  .CodeMirror-lines {
    padding: 0;
  }
  .CodeMirror pre {
    padding: .025rem 0;
  }
  .CodeMirror-scrollbar-filler,
  .CodeMirror-gutter-filler {
    background: none;
  }
  .CodeMirror-gutters {
    border: none;
    background: none;
  }
  .CodeMirror-linenumber {
    padding: 0 1rem 0 0;
    min-width: 2rem;
    color: ${theme.colors.black.ter};
  }
  .CodeMirror-cursor {
    border-left-color: ${theme.colors.white.quat};
  }
  .CodeMirror div.CodeMirror-secondarycursor {
    border-left-color: ${theme.colors.white.quat};
  }

  .cm-fat-cursor .CodeMirror-cursor {
    background: ${theme.colors.white.quat};
  }

  .cm-tab::before {
    content: "";
    border-left: 1px solid ${theme.colors.black.sec};
  }

  .cm-s-default .cm-keyword {
    color: ${theme.colors.blue.prim};
  }
  .cm-s-default .cm-atom {
    color: ${theme.colors.blue.quat};
  }
  .cm-s-default .cm-number {
    color: ${theme.colors.blue.quat};
  }
  .cm-s-default .cm-def {
    color: ${theme.colors.white.prim};
  }
  .cm-s-default .cm-variable,
  .cm-s-default .cm-property {
    color: ${theme.colors.white.prim};
  }
  .cm-s-default .cm-punctuation,
  .cm-s-default .cm-operator {
    color: ${theme.colors.white.quat};
  }
  .cm-s-default .cm-variable-2 {
    color: ${theme.colors.white.prim};
  }
  .cm-s-default .cm-variable-3, .cm-s-default .cm-type {color: #085;}
  .cm-s-default .cm-comment {
    font-style: italic;
    color: ${theme.colors.black.quat};
  }
  .cm-s-default .cm-string {
    color: ${theme.colors.blue.quat};
  }

  .cm-s-default .cm-error {color: #f00;}
  .cm-invalidchar {color: #f00;}

  div.CodeMirror span.CodeMirror-matchingbracket {color: #0b0;}

  div.CodeMirror span.CodeMirror-nonmatchingbracket {color: #a22;}

  .CodeMirror-activeline-background {
    background: ${theme.colors.black.sec};
  }

  .CodeMirror-selected,
  .CodeMirror-focused .CodeMirror-selected {
    background: ${theme.colors.black.ter};
  }
`;

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.querySelector("#root"),
);

registerServiceWorker();
