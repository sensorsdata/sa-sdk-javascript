!function(){"use strict";function n(n,i,o){if(i&&(n.plugin_name=i),o&&n.init){var e=n.init;n.init=function(r,u){function l(){e.call(n,r,u)}return t(r,n,i),r.readyState&&r.readyState.state>=3||!r.on?l():void r.on(o,l)}}return n}function t(n,t,i){function o(t,o){n.logger?n.logger.msg.apply(n.logger,o).module(i+""||"").level(t).log():n.log&&n.log.apply(n,o)}t.log=function(){o("log",arguments)},t.warn=function(){o("warn",arguments)},t.error=function(){o("error",arguments)}}function i(t,i,o){return n(t,i,o),t.plugin_version=u,t}function o(){l=!0}function e(){l=!1}function r(){return l}var u="1.25.24",l=!1,a=null,c={init:function(n){a=n,a.disableSDK=o,a.enableSDK=e,a.getDisabled=r}},f=i(c,"DisableSDK","sdkInitAPI");return f}();