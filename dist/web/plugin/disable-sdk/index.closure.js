!function(){"use strict";function n(n,t,i){var e=n.init;return t&&(n.name=t),n.init=function(t,u){function a(){e.call(n,t,u)}return t.readyState&&t.readyState.state>=3||!t.on?a():void t.on(i,a)},n}function t(){u=!0}function i(){u=!1}function e(){return u}var u=!1,a=null,r={init:function(n){a=n,a.disableSDK=t,a.enableSDK=i,a.getDisabled=e}};return n(r,"DisableSDK","sdkInitAPI"),r}();