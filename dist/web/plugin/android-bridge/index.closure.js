!function(){"use strict";function e(e){return y&&y.call(f,JSON.stringify(e))}function i(e){return v.call(f)&&b&&b.call(f,JSON.stringify(e))}function r(e,i){return i&&"function"==typeof i[e.callType]&&i[e.callType]()}function a(e,i,r){if(i&&(e.plugin_name=i),r&&e.init){var a=e.init;e.init=function(s,t){function o(){a.call(e,s,t)}return n(s,e,i),s.readyState&&s.readyState.state>=3||!s.on?o():void s.on(r,o)}}return e}function n(e,i,r){function a(i,a){e.logger?e.logger.msg.apply(e.logger,a).module(r+""||"").level(i).log():e.log&&e.log.apply(e,a)}i.log=function(){a("log",arguments)},i.warn=function(){a("warn",arguments)},i.error=function(){a("error",arguments)}}function s(e,i,r){return a(e,i,r),e.plugin_version=w,e}function t(){if(c=window.SensorsData_APP_New_H5_Bridge,_=c&&c.sensorsdata_track,l=_&&c.sensorsdata_get_server_url&&c.sensorsdata_get_server_url(),p("---test---fail---",!u,u.bridge.activeBridge,!l),u&&!u.bridge.activeBridge&&l)return u.bridge.activeBridge=j,u.para.app_js_bridge&&!u.para.app_js_bridge.is_mui&&(u.bridge.is_verify_success=l&&u.bridge.validateAppUrl(l),p("---test---bridge-verify-",u.bridge.is_verify_success)),u.bridge.bridge_info={touch_app_bridge:!0,platform:"android",verify_success:u.bridge.is_verify_success?"success":"fail",support_two_way_call:!!c.sensorsdata_js_call_app},u.para.app_js_bridge?void u.registerInterceptor("sendDataStage",{send:{priority:60,entry:o}}):void p("---test---app_js_bridge is not configured, data will not be sent by android bridge.")}function o(e,i){if(p("---test---datasend-",u.bridge.is_verify_success),u.para.app_js_bridge.is_mui||"item_set"===e.data.type||"item_delete"===e.data.type)return e;var r=e.callback;return u.bridge.is_verify_success?(p("---test---bridge-verify-success---",e.data),_&&_.call(c,JSON.stringify(g.extend({server_url:u.para.server_url},e.data))),g.isFunction(r)&&r(),i.cancellationToken.cancel(),e):(p("---test---bridge-verify-fail-----",u.bridge.is_verify_success),u.para.app_js_bridge.is_send?(u.debug.apph5({data:e.data,step:"4.2",output:"all"}),e):(g.isFunction(r)&&r(),i.cancellationToken.cancel(),e))}function d(e){var i=e.callType;return i in m.commands?m.commands[i](e,c):void(c&&g.isFunction(c.sensorsdata_js_call_app)&&c.sensorsdata_js_call_app(JSON.stringify(e)))}var c,_,l,u,g,p,f=window.SensorsData_App_Visual_Bridge,v=f&&f.sensorsdata_visualized_mode,y=f&&f.sensorsdata_visualized_alert_info,b=f&&f.sensorsdata_hover_web_nodes,m={isVerify:function(){return v&&(v===!0||v.call(f))},commands:{app_alert:e,visualized_track:i,page_info:i,sensorsdata_get_app_visual_config:r}},w="1.26.10",j={init:function(e){u=e,g=u&&u._,p=u&&u.log||console&&console.log||function(){},t()},handleCommand:d},S=s(j,"AndroidBridge","sdkAfterInitPara");return S}();