var _,sd,store,cookie_name,siteLinker={};siteLinker.getPart=function(e){var t=this.option.length;if(t)for(var n=0;n<t;n++)if(e.indexOf(this.option[n].part_url)>-1)return!0;return!1},siteLinker.getPartHash=function(e){var t=this.option.length;if(t)for(var n=0;n<t;n++)if(e.indexOf(this.option[n].part_url)>-1)return this.option[n].after_hash;return!1},siteLinker.getCurrenId=function(){var e=this.store.getDistinctId()||"",t=this.store.getFirstId()||"";return this._.urlSafeBase64&&this._.urlSafeBase64.encode?e=e?this._.urlSafeBase64.trim(this._.urlSafeBase64.encode(this._.base64Encode(e))):"":this._.rot13obfs&&(e=e?this._.rot13obfs(e):""),encodeURIComponent(t?"f"+e:"d"+e)},siteLinker.rewriteUrl=function(e,t){var n=this,i=/([^?#]+)(\?[^#]*)?(#.*)?/.exec(e),a="";if(i){var s,r=i[1]||"",o=i[2]||"",l=i[3]||"",_="_sasdk="+this.getCurrenId(),d=function(e){var t=e.split("&"),i=[];return n._.each(t,function(e){e.indexOf("_sasdk=")>-1?i.push(_):i.push(e)}),i.join("&")};if(this.getPartHash(e))s=l.indexOf("_sasdk"),a=l.indexOf("?")>-1?s>-1?r+o+"#"+l.substring(1,s)+d(l.substring(s,l.length)):r+o+l+"&"+_:r+o+"#"+l.substring(1)+"?"+_;else s=o.indexOf("_sasdk"),a=/^\?(\w)+/.test(o)?s>-1?r+"?"+d(o.substring(1))+l:r+o+"&"+_+l:r+"?"+_+l;return t&&(t.href=a),a}},siteLinker.getUrlId=function(){var e=location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);if(this._.isArray(e)&&e[1]){var t=decodeURIComponent(e[1]);return!t||"f"!==t.substring(0,1)&&"d"!==t.substring(0,1)||(this._.urlSafeBase64&&this._.urlSafeBase64.isUrlSafeBase64&&this._.urlSafeBase64.isUrlSafeBase64(t)?t=t.substring(0,1)+this._.base64Decode(this._.urlSafeBase64.decode(t.substring(1))):this._.rot13defs&&(t=t.substring(0,1)+this._.rot13defs(t.substring(1)))),t}return""},siteLinker.setRefferId=function(e){var t=this.store.getDistinctId(),n=this.getUrlId();if(n&&""!==n){var i="a"===n.substring(0,1)||"d"===n.substring(0,1);(n=n.substring(1))!==t&&(i?(this.sd.identify(n,!0),this.store.getFirstId()&&this.sd.saEvent.send({original_id:n,distinct_id:t,type:"track_signup",event:"$SignUp",properties:{}},null)):this.store.getFirstId()&&!e.re_login||this.sd.login(n))}},siteLinker.addListen=function(){var e=this,t=function(t){var n,i,a=t.target,s=a.tagName.toLowerCase(),r=a.parentNode;if("a"===s&&a.href||r&&r.tagName&&"a"===r.tagName.toLowerCase()&&r.href){"a"===s&&a.href?(n=a.href,i=a):(n=r.href,i=r);var o=e._.URL(n).protocol;"http:"!==o&&"https:"!==o||e.getPart(n)&&e.rewriteUrl(n,i)}};e._.addEvent(document,"mousedown",t),window.PointerEvent&&"maxTouchPoints"in window.navigator&&window.navigator.maxTouchPoints>=0&&e._.addEvent(document,"pointerdown",t)},siteLinker.init=function(e,t){this.sd=e,this._=e._,this.store=e.store,this.para=e.para,this._.isObject(t)&&this._.isArray(t.linker)&&t.linker.length>0?(this.setRefferId(t),this.addListen(),this.option=t.linker,this.option=function(t){for(var n=t.length,i=[],a=0;a<n;a++)/[A-Za-z0-9]+\./.test(t[a].part_url)&&"[object Boolean]"==Object.prototype.toString.call(t[a].after_hash)?i.push(t[a]):e.log("linker \u914d\u7f6e\u7684\u7b2c "+(a+1)+" \u9879\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u68c0\u67e5\u53c2\u6570\u683c\u5f0f\uff01");return i}(this.option)):e.log("\u8bf7\u914d\u7f6e\u6253\u901a\u57df\u540d\u53c2\u6570\uff01")};var Channel={event_list:[],latest_event_initial_time:null,max_save_time:2592e6,init:function(e,t){if(sd||!e)return!1;cookie_name=(t=t||{}).cookie_name||"sensorsdata2015jssdkchannel",sd=e;var n=this;!function(){if(_=sd._,store=sd.store,!_.localStorage.isSupport())return!1;sd.para.max_string_length=1024,n.eventList.init(),n.addLatestChannelUrl(),n.addIsChannelCallbackEvent()}()},addIsChannelCallbackEvent:function(){sd.registerPage({$is_channel_callback_event:function(e){if(_.isObject(e)&&e.event&&"$WebClick"!==e.event&&"$pageview"!==e.event&&"$WebStay"!==e.event&&"$SignUp"!==e.event)return!Channel.eventList.hasEvent(e.event)&&(Channel.eventList.add(e.event),!0)}})},addLatestChannelUrl:function(){var e=this.getUrlDomain(),t=this.cookie.getChannel();if("url\u89e3\u6790\u5931\u8d25"===e)this.registerAndSave({_sa_channel_landing_url:"",_sa_channel_landing_url_error:"url\u7684domain\u89e3\u6790\u5931\u8d25"});else if(_.isReferralTraffic(document.referrer)){var n=_.getQueryParam(location.href,"sat_cf");_.isString(n)&&n.length>0?(this.registerAndSave({_sa_channel_landing_url:location.href}),Channel.channelLinkHandler()):this.registerAndSave({_sa_channel_landing_url:""})}else t?sd.registerPage(t):sd.registerPage({_sa_channel_landing_url:"",_sa_channel_landing_url_error:"\u53d6\u503c\u5f02\u5e38"})},registerAndSave:function(e){sd.registerPage(e),this.cookie.saveChannel(e)},cookie:{getChannel:function(){var e=sd.kit.userDecryptIfNeeded(_.cookie.get(cookie_name));return e=_.safeJSONParse(e),!(!_.isObject(e)||!e.prop)&&e.prop},saveChannel:function(e){var t={prop:e},n=JSON.stringify(t);sd.para.encrypt_cookie&&(n=sd.kit.userEncrypt(n)),_.cookie.set(cookie_name,n)}},channelLinkHandler:function(){this.eventList.reset(),sd.track("$ChannelLinkReaching")},getUrlDomain:function(){var e=_.info.pageProp.url_domain;return""===e&&(e="url\u89e3\u6790\u5931\u8d25"),e},eventList:{init:function(){var e=this.get(),t=(new Date).getTime();if(e&&_.isNumber(e.latest_event_initial_time)&&_.isArray(e.eventList)){var n=t-e.latest_event_initial_time;n>0&&n<Channel.max_save_time?(Channel.event_list=e.eventList,Channel.latest_event_initial_time=e.latest_event_initial_time):this.reset()}else this.reset()},get:function(){var e={};try{e=store.readObjectVal("sawebjssdkchannel")}catch(t){sd.log(t)}return e},add:function(e){Channel.event_list.push(e),this.save()},save:function(){var e={latest_event_initial_time:Channel.latest_event_initial_time,eventList:Channel.event_list};store.saveObjectVal("sawebjssdkchannel",e)},reset:function(){Channel.event_list=[],Channel.latest_event_initial_time=(new Date).getTime(),this.save()},hasEvent:function(e){var t=!1;return _.each(Channel.event_list,function(n){n===e&&(t=!0)}),t}}},sdkversion_placeholder="1.25.23";function wrapPluginInitFn(e,t,n){if(t&&(e.plugin_name=t),n&&e.init){var i=e.init;e.init=function(a,s){if(wrapLogFn(a,e,t),a.readyState&&a.readyState.state>=3||!a.on)return r();function r(){i.call(e,a,s)}a.on(n,r)}}return e}function wrapLogFn(e,t,n){function i(t,i){e.logger?e.logger.msg.apply(e.logger,i).module(n+""||"").level(t).log():e.log&&e.log.apply(e,i)}t.log=function(){i("log",arguments)},t.warn=function(){i("warn",arguments)},t.error=function(){i("error",arguments)}}function createPlugin(e,t,n){return wrapPluginInitFn(e,t,n),e.plugin_version=sdkversion_placeholder,e}var sa={},url_obj={},_$1={};siteLinker.init=function(e){this.sd=e,this._=e._,this.store=e.store,this.para=e.para,this.setRefferId()},siteLinker.getUrlId=function(){return url_obj.prefix+url_obj.did},Channel.addLatestChannelUrl=function(){},Channel.saveProp=function(){Channel.registerAndSave({$app_id:url_obj.aid,$ad_custom_data_type:url_obj.adt})},Channel.getProp=function(){var e=this.cookie.getChannel();_$1.isObject(e)&&e.$app_id&&e.$ad_custom_data_type&&sa.registerPage({$app_id:e.$app_id,$ad_custom_data_type:e.$ad_custom_data_type})};var wwc={getWechatWebViewPara:function(){var e=location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);if(sa._.isArray(e)&&e[1]){var t=decodeURIComponent(e[1]);!t||"f"!==t.substring(0,1)&&"d"!==t.substring(0,1)?t=[t.substring(0,1),t.substring(1)]:sa._.urlSafeBase64&&sa._.urlSafeBase64.isUrlSafeBase64&&sa._.urlSafeBase64.isUrlSafeBase64(t)?t=[t.substring(0,1),sa._.base64Decode(sa._.urlSafeBase64.decode(t.substring(1)))]:sa._.rot13defs&&(t=[t.substring(0,1),sa._.rot13defs(t.substring(1))]);var n=sa._.safeJSONParse(t[1]);if(sa._.isObject(n)&&n.did&&n.aid&&n.adt)return{prefix:t[0],did:n.did,aid:n.aid,adt:n.adt}}return""},init:function(e){sa=e,_$1=e._,url_obj=this.getWechatWebViewPara(),Channel.init(e,{cookie_name:"sas2015-ad-ww"}),sa._.isObject(url_obj)&&url_obj.did&&url_obj.aid&&url_obj.adt?(siteLinker.init(e),Channel.saveProp()):Channel.getProp()}},index=createPlugin(wwc,"WechatWebviewChannel","sdkReady");export default index;