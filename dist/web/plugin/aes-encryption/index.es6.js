var sdkversion_placeholder="1.25.16";function wrapPluginInitFn(t,e,r){if(e&&(t.plugin_name=e),r&&t.init){var n=t.init;t.init=function(i,o){if(wrapLogFn(i,t,e),i.readyState&&i.readyState.state>=3||!i.on)return c();function c(){n.call(t,i,o)}i.on(r,c)}}return t}function wrapLogFn(t,e,r){function n(e,n){t.logger?t.logger.msg.apply(t.logger,n).module(r+""||"").level(e).log():t.log&&t.log.apply(t,n)}e.log=function(){n("log",arguments)},e.warn=function(){n("warn",arguments)},e.error=function(){n("error",arguments)}}function createPlugin(t,e,r){return wrapPluginInitFn(t,e,r),t.plugin_version=sdkversion_placeholder,t}var root={};function isObject(t){return null!=t&&"[object Object]"==Object.prototype.toString.call(t)}!function(t,e){var r;t.CryptoJS=r=r||function(t,e){var r;if("undefined"!=typeof window&&window.crypto&&(r=window.crypto),"undefined"!=typeof self&&self.crypto&&(r=self.crypto),"undefined"!=typeof globalThis&&globalThis.crypto&&(r=globalThis.crypto),!r&&"undefined"!=typeof window&&window.msCrypto&&(r=window.msCrypto),!r&&"undefined"!=typeof global&&global.crypto&&(r=global.crypto),!r&&"function"==typeof require)try{r=require("crypto")}catch(y){}var n=function(){if(r){if("function"==typeof r.getRandomValues)try{return r.getRandomValues(new Uint32Array(1))[0]}catch(y){}if("function"==typeof r.randomBytes)try{return r.randomBytes(4).readInt32LE()}catch(y){}}throw new Error("Native crypto module could not be used to get secure random number.")},i=Object.create||function(){function t(){}return function(e){var r;return t.prototype=e,r=new t,t.prototype=null,r}}(),o={},c=o.lib={},a=c.Base={extend:function(t){var e=i(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},s=c.WordArray=a.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||f).stringify(this)},concat:function(t){var e=this.words,r=t.words,n=this.sigBytes,i=t.sigBytes;if(this.clamp(),n%4)for(var o=0;o<i;o++){var c=r[o>>>2]>>>24-o%4*8&255;e[n+o>>>2]|=c<<24-(n+o)%4*8}else for(var a=0;a<i;a+=4)e[n+a>>>2]=r[a>>>2];return this.sigBytes+=i,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=a.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],r=0;r<t;r+=4)e.push(n());return new s.init(e,t)}}),u=o.enc={},f=u.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],i=0;i<r;i++){var o=e[i>>>2]>>>24-i%4*8&255;n.push((o>>>4).toString(16)),n.push((15&o).toString(16))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n+=2)r[n>>>3]|=parseInt(t.substr(n,2),16)<<24-n%8*4;return new s.init(r,e/2)}},p=u.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],i=0;i<r;i++){var o=e[i>>>2]>>>24-i%4*8&255;n.push(String.fromCharCode(o))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n++)r[n>>>2]|=(255&t.charCodeAt(n))<<24-n%4*8;return new s.init(r,e)}},d=u.Utf8={stringify:function(t){try{return decodeURIComponent(escape(p.stringify(t)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(t){return p.parse(unescape(encodeURIComponent(t)))}},h=c.BufferedBlockAlgorithm=a.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=d.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r,n=this._data,i=n.words,o=n.sigBytes,c=this.blockSize,a=4*c,u=o/a,f=(u=e?t.ceil(u):t.max((0|u)-this._minBufferSize,0))*c,p=t.min(4*f,o);if(f){for(var d=0;d<f;d+=c)this._doProcessBlock(i,d);r=i.splice(0,f),n.sigBytes-=p}return new s.init(r,p)},clone:function(){var t=a.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),l=(c.Hasher=h.extend({cfg:a.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){h.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){t&&this._append(t);var e=this._doFinalize();return e},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new l.HMAC.init(t,r).finalize(e)}}}),o.algo={});return o}(Math)}(root),function(t,e){var r;r=t.CryptoJS,function(t){var e=r,n=e.lib,i=n.WordArray,o=n.Hasher,c=e.algo,a=[];!function(){for(var e=0;e<64;e++)a[e]=4294967296*t.abs(t.sin(e+1))|0}();var s=c.MD5=o.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,e){for(var r=0;r<16;r++){var n=e+r,i=t[n];t[n]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8)}var o=this._hash.words,c=t[e+0],s=t[e+1],h=t[e+2],l=t[e+3],y=t[e+4],g=t[e+5],_=t[e+6],v=t[e+7],k=t[e+8],S=t[e+9],m=t[e+10],B=t[e+11],w=t[e+12],C=t[e+13],x=t[e+14],E=t[e+15],D=o[0],b=o[1],z=o[2],A=o[3];D=u(D,b,z,A,c,7,a[0]),A=u(A,D,b,z,s,12,a[1]),z=u(z,A,D,b,h,17,a[2]),b=u(b,z,A,D,l,22,a[3]),D=u(D,b,z,A,y,7,a[4]),A=u(A,D,b,z,g,12,a[5]),z=u(z,A,D,b,_,17,a[6]),b=u(b,z,A,D,v,22,a[7]),D=u(D,b,z,A,k,7,a[8]),A=u(A,D,b,z,S,12,a[9]),z=u(z,A,D,b,m,17,a[10]),b=u(b,z,A,D,B,22,a[11]),D=u(D,b,z,A,w,7,a[12]),A=u(A,D,b,z,C,12,a[13]),z=u(z,A,D,b,x,17,a[14]),D=f(D,b=u(b,z,A,D,E,22,a[15]),z,A,s,5,a[16]),A=f(A,D,b,z,_,9,a[17]),z=f(z,A,D,b,B,14,a[18]),b=f(b,z,A,D,c,20,a[19]),D=f(D,b,z,A,g,5,a[20]),A=f(A,D,b,z,m,9,a[21]),z=f(z,A,D,b,E,14,a[22]),b=f(b,z,A,D,y,20,a[23]),D=f(D,b,z,A,S,5,a[24]),A=f(A,D,b,z,x,9,a[25]),z=f(z,A,D,b,l,14,a[26]),b=f(b,z,A,D,k,20,a[27]),D=f(D,b,z,A,C,5,a[28]),A=f(A,D,b,z,h,9,a[29]),z=f(z,A,D,b,v,14,a[30]),D=p(D,b=f(b,z,A,D,w,20,a[31]),z,A,g,4,a[32]),A=p(A,D,b,z,k,11,a[33]),z=p(z,A,D,b,B,16,a[34]),b=p(b,z,A,D,x,23,a[35]),D=p(D,b,z,A,s,4,a[36]),A=p(A,D,b,z,y,11,a[37]),z=p(z,A,D,b,v,16,a[38]),b=p(b,z,A,D,m,23,a[39]),D=p(D,b,z,A,C,4,a[40]),A=p(A,D,b,z,c,11,a[41]),z=p(z,A,D,b,l,16,a[42]),b=p(b,z,A,D,_,23,a[43]),D=p(D,b,z,A,S,4,a[44]),A=p(A,D,b,z,w,11,a[45]),z=p(z,A,D,b,E,16,a[46]),D=d(D,b=p(b,z,A,D,h,23,a[47]),z,A,c,6,a[48]),A=d(A,D,b,z,v,10,a[49]),z=d(z,A,D,b,x,15,a[50]),b=d(b,z,A,D,g,21,a[51]),D=d(D,b,z,A,w,6,a[52]),A=d(A,D,b,z,l,10,a[53]),z=d(z,A,D,b,m,15,a[54]),b=d(b,z,A,D,s,21,a[55]),D=d(D,b,z,A,k,6,a[56]),A=d(A,D,b,z,E,10,a[57]),z=d(z,A,D,b,_,15,a[58]),b=d(b,z,A,D,C,21,a[59]),D=d(D,b,z,A,y,6,a[60]),A=d(A,D,b,z,B,10,a[61]),z=d(z,A,D,b,h,15,a[62]),b=d(b,z,A,D,S,21,a[63]),o[0]=o[0]+D|0,o[1]=o[1]+b|0,o[2]=o[2]+z|0,o[3]=o[3]+A|0},_doFinalize:function(){var e=this._data,r=e.words,n=8*this._nDataBytes,i=8*e.sigBytes;r[i>>>5]|=128<<24-i%32;var o=t.floor(n/4294967296),c=n;r[15+(i+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),r[14+(i+64>>>9<<4)]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8),e.sigBytes=4*(r.length+1),this._process();for(var a=this._hash,s=a.words,u=0;u<4;u++){var f=s[u];s[u]=16711935&(f<<8|f>>>24)|4278255360&(f<<24|f>>>8)}return a},clone:function(){var t=o.clone.call(this);return t._hash=this._hash.clone(),t}});function u(t,e,r,n,i,o,c){var a=t+(e&r|~e&n)+i+c;return(a<<o|a>>>32-o)+e}function f(t,e,r,n,i,o,c){var a=t+(e&n|r&~n)+i+c;return(a<<o|a>>>32-o)+e}function p(t,e,r,n,i,o,c){var a=t+(e^r^n)+i+c;return(a<<o|a>>>32-o)+e}function d(t,e,r,n,i,o,c){var a=t+(r^(e|~n))+i+c;return(a<<o|a>>>32-o)+e}e.MD5=o._createHelper(s),e.HmacMD5=o._createHmacHelper(s)}(Math),r.MD5}(root),function(t,e,r){var n,i,o,c,a,s,u,f;n=t.CryptoJS,o=(i=n).lib,c=o.Base,a=o.WordArray,s=i.algo,u=s.MD5,f=s.EvpKDF=c.extend({cfg:c.extend({keySize:4,hasher:u,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var r,n=this.cfg,i=n.hasher.create(),o=a.create(),c=o.words,s=n.keySize,u=n.iterations;c.length<s;){r&&i.update(r),r=i.update(t).finalize(e),i.reset();for(var f=1;f<u;f++)r=i.finalize(r),i.reset();o.concat(r)}return o.sigBytes=4*s,o}}),i.EvpKDF=function(t,e,r){return f.create(r).compute(t,e)},n.EvpKDF}(root),function(t,e){var r,n,i;r=t.CryptoJS,i=(n=r).lib.WordArray,n.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,n=this._map;t.clamp();for(var i=[],o=0;o<r;o+=3)for(var c=(e[o>>>2]>>>24-o%4*8&255)<<16|(e[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|e[o+2>>>2]>>>24-(o+2)%4*8&255,a=0;a<4&&o+.75*a<r;a++)i.push(n.charAt(c>>>6*(3-a)&63));var s=n.charAt(64);if(s)for(;i.length%4;)i.push(s);return i.join("")},parse:function(t){var e=t.length,r=this._map,n=this._reverseMap;if(!n){n=this._reverseMap=[];for(var o=0;o<r.length;o++)n[r.charCodeAt(o)]=o}var c=r.charAt(64);if(c){var a=t.indexOf(c);-1!==a&&(e=a)}return function(t,e,r){for(var n=[],o=0,c=0;c<e;c++)if(c%4){var a=r[t.charCodeAt(c-1)]<<c%4*2,s=r[t.charCodeAt(c)]>>>6-c%4*2,u=a|s;n[o>>>2]|=u<<24-o%4*8,o++}return i.create(n,o)}(t,e,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},r.enc.Base64}(root),function(t,e,r){var n,i,o,c,a,s,u,f,p,d,h,l,y,g,_,v,k,S,m,B,w,C,x,E;(n=t.CryptoJS).lib.Cipher||(c=(o=n).lib,a=c.Base,s=c.WordArray,u=c.BufferedBlockAlgorithm,(f=o.enc).Utf8,p=f.Base64,d=o.algo,h=d.EvpKDF,l=c.Cipher=u.extend({cfg:a.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){u.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){t&&this._append(t);var e=this._doFinalize();return e},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function t(t){return"string"==typeof t?E:w}return function(e){return{encrypt:function(r,n,i){return t(n).encrypt(e,r,n,i)},decrypt:function(r,n,i){return t(n).decrypt(e,r,n,i)}}}}()}),c.StreamCipher=l.extend({_doFinalize:function(){var t=this._process(!0);return t},blockSize:1}),y=o.mode={},g=c.BlockCipherMode=a.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),_=y.CBC=function(){var t=g.extend();function e(t,e,r){var n,o=this._iv;o?(n=o,this._iv=i):n=this._prevBlock;for(var c=0;c<r;c++)t[e+c]^=n[c]}return t.Encryptor=t.extend({processBlock:function(t,r){var n=this._cipher,i=n.blockSize;e.call(this,t,r,i),n.encryptBlock(t,r),this._prevBlock=t.slice(r,r+i)}}),t.Decryptor=t.extend({processBlock:function(t,r){var n=this._cipher,i=n.blockSize,o=t.slice(r,r+i);n.decryptBlock(t,r),e.call(this,t,r,i),this._prevBlock=o}}),t}(),v=o.pad={},k=v.Pkcs7={pad:function(t,e){for(var r=4*e,n=r-t.sigBytes%r,i=n<<24|n<<16|n<<8|n,o=[],c=0;c<n;c+=4)o.push(i);var a=s.create(o,n);t.concat(a)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},c.BlockCipher=l.extend({cfg:l.cfg.extend({mode:_,padding:k}),reset:function(){var t;l.reset.call(this);var e=this.cfg,r=e.iv,n=e.mode;this._xformMode==this._ENC_XFORM_MODE?t=n.createEncryptor:(t=n.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==t?this._mode.init(this,r&&r.words):(this._mode=t.call(n,this,r&&r.words),this._mode.__creator=t)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t,e=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(e.pad(this._data,this.blockSize),t=this._process(!0)):(t=this._process(!0),e.unpad(t)),t},blockSize:4}),S=c.CipherParams=a.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}}),m=o.format={},B=m.OpenSSL={stringify:function(t){var e=t.ciphertext,r=t.salt;return(r?s.create([1398893684,1701076831]).concat(r).concat(e):e).toString(p)},parse:function(t){var e,r=p.parse(t),n=r.words;return 1398893684==n[0]&&1701076831==n[1]&&(e=s.create(n.slice(2,4)),n.splice(0,4),r.sigBytes-=16),S.create({ciphertext:r,salt:e})}},w=c.SerializableCipher=a.extend({cfg:a.extend({format:B}),encrypt:function(t,e,r,n){n=this.cfg.extend(n);var i=t.createEncryptor(r,n),o=i.finalize(e),c=i.cfg;return S.create({ciphertext:o,key:r,iv:c.iv,algorithm:t,mode:c.mode,padding:c.padding,blockSize:t.blockSize,formatter:n.format})},decrypt:function(t,e,r,n){n=this.cfg.extend(n),e=this._parse(e,n.format);var i=t.createDecryptor(r,n).finalize(e.ciphertext);return i},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),C=o.kdf={},x=C.OpenSSL={execute:function(t,e,r,n){n||(n=s.random(8));var i=h.create({keySize:e+r}).compute(t,n),o=s.create(i.words.slice(e),4*r);return i.sigBytes=4*e,S.create({key:i,iv:o,salt:n})}},E=c.PasswordBasedCipher=w.extend({cfg:w.cfg.extend({kdf:x}),encrypt:function(t,e,r,n){var i=(n=this.cfg.extend(n)).kdf.execute(r,t.keySize,t.ivSize);n.iv=i.iv;var o=w.encrypt.call(this,t,e,i.key,n);return o.mixIn(i),o},decrypt:function(t,e,r,n){n=this.cfg.extend(n),e=this._parse(e,n.format);var i=n.kdf.execute(r,t.keySize,t.ivSize,e.salt);n.iv=i.iv;var o=w.decrypt.call(this,t,e,i.key,n);return o}}))}(root),function(t,e,r){var n;n=t.CryptoJS,function(){var t=n,e=t.lib.BlockCipher,r=t.algo,i=[],o=[],c=[],a=[],s=[],u=[],f=[],p=[],d=[],h=[];!function(){for(var t=[],e=0;e<256;e++)t[e]=e<128?e<<1:e<<1^283;var r=0,n=0;for(e=0;e<256;e++){var l=n^n<<1^n<<2^n<<3^n<<4;l=l>>>8^255&l^99,i[r]=l,o[l]=r;var y=t[r],g=t[y],_=t[g],v=257*t[l]^16843008*l;c[r]=v<<24|v>>>8,a[r]=v<<16|v>>>16,s[r]=v<<8|v>>>24,u[r]=v,v=16843009*_^65537*g^257*y^16843008*r,f[l]=v<<24|v>>>8,p[l]=v<<16|v>>>16,d[l]=v<<8|v>>>24,h[l]=v,r?(r=y^t[t[t[_^y]]],n^=t[t[n]]):r=n=1}}();var l=[0,1,2,4,8,16,32,64,128,27,54],y=r.AES=e.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var t=this._keyPriorReset=this._key,e=t.words,r=t.sigBytes/4,n=4*((this._nRounds=r+6)+1),o=this._keySchedule=[],c=0;c<n;c++)c<r?o[c]=e[c]:(u=o[c-1],c%r?r>6&&c%r==4&&(u=i[u>>>24]<<24|i[u>>>16&255]<<16|i[u>>>8&255]<<8|i[255&u]):(u=i[(u=u<<8|u>>>24)>>>24]<<24|i[u>>>16&255]<<16|i[u>>>8&255]<<8|i[255&u],u^=l[c/r|0]<<24),o[c]=o[c-r]^u);for(var a=this._invKeySchedule=[],s=0;s<n;s++){if(c=n-s,s%4)var u=o[c];else u=o[c-4];a[s]=s<4||c<=4?u:f[i[u>>>24]]^p[i[u>>>16&255]]^d[i[u>>>8&255]]^h[i[255&u]]}}},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,c,a,s,u,i)},decryptBlock:function(t,e){var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r,this._doCryptBlock(t,e,this._invKeySchedule,f,p,d,h,o),r=t[e+1],t[e+1]=t[e+3],t[e+3]=r},_doCryptBlock:function(t,e,r,n,i,o,c,a){for(var s=this._nRounds,u=t[e]^r[0],f=t[e+1]^r[1],p=t[e+2]^r[2],d=t[e+3]^r[3],h=4,l=1;l<s;l++){var y=n[u>>>24]^i[f>>>16&255]^o[p>>>8&255]^c[255&d]^r[h++],g=n[f>>>24]^i[p>>>16&255]^o[d>>>8&255]^c[255&u]^r[h++],_=n[p>>>24]^i[d>>>16&255]^o[u>>>8&255]^c[255&f]^r[h++],v=n[d>>>24]^i[u>>>16&255]^o[f>>>8&255]^c[255&p]^r[h++];u=y,f=g,p=_,d=v}y=(a[u>>>24]<<24|a[f>>>16&255]<<16|a[p>>>8&255]<<8|a[255&d])^r[h++],g=(a[f>>>24]<<24|a[p>>>16&255]<<16|a[d>>>8&255]<<8|a[255&u])^r[h++],_=(a[p>>>24]<<24|a[d>>>16&255]<<16|a[u>>>8&255]<<8|a[255&f])^r[h++],v=(a[d>>>24]<<24|a[u>>>16&255]<<16|a[f>>>8&255]<<8|a[255&p])^r[h++],t[e]=y,t[e+1]=g,t[e+2]=_,t[e+3]=v},keySize:8});t.AES=e._createHelper(y)}(),n.AES}(root);var getRandomBasic=function(){var t=(new Date).getTime();return function(e){return Math.ceil((t=(9301*t+49297)%233280)/233280*e)}}();function getRandom(){if("function"==typeof Uint32Array){var t="";if("undefined"!=typeof crypto?t=crypto:"undefined"!=typeof msCrypto&&(t=msCrypto),isObject(t)&&t.getRandomValues){var e=new Uint32Array(1);return t.getRandomValues(e)[0]/Math.pow(2,32)}}return getRandomBasic(1e19)/1e19}var CryptoJS=root.CryptoJS;function buildAESOption(t){return{mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7,iv:t||generateIVData()}}function encryptData(t,e,r,n){var i=buildAESOption(r),o=t;"string"!=typeof t&&(o=JSON.stringify(t)),n||(e=CryptoJS.enc.Base64.parse(e));var c=CryptoJS.enc.Utf8.parse(o),a=CryptoJS.AES.encrypt(c,e,i).toString();return i.iv.clone().concat(CryptoJS.enc.Base64.parse(a)).toString(CryptoJS.enc.Base64)}function decryptData(t,e,r){var n=CryptoJS.enc.Base64.parse(t).toString(),i=n.substr(0,32),o=CryptoJS.enc.Hex.parse(n.substr(32)).toString(CryptoJS.enc.Base64),c=buildAESOption(CryptoJS.enc.Hex.parse(i));return r||(e=CryptoJS.enc.Base64.parse(e)),CryptoJS.AES.decrypt(o,e,c).toString(CryptoJS.enc.Utf8)}function generateIVData(t){t=t||16;for(var e="";t-- >0;){var r=Math.ceil(127*getRandom()).toString(16);e+=2===r.length?r:"0"+r}return CryptoJS.enc.Hex.parse(e)}var _iv,_sd,_config,_oldEncoder,_log=window.console&&window.console.log||function(){};function AesEncrypt(t){var e=encryptData(t,_config.k,_iv);return{key_id:_config.kid,key_hash:_config.khash,nc:1,payload:e}}function encodeTrackData(t){try{var e=AesEncrypt(t),r=JSON.stringify(e),n="crc="+_sd._.hashCode(r);return"data="+encodeURIComponent(r)+"&ext="+encodeURIComponent(n)+"&gzip=9"}catch(i){return _log("\u6570\u636e\u52a0\u5bc6\u53d1\u9001\u5f02\u5e38\u3002"),_oldEncoder.call(_sd.kit,t)}}function isTruthy(t,e){return!!t||(_log(e+"\u4e0d\u80fd\u4e3a\u7a7a\u3002"),!1)}function matchType(t,e,r){return typeof t===r||(_log("\u53c2\u6570\u7c7b\u578b\u9519\u8bef,"+e+"\u5fc5\u987b\u4e3a"+r),!1)}function doEnDecrypt(t,e,r,n){try{var i=r||_config&&_config.k;return isTruthy(i,"\u53c2\u6570key")&&matchType(i,"\u53c2\u6570key","string")?(n===undefined&&(n=r!==undefined),t?encryptData(e,i,null,n):decryptData(e,i,n)):e}catch(o){return _log("\u6267\u884c\u52a0\u89e3\u5bc6\u5931\u8d25\uff0c\u8fd4\u56de\u539f\u59cb\u6570\u636e\u3002"),e}}var AesEncryption={init:function(t,e){_log=(_sd=t)&&_sd.log||_log,t&&t.kit&&t.kit.encodeTrackData?isTruthy(e,"\u521d\u59cb\u914d\u7f6econfig")&&isTruthy(e.k,"\u521d\u59cb\u53c2\u6570k")&&isTruthy(e.kid,"\u521d\u59cb\u53c2\u6570kid")&&isTruthy(e.khash,"\u521d\u59cb\u53c2\u6570khash")&&matchType(e.k,"\u521d\u59cb\u53c2\u6570k","string")&&matchType(e.khash,"\u521d\u59cb\u53c2\u6570khash","string")&&matchType(e.kid,"\u521d\u59cb\u53c2\u6570kid","number")?(_config=e,_iv=generateIVData(),_oldEncoder=_sd.kit.encodeTrackData,_sd.kit.encodeTrackData=encodeTrackData,_log("AES\u63d2\u4ef6\u521d\u59cb\u5316\u5b8c\u6210")):_log("AES\u63d2\u4ef6\u521d\u59cb\u5316\u5931\u8d25"):_log("AES\u63d2\u4ef6\u521d\u59cb\u5316\u5931\u8d25,\u5f53\u524d\u4e3bsdk\u4e0d\u652f\u6301AES\u63d2\u4ef6\uff0c\u8bf7\u5347\u7ea7\u4e3bsdk")},encrypt:function(t,e,r){return doEnDecrypt(!0,t,e,r)},decrypt:function(t,e,r){return doEnDecrypt(!1,t,e,r)}},index=createPlugin(AesEncryption,"AesEncryption","sdkReady");export default index;