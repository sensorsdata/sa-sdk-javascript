var sd,_,sdkversion_placeholder="1.25.23";function wrapPluginInitFn(n,e,a){if(e&&(n.plugin_name=e),a&&n.init){var t=n.init;n.init=function(i,r){if(wrapLogFn(i,n,e),i.readyState&&i.readyState.state>=3||!i.on)return s();function s(){t.call(n,i,r)}i.on(a,s)}}return n}function wrapLogFn(n,e,a){function t(e,t){n.logger?n.logger.msg.apply(n.logger,t).module(a+""||"").level(e).log():n.log&&n.log.apply(n,t)}e.log=function(){t("log",arguments)},e.warn=function(){t("warn",arguments)},e.error=function(){t("error",arguments)}}function createPlugin(n,e,a){return wrapPluginInitFn(n,e,a),n.plugin_version=sdkversion_placeholder,n}function sendData(n,e){if(_.isObject(sd.para.jsapp)&&!sd.para.jsapp.isOnline&&"function"==typeof sd.para.jsapp.setData){var a=n;delete a.callback,a=JSON.stringify(a),sd.para.jsapp.setData(a),e.cancellationToken.stop()}return n}function senderInit(){sd.on("sdkAfterInitAPI",function(){_.isObject(sd.commonWays)&&(sd.commonWays.setOnlineState=setOnlineState),sd.registerInterceptor("sendDataStage",{send:{priority:40,entry:sendData}})})}function setOnlineState(n){if(!0===n&&_.isObject(sd.para.jsapp)&&"function"==typeof sd.para.jsapp.getData){sd.para.jsapp.isOnline=!0;var e=sd.para.jsapp.getData();_.isArray(e)&&e.length>0&&_.each(e,function(n){_.isJSONString(n)&&sd.kit.sendData(JSON.parse(n))})}else sd.para.jsapp.isOnline=!1}var JsappSender={plugin_name:"JsappSender",init:function(n){_=(sd=n)._,senderInit()}},index=createPlugin(JsappSender);export default index;