!function(){"use strict";function t(t,r,e){if(r&&(t.plugin_name=r),e&&t.init){var n=t.init;t.init=function(s,a){function o(){n.call(t,s,a)}return i(s,t,r),s.readyState&&s.readyState.state>=3||!s.on?o():void s.on(e,o)}}return t}function i(t,i,r){function e(i,e){t.logger?t.logger.msg.apply(t.logger,e).module(r+""||"").level(i).log():t.log&&t.log.apply(t,e)}i.log=function(){e("log",arguments)},i.warn=function(){e("warn",arguments)},i.error=function(){e("error",arguments)}}function r(i,r,n){return t(i,r,n),i.plugin_version=e,i}var e="1.26.3",n={};n.getPart=function(t){var i=!1,r=this.option.length;if(r)for(var e=0;e<r;e++)if(t.indexOf(this.option[e].part_url)>-1)return!0;return i},n.getPartHash=function(t){var i=this.option.length,r=!1;if(i)for(var e=0;e<i;e++)if(t.indexOf(this.option[e].part_url)>-1)return this.option[e].after_hash;return!!r},n.getCurrenId=function(){var t=this.store.getDistinctId()||"",i=this.store.getFirstId()||"";this._.urlSafeBase64&&this._.urlSafeBase64.encode?t=t?this._.urlSafeBase64.trim(this._.urlSafeBase64.encode(this._.base64Encode(t))):"":this._.rot13obfs&&(t=t?this._.rot13obfs(t):"");var r=i?"f"+t:"d"+t;return encodeURIComponent(r)},n.rewriteUrl=function(t,i){var r=this,e=/([^?#]+)(\?[^#]*)?(#.*)?/,n=e.exec(t),s="";if(n){var a,o=n[1]||"",u=n[2]||"",f=n[3]||"",l="_sasdk="+this.getCurrenId(),h=function(t){var i=t.split("&"),e=[];return r._.each(i,function(t){t.indexOf("_sasdk=")>-1?e.push(l):e.push(t)}),e.join("&")};if(this.getPartHash(t)){a=f.indexOf("_sasdk");var d=f.indexOf("?");s=d>-1?a>-1?o+u+"#"+f.substring(1,a)+h(f.substring(a,f.length)):o+u+f+"&"+l:o+u+"#"+f.substring(1)+"?"+l}else{a=u.indexOf("_sasdk");var c=/^\?(\w)+/.test(u);s=c?a>-1?o+"?"+h(u.substring(1))+f:o+u+"&"+l+f:o+"?"+l+f}return i&&(i.href=s),s}},n.getUrlId=function(){var t=location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);if(this._.isArray(t)&&t[1]){var i=decodeURIComponent(t[1]);return!i||"f"!==i.substring(0,1)&&"d"!==i.substring(0,1)||(this._.urlSafeBase64&&this._.urlSafeBase64.isUrlSafeBase64&&this._.urlSafeBase64.isUrlSafeBase64(i)?i=i.substring(0,1)+this._.base64Decode(this._.urlSafeBase64.decode(i.substring(1))):this._.rot13defs&&(i=i.substring(0,1)+this._.rot13defs(i.substring(1)))),i}return""},n.setRefferId=function(t){var i=this.store.getDistinctId(),r=this.getUrlId();if(r&&""!==r){var e="a"===r.substring(0,1)||"d"===r.substring(0,1);r=r.substring(1),r!==i&&(e?(this.sd.identify(r,!0),this.store.getFirstId()&&this.sd.saEvent.send({original_id:r,distinct_id:i,type:"track_signup",event:"$SignUp",properties:{}},null)):this.store.getFirstId()&&!t.re_login||this.sd.login(r))}},n.addListen=function(){var t=this,i=function(i){var r,e,n=i.target,s=n.tagName.toLowerCase(),a=n.parentNode;if("a"===s&&n.href||a&&a.tagName&&"a"===a.tagName.toLowerCase()&&a.href){"a"===s&&n.href?(r=n.href,e=n):(r=a.href,e=a);var o=t._.URL(r),u=o.protocol;"http:"!==u&&"https:"!==u||t.getPart(r)&&t.rewriteUrl(r,e)}};t._.addEvent(document,"mousedown",i),window.PointerEvent&&"maxTouchPoints"in window.navigator&&window.navigator.maxTouchPoints>=0&&t._.addEvent(document,"pointerdown",i)},n.init=function(t,i){function r(i){for(var r=i.length,e=[],n=0;n<r;n++)/[A-Za-z0-9]+\./.test(i[n].part_url)&&"[object Boolean]"==Object.prototype.toString.call(i[n].after_hash)?e.push(i[n]):t.log("linker \u914d\u7f6e\u7684\u7b2c "+(n+1)+" \u9879\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u68c0\u67e5\u53c2\u6570\u683c\u5f0f\uff01");return e}return this.sd=t,this._=t._,this.store=t.store,this.para=t.para,this._.isObject(i)&&this._.isArray(i.linker)&&i.linker.length>0?(this.setRefferId(i),this.addListen(),this.option=i.linker,void(this.option=r(this.option))):void t.log("\u8bf7\u914d\u7f6e\u6253\u901a\u57df\u540d\u53c2\u6570\uff01")};var s=r(n,"SiteLinker","sdkReady"),a=s,o=s.rewriteUrl;return a.rewriteUrl=function(t,i){function r(t){var i={};if(s._.isArray(t)){var r=t[2]||"";if(""!==r)for(var e=r.slice(1).split("&"),n=0;n<e.length;n++){var a=e[n].split("=");i[a[0]]=a[1]}}return i}function e(t){var i={};if(s._.isArray(t)){var r=t[3]||"";if(""!==r){var e=r.split("?");if(e[1])for(var n=e[1].split("&"),a=0;a<n.length;a++){var o=n[a].split("=");i[o[0]]=o[1]}}}return i}function n(t){for(var i=t.length;i--;){var r=t.shift(),e=r.split("=")[0];d.indexOf(e)==-1&&t.push(r)}return t}var s=this,a=o.call(this,t,i),u=/([^?#]+)(\?[^#]*)?(#.*)?/,f=u.exec(location.href),l=r(f),h=e(f),d=["utm_source","utm_medium","utm_campaign","utm_content","utm_term","_channel_track_key"],c={};this._.each(d,function(t){t in l&&(c[t]=l[t]),t in h&&!(t in c)&&(c[t]=h[t])});var g="";if(!this._.isEmptyObject(c)){var v="";for(var _ in c)v+="&"+_+"="+c[_];var p=u.exec(a),b=p[1]||"",m=p[2]||"",S=p[3]||"";g+=b;var w=[];""!==m&&(w=n(m.slice(1).split("&")),w.length&&(g+="?"+w.join("&")));var k=[],y="",x="";if(""!==S){var I=S.split("?");y=I[0]||"",x=I[1]||"",g+=y}""!==x&&(k=n(x.split("&")),k.length&&(g+="?"+k.join("&")));var O=g.indexOf("_sasdk=");a=g.slice(0,O)+v.slice(1)+"&"+g.slice(O)}return i&&(i.href=a),a},window.SensorsDataWebJSSDKPlugin&&"[object Object]"===Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin)&&(window.SensorsDataWebJSSDKPlugin.SiteLinker={init:function(){}}),a.name="SiteLinkerConcatUtm",a.plugin_version=e,a}();