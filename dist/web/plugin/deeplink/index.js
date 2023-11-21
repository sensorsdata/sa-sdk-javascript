(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).Deeplink=(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).deeplink=function(){"use strict";function i(i,t,n){if(t&&(i.plugin_name=t),n&&i.init){var o=i.init;i.init=function(r,s){function a(){o.call(i,r,s)}return e(r,i,t),r.readyState&&r.readyState.state>=3||!r.on?a():void r.on(n,a)}}return i}function e(i,e,t){function n(e,n){i.logger?i.logger.msg.apply(i.logger,n).module(t+""||"").level(e).log():i.log&&i.log.apply(i,n)}e.log=function(){n("log",arguments)},e.warn=function(){n("warn",arguments)},e.error=function(){n("error",arguments)}}function t(e,t,n){return i(e,t,n),e.plugin_version=r,e}function n(){return"undefined"!=typeof o&&document[o]}var o,r="1.25.24",s=(/micromessenger\/([\d.]+)/i.test(navigator.userAgent||""),function(){var i={};return"undefined"!=typeof document.hidden?(i.hidden="hidden",i.visibilityChange="visibilitychange"):"undefined"!=typeof document.msHidden?(i.hidden="msHidden",i.visibilityChange="msvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(i.hidden="webkitHidden",i.visibilityChange="webkitvisibilitychange"),i});o=s().hidden;var a={android:/Android/i,iOS:/iPhone|iPad|iPod/i},d=function(){for(var i in a)if(navigator.userAgent.match(a[i]))return i;return""},l=d(),u=function(){return a.hasOwnProperty(l)},h=function(i){return null!=i&&"[object Object]"==Object.prototype.toString.call(i)},g=function(i){var e=/\/sd\/(\w+)\/(\w+)$/;return i.match(e)},c=function(i){var e=i._.URL(i.para.server_url);return{origin:e.origin,project:e.searchParams.get("project")||"default"}},p=function(i,e,t){i.log("\u5c1d\u8bd5\u5524\u8d77 android app");var r=e;i.log("\u5524\u8d77APP\u7684\u5730\u5740\uff1a"+r),window.location=r,i.timer=setTimeout(function(){var e=n();return i.log("hide:"+o+":"+document[o]),e?(i.log("The page is hidden, stop navigating to download page"),!1):(i.log("App\u53ef\u80fd\u672a\u5b89\u88c5\uff0c\u8df3\u8f6c\u5230\u4e0b\u8f7d\u5730\u5740"),void(window.location=t))},i.timeout)},f=function(i,e,t){i.log("\u5c1d\u8bd5\u5524\u8d77 iOS app:"+e),window.location.href=e,i.timer=setTimeout(function(){var e=n();return e?(i.log("The page is hidden, stop navigating to download page"),!1):(i.log("App\u53ef\u80fd\u672a\u5b89\u88c5\uff0c\u8df3\u8f6c\u5230\u4e0b\u8f7d\u5730\u5740"),void(window.location.href=t))},i.timeout),i.log("new timer:"+i.timer)},m={key:null,timer:null,sd:null,data:null,timeout:2500,apiURL:"{origin}/sdk/deeplink/param?key={key}&system_type=JS&project={project}",init:function(i){if(this.sd)return this.log("deeplink\u5df2\u7ecf\u521d\u59cb\u5316"),!1;if(this.sd=i,this.log("deeplink init called"),null===this.sd)return this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165"),!1;var e={};if(arguments.length>0&&(1===arguments.length&&h(arguments[0])?e=arguments[0]:arguments.length>=2&&h(arguments[1])&&(e=arguments[1])),!u())return this.log("\u4e0d\u652f\u6301\u5f53\u524d\u7cfb\u7edf\uff0c\u76ee\u524d\u53ea\u652f\u6301Android\u548ciOS"),!1;if(h(e)&&this.sd._.isNumber(e.timeout)&&e.timeout>=2500&&(this.timeout=e.timeout),!this.sd.para.server_url)return this.log("\u795e\u7b56JS SDK\u914d\u7f6e\u9879server_url\u672a\u6b63\u786e\u914d\u7f6e"),!1;var t=c(this.sd);this.apiURL=this.apiURL.replace("{origin}",t.origin).replace("{project}",t.project);var n=this.sd._.getQueryParam(window.location.href,"deeplink");if(!n)return this.log("\u5f53\u524d\u9875\u9762\u7f3a\u5c11deeplink\u53c2\u6570"),!1;n=window.decodeURIComponent(n);var o=g(n);return o?(this.key=o[2],this.apiURL=this.apiURL.replace("{key}",window.encodeURIComponent(o[2])),this.sd._.ajax({url:this.apiURL,type:"GET",cors:!0,credentials:!1,success:function(i){return i.errorMsg?(m.log("API\u62a5\u9519\uff1a"+i.errorMsg),!1):(m.data=i,m.log("API\u67e5\u8be2\u6210\u529f\uff0c\u6570\u636e\uff1a"+JSON.stringify(i,null,"  ")),void(this.data.app_key&&(this.data.android_info&&this.data.android_info.url_schemes&&(this.data.android_info.url_schemes+="://sensorsdata/sd/"+this.data.app_key+"/"+this.key),this.data.ios_info&&this.data.ios_info.url_schemes&&(this.data.ios_info.url_schemes+="://sensorsdata/sd/"+this.data.app_key+"/"+this.key))))}.bind(this),error:function(){m.log("API\u67e5\u8be2\u51fa\u9519")}}),void this.addListeners()):(this.log("\u5f53\u524d\u9875\u9762\u7684deeplink\u53c2\u6570\u65e0\u6548"),!1)},openDeepLink:function(){if(this.log("openDeeplink()"),!this.data)return this.log("\u6ca1\u6709Deep link\u6570\u636e!"),!1;if("iOS"===l){this.log("\u5f53\u524d\u7cfb\u7edf\u662fiOS");var i=this.sd&&this.sd._&&this.sd._.getIOSVersion()>=9&&this.data.ios_info.ios_wake_url?this.data.ios_info.ios_wake_url:this.data.ios_info.url_schemes;this.log("\u5524\u8d77APP\u7684\u5730\u5740\uff1a"+i),f(this,i,this.data.ios_info.download_url)}else this.log("\u5f53\u524d\u7cfb\u7edf\u662f android"),p(this,this.data.android_info.url_schemes,this.data.android_info.download_url)},log:function(i){this.sd&&this.sd.log(i)},addListeners:function(){var i=s().visibilityChange,e=this;i&&document.addEventListener(i,function(){clearTimeout(e.timer),e.log("visibilitychange, clear timeout:"+e.timer)},!1),window.addEventListener("pagehide",function(){e.log("page hide, clear timeout:"+e.timer),clearTimeout(e.timer)},!1)}},v=t(m,"Deeplink","sdkReady");return v}();