!function(n,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("md-view/utils",[],e):"object"==typeof exports?exports["md-view/utils"]=e():n["md-view/utils"]=e()}("undefined"!=typeof self?self:this,function(){return function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="/dist/locale/",t(t.s=28)}({28:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(n){return n&&n.__esModule?n:{default:n}}(t(8));function o(n,e,t){if(t&&(e={_isVue:!0,$parent:t,$options:e}),e){if(e.$_alreadyWarned=e.$_alreadyWarned||[],e.$_alreadyWarned.includes(n))return;e.$_alreadyWarned.push(n)}return"[MdView] "+String(n)+(e?function(n){var e=this;if(n._isVue&&n.$parent){for(var t=[],o=0;n;){if(t.length>0){var i=t[t.length-1];if(i.constructor===n.constructor){o++,n=n.$parent;continue}o>0&&(t[t.length-1]=[i,o],o=0)}t.push(n),n=n.$parent}return"\n\nfound in\n\n"+t.map(function(n,t){return(0,r.default)(this,e),""+String(0===t?"---\x3e ":" ".repeat(5+2*t))+String(Array.isArray(n)?String(c(n[0]))+"... ("+String(n[1])+" recursive calls)":c(n))}.bind(this)).join("\n")}return"\n\n(found in "+String(c(n))+")"}(e):"")}function i(n,e,t){var r=o(n,e,t);null!=r&&console.error(r)}e.consoleInfo=function(n,e,t){var r=o(n,e,t);null!=r&&console.info(r)},e.consoleError=function(n,e,t){var r=o(n,e,t);null!=r&&console.warn(r)},e.consoleWarn=i,e.deprecate=function(n,e,t,r){i("'"+String(n)+"' is deprecated, use '"+String(e)+"' instead",t,r)};var u=/(?:^|[-_])(\w)/g,a=function(n){return(0,r.default)(void 0,void 0),n.replace(u,function(n){return(0,r.default)(void 0,void 0),n.toUpperCase()}.bind(void 0)).replace(/[-_]/g,"")}.bind(void 0);function c(n,e){if(n.$root===n)return"<Root>";var t="function"==typeof n&&null!=n.cid?n.options:n._isVue?n.$options||n.constructor.options:n||{},r=t.name||t._componentTag,o=t.__file;if(!r&&o){var i=o.match(/([^/\\]+)\.vue$/);r=i&&i[1]}return(r?"<"+String(a(r))+">":"<Anonymous>")+(o&&!1!==e?" at "+String(o):"")}},8:function(n,e,t){"use strict";e.__esModule=!0,e.default=function(n,e){if(n!==e)throw new TypeError("Cannot instantiate an arrow function")}}})});
//# sourceMappingURL=console.js.map