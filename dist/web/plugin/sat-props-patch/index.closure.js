!function(){"use strict";function n(n,a,e){if(a&&(n.plugin_name=a),e&&n.init){var r=n.init;n.init=function(i,_){function l(){r.call(n,i,_)}return t(i,n,a),i.readyState&&i.readyState.state>=3||!i.on?l():void i.on(e,l)}}return n}function t(n,t,a){function e(t,e){n.logger?n.logger.msg.apply(n.logger,e).module(a+""||"").level(t).log():n.log&&n.log.apply(n,e)}t.log=function(){e("log",arguments)},t.warn=function(){e("warn",arguments)},t.error=function(){e("error",arguments)}}function a(t,a,e){return n(t,a,e),t.plugin_version=i,t}function e(n){if(n.properties){var t=n.properties;r.each(l,function(n,a){r.isUndefined(t[a])||(t[n]=t[a],delete t[a])})}}var r,i="1.26.17",_={init:function(n){r=n._,n.registerInterceptor("buildDataStage",{formatData:{entry:function(n){return e(n),n}}})}},l={_latest_wx_ad_click_id:"$latest_wx_ad_click_id",_latest_wx_ad_callbacks:"$latest_wx_ad_callbacks",_latest_wx_ad_hash_key:"$latest_wx_ad_hash_key",_sa_channel_landing_url:"$ad_landing_page_url",_sa_channel_landing_url_error:"$sa_channel_landing_url_error"},o=a(_,"SatPropsPatch","sdkAfterInitPara");return o}();