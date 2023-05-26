(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).Exposure=function(){"use strict";function e(e,n,r){if(n&&(e.plugin_name=n),r&&e.init){var i=e.init;e.init=function(a,o){function s(){i.call(e,a,o)}return t(a,e,n),a.readyState&&a.readyState.state>=3||!a.on?s():void a.on(r,s)}}return e}function t(e,t,n){function r(t,r){e.logger?e.logger.msg.apply(e.logger,r).module(n+""||"").level(t).log():e.log&&e.log.apply(e,r)}t.log=function(){r("log",arguments)},t.warn=function(){r("warn",arguments)},t.error=function(){r("error",arguments)}}function n(t,n,r){return e(t,n,r),t.plugin_version=u,t}function r(){return("MutationObserver"in window||"WebKitMutationObserver"in window||"MozMutationObserver"in window)&&"IntersectionObserver"in window}function i(e){var t={};return o.each(e,function(n,r){switch(r){case"area_rate":n=Number(n),!isNaN(n)&&n>=0&&n<=1?t.area_rate=n:s("parameter config.area_rate error. config:",e);break;case"stay_duration":n=Number(n),!isNaN(n)&&n>=0?t.stay_duration=n:s("parameter config.stay_duration error. config:",e);break;case"repeated":"false"===n||n===!1||"true"===n||n===!0?t.repeated="false"!==n&&Boolean(n):s("parameter config.repeated error. config:",e)}}),t}var a,o,s,u="1.25.5",c="data-sensors-exposure-event-name",d={},l=[],f={area_rate:0,stay_duration:0,repeated:!0},v={isReady:!1,init:function(e){if(!r())return void s("The current browser does not support the element exposure key API, and the element exposure plugin initialization failed.");var t=this;o.isObject(e)&&(f=o.extend(f,i(e))),o.bindReady(function(){var e=t.getElesByEventName();t.addObserveByNodes(e),p.init()}),a.ee.spa.on("switch",function(e){if(e===location.href)return!1;t.clear();var n=t.getElesByEventName();t.addObserveByNodes(n)}),o.listenPageState({visible:function(){t.start()},hidden:function(){t.stop()}}),this.isReady=!0},getElesByEventName:function(e){return e=e||document,e.querySelectorAll("["+c+"]")},getEleEventName:function(e){return e.getAttribute(c)},getEleAttr:function(e,t){t=t||e.attributes;var n={},r={},a=this.getEleEventName(e);return o.each(t,function(e){var t=e.value;try{var i=e.name.match(/^data-sensors-exposure-property-(.+)/);i&&(n[i[1]]=t)}catch(a){}try{var o=e.name.match(/^data-sensors-exposure-config-(.+)/);if(o)switch(o[1]){case"area_rate":r.area_rate=t;break;case"stay_duration":r.stay_duration=t;break;case"repeated":r.repeated=t}}catch(a){}}),{eventName:a,config:i(r),properties:n}},addObserveByNodes:function(e){if(e.length){var t=this;o.each(e,function(e){if(1===e.nodeType&&e.hasAttribute(c)){var n=t.getEleAttr(e);n.config=o.extend({},f,n.config),n.ele=e,t.addOrUpdateWatchEle(n)}})}},getIntersection:function(e){var t=null,n=this;return t=d[e.area_rate]?d[e.area_rate]:d[e.area_rate]=new IntersectionObserver(function(){n.exposure.apply(n,arguments)},{threshold:e.area_rate})},exposure:function(e){var t=this;o.each(e,function(e){var n=e.target,r=t.getEleOption(n);return e.isIntersecting===!1||!r||r.config.isSend?void(r&&r.timer&&(clearTimeout(r.timer),r.timer=null)):void(e.intersectionRatio>=r.config.area_rate&&(r.timer&&(clearTimeout(r.timer),r.timer=null),r.timer=setTimeout(function(){var e=n.getBoundingClientRect(),r=t.getEleOption(n);if(e.width&&e.height&&r&&r.eventName&&!r.config.isSend){var i=a.heatmap.getEleDetail(n);a.track(r.eventName,o.extend({},i,r.properties)),r.config.isSend=!0,r.config.repeated&&(r.config.isSend=!1)}},1e3*r.config.stay_duration)))})},getEleOption:function(e){var t=null;return o.each(l,function(n){e===n.ele&&(t=n)}),t},addOrUpdateWatchEle:function(e){var t=e.ele,n=e.config,r=v.getEleOption(t);if(r)o.extend2Lev(r,e),r.config.repeated&&(r.config.isSend=!1);else{if(!e.eventName)return s("parameter option.eventName error. option:",e),!1;o.isElement(t)||s("parameter element error. option:",e);var i=this.getIntersection(n);i.observe(t),l.push(e)}},removeWatchEle:function(e){var t=null,n=-1;if(o.each(l,function(r,i){e===r.ele&&(t=r,n=i)}),t){var r=t.config,i=d[r.area_rate];i&&o.isElement(e)&&(i.unobserve(e),t.timer&&(clearTimeout(t.timer),t.timer=null),n>-1&&l.splice(n,1))}},start:function(){o.each(l,function(e){var t=e.config,n=e.ele,r=d[t.area_rate];r&&o.isElement(n)&&r.observe(n)})},stop:function(){o.each(l,function(e){var t=e.config,n=e.ele,r=d[t.area_rate];r&&o.isElement(n)&&(r.unobserve(n),e.timer&&(clearTimeout(e.timer),e.timer=null))})},clear:function(){this.stop(),d={},l=[]}},p={mo:null,init:function(){var e=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;this.mo=new e(this.listenNodesChange),this.observe()},observe:function(){this.mo.observe(document.body,{attributes:!0,childList:!0,subtree:!0,attributeOldValue:!0})},listenNodesChange:function(e){o.each(e,function(e){switch(e.type){case"childList":e.removedNodes.length>0?o.each(e.removedNodes,function(e){if(1===e.nodeType){v.removeWatchEle(e);var t=v.getElesByEventName(e);t.length&&o.each(t,function(e){v.removeWatchEle(e)})}}):e.addedNodes.length&&(v.addObserveByNodes(e.addedNodes),o.each(e.addedNodes,function(e){if(1===e.nodeType){var t=v.getElesByEventName(e);v.addObserveByNodes(t)}}));break;case"attributes":if(!e.attributeName)return!1;var t=e.target,n=e.attributeName;if(!o.isString(n)||n.indexOf("data-sensors-exposure")<0)return;var r=v.getEleAttr(t,[{name:n}]),i=v.getEleOption(t)||{ele:t,config:f},a=o.extend2Lev({},i,r);Object.prototype.hasOwnProperty.call(a,"eventName")?v.addOrUpdateWatchEle(a):v.removeWatchEle(t)}})}},g={exposureViews:l,init:function(e,t){return!(!e||a)&&(a=e,o=a._,s=a.log,v.init(t),void s("Exposure Plugin initialized successfully"))},addExposureView:function(e,t){if(!v.isReady)return void s("Exposure Plugin uninitialized.");if(!o.isElement(e))return void s("parameter element error.");var n={ele:e,config:o.isObject(t.config)?i(t.config):{},eventName:t.eventName,properties:o.isObject(t.properties)?t.properties:{}},r=v.getEleOption(e);if(r){if(r=o.extend2Lev({},r,n),!o.isString(r.eventName)||!r.eventName)return void s("parameter option.eventName error. option",t);r.config.repeated&&(r.config.isSend=!1)}else{if(!o.isString(n.eventName)||!n.eventName)return void s("parameter option.eventName error. option",t);v.addOrUpdateWatchEle(n)}},removeExposureView:function(e){return v.isReady?o.isElement(e)?void v.removeWatchEle(e):void s("removeExposureView parameter ele errors."):void s("Exposure Plugin uninitialized.")}},m=n(g,"Exposure","sdkAfterInitPara");return m}();