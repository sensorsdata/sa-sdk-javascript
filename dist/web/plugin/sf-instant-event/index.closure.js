!function(){"use strict";function e(e,n,r){if(n&&(e.plugin_name=n),r&&e.init){var a=e.init;e.init=function(i,o){function u(){a.call(e,i,o)}return t(i,e,n),i.readyState&&i.readyState.state>=3||!i.on?u():void i.on(r,u)}}return e}function t(e,t,n){function r(t,r){e.logger?e.logger.msg.apply(e.logger,r).module(n+""||"").level(t).log():e.log&&e.log.apply(e,r)}t.log=function(){r("log",arguments)},t.warn=function(){r("warn",arguments)},t.error=function(){r("error",arguments)}}function n(t,n,r){return e(t,n,r),t.plugin_version=f,t}function r(e,t){var n=s.kit.encodeTrackData(t);return e.indexOf("?")!==-1?e+"&"+n:e+"?"+n}function a(e){if("beacon"===s.para.send_type&&c.isSupportBeaconSend())return e.data=s.kit.encodeTrackData(e.data)+"&instant_event=true",new c.BeaconSend(e);if("ajax"===s.para.send_type&&c.isSupportCors())return e.data=s.kit.encodeTrackData(e.data)+"&instant_event=true",new c.BeaconSend(e);var t=r(e.server_url,e.data),n=c.getQueryParam(t,"ext"),a=c.urlParse(t);return a.addQueryString({ext:n+"%2Cinstant_evnet%3Dtrue"}),e.data=a.getUrl(),new c.ImageSend(e)}function i(e){var t=a(e);t.start()}function o(e,t){var n=e.data.event,r=e.data.type;if(!n||c.indexOf(d,n)===-1)return e;var a=s.para.app_js_bridge&&s.bridge&&s.bridge.bridge_info&&"success"===s.bridge.bridge_info.verify_success,o="item_set"===r||"item_delete"===r,u=s.para.app_js_bridge.is_mui===!0;if(a&&!o&&!u)return e.data.is_instant_event=!0,e;t.cancellationToken.stop();var f=e.server_url;return c.isArray(f)&&f.length?void c.each(f,function(t){e.callback=null,e.server_url=t,i(e)}):(i(e),e)}function u(){s.registerInterceptor("sendDataStage",{send:{priority:50,entry:o}})}var s,c,d,f="1.25.5",l={plugin_name:"SfInstantEvent",init:function(e,t){if(s=e,c=s._,c.isObject(t)&&c.isArray(t.instant_events)){if(d=t.instant_events,s.readyState&&s.readyState.state>=3||!s.on)return u();s.on("sdkAfterInitPara",function(){u()})}else s.log("SfInstantEvent init failed\uff0cparameter error. option:",t)}},g=n(l);return g}();