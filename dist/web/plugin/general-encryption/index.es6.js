var sd,_,sdkversion_placeholder="1.26.16";function wrapPluginInitFn(n,e,i){if(e&&(n.plugin_name=e),i&&n.init){var t=n.init;n.init=function(r,o){if(wrapLogFn(r,n,e),r.readyState&&r.readyState.state>=3||!r.on)return a();function a(){t.call(n,r,o)}r.on(i,a)}}return n}function wrapLogFn(n,e,i){function t(e,t){n.logger?n.logger.msg.apply(n.logger,t).module(i+""||"").level(e).log():n.log&&n.log.apply(n,t)}e.log=function(){t("log",arguments)},e.warn=function(){t("warn",arguments)},e.error=function(){t("error",arguments)}}function createPlugin(n,e,i){return wrapPluginInitFn(n,e,i),n.plugin_version=sdkversion_placeholder,n}var GeneralEncryption={init:function(n,e){_=(sd=n)._;var i=e&&e.encrypt_utils,t=window.console&&window.console.log||function(){};t=sd&&sd.log||t;var r=sd.kit.encodeTrackData;sd&&sd.kit&&r?_.isObject(i)&&_.isFunction(i.encryptEvent)&&_.isFunction(i.encryptSymmetricKeyWithPublicKey)&&_.isString(e.pub_key)&&_.isNumber(e.pkv)?(sd.kit.encodeTrackData=function(n){try{var o=i.encryptEvent,a=i.encryptSymmetricKeyWithPublicKey,c=e.pkv,l=e.pub_key;if(_.isFunction(i.encryptEvent)){var u=o(n),d=sd._.base64Encode(u),p={pkv:c,ekey:a(l),payloads:[d]},s=JSON.stringify(p);return"data="+encodeURIComponent(s)}return r.call(sd.kit,n)}catch(y){return t("Encrypted data exception."),r.call(sd.kit,n)}},t("GeneralEncryption Plugin initialized successfully.")):t("GeneralEncryption Plugin initialization failed. parameter error."):t("Web SDK initialization failed.")}},index=createPlugin(GeneralEncryption,"GeneralEncryption","sdkReady");export default index;