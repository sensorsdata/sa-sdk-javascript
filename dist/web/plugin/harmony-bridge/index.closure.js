!function(){"use strict";function e(e,n,i){if(n&&(e.plugin_name=n),i&&e.init){var a=e.init;e.init=function(t,o){function s(){a.call(e,t,o)}return r(t,e,n),t.readyState&&t.readyState.state>=3||!t.on?s():void t.on(i,s)}}return e}function r(e,r,n){function i(r,i){e.logger?e.logger.msg.apply(e.logger,i).module(n+""||"").level(r).log():e.log&&e.log.apply(e,i)}r.log=function(){i("log",arguments)},r.warn=function(){i("warn",arguments)},r.error=function(){i("error",arguments)}}function n(r,n,i){return e(r,n,i),r.plugin_version=u,r}function i(){return o=window.SensorsData_APP_New_H5_Bridge,s=o&&o.sensorsdata_harmony_get_server_url&&o.sensorsdata_harmony_get_server_url(),d=o&&o.sensorsdata_harmony_js_call_app,c&&!c.bridge.activeBridge&&s&&d?(c.bridge.activeBridge=g,c.para.app_js_bridge&&!c.para.app_js_bridge.is_mui&&(c.bridge.is_verify_success=s&&c.bridge.validateAppUrl(s)),c.bridge.bridge_info={touch_app_bridge:!0,platform:"harmony",verify_success:c.bridge.is_verify_success?"success":"fail",support_two_way_call:!1},c.para.app_js_bridge?(c.registerInterceptor("sendDataStage",{send:{priority:60,entry:a}}),void l("Harmony bridge inits succeed.")):void l("app_js_bridge is not configured, data will not be sent by harmony bridge.")):void l("harmony bridge init failed.")}function a(e,r){if(c.para.app_js_bridge.is_mui||"item_set"===e.data.type||"item_delete"===e.data.type)return e;var n=e.callback;return c.bridge.is_verify_success?(d.call(o,JSON.stringify(_.extend({server_url:c.para.server_url},e.data))),_.isFunction(n)&&n(),r.cancellationToken.cancel(),e):c.para.app_js_bridge.is_send?(c.debug.apph5({data:e.data,step:"4.2",output:"all"}),e):(_.isFunction(n)&&n(),r.cancellationToken.cancel(),e)}function t(){l("harmony sdk not supported command.")}var o,s,d,c,_,l,u="1.26.16",g={init:function(e){c=e,_=c&&c._,l=c&&c.log||console&&console.log||function(){},i()},handleCommand:t},p=n(g,"HarmonyBridge","sdkAfterInitPara");return p}();