(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Inutile = {}));
})(this, (function (exports) { 'use strict';

  function hello () {
    console.log('hello world');
  }

  exports.hello = hello;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
