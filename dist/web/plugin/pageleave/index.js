(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).PageLeave=function(){"use strict";function t(t,a,i){if(a&&(t.plugin_name=a),i&&t.init){var r=t.init;t.init=function(n,s){function o(){r.call(t,n,s)}return e(n,t,a),n.readyState&&n.readyState.state>=3||!n.on?o():void n.on(i,o)}}return t}function e(t,e,a){function i(e,i){t.logger?t.logger.msg.apply(t.logger,i).module(a+""||"").level(e).log():t.log&&t.log.apply(t,i)}e.log=function(){i("log",arguments)},e.warn=function(){i("warn",arguments)},e.error=function(){i("error",arguments)}}function a(e,a,i){return t(e,a,i),e.plugin_version=r,e}function i(){this.sd=null,this.start_time=+new Date,this.page_show_status=!0,this.page_hidden_status=!1,this._={},this.timer=null,this.current_page_url=document.referrer,this.url=location.href,this.title=document.title||"",this.option={},this.heartbeat_interval_time=5e3,this.heartbeat_interval_timer=null,this.page_id=null,this.storage_name="sawebjssdkpageleave",this.max_duration=s}var r="1.26.19",n=5e3,s=432e3;i.prototype.init=function(t,e){if(t){if(this.sd=t,this._=this.sd._,e){this.option=e;var a=e.heartbeat_interval_time;a&&(this._.isNumber(a)||this._.isNumber(1*a))&&1*a>0&&(this.heartbeat_interval_time=1e3*a);var i=e.max_duration;i&&(this._.isNumber(i)||this._.isNumber(1*i))&&1*i>0&&(this.max_duration=i)}this.page_id=Number(String(this._.getRandom()).slice(2,5)+String(this._.getRandom()).slice(2,4)+String((new Date).getTime()).slice(-4)),this.addEventListener(),document.hidden===!0?this.page_show_status=!1:this.addHeartBeatInterval(),this.log("PageLeave\u521d\u59cb\u5316\u5b8c\u6bd5")}else this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165")},i.prototype.log=function(t){this.sd&&this.sd.log(t)},i.prototype.refreshPageEndTimer=function(){var t=this;this.timer&&(clearTimeout(this.timer),this.timer=null),this.timer=setTimeout(function(){t.page_hidden_status=!1},n)},i.prototype.hiddenStatusHandler=function(){clearTimeout(this.timer),this.timer=null,this.page_hidden_status=!1},i.prototype.pageStartHandler=function(){this.start_time=+new Date,!document.hidden==!0?this.page_show_status=!0:this.page_show_status=!1,this.url=location.href,this.title=document.title},i.prototype.pageEndHandler=function(){if(this.page_hidden_status!==!0){var t=this.getPageLeaveProperties();this.page_show_status===!1&&delete t.event_duration,this.page_show_status=!1,this.page_hidden_status=!0,this.isCollectUrl(this.url)&&this.sd.track("$WebPageLeave",t),this.refreshPageEndTimer(),this.delHeartBeatData()}},i.prototype.addEventListener=function(){this.addPageStartListener(),this.addPageSwitchListener(),this.addSinglePageListener(),this.addPageEndListener()},i.prototype.addPageStartListener=function(){var t=this;"onpageshow"in window&&this._.addEvent(window,"pageshow",function(){t.pageStartHandler(),t.hiddenStatusHandler()})},i.prototype.isCollectUrl=function(t){return"function"!=typeof this.option.isCollectUrl||("string"!=typeof t||""===t||this.option.isCollectUrl(t))},i.prototype.addSinglePageListener=function(){var t=this;this.sd.ee&&this.sd.ee.spa.prepend("switch",function(e){e!==location.href&&(t.url=e,t.pageEndHandler(),t.stopHeartBeatInterval(),t.current_page_url=t.url,t.pageStartHandler(),t.hiddenStatusHandler(),t.addHeartBeatInterval())})},i.prototype.addPageEndListener=function(){var t=this;this._.each(["pagehide","beforeunload","unload"],function(e){"on"+e in window&&t._.addEvent(window,e,function(){t.pageEndHandler(),t.stopHeartBeatInterval()})})},i.prototype.addPageSwitchListener=function(){var t=this;this._.listenPageState({visible:function(){t.pageStartHandler(),t.hiddenStatusHandler(),t.addHeartBeatInterval()},hidden:function(){t.url=location.href,t.title=document.title,t.pageEndHandler(),t.stopHeartBeatInterval()}})},i.prototype.addHeartBeatInterval=function(){this._.localStorage.isSupport()&&this.startHeartBeatInterval()},i.prototype.startHeartBeatInterval=function(){var t=this;this.heartbeat_interval_timer&&this.stopHeartBeatInterval();var e=!0;this.isCollectUrl(this.url)||(e=!1),this.heartbeat_interval_timer=setInterval(function(){e&&t.saveHeartBeatData()},this.heartbeat_interval_time),e&&this.saveHeartBeatData("is_first_heartbeat"),this.reissueHeartBeatData()},i.prototype.stopHeartBeatInterval=function(){clearInterval(this.heartbeat_interval_timer),this.heartbeat_interval_timer=null},i.prototype.saveHeartBeatData=function(t){var e=this.getPageLeaveProperties(),a=new Date;e.$time=a,"is_first_heartbeat"===t&&(e.event_duration=3.14);var i=this.sd.kit.buildData({type:"track",event:"$WebPageLeave",properties:e});i.heartbeat_interval_time=this.heartbeat_interval_time,this.sd.store.saveObjectVal(this.storage_name+"-"+this.page_id,i)},i.prototype.delHeartBeatData=function(t){this._.localStorage.isSupport()&&this._.localStorage.remove(t||this.storage_name+"-"+this.page_id)},i.prototype.reissueHeartBeatData=function(){for(var t=window.localStorage.length,e=t-1;e>=0;e--){var a=window.localStorage.key(e);if(a&&a!==this.storage_name+"-"+this.page_id&&0===a.indexOf(this.storage_name+"-")){var i=this.sd.store.readObjectVal(a);this._.isObject(i)&&1*new Date-i.time>i.heartbeat_interval_time+5e3&&(delete i.heartbeat_interval_time,i._flush_time=(new Date).getTime(),this.sd.kit.sendData(i),this.delHeartBeatData(a))}}},i.prototype.getPageLeaveProperties=function(){var t=(+new Date-this.start_time)/1e3;(isNaN(t)||t<0||t>this.max_duration)&&(t=0),t=Number(t.toFixed(3));var e=this._.getReferrer(this.current_page_url),a=document.documentElement&&document.documentElement.scrollTop||window.pageYOffset||document.body&&document.body.scrollTop||0;a=Math.round(a)||0;var i={$title:this.title,$url:this._.getURL(this.url),$url_path:this._.getURLPath(this._.URL(this.url).pathname),$referrer_host:e?this._.getHostname(e):"",$referrer:e,$viewport_position:a};return 0!==t&&(i.event_duration=t),i=this._.extend(i,this.option.custom_props)};var o=new i,h=a(o,"PageLeave","sdkReady");return h}();