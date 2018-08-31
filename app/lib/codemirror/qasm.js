// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// QASM mode.
/* eslint-disable */
(function(mod) {
  if (typeof exports === "object" && typeof module === "object") // CommonJS
    mod(require("codemirror/lib/codemirror"));
  else if (typeof define === "function" && define.amd) // AMD
    define(["codemirror/lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.defineMode("qasm", function(config, parserConfig) {
    var indentUnit = config.indentUnit;

    function prefixRE(words) {
      return new RegExp("^(?:" + words.join("|") + ")", "i");
    }
    function wordRE(words) {
      return new RegExp("^(?:" + words.join("|") + ")$", "i");
    }
    var specials = wordRE(parserConfig.specials || []);

    // long list of standard functions from lua manual
    var builtins = wordRE([
      "CX", "h", "U", 'cnot', 'CNOT', 'syndrome', 'x', 'X', 'y', 'Y', 'z', 'Z'
    ]);
    var keywords = wordRE(["include", 'if', 'qubit', "gate","qreg","creg", "measure", "reset", "gatename", "barrier", "opaque"]);

    var indentTokens = wordRE(["\\(", "{"]);
    var dedentTokens = wordRE(["\\)", "}"]);
    var dedentPartial = prefixRE(["\\)", "}"]);

    function normal(stream, state) {
      var ch = stream.next();

      if (ch == "\"" || ch == "'")
        return (state.cur = string(ch))(stream, state);
      if (/\d/.test(ch)) {
        stream.eatWhile(/[\w.%]/);
        return "number";
      }
      if (/[\w_]/.test(ch)) {
        stream.eatWhile(/[\w\\\-_.]/);
        return "variable";
      }
      return null;
    }

    function string(quote) {
      return function(stream, state) {
        var escaped = false, ch;
        while ((ch = stream.next()) != null) {
          if (ch == quote && !escaped) break;
          escaped = !escaped && ch == "\\";
        }
        if (!escaped) state.cur = normal;
        return "string";
      };
    }

    return {
      startState: function(basecol) {
        return {basecol: basecol || 0, indentDepth: 0, cur: normal};
      },

      token: function(stream, state) {
        if (stream.eatSpace()) return null;
        var style = state.cur(stream, state);
        var word = stream.current();
        if (style == "variable") {
          if (keywords.test(word)) style = "keyword";
          else if (builtins.test(word)) style = "builtin";
          else if (specials.test(word)) style = "variable-2";
        }
        if ((style != "comment") && (style != "string")){
          if (indentTokens.test(word)) ++state.indentDepth;
          else if (dedentTokens.test(word)) --state.indentDepth;
        }
        return style;
      },

      indent: function(state, textAfter) {
        var closing = dedentPartial.test(textAfter);
        return state.basecol + indentUnit * (state.indentDepth - (closing ? 1 : 0));
      },

      lineComment: "#"
    };
  });

  CodeMirror.defineMIME("text/x-qasm", "qasm");

});
