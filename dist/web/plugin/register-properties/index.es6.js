function addProperties(e,t){if("track"!==e.type)return e;var i=t.sd,r=i._,s=i.saEvent.check,n=r.extend2Lev({properties:{}},e),o=t.customRegister,p=n.properties,g=n.event,l={};return r.each(o,function(e){if(r.isObject(e))r.indexOf(e.events,g)>-1&&s({properties:e.properties})&&(l=r.extend(l,e.properties));else if(r.isFunction(e)){var t=e({event:g,properties:p,data:n});r.isObject(t)&&!r.isEmptyObject(t)&&s({properties:t})&&(l=r.extend(l,t))}}),e.properties=r.extend(p,l),e}function RegisterProperties(){this.sd=null,this.log=window.console&&window.console.log||function(){},this.customRegister=[]}RegisterProperties.prototype.init=function(e){if(e){this.sd=e,this._=e._,this.log=e.log;var t=this;e.registerInterceptor("buildDataStage",{extendProps:{priority:0,entry:function(e){return addProperties(e,t)}}})}else this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165")},RegisterProperties.prototype.register=function(e){this.sd?this._.isObject(e)&&this._.isArray(e.events)&&e.events.length>0&&this._.isObject(e.properties)&&!this._.isEmptyObject(e.properties)?this.customRegister.push(e):this.log("RegisterProperties: register \u53c2\u6570\u9519\u8bef"):this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165")},RegisterProperties.prototype.hookRegister=function(e){this.sd?this._.isFunction(e)?this.customRegister.push(e):this.log("RegisterProperties: hookRegister \u53c2\u6570\u9519\u8bef"):this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165")};var sdkversion_placeholder="1.26.17";function wrapPluginInitFn(e,t,i){if(t&&(e.plugin_name=t),i&&e.init){var r=e.init;e.init=function(s,n){if(wrapLogFn(s,e,t),s.readyState&&s.readyState.state>=3||!s.on)return o();function o(){r.call(e,s,n)}s.on(i,o)}}return e}function wrapLogFn(e,t,i){function r(t,r){e.logger?e.logger.msg.apply(e.logger,r).module(i+""||"").level(t).log():e.log&&e.log.apply(e,r)}t.log=function(){r("log",arguments)},t.warn=function(){r("warn",arguments)},t.error=function(){r("error",arguments)}}function createPlugin(e,t,i){return wrapPluginInitFn(e,t,i),e.plugin_version=sdkversion_placeholder,e}RegisterProperties.prototype.plugin_name="RegisterProperties";var instance=new RegisterProperties,index=createPlugin(instance);export default index;