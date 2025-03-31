!function(){"use strict";function n(n,e,a){if(e&&(n.plugin_name=e),a&&n.init){var r=n.init;n.init=function(i,o){function u(){r.call(n,i,o)}return t(i,n,e),i.readyState&&i.readyState.state>=3||!i.on?u():void i.on(a,u)}}return n}function t(n,t,e){function a(t,a){n.logger?n.logger.msg.apply(n.logger,a).module(e+""||"").level(t).log():n.log&&n.log.apply(n,a)}t.log=function(){a("log",arguments)},t.warn=function(){a("warn",arguments)},t.error=function(){a("error",arguments)}}function e(t,e,a){return n(t,e,a),t.plugin_version=l,t}function a(n){var t=[];return u.each(n,function(n){u.isArray(n)?t=t.concat(a(n)):t.push(u.optimizeServerUrl(n))}),t}function r(n,t){t=u.isArray(t)?t:[t];var e=!1;return u.isArray(n)?u.each(n,function(n){u.indexOf(t,n)>-1&&(e=!0)}):u.indexOf(t,n)>-1&&(e=!0),e}function i(n,t){var e=o.kit.encodeTrackData(t);return n.indexOf("?")!==-1?n+"&"+e:n+"?"+e}var o,u,c,l="1.27.4",s={hookFn:null,init:function(n){this.hookFn=n,o.registerInterceptor("sendDataStage",{send:{priority:20,entry:function(n,t){return s.sendData(n,t),n}}})},sendData:function(n,t){var e=n.origin_data,i=e.event,o=n.server_url,c=n.callback,l=this,s=this.hookFn({event_name:i,data:u.extend2Lev({identities:{},lib:{},properties:{}},e),server_url:o});return u.isArray(s)&&s.length?(s=a(s),r(o,s)?c=null:t.cancellationToken.stop(),u.each(s,function(t){if(t&&""!==t&&!r(t,o)){var a=function(t){return function(){l.sendCall({server_url:t,origin_data:e,data:n.data,config:null,callback:c}),c=null,n.callback=null}}(t);setTimeout(a)}}),n):(u.isFunction(c)&&c(),t.cancellationToken.stop(),n)},getInstance:function(n){return"beacon"===o.para.send_type&&u.isSupportBeaconSend()?(n.data=o.kit.encodeTrackData(n.data),new u.BeaconSend(n)):"ajax"===o.para.send_type&&u.isSupportCors()?(n.data=o.kit.encodeTrackData(n.data),new u.AjaxSend(n)):(n.origin_data._flush_time=(new Date).getTime(),n.data=i(n.server_url,n.origin_data),new u.ImageSend(n))},sendCall:function(n){var t=this.getInstance(n);t.start()}},d={plugin_name:"CustomEventsSender",init:function(n,t){if(o=n,u=o._,c=o&&o.log||console&&console.log||function(){},u.isFunction(t)){if(o.readyState&&o.readyState.state>=3||!o.on)return s.init(t);o.on("sdkAfterInitPara",function(){s.init(t)})}else c("CustomEventsSender init failed\uff0chookFn error. hookFn:",t)}},f=e(d);return f}();