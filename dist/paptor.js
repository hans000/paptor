!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.paptor=t():e.paptor=t()}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(r(1));t.objectAdaptor=o.default;var u=n(r(3));t.arrayAdaptor=u.default},function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var o=r(2);function u(e,t,r){void 0===t&&(t=[]),void 0===r&&(r=!1);var u=o.isType(e);if("null"===u)return r?e:null;if("object"!==u)throw new Error("data expected an object");"array"!==o.isType(t)&&(console.warn("struct expected an array"),t=[]);var i=r?n({},e):{};return t.reduce((function(t,r,n){if("array"!==o.isType(r))throw new Error("struct's "+r+" property expected StructItem");var u=r[0],i=r[1],c=r[2];if(void 0===u)throw new Error("struct's NO."+n+" StructItem, first element is required");if(c){if("string"!=typeof i)throw new Error("struct's NO."+n+" StructItem, second element expected string");t[i]=c.call(t,e[u],e)}else if(void 0===i)t[u]=e[u];else if("string"==typeof i)t[i]=e[u],delete t[u];else{if("function"!=typeof i)throw new Error("second parameter's type is string or function");t[u]=i.call(t,e[u],e),delete t[u]}return t}),i)}t.default=function(e,t,r){return r?function(e,t,r){void 0===t&&(t=[]);var n=u(e,t,!0),i=o.isType(r);return"function"===i&&Object.keys(n).forEach((function(e){r(e,n)&&delete n[e]})),"array"!==i&&(r=[]),r.forEach((function(e){delete n[e]})),n}(e,t,r):u(e,t)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isType=function(e){return Object.prototype.toString.call(e).toLowerCase().slice(8,-1)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function e(t,r,o){var u=[];return t?(t.forEach((function(t){var i=n.objectAdaptor(t,r);if(o){var c=o[0],f=o[1];void 0===f&&(f="children"),i[f]=e(t[c],r,o)}u.push(i)})),u):[]}}]).default}));