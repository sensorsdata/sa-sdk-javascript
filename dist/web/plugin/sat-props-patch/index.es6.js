var _,sdkversion_placeholder="1.26.3";function wrapPluginInitFn(n,a,e){if(a&&(n.plugin_name=a),e&&n.init){var r=n.init;n.init=function(t,i){if(wrapLogFn(t,n,a),t.readyState&&t.readyState.state>=3||!t.on)return l();function l(){r.call(n,t,i)}t.on(e,l)}}return n}function wrapLogFn(n,a,e){function r(a,r){n.logger?n.logger.msg.apply(n.logger,r).module(e+""||"").level(a).log():n.log&&n.log.apply(n,r)}a.log=function(){r("log",arguments)},a.warn=function(){r("warn",arguments)},a.error=function(){r("error",arguments)}}function createPlugin(n,a,e){return wrapPluginInitFn(n,a,e),n.plugin_version=sdkversion_placeholder,n}var plugin={init:function(n){_=n._,n.registerInterceptor("buildDataStage",{formatData:{entry:function(n){return convertSatPropsName(n),n}}})}},pMap={_latest_wx_ad_click_id:"$latest_wx_ad_click_id",_latest_wx_ad_callbacks:"$latest_wx_ad_callbacks",_latest_wx_ad_hash_key:"$latest_wx_ad_hash_key",_sa_channel_landing_url:"$ad_landing_page_url",_sa_channel_landing_url_error:"$sa_channel_landing_url_error"};function convertSatPropsName(n){if(n.properties){var a=n.properties;_.each(pMap,function(n,e){_.isUndefined(a[e])||(a[n]=a[e],delete a[e])})}}var index=createPlugin(plugin,"SatPropsPatch","sdkAfterInitPara");export default index;