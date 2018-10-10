import * as monacoEditor from "monaco-editor"

export const CEL_FORMAT: any = {
  defaultToken: "",
  ignoreCase: true,

  brackets: [
    { open: "{", close: "}", token: "delimiter.curly" },
    { open: "[", close: "]", token: "delimiter.square" },
    { open: "(", close: ")", token: "delimiter.parenthesis" },
  ],

  keywords: [
    "ALL",
    "ANY",
    "AS",
    "BY",
    "CONSUME",
    "DECLARE",
    "DISTINCT",
    "EVENT",
    "EVENTS",
    "FILTER",
    "FROM",
    "HOURS",
    "LAST",
    "LIKE",
    "MAX",
    "MINUTES",
    "NEXT",
    "NONE",
    "PARTITION",
    "SECONDS",
    "SELECT",
    "STREAM",
    "STRICT",
    "UNLESS",
    "WHERE",
    "WITHIN",
  ],

  operators: ["AND", "NOT", "OR", "IS", "IN"],
  builtinFunctions: [
    // NOT SUPPORTED
  ],
  builtinVariables: [
    // NOT SUPPORTED
  ],
  tokenizer: {
    root: [
      // RULES
      // {include: state}
      { include: "@comments" },
      { include: "@whitespace" },
      { include: "@numbers" },
      { include: "@strings" },
      { include: "@complexIdentifiers" },
      { include: "@scopes" },
      // [regex, action]
      [/[;,.]/, "delimiter"],
      // [/[()]/, "@brackets"],
      [/[{}()\[\]]/, "@brackets"],
      [
        /[\w@]+/,
        {
          cases: {
            "@keywords": "keyword",
            "@operators": "operator",
            "@builtinVariables": "predefined",
            "@builtinFunctions": "predefined",
            "@default": "identifier",
          },
        },
      ],
      [/[<>=!%&+\-*/|~^]/, "operator"],
    ],
    whitespace: [[/\s+/, "white"]],
    comments: [
      [/--+.*/, "comment"],
      [/#+.*/, "comment"],
      [/\/\*/, { token: "comment.quote", next: "@comment" }],
    ],
    comment: [
      [/[^*/]+/, "comment"],
      [/\*\//, { token: "comment.quote", next: "@pop" }],
      [/./, "comment"],
    ],
    numbers: [
      [/0[xX][0-9a-fA-F]*/, "number"],
      [/[$][+-]*\d*(\.\d*)?/, "number"],
      [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, "number"],
    ],
    strings: [
      [/'/, { token: "string", next: "@string" }],
      [/"/, { token: "string.double", next: "@stringDouble" }],
    ],
    string: [
      [/[^']+/, "string"],
      [/''/, "string"],
      [/'/, { token: "string", next: "@pop" }],
    ],
    stringDouble: [
      [/[^"]+/, "string.double"],
      [/""/, "string.double"],
      [/"/, { token: "string.double", next: "@pop" }],
    ],
    complexIdentifiers: [
      [/`/, { token: "identifier.quote", next: "@quotedIdentifier" }],
    ],
    quotedIdentifier: [
      [/[^`]+/, "identifier"],
      [/``/, "identifier"],
      [/`/, { token: "identifier.quote", next: "@pop" }],
    ],
    scopes: [
      // NOT SUPPORTED
    ],
  },
}

export const CEL_THEME: monacoEditor.editor.IStandaloneThemeData = {
  base: "vs", // can also be vs-dark or hc-black
  inherit: true, // can also be false to completely replace the builtin rules
  rules: [
    { token: "comment", foreground: "87a1c4" },
    { token: "number", foreground: "256fd1" },
    { token: "identifier", foreground: "586677" },
    { token: "keyword", foreground: "0090ff" },
    { token: "string", foreground: "7c71f2" },
    { token: "operator", foreground: "87a1c4" },
  ],
  colors: {
    "editorCursor.foreground": "#586677",
    "editor.lineHighlightBackground": "#f9fcff",
  },
}

export default CEL_FORMAT
