(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).BatchSender=function(){"use strict";function n(n,a,e){if(a&&(n.plugin_name=a),e&&n.init){var r=n.init;n.init=function(o,i){function c(){r.call(n,o,i)}return t(o,n,a),o.readyState&&o.readyState.state>=3||!o.on?c():void o.on(e,c)}}return n}function t(n,t,a){function e(t,e){n.logger?n.logger.msg.apply(n.logger,e).module(a+""||"").level(t).log():n.log&&n.log.apply(n,e)}t.log=function(){e("log",arguments)},t.warn=function(){e("warn",arguments)},t.error=function(){e("error",arguments)}}function a(t,a,e){return n(t,a,e),t.plugin_version=l,t}function e(n,t){return!i.para.app_js_bridge&&i.para.batch_send&&c.localStorage.isSupport()&&localStorage.length<i.para.batch_send.storage_length&&(p.add(n.data),t.cancellationToken.stop()),n}function r(){var n={datasend_timeout:6e3,send_interval:6e3,storage_length:200};c.localStorage.isSupport()&&c.isSupportCors()&&"object"==typeof localStorage?i.para.batch_send===!0?i.para.batch_send=c.extend({},n):"object"==typeof i.para.batch_send&&(i.para.batch_send=c.extend({},n,i.para.batch_send)):i.para.batch_send=!1}function o(){i.on("sdkInitPara",function(){r()}),i.on("sdkAfterInitPara",function(){!i.para.app_js_bridge&&i.para.batch_send&&c.localStorage.isSupport()&&(p||(p=new c.BatchSend),p.batchInterval(),i.registerInterceptor("sendDataStage",{send:{priority:100,entry:e}}))})}var i,c,l="1.26.10",p=null,s={plugin_name:"BatchSender",init:function(n){i=n,c=i._,o()}},u=a(s);return u}();