(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).PageLoad=function(){"use strict";function e(e,t,o){if(t&&(e.plugin_name=t),o&&e.init){var r=e.init;e.init=function(i,a){function d(){r.call(e,i,a)}return n(i,e,t),i.readyState&&i.readyState.state>=3||!i.on?d():void i.on(o,d)}}return e}function n(e,n,t){function o(n,o){e.logger?e.logger.msg.apply(e.logger,o).module(t+""||"").level(n).log():e.log&&e.log.apply(e,o)}n.log=function(){o("log",arguments)},n.warn=function(){o("warn",arguments)},n.error=function(){o("error",arguments)}}function t(n,t,r){return e(n,t,r),n.plugin_version=o,n}var o="1.26.3",r=!1,i={init:function(e,n){function t(n,t){if(n.getEntries&&"function"==typeof n.getEntries){for(var o=n.getEntries(),r=null,i=0;i<o.length;i++)"transferSize"in o[i]&&(r+=o[i].transferSize);e._.isNumber(r)&&r>=0&&r<10737418240&&(t.$page_resource_size=Number((r/1024).toFixed(3)))}}function o(n){var t=0;if(n.timing){var o=n.timing;0!==o.fetchStart&&e._.isNumber(o.fetchStart)&&0!==o.domContentLoadedEventEnd&&e._.isNumber(o.domContentLoadedEventEnd)?t=o.domContentLoadedEventEnd-o.fetchStart:e.log("performance \u6570\u636e\u83b7\u53d6\u5f02\u5e38")}return t}function i(n){var t=0;if(e._.isFunction(n.getEntriesByType)){var o=n.getEntriesByType("navigation")||[{}];t=(o[0]||{}).domContentLoadedEventEnd||0}return t}function a(){var d=0,u=window.performance||window.webkitPerformance||window.msPerformance||window.mozPerformance,c={$url:e._.getURL(),$title:document.title,$url_path:e._.getURLPath(),$referrer:e._.getReferrer(null,!0)};if(u?(d=i(u)||o(u),t(u,c)):e.log("\u6d4f\u89c8\u5668\u672a\u652f\u6301 performance API."),d>0){var f=e._.isObject(n)&&n.max_duration||1800;d=Number((d/1e3).toFixed(3)),(!e._.isNumber(f)||f<=0||d<=f)&&(c.event_duration=d)}r||(e.track("$WebPageLoad",c),r=!0),window.removeEventListener?window.removeEventListener("load",a):window.detachEvent&&window.detachEvent("onload",a)}"complete"==document.readyState?a():window.addEventListener?window.addEventListener("load",a):window.attachEvent&&window.attachEvent("onload",a)}},a=t(i,"PageLoad","sdkReady");return a}();