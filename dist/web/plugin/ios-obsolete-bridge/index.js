(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).IOSObsoleteBridge=function(){"use strict";function e(e,t,r){if(t&&(e.plugin_name=t),r&&e.init){var n=e.init;e.init=function(t,i){function a(){n.call(e,t,i)}return t.readyState&&t.readyState.state>=3||!t.on?a():void t.on(r,a)}}return e}function t(t,r,n){return e(t,r,n),t.plugin_version=c,t}function r(){if(s&&!s.bridge.activeBridge&&n()){if(s.bridge.activeBridge=d,s.bridge.bridge_info={touch_app_bridge:!0,platform:"ios",verify_success:i()?"success":"fail"},!s.para.app_js_bridge)return void u("app_js_bridge is not configured, data will not be sent by iOS obsolete bridge.");s.registerInterceptor("sendDataStage",{send:{priority:90,entry:a}}),u("IOS obsolete bridge inits succeed.")}}function n(){return(/sensors-verify/.test(navigator.userAgent)||/sa-sdk-ios/.test(navigator.userAgent))&&!window.MSStream}function i(){if(/sensors-verify/.test(navigator.userAgent)){var e=navigator.userAgent.match(/sensors-verify\/([^\s]+)/);if(e&&e[0]&&"string"==typeof e[1]&&2===e[1].split("?").length){e=e[1].split("?");var t=null,r=null;try{t=o.URL(s.para.server_url).hostname,r=o.URL(s.para.server_url).searchParams.get("project")||"default"}catch(n){s.log(n)}return!(!t||t!==e[0]||!r||r!==e[1])}return!1}return!!/sa-sdk-ios/.test(navigator.userAgent)}function a(e,t){function r(e){var t=JSON.stringify(o.extend({server_url:s.para.server_url},e));return t=t.replace(/\r\n/g,""),t=encodeURIComponent(t),"sensorsanalytics://trackEvent?event="+t}if(s.para.app_js_bridge.is_mui||"item_set"===e.data.type||"item_delete"===e.data.type)return e;var n=e.callback;if(s.bridge.bridge_info.verify_success){var i=document.createElement("iframe"),a=r(e.data);return i.setAttribute("src",a),document.documentElement.appendChild(i),i.parentNode.removeChild(i),i=null,o.isFunction(n)&&n(),t.cancellationToken.cancel(),!0}return s.para.app_js_bridge.is_send?(s.debug.apph5({data:e.data,step:"3.2",output:"all"}),e):(o.isFunction(n)&&n(),t.cancellationToken.cancel(),e)}var s,o,u,c="1.25.1",d={init:function(e){s=e,o=s&&s._,u=s&&s.log||console&&console.log||function(){},r()}},l=t(d,"IOSObsoleteBridge","sdkAfterInitPara");return l}();