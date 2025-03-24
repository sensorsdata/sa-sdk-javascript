(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).GAForwardSensorsData=function(){"use strict";function t(t,n,r){if(n&&(t.plugin_name=n),r&&t.init){var o=t.init;t.init=function(i,a){function c(){o.call(t,i,a)}return e(i,t,n),i.readyState&&i.readyState.state>=3||!i.on?c():void i.on(r,c)}}return t}function e(t,e,n){function r(e,r){t.logger?t.logger.msg.apply(t.logger,r).module(n+""||"").level(e).log():t.log&&t.log.apply(t,r)}e.log=function(){r("log",arguments)},e.warn=function(){r("warn",arguments)},e.error=function(){r("error",arguments)}}function n(e,n,r){return t(e,n,r),e.plugin_version=l,e}function r(t,e){w?w.log(t,e):"object"==typeof console&&console.log&&console.log(t,e)}function o(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var o,i=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(o=i.next()).done;)a.push(o.value)}finally{try{o&&!o.done&&(n=i["return"])&&n.call(i)}catch(c){r("system-sensors-error",c)}}return a}function i(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function a(){if("function"!=typeof window.Proxy||"function"!=typeof window.URL||"function"!=typeof navigator.sendBeacon||"function"!=typeof window.Request)return r("current Browser is not support proxy API,cannot forward GA4 to SensorsAnalytics"),!1;try{var t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=new Proxy(t,{apply:function(t,e,n){return q("open",e,n),t.apply(e,n)}});var e=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=new Proxy(e,{apply:function(t,e,n){return q("send",e,n),t.apply(e,n)}}),O.navigator.sendBeacon=new Proxy(O.navigator.sendBeacon,{apply:function(t,e,n){return A.apply(e,n),t.apply(e,n)}}),O.fetch=new Proxy(O.fetch,{apply:function(t,e,n){return W.apply(e,n),t.apply(e,n)}})}catch(n){r("system-sensors-error",n)}}function c(t){function e(t){return t.replace(/[^A-Za-z0-9_$]/g,"_").replace(/^\d+/g,"_")}var n={},r={};if("[object Object]"===Object.prototype.toString.call(t)){for(var o in t)if("[object Object]"===Object.prototype.toString.call(t[o])){n={};for(var i in t[o])n[e(i)]=t[o][i];r[e(o)]=n}else r[e(o)]=t[o];return r}return t}function s(t){var e=["page_view","scroll","user_engagement","click"];r("amp-event",t),t.forEach(function(t){if(e.includes(t.event))return!1;t=c(t),t.user_properties&&Object.keys(t.user_properties).length>0&&w.setProfile(t.user_properties),t.login_id&&w.login(t.login_id);var n={};t.item.length>0&&t.item.forEach(function(t){n=c(t),"string"==typeof n.item_name&&"string"==typeof n.item_id&&w.setItem(n.item_name,n.item_id,n)}),w.track(t.event,t.properties||{})})}var l="1.27.3",u=["analytics.google.com","google-analytics.com"],p="/g/collect",f="2",y="v",g="uid",m="en",d="cid",v="ep.",h="epn.",_="up.",b="upn.",w=null,S=function(){return S=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},S.apply(this,arguments)},j=function(t){return t.searchParams.get(y)===f},x=function(t,e,n){var a,c={};try{for(var s=i(e.searchParams.entries()),l=s.next();!l.done;l=s.next()){var u=l.value,p=o(u,2),f=p[0],y=p[1];c[f]=y}}finally{try{l&&!l.done&&(a=s["return"])&&a.call(s)}catch(g){r("system-sensors-error",g)}}if(!n)return[c];var m;try{"beacon"===t?m=n.toString().split("\\r\\"):"fetch"===t?m=n.toString().split("\r\n"):"xhr"===t&&(m=[n.toString()]),m=m.map(function(t){var e=S(S({},c),t.split("&").reduce(function(t,e){var n=o(e.split("="),2),r=n[0],i=n[1];return t[decodeURIComponent(r)]=decodeURIComponent(i),t},{}));return e})}catch(g){r("system-sensors-error",g)}return m},P=function(t){function e(t){function e(t){var e={id:"item_id",nm:"item_name",br:"item_brand",ca:"item_category",c2:"item_category2",c3:"item_category3",c4:"item_category4",c5:"item_category5",va:"item_variant",pr:"price",qt:"quantity",cp:"coupon",ln:"item_list_name",lp:"index",li:"item_list_id",ds:"discount",af:"affiliation",pi:"promotion_id",pn:"promotion_name",cn:"creative_name",cs:"creative_slot",lo:"location_id"};return t in e?e[t]:t}var n=t.split("~"),r={};return n.length>0&&n.forEach(function(t,o){if("string"!=typeof t)return t;var i=t.match(/^[k](\d+)(.+)/);if(i&&i[1]&&i[2]&&"string"==typeof n[o+1]&&n[o+1].startsWith("v"+i[1]))r[t.slice(String(i[1]).length+1)]=n[o+1].slice(String(i[1]).length+1),n[o+1]=void 0;else{var a=t.slice(0,2),c=t.slice(2);"id"===a||"nm"===a?r[e(a)]=c.replace(/\s/g,"_"):r[e(a)]=c}return r}),r}return!("object"!=typeof t||!t.map)&&t.map(function(t){t.cu&&(t["ep.currency"]=t.cu);for(var n=1,r=[];t["pr"+n];)r.push(e(t["pr"+n])),++n;return{anonymous_id:String(t[d]),event:String(t[m]).replace(/\s/g,"_"),login_id:t[g],properties:S(S({},D(t,v,h))),user_properties:D(t,_,b),item:r}})},D=function(t,e,n){var a,c,s={};try{for(var l=i(Object.entries(t)),u=l.next();!u.done;u=l.next()){var p=u.value,f=o(p,2),y=f[0],g=f[1];y.startsWith(e)&&(c=y.slice(e.length),s[c]=String(g)),y.startsWith(n)&&(c=y.slice(n.length),s[c]=Number(g))}}finally{try{u&&!u.done&&(a=l["return"])&&a.call(l)}catch(m){r("system-sensors-error",m)}}return s},O=window,R={saveData:null,me:null},q=function(t,e,n){"open"===t&&(R={saveData:n&&n[1],me:e}),"send"===t&&"string"==typeof R.saveData&&e===R.me&&(L("xhr",R.saveData,n[0]||null),R={})},W=function(t,e){try{"string"==typeof t&&L("fetch",t,"object"==typeof e?e.body:null)}catch(n){r("system-sensors-error",n)}},A=function(t,e){return L("beacon",t,e)},L=function(t,e,n){if(!e.startsWith("http"))return!1;try{var o=new URL(e);if(u.some(function(t){return o.hostname.endsWith(t)})&&o.pathname===p&&j(o)){var i=x(t,o,n);r("ga-event",i);var a=P(i);s(a)}}catch(c){r("system-sensors-error",c)}},k={plugin_name:"GAForwardSensorsData",init:function(t,e){w=t,e=e||{},"object"==typeof e.domain&&e.domain.length>0&&(u=u.concat(e.domain)),a()}},B=n(k);return B}();