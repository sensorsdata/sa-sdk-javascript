var sdkversion_placeholder="1.27.3";function wrapPluginInitFn(n,e,t){if(e&&(n.plugin_name=e),t&&n.init){var r=n.init;n.init=function(a,i){if(wrapLogFn(a,n,e),a.readyState&&a.readyState.state>=3||!a.on)return o();function o(){r.call(n,a,i)}a.on(t,o)}}return n}function wrapLogFn(n,e,t){function r(e,r){n.logger?n.logger.msg.apply(n.logger,r).module(t+""||"").level(e).log():n.log&&n.log.apply(n,r)}e.log=function(){r("log",arguments)},e.warn=function(){r("warn",arguments)},e.error=function(){r("error",arguments)}}function createPlugin(n,e,t){return wrapPluginInitFn(n,e,t),n.plugin_version=sdkversion_placeholder,n}var sd,utmKeys=["channel_utm_source","channel_utm_content","channel_utm_term","channel_utm_medium","channel_utm_campaign"],ChannelUtm={init:function(n){n&&!sd&&((sd=n)._.each(utmKeys,function(n){sd.source_channel_standard=sd.source_channel_standard+" "+n,sd.para.source_type.utm.push(n)}),sd.registerInterceptor("businessStage",{getUtmData:{entry:function(n){var e=!1,t=n||{};return sd._.each(utmKeys,function(n){var r=sd._.getQueryParam(location.href,n);r.length&&(e=!0,t[n.slice(8)]=r)}),e&&sd.register&&sd.register({link_v:"1"}),t}}}))}},index=createPlugin(ChannelUtm,"ChannelUtm","sdkAfterInitPara");export default index;