!function(){"use strict";function n(n,e,r){if(e&&(n.plugin_name=e),r&&n.init){var i=n.init;n.init=function(u,o){function f(){i.call(n,u,o)}return t(u,n,e),u.readyState&&u.readyState.state>=3||!u.on?f():void u.on(r,f)}}return n}function t(n,t,e){function r(t,r){n.logger?n.logger.msg.apply(n.logger,r).module(e+""||"").level(t).log():n.log&&n.log.apply(n,r)}t.log=function(){r("log",arguments)},t.warn=function(){r("warn",arguments)},t.error=function(){r("error",arguments)}}function e(t,e,i){return n(t,e,i),t.plugin_version=r,t}var r="1.26.10",i={init:function(n){var t=n._.isString,e=n._.rot13defs,r=n._.dfmapping,i="data:enc;",u="dfm-enc-";n.ee.sdk.on("afterInitPara",function(){n.kit.userEncrypt=function(n){return u+r(n)},n.kit.userDecrypt=function(n){return 0===n.indexOf(i)?(n=n.substring(i.length),n=e(n)):0===n.indexOf(u)&&(n=n.substring(u.length),n=r(n)),n},n.kit.userDecryptIfNeeded=function(e){return!t(e)||0!==e.indexOf(i)&&0!==e.indexOf(u)||(e=n.kit.userDecrypt(e)),e}})},plugin_name:"UserEncryptDefault"},u=e(i);return u}();