(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).BeaconSender=function(){"use strict";function n(n,r,t){if(r&&(n.plugin_name=r),t&&n.init){var o=n.init;n.init=function(a,i){function u(){o.call(n,a,i)}return e(a,n,r),a.readyState&&a.readyState.state>=3||!a.on?u():void a.on(t,u)}}return n}function e(n,e,r){function t(e,t){n.logger?n.logger.msg.apply(n.logger,t).module(r+""||"").level(e).log():n.log&&n.log.apply(n,t)}e.log=function(){t("log",arguments)},e.warn=function(){t("warn",arguments)},e.error=function(){t("error",arguments)}}function r(e,r,t){return n(e,r,t),e.plugin_version=l,e}function t(n){var e=new c.BeaconSend(n);e.start()}function o(n,e){var r=null,o=null;c.isObject(n.config)&&(r=n.config.send_type,o=c.optimizeServerUrl(n.config.server_url));var a="beacon"===r||!r&&"beacon"===u.para.send_type;if(a&&c.isSupportBeaconSend()){var i=o||n.server_url;n.server_url=i,n.data=u.kit.encodeTrackData(n.data),c.isArray(i)&&i.length?c.each(i,function(e){n.callback=null,n.server_url=e,t(n)}):"string"==typeof i&&""!==i?t(n):u.log("\u5f53\u524d server_url \u4e3a\u7a7a\u6216\u4e0d\u6b63\u786e\uff0c\u53ea\u5728\u63a7\u5236\u53f0\u6253\u5370\u65e5\u5fd7\uff0cnetwork \u4e2d\u4e0d\u4f1a\u53d1\u6570\u636e\uff0c\u8bf7\u914d\u7f6e\u6b63\u786e\u7684 server_url\uff01"),e.cancellationToken.stop()}return n}function a(){"beacon"!==u.para.send_type||c.isSupportBeaconSend()||(u.para.send_type="image")}function i(){u.on("sdkInitPara",function(){a()}),u.on("sdkAfterInitPara",function(){u.registerInterceptor("sendDataStage",{send:{priority:110,entry:o}})})}var u,c,l="1.25.16",s={plugin_name:"BeaconSender",init:function(n){u=n,c=u._,i()}},g=r(s);return g}();