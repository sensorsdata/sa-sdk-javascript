(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).SensorsChannel=function(){"use strict";function e(e,t,i){if(t&&(e.plugin_name=t),i&&e.init){var a=e.init;e.init=function(r,s){function l(){a.call(e,r,s)}return n(r,e,t),r.readyState&&r.readyState.state>=3||!r.on?l():void r.on(i,l)}}return e}function n(e,n,t){function i(n,i){e.logger?e.logger.msg.apply(e.logger,i).module(t+""||"").level(n).log():e.log&&e.log.apply(e,i)}n.log=function(){i("log",arguments)},n.warn=function(){i("warn",arguments)},n.error=function(){i("error",arguments)}}function t(n,t,i){return e(n,t,i),n.plugin_version=l,n}var i,a,r,s,l="1.26.16",o={event_list:[],latest_event_initial_time:null,max_save_time:2592e6,init:function(e,n){function t(){return i=a._,r=a.store,!!i.localStorage.isSupport()&&(a.para.max_string_length=1024,l.eventList.init(),l.addLatestChannelUrl(),void l.addIsChannelCallbackEvent())}if(a||!e)return!1;n=n||{},s=n.cookie_name||"sensorsdata2015jssdkchannel",a=e;var l=this;t()},addIsChannelCallbackEvent:function(){a.registerPage({$is_channel_callback_event:function(e){if(i.isObject(e)&&e.event&&"$WebClick"!==e.event&&"$pageview"!==e.event&&"$WebStay"!==e.event&&"$SignUp"!==e.event)return!o.eventList.hasEvent(e.event)&&(o.eventList.add(e.event),!0)}})},addLatestChannelUrl:function(){var e=this.getUrlDomain(),n=this.cookie.getChannel();if("url\u89e3\u6790\u5931\u8d25"===e)this.registerAndSave({_sa_channel_landing_url:"",_sa_channel_landing_url_error:"url\u7684domain\u89e3\u6790\u5931\u8d25"});else if(i.isReferralTraffic(document.referrer)){var t=i.getQueryParam(location.href,"sat_cf");i.isString(t)&&t.length>0?(this.registerAndSave({_sa_channel_landing_url:location.href}),o.channelLinkHandler()):this.registerAndSave({_sa_channel_landing_url:""})}else n?a.registerPage(n):a.registerPage({_sa_channel_landing_url:"",_sa_channel_landing_url_error:"\u53d6\u503c\u5f02\u5e38"})},registerAndSave:function(e){a.registerPage(e),this.cookie.saveChannel(e)},cookie:{getChannel:function(){var e=a.kit.userDecryptIfNeeded(i.cookie.get(s));return e=i.safeJSONParse(e),!(!i.isObject(e)||!e.prop)&&e.prop},saveChannel:function(e){var n={prop:e},t=JSON.stringify(n);a.para.encrypt_cookie&&(t=a.kit.userEncrypt(t)),i.cookie.set(s,t)}},channelLinkHandler:function(){this.eventList.reset(),a.track("$ChannelLinkReaching")},getUrlDomain:function(){var e=i.info.pageProp.url_domain;return""===e&&(e="url\u89e3\u6790\u5931\u8d25"),e},eventList:{init:function(){var e=this.get(),n=(new Date).getTime();if(e&&i.isNumber(e.latest_event_initial_time)&&i.isArray(e.eventList)){var t=n-e.latest_event_initial_time;t>0&&t<o.max_save_time?(o.event_list=e.eventList,o.latest_event_initial_time=e.latest_event_initial_time):this.reset()}else this.reset()},get:function(){var e={};try{e=r.readObjectVal("sawebjssdkchannel")}catch(n){a.log(n)}return e},add:function(e){o.event_list.push(e),this.save()},save:function(){var e={latest_event_initial_time:o.latest_event_initial_time,eventList:o.event_list};r.saveObjectVal("sawebjssdkchannel",e)},reset:function(){o.event_list=[],o.latest_event_initial_time=(new Date).getTime(),this.save()},hasEvent:function(e){var n=!1;return i.each(o.event_list,function(t){t===e&&(n=!0)}),n}}},_=t(o,"SensorsChannel","sdkAfterInitAPI");return _}();