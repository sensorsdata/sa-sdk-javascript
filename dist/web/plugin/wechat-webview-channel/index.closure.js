!function(){"use strict";function e(e,i,n){if(i&&(e.plugin_name=i),n&&e.init){var a=e.init;e.init=function(r,s){function o(){a.call(e,r,s)}return t(r,e,i),r.readyState&&r.readyState.state>=3||!r.on?o():void r.on(n,o)}}return e}function t(e,t,i){function n(t,n){e.logger?e.logger.msg.apply(e.logger,n).module(i+""||"").level(t).log():e.log&&e.log.apply(e,n)}t.log=function(){n("log",arguments)},t.warn=function(){n("warn",arguments)},t.error=function(){n("error",arguments)}}function i(t,i,n){return e(t,i,n),t.plugin_version=d,t}var n={};n.getPart=function(e){var t=!1,i=this.option.length;if(i)for(var n=0;n<i;n++)if(e.indexOf(this.option[n].part_url)>-1)return!0;return t},n.getPartHash=function(e){var t=this.option.length,i=!1;if(t)for(var n=0;n<t;n++)if(e.indexOf(this.option[n].part_url)>-1)return this.option[n].after_hash;return!!i},n.getCurrenId=function(){var e=this.store.getDistinctId()||"",t=this.store.getFirstId()||"";this._.urlSafeBase64&&this._.urlSafeBase64.encode?e=e?this._.urlSafeBase64.trim(this._.urlSafeBase64.encode(this._.base64Encode(e))):"":this._.rot13obfs&&(e=e?this._.rot13obfs(e):"");var i=t?"f"+e:"d"+e;return encodeURIComponent(i)},n.rewriteUrl=function(e,t){var i=this,n=/([^?#]+)(\?[^#]*)?(#.*)?/,a=n.exec(e),r="";if(a){var s,o=a[1]||"",l=a[2]||"",d=a[3]||"",u="_sasdk="+this.getCurrenId(),_=function(e){var t=e.split("&"),n=[];return i._.each(t,function(e){e.indexOf("_sasdk=")>-1?n.push(u):n.push(e)}),n.join("&")};if(this.getPartHash(e)){s=d.indexOf("_sasdk");var c=d.indexOf("?");r=c>-1?s>-1?o+l+"#"+d.substring(1,s)+_(d.substring(s,d.length)):o+l+d+"&"+u:o+l+"#"+d.substring(1)+"?"+u}else{s=l.indexOf("_sasdk");var f=/^\?(\w)+/.test(l);r=f?s>-1?o+"?"+_(l.substring(1))+d:o+l+"&"+u+d:o+"?"+u+d}return t&&(t.href=r),r}},n.getUrlId=function(){var e=location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);if(this._.isArray(e)&&e[1]){var t=decodeURIComponent(e[1]);return!t||"f"!==t.substring(0,1)&&"d"!==t.substring(0,1)||(this._.urlSafeBase64&&this._.urlSafeBase64.isUrlSafeBase64&&this._.urlSafeBase64.isUrlSafeBase64(t)?t=t.substring(0,1)+this._.base64Decode(this._.urlSafeBase64.decode(t.substring(1))):this._.rot13defs&&(t=t.substring(0,1)+this._.rot13defs(t.substring(1)))),t}return""},n.setRefferId=function(e){var t=this.store.getDistinctId(),i=this.getUrlId();if(i&&""!==i){var n="a"===i.substring(0,1)||"d"===i.substring(0,1);i=i.substring(1),i!==t&&(n?(this.sd.identify(i,!0),this.store.getFirstId()&&this.sd.saEvent.send({original_id:i,distinct_id:t,type:"track_signup",event:"$SignUp",properties:{}},null)):this.store.getFirstId()&&!e.re_login||this.sd.login(i))}},n.addListen=function(){var e=this,t=function(t){var i,n,a=t.target,r=a.tagName.toLowerCase(),s=a.parentNode;if("a"===r&&a.href||s&&s.tagName&&"a"===s.tagName.toLowerCase()&&s.href){"a"===r&&a.href?(i=a.href,n=a):(i=s.href,n=s);var o=e._.URL(i),l=o.protocol;"http:"!==l&&"https:"!==l||e.getPart(i)&&e.rewriteUrl(i,n)}};e._.addEvent(document,"mousedown",t),window.PointerEvent&&"maxTouchPoints"in window.navigator&&window.navigator.maxTouchPoints>=0&&e._.addEvent(document,"pointerdown",t)},n.init=function(e,t){function i(t){for(var i=t.length,n=[],a=0;a<i;a++)/[A-Za-z0-9]+\./.test(t[a].part_url)&&"[object Boolean]"==Object.prototype.toString.call(t[a].after_hash)?n.push(t[a]):e.log("linker \u914d\u7f6e\u7684\u7b2c "+(a+1)+" \u9879\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u68c0\u67e5\u53c2\u6570\u683c\u5f0f\uff01");return n}return this.sd=e,this._=e._,this.store=e.store,this.para=e.para,this._.isObject(t)&&this._.isArray(t.linker)&&t.linker.length>0?(this.setRefferId(t),this.addListen(),this.option=t.linker,void(this.option=i(this.option))):void e.log("\u8bf7\u914d\u7f6e\u6253\u901a\u57df\u540d\u53c2\u6570\uff01")};var a,r,s,o,l={event_list:[],latest_event_initial_time:null,max_save_time:2592e6,init:function(e,t){function i(){return a=r._,s=r.store,!!a.localStorage.isSupport()&&(r.para.max_string_length=1024,n.eventList.init(),n.addLatestChannelUrl(),void n.addIsChannelCallbackEvent())}if(r||!e)return!1;t=t||{},o=t.cookie_name||"sensorsdata2015jssdkchannel",r=e;var n=this;i()},addIsChannelCallbackEvent:function(){r.registerPage({$is_channel_callback_event:function(e){if(a.isObject(e)&&e.event&&"$WebClick"!==e.event&&"$pageview"!==e.event&&"$WebStay"!==e.event&&"$SignUp"!==e.event)return!l.eventList.hasEvent(e.event)&&(l.eventList.add(e.event),!0)}})},addLatestChannelUrl:function(){var e=this.getUrlDomain(),t=this.cookie.getChannel();if("url\u89e3\u6790\u5931\u8d25"===e)this.registerAndSave({_sa_channel_landing_url:"",_sa_channel_landing_url_error:"url\u7684domain\u89e3\u6790\u5931\u8d25"});else if(a.isReferralTraffic(document.referrer)){var i=a.getQueryParam(location.href,"sat_cf");a.isString(i)&&i.length>0?(this.registerAndSave({_sa_channel_landing_url:location.href}),l.channelLinkHandler()):this.registerAndSave({_sa_channel_landing_url:""})}else t?r.registerPage(t):r.registerPage({_sa_channel_landing_url:"",_sa_channel_landing_url_error:"\u53d6\u503c\u5f02\u5e38"})},registerAndSave:function(e){r.registerPage(e),this.cookie.saveChannel(e)},cookie:{getChannel:function(){var e=r.kit.userDecryptIfNeeded(a.cookie.get(o));return e=a.safeJSONParse(e),!(!a.isObject(e)||!e.prop)&&e.prop},saveChannel:function(e){var t={prop:e},i=JSON.stringify(t);r.para.encrypt_cookie&&(i=r.kit.userEncrypt(i)),a.cookie.set(o,i)}},channelLinkHandler:function(){this.eventList.reset(),r.track("$ChannelLinkReaching")},getUrlDomain:function(){var e=a.info.pageProp.url_domain;return""===e&&(e="url\u89e3\u6790\u5931\u8d25"),e},eventList:{init:function(){var e=this.get(),t=(new Date).getTime();if(e&&a.isNumber(e.latest_event_initial_time)&&a.isArray(e.eventList)){var i=t-e.latest_event_initial_time;i>0&&i<l.max_save_time?(l.event_list=e.eventList,l.latest_event_initial_time=e.latest_event_initial_time):this.reset()}else this.reset()},get:function(){var e={};try{e=s.readObjectVal("sawebjssdkchannel")}catch(t){r.log(t)}return e},add:function(e){l.event_list.push(e),this.save()},save:function(){var e={latest_event_initial_time:l.latest_event_initial_time,eventList:l.event_list};s.saveObjectVal("sawebjssdkchannel",e)},reset:function(){l.event_list=[],l.latest_event_initial_time=(new Date).getTime(),this.save()},hasEvent:function(e){var t=!1;return a.each(l.event_list,function(i){i===e&&(t=!0)}),t}}},d="1.25.5",u={},_={},c={};n.init=function(e){this.sd=e,this._=e._,this.store=e.store,this.para=e.para,this.setRefferId()},n.getUrlId=function(){return _.prefix+_.did},l.addLatestChannelUrl=function(){},l.saveProp=function(){l.registerAndSave({$app_id:_.aid,$ad_custom_data_type:_.adt})},l.getProp=function(){var e=this.cookie.getChannel();c.isObject(e)&&e.$app_id&&e.$ad_custom_data_type&&u.registerPage({$app_id:e.$app_id,$ad_custom_data_type:e.$ad_custom_data_type})};var f={};f.getWechatWebViewPara=function(){var e=location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);if(u._.isArray(e)&&e[1]){var t=decodeURIComponent(e[1]);!t||"f"!==t.substring(0,1)&&"d"!==t.substring(0,1)?t=[t.substring(0,1),t.substring(1)]:u._.urlSafeBase64&&u._.urlSafeBase64.isUrlSafeBase64&&u._.urlSafeBase64.isUrlSafeBase64(t)?t=[t.substring(0,1),u._.base64Decode(u._.urlSafeBase64.decode(t.substring(1)))]:u._.rot13defs&&(t=[t.substring(0,1),u._.rot13defs(t.substring(1))]);var i=u._.safeJSONParse(t[1]);if(u._.isObject(i)&&i.did&&i.aid&&i.adt)return{prefix:t[0],did:i.did,aid:i.aid,adt:i.adt}}return""},f.init=function(e){u=e,c=e._,_=this.getWechatWebViewPara(),l.init(e,{cookie_name:"sas2015-ad-ww"}),u._.isObject(_)&&_.did&&_.aid&&_.adt?(n.init(e),l.saveProp()):l.getProp()};var h=i(f,"WechatWebviewChannel","sdkReady");return h}();