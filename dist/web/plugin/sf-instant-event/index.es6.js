var sd,_,instant_events,sdkversion_placeholder="1.26.2";function wrapPluginInitFn(e,n,t){if(n&&(e.plugin_name=n),t&&e.init){var r=e.init;e.init=function(a,i){if(wrapLogFn(a,e,n),a.readyState&&a.readyState.state>=3||!a.on)return s();function s(){r.call(e,a,i)}a.on(t,s)}}return e}function wrapLogFn(e,n,t){function r(n,r){e.logger?e.logger.msg.apply(e.logger,r).module(t+""||"").level(n).log():e.log&&e.log.apply(e,r)}n.log=function(){r("log",arguments)},n.warn=function(){r("warn",arguments)},n.error=function(){r("error",arguments)}}function createPlugin(e,n,t){return wrapPluginInitFn(e,n,t),e.plugin_version=sdkversion_placeholder,e}function getSendUrl(e,n){var t=sd.kit.encodeTrackData(n);return-1!==e.indexOf("?")?e+"&"+t:e+"?"+t}function getInstance(e){if("beacon"===sd.para.send_type&&_.isSupportBeaconSend())return e.data=sd.kit.encodeTrackData(e.data)+"&instant_event=true",new _.BeaconSend(e);if("ajax"===sd.para.send_type&&_.isSupportCors())return e.data=sd.kit.encodeTrackData(e.data)+"&instant_event=true",new _.BeaconSend(e);var n=getSendUrl(e.server_url,e.data),t=_.getQueryParam(n,"ext"),r=_.urlParse(n);return r.addQueryString({ext:t+"%2Cinstant_evnet%3Dtrue"}),e.data=r.getUrl(),new _.ImageSend(e)}function sendCall(e){getInstance(e).start()}function sendInterceptor(e,n){var t=e.data.event,r=e.data.type;if(!t||-1===_.indexOf(instant_events,t))return e;var a=sd.para.app_js_bridge&&sd.bridge&&sd.bridge.bridge_info&&"success"===sd.bridge.bridge_info.verify_success,i="item_set"===r||"item_delete"===r,s=!0===sd.para.app_js_bridge.is_mui;if(a&&!i&&!s)return e.data.is_instant_event=!0,e;n.cancellationToken.stop();var d=e.server_url;if(!_.isArray(d)||!d.length)return sendCall(e),e;_.each(d,function(n){e.callback=null,e.server_url=n,sendCall(e)})}function senderInit(){sd.registerInterceptor("sendDataStage",{send:{priority:50,entry:sendInterceptor}})}var SfInstantEvent={plugin_name:"SfInstantEvent",init:function(e,n){if((_=(sd=e)._).isObject(n)&&_.isArray(n.instant_events)){if(instant_events=n.instant_events,sd.readyState&&sd.readyState.state>=3||!sd.on)return senderInit();sd.on("sdkAfterInitPara",function(){senderInit()})}else sd.log("SfInstantEvent init failed\uff0cparameter error. option:",n)}},index=createPlugin(SfInstantEvent);export default index;