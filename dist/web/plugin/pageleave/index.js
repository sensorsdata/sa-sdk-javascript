(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).PageLeave=function(){"use strict";function t(t,i,a){if(i&&(t.plugin_name=i),a&&t.init){var r=t.init;t.init=function(s,n){function o(){r.call(t,s,n)}return e(s,t,i),s.readyState&&s.readyState.state>=3||!s.on?o():void s.on(a,o)}}return t}function e(t,e,i){function a(e,a){t.logger?t.logger.msg.apply(t.logger,a).module(i+""||"").level(e).log():t.log&&t.log.apply(t,a)}e.log=function(){a("log",arguments)},e.warn=function(){a("warn",arguments)},e.error=function(){a("error",arguments)}}function i(e,i,a){return t(e,i,a),e.plugin_version=r,e}function a(){this.sd=null,this.start_time=+new Date,this.page_show_status=!0,this.page_hidden_status=!1,this._={},this.timer=null,this.current_page_url=document.referrer,this.url=location.href,this.title=document.title||"",this.option={},this.heartbeat_interval_time=5e3,this.heartbeat_interval_timer=null,this.page_id=null,this.storage_name="sawebjssdkpageleave",this.max_duration=n}var r="1.25.16",s=5e3,n=432e3;a.prototype.init=function(t,e){if(t){if(this.sd=t,this._=this.sd._,e){this.option=e;var i=e.heartbeat_interval_time;i&&(this._.isNumber(i)||this._.isNumber(1*i))&&1*i>0&&(this.heartbeat_interval_time=1e3*i);var a=e.max_duration;a&&(this._.isNumber(a)||this._.isNumber(1*a))&&1*a>0&&(this.max_duration=a)}this.page_id=Number(String(this._.getRandom()).slice(2,5)+String(this._.getRandom()).slice(2,4)+String((new Date).getTime()).slice(-4)),this.addEventListener(),document.hidden===!0?this.page_show_status=!1:this.addHeartBeatInterval(),this.log("PageLeave\u521d\u59cb\u5316\u5b8c\u6bd5")}else this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165")},a.prototype.log=function(t){this.sd&&this.sd.log(t)},a.prototype.refreshPageEndTimer=function(){var t=this;this.timer&&(clearTimeout(this.timer),this.timer=null),this.timer=setTimeout(function(){t.page_hidden_status=!1},s)},a.prototype.hiddenStatusHandler=function(){clearTimeout(this.timer),this.timer=null,this.page_hidden_status=!1},a.prototype.pageStartHandler=function(){this.start_time=+new Date,!document.hidden==!0?this.page_show_status=!0:this.page_show_status=!1,this.url=location.href,this.title=document.title},a.prototype.pageEndHandler=function(){if(this.page_hidden_status!==!0){var t=this.getPageLeaveProperties();this.page_show_status===!1&&delete t.event_duration,this.page_show_status=!1,this.page_hidden_status=!0,this.isCollectUrl(this.url)&&this.sd.track("$WebPageLeave",t),this.refreshPageEndTimer(),this.delHeartBeatData()}},a.prototype.addEventListener=function(){this.addPageStartListener(),this.addPageSwitchListener(),this.addSinglePageListener(),this.addPageEndListener()},a.prototype.addPageStartListener=function(){var t=this;"onpageshow"in window&&this._.addEvent(window,"pageshow",function(){t.pageStartHandler(),t.hiddenStatusHandler()})},a.prototype.isCollectUrl=function(t){return"function"!=typeof this.option.isCollectUrl||("string"!=typeof t||""===t||this.option.isCollectUrl(t))},a.prototype.addSinglePageListener=function(){var t=this;this.sd.ee&&this.sd.ee.spa.prepend("switch",function(e){e!==location.href&&(t.url=e,t.pageEndHandler(),t.stopHeartBeatInterval(),t.current_page_url=t.url,t.pageStartHandler(),t.hiddenStatusHandler(),t.addHeartBeatInterval())})},a.prototype.addPageEndListener=function(){var t=this;this._.each(["pagehide","beforeunload","unload"],function(e){"on"+e in window&&t._.addEvent(window,e,function(){t.pageEndHandler(),t.stopHeartBeatInterval()})})},a.prototype.addPageSwitchListener=function(){var t=this;this._.listenPageState({visible:function(){t.pageStartHandler(),t.hiddenStatusHandler(),t.addHeartBeatInterval()},hidden:function(){t.url=location.href,t.title=document.title,t.pageEndHandler(),t.stopHeartBeatInterval()}})},a.prototype.addHeartBeatInterval=function(){this._.localStorage.isSupport()&&this.startHeartBeatInterval()},a.prototype.startHeartBeatInterval=function(){var t=this;this.heartbeat_interval_timer&&this.stopHeartBeatInterval();var e=!0;this.isCollectUrl(this.url)||(e=!1),this.heartbeat_interval_timer=setInterval(function(){e&&t.saveHeartBeatData()},this.heartbeat_interval_time),e&&this.saveHeartBeatData("is_first_heartbeat"),this.reissueHeartBeatData()},a.prototype.stopHeartBeatInterval=function(){clearInterval(this.heartbeat_interval_timer),this.heartbeat_interval_timer=null},a.prototype.saveHeartBeatData=function(t){var e=this.getPageLeaveProperties(),i=new Date;e.$time=i,"is_first_heartbeat"===t&&(e.event_duration=3.14);var a=this.sd.kit.buildData({type:"track",event:"$WebPageLeave",properties:e});try{"success"===this.sd.bridge.bridge_info.verify_success&&(a.properties.$time=1*i)}catch(r){this.log(r.message)}a.heartbeat_interval_time=this.heartbeat_interval_time,this.sd.store.saveObjectVal(this.storage_name+"-"+this.page_id,a)},a.prototype.delHeartBeatData=function(t){this._.localStorage.isSupport()&&this._.localStorage.remove(t||this.storage_name+"-"+this.page_id)},a.prototype.reissueHeartBeatData=function(){for(var t=window.localStorage.length,e=t-1;e>=0;e--){var i=window.localStorage.key(e);if(i&&i!==this.storage_name+"-"+this.page_id&&0===i.indexOf(this.storage_name+"-")){var a=this.sd.store.readObjectVal(i);this._.isObject(a)&&1*new Date-a.time>a.heartbeat_interval_time+5e3&&(delete a.heartbeat_interval_time,a._flush_time=(new Date).getTime(),this.sd.kit.sendData(a),this.delHeartBeatData(i))}}},a.prototype.getPageLeaveProperties=function(){var t=(+new Date-this.start_time)/1e3;(isNaN(t)||t<0||t>this.max_duration)&&(t=0),t=Number(t.toFixed(3));var e=this._.getReferrer(this.current_page_url),i=document.documentElement&&document.documentElement.scrollTop||window.pageYOffset||document.body&&document.body.scrollTop||0;i=Math.round(i)||0;var a={$title:this.title,$url:this._.getURL(this.url),$url_path:this._.getURLPath(this._.URL(this.url).pathname),$referrer_host:e?this._.getHostname(e):"",$referrer:e,$viewport_position:i};return 0!==t&&(a.event_duration=t),a=this._.extend(a,this.option.custom_props)};var o=new a,h=i(o,"PageLeave","sdkReady");return h}();