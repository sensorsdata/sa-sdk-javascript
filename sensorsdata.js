/**
 * @fileoverview sensors analytic javascript sdk
 * @author shengyonggen@sensorsdata.cn
 */

// 压缩后的json库
if(typeof JSON!=='object'){JSON={}}(function(){'use strict';var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function f(n){return n<10?'0'+n:n}function this_value(){return this.valueOf()}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value}var gap,indent,meta,rep;function quote(string){rx_escapable.lastIndex=0;return rx_escapable.test(string)?'"'+string.replace(rx_escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify')}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);rx_dangerous.lastIndex=0;if(rx_dangerous.test(text)){text=text.replace(rx_dangerous,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(rx_one.test(text.replace(rx_two,'@').replace(rx_three,']').replace(rx_four,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse')}}}());

(function(sd) {
  var ArrayProto = Array.prototype
    , FuncProto = Function.prototype
    , ObjProto = Object.prototype
    , slice = ArrayProto.slice
    , toString = ObjProto.toString
    , hasOwnProperty = ObjProto.hasOwnProperty
    , navigator = window.navigator
    , document = window.document
    , userAgent = navigator.userAgent
    , LIB_VERSION = '1.1.0';

  var logger = typeof logger === 'object' ? logger : {};
  logger.info = function() {
    if (typeof console === 'object' && console.log) {
      return console.log.apply(console, arguments);
    }
  };

  sd = window[sd];
  var _ = sd._ = {};
  (function() {
    var nativeBind = FuncProto.bind,
      nativeForEach = ArrayProto.forEach,
      nativeIndexOf = ArrayProto.indexOf,
      nativeIsArray = Array.isArray,
      breaker = {};

    var each = _.each = function(obj, iterator, context) {
      if (obj == null) {
        return false;
      }
      if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
      } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
          if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
            return false;
          }
        }
      } else {
        for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            if (iterator.call(context, obj[key], key, obj) === breaker) {
              return false;
            }
          }
        }
      }
    };

    _.extend = function(obj) {
      each(slice.call(arguments, 1), function(source) {
        for (var prop in source) {
          if (source[prop] !== void 0) {
            obj[prop] = source[prop];
          }
        }
      });
      return obj;
    };

    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
      };

    _.isFunction = function(f) {
      try {
        return /^\s*\bfunction\b/.test(f);
      } catch (x) {
        return false;
      }
    };

    _.isArguments = function(obj) {
      return !!(obj && hasOwnProperty.call(obj, 'callee'));
    };

    _.toArray = function(iterable) {
      if (!iterable) {
        return [];
      }
      if (iterable.toArray) {
        return iterable.toArray();
      }
      if (_.isArray(iterable)) {
        return slice.call(iterable);
      }
      if (_.isArguments(iterable)) {
        return slice.call(iterable);
      }
      return _.values(iterable);
    };

    _.values = function(obj) {
      var results = [];
      if (obj == null) {
        return results;
      }
      each(obj, function(value) {
        results[results.length] = value;
      });
      return results;
    };

    _.include = function(obj, target) {
      var found = false;
      if (obj == null) {
        return found;
      }
      if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
        return obj.indexOf(target) != -1;
      }
      each(obj, function(value) {
        if (found || (found = (value === target))) {
          return breaker;
        }
      });
      return found;
    };

    _.includes = function(str, needle) {
      return str.indexOf(needle) !== -1;
    };

  })();

  _.inherit = function(subclass, superclass) {
    subclass.prototype = new superclass();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
    return subclass;
  };

  _.isObject = function(obj) {
    return toString.call(obj) == '[object Object]';
  };

  _.isEmptyObject = function(obj) {
    if (_.isObject(obj)) {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  _.isBoolean = function(obj) {
    return toString.call(obj) == '[object Boolean]';
  };

  _.isNumber = function(obj) {
    return (toString.call(obj) == '[object Number]' && /[\d\.]+/.test(String(obj)));
  };

  _.encodeDates = function(obj) {
    _.each(obj, function(v, k) {
      if (_.isDate(v)) {
        obj[k] = _.formatDate(v);
      } else if (_.isObject(v)) {
        obj[k] = _.encodeDates(v); // recurse
      }
    });
    return obj;
  };

  _.formatDate = function(d) {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }

    return d.getFullYear() + '-'
      + pad(d.getMonth() + 1) + '-'
      + pad(d.getDate()) + ' '
      + pad(d.getHours()) + ':'
      + pad(d.getMinutes()) + ':'
      + pad(d.getSeconds()) + '.'
      + pad(d.getMilliseconds());
  };

  _.searchObjDate = function(o) {
    if (_.isObject(o)) {
      _.each(o, function(a, b) {
        if (_.isObject(a)) {
          _.searchObjDate(o[b]);
        } else {
          if (_.isDate(a)) {
            o[b] = _.formatDate(a);
          }
        }
      });
    }
  };

  // 只能是sensors满足的数据格式
  _.strip_sa_properties = function(p) {
    if (!_.isObject(p)) {
      return p;
    }
    _.each(p, function(v, k) {
      // 如果是数组，把值自动转换成string
      if (_.isArray(v)) {
        _.each(v, function(a, b) {
          v[b] = String(v[b]);
        });
      }
      // 只能是字符串，数字，日期,布尔，数组
      if (!(_.isString(v) || _.isNumber(v) || _.isDate(v) || _.isBoolean(v) || _.isArray(v))) {
        logger.info('您的数据-', v, '-格式不满足要求，我们已经将其删除');
        delete p[k];
      }
    });
    return p;
  };

  _.strip_empty_properties = function(p) {
    var ret = {};
    _.each(p, function(v, k) {
      if (_.isString(v) && v.length > 0) {
        ret[k] = v;
      }
    });
    return ret;
  };

  _.utf8Encode = function(string) {
    string = (string + '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    var utftext = '', start, end;
    var stringl = 0, n;

    start = end = 0;
    stringl = string.length;

    for (n = 0; n < stringl; n++) {
      var c1 = string.charCodeAt(n);
      var enc = null;

      if (c1 < 128) {
        end++;
      } else if ((c1 > 127) && (c1 < 2048)) {
        enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
      } else {
        enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
      }
      if (enc !== null) {
        if (end > start) {
          utftext += string.substring(start, end);
        }
        utftext += enc;
        start = end = n + 1;
      }
    }

    if (end > start) {
      utftext += string.substring(start, string.length);
    }

    return utftext;
  };

  _.base64Encode = function(data) {
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = '', tmp_arr = [];
    if (!data) {
      return data;
    }
    data = _.utf8Encode(data);
    do {
      o1 = data.charCodeAt(i++);
      o2 = data.charCodeAt(i++);
      o3 = data.charCodeAt(i++);

      bits = o1 << 16 | o2 << 8 | o3;

      h1 = bits >> 18 & 0x3f;
      h2 = bits >> 12 & 0x3f;
      h3 = bits >> 6 & 0x3f;
      h4 = bits & 0x3f;
      tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
      case 1:
        enc = enc.slice(0, -2) + '==';
        break;
      case 2:
        enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
  };

  _.UUID = (function() {
    var T = function() {
      var d = 1 * new Date()
        , i = 0;
      while (d == 1 * new Date()) {
        i++;
      }
      return d.toString(16) + i.toString(16);
    };
    var R = function() {
      return Math.random().toString(16).replace('.', '');
    };
    var UA = function(n) {
      var ua = userAgent, i, ch, buffer = [], ret = 0;

      function xor(result, byte_array) {
        var j, tmp = 0;
        for (j = 0; j < byte_array.length; j++) {
          tmp |= (buffer[j] << j * 8);
        }
        return result ^ tmp;
      }

      for (i = 0; i < ua.length; i++) {
        ch = ua.charCodeAt(i);
        buffer.unshift(ch & 0xFF);
        if (buffer.length >= 4) {
          ret = xor(ret, buffer);
          buffer = [];
        }
      }

      if (buffer.length > 0) {
        ret = xor(ret, buffer);
      }

      return ret.toString(16);
    };

    return function() {
      var se = (screen.height * screen.width).toString(16);
      return (T() + '-' + R() + '-' + UA() + '-' + se + '-' + T());
    };
  })();

  _.getQueryParam = function(url, param) {
    param = param.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    var regexS = '[\\?&]' + param + '=([^&#]*)',
      regex = new RegExp(regexS),
      results = regex.exec(url);
    if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
      return '';
    } else {
      return decodeURIComponent(results[1]).replace(/\+/g, ' ');
    }
  };

  _.cookie = {
    get: function(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    },
    set: function(name, value, days, cross_subdomain, is_secure) {
      var cdomain = '', expires = '', secure = '';
      days = days || 365;

      if (cross_subdomain) {
        var matches = document.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i)
          , domain = matches ? matches[0] : '';

        cdomain = ((domain) ? '; domain=.' + domain : '');
      }

      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
      }

      if (is_secure) {
        secure = '; secure';
      }

      document.cookie = name + '=' + encodeURIComponent(value) + expires
        + '; path=/' + cdomain + secure;
    },

    remove: function(name, cross_subdomain) {
      _.cookie.set(name, '', -1, cross_subdomain);
    }
  };

  // _.localStorage
  _.localStorage = {
    get: function(name) {
      return window.localStorage.getItem(name);
    },

    parse: function(name) {
      var storedValue;
      try {
        storedValue = JSON.parse(_.localStorage.get(name)) || {};
      } catch (err) {
      }
      return storedValue;
    },

    set: function(name, value) {
      window.localStorage.setItem(name, value);
    },

    remove: function(name) {
      window.localStorage.removeItem(name);
    }
  };

  _.info = {
    searchEngine: function(referrer) {
      if (referrer.search('https?://(.*)google.([^/?]*)') === 0) {
        return 'google';
      } else if (referrer.search('https?://(.*)bing.com') === 0) {
        return 'bing';
      } else if (referrer.search('https?://(.*)yahoo.com') === 0) {
        return 'yahoo';
      } else if (referrer.search('https?://(.*)duckduckgo.com') === 0) {
        return 'duckduckgo';
      } else {
        return null;
      }
    },

    browser: function(user_agent, vendor, opera) {
      var vendor = vendor || '';
      if (opera) {
        if (_.includes(user_agent, 'Mini')) {
          return 'Opera Mini';
        }
        return 'Opera';
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
        return 'BlackBerry';
      } else if (_.includes(user_agent, 'FBIOS')) {
        return 'Facebook Mobile';
      } else if (_.includes(user_agent, 'Chrome')) {
        return 'Chrome';
      } else if (_.includes(user_agent, 'CriOS')) {
        return 'Chrome iOS';
      } else if (_.includes(vendor, 'Apple')) {
        if (_.includes(user_agent, 'Mobile')) {
          return 'Mobile Safari';
        }
        return 'Safari';
      } else if (_.includes(user_agent, 'Android')) {
        return 'Android Mobile';
      } else if (_.includes(user_agent, 'Konqueror')) {
        return 'Konqueror';
      } else if (_.includes(user_agent, 'Firefox')) {
        return 'Firefox';
      } else if (_.includes(user_agent, 'MSIE') || _.includes(user_agent, 'Trident/')) {
        return 'Internet Explorer';
      } else if (_.includes(user_agent, 'Gecko')) {
        return 'Mozilla';
      } else {
        return '';
      }
    },

    os: function() {
      var a = userAgent;
      if (/Windows/i.test(a)) {
        if (/Phone/.test(a)) {
          return 'Windows Mobile';
        }
        return 'Windows';
      } else if (/(iPhone|iPad|iPod)/.test(a)) {
        return 'iOS';
      } else if (/Android/.test(a)) {
        return 'Android';
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
        return 'BlackBerry';
      } else if (/Mac/i.test(a)) {
        return 'Mac OS X';
      } else if (/Linux/.test(a)) {
        return 'Linux';
      } else {
        return '';
      }
    },

    device: function(user_agent) {
      if (/iPad/.test(user_agent)) {
        return 'iPad';
      } else if (/iPod/i.test(user_agent)) {
        return 'iPod';
      } else if (/iPhone/i.test(user_agent)) {
        return 'iPhone';
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
        return 'BlackBerry';
      } else if (/Windows Phone/i.test(user_agent)) {
        return 'Windows Phone';
      } else if (/Windows/i.test(user_agent)) {
        return 'Windows';
      } else if (/Macintosh/i.test(user_agent)) {
        return 'Macintosh';
      } else if (/Android/i.test(user_agent)) {
        return 'Android';
      } else if (/Linux/i.test(user_agent)) {
        return 'Linux';
      } else {
        return '';
      }
    },

    referringDomain: function(referrer) {
      var split = referrer.split('/');
      if (split.length >= 3) {
        return split[2];
      }
      return '';
    },

    properties: function() {
      return _.extend(_.strip_empty_properties({
        //        $userAgent:navigator.userAgent,
        $os: _.info.os(),
        //        $referrer:document.referrer,
        //        $referring_domain:_.info.referringDomain(document.referrer),
        $model: _.info.device(userAgent)
      }), {
        $screen_height: screen.height,
        $screen_width: screen.width,
        $lib: 'js',
        $lib_version: LIB_VERSION
      });
    }
  };

  var saEvent = {};

  saEvent.checkOption = {
    // event和property里的key要是一个合法的变量名，由大小写字母、数字、下划线和$组成，并且首字符不能是数字。
    regChecks: {
      regName: /^[a-zA-Z_$][a-zA-Z\d_$]*$/
    },
    checkPropertiesKey: function(obj) {
      var me = this, flag = true;
      _.each(obj, function(content, key) {
        if (!me.regChecks.regName.test(key)) {
          flag = false;
        }
      });
      return flag;
    },
    check: function(a, b) {
      if (typeof this[a] === 'string') {
        return this[this[a]](b);
      } else {
        return this[a](b);
      }
    },
    str: function(s) {
      if (!_.isString(s)) {
        logger.info('请检查参数格式,必须是字符串');
        return false;
      } else {
        return true;
      }
    },
    properties: function(p) {
      _.strip_sa_properties(p);
      if (p) {
        if (_.isObject(p)) {
          if (this.checkPropertiesKey(p)) {
            return true;
          } else {
            logger.info('properties里的key必须是由字符串数字_组成');
            return false;
          }
        } else {
          logger.info('properties可以没有，但有的话必须是对象');
          return false;
        }
      } else {
        return true;
      }
    },
    propertiesMust: function(p) {
      _.strip_sa_properties(p);
      if (p === undefined || !_.isObject(p) || _.isEmptyObject(p)) {
        logger.info('properties必须是对象且有值');
        return false;
      } else {
        if (this.checkPropertiesKey(p)) {
          return true;
        } else {
          logger.info('properties里的key必须是由字符串数字_组成');
          return false;
        }
      }
    },
    // event要检查name
    event: function(s) {
      if (!_.isString(s) || !this['regChecks']['regName'].test(s)) {
        logger.info('请检查参数格式,必须是字符串,且eventName必须是字符串数字_');
        return false;
      } else {
        return true;
      }

    },
    test_id: 'str',
    group_id: 'str',
    distinct_id: 'str'
  };

  saEvent.check = function(p) {
    var flag = true;
    for (var i in p) {
      if (!this.checkOption.check(i, p[i])) {
        return false;
      }
    }
    return flag;
  };

  saEvent.send = function(p) {
    var data = {
      distinct_id: store.getDistinctId(),
      properties: {}
    };
    _.extend(data, p);
    if (_.isObject(p.properties) && !_.isEmptyObject(p.properties)) {
      _.extend(data.properties, p.properties);
    }
    // profile时不传公用属性
    if (!p.type || p.type.slice(0, 7) !== 'profile') {
      _.extend(data.properties, _.info.properties());
    }
    data.time = new Date() * 1;
    _.searchObjDate(data);
    logger.info(data);
    this.path(JSON.stringify(data));
  }

  // 发送请求
  saEvent.path = function(data) {
    sd.requestImg = new Image();
    sd.requestImg.onload = function() {
      sd.requestImg.onload = null;
      sd.requestImg = null;
    };
    if(sd._img.indexOf('?') !== -1){
      sd.requestImg.src = sd._img + '&data=' + encodeURIComponent(_.base64Encode(data));
    }else{
      sd.requestImg.src = sd._img + '?data=' + encodeURIComponent(_.base64Encode(data));
    }
  };

  var store = sd.store = {
    getDistinctId: function() {
      return this._state.distinct_id;
    },
    toState: function() {
      var ds = _.cookie.get('sensorsdata2015jssdk');
      var state = null;
      if (ds !== null && (typeof (state = JSON.parse(ds)) === 'object')) {
        this._state = state;
      }
    },
    setOnce: function(a, b) {
      if (!(a in this._state)) {
        this.set(a, b);
      }
    },
    set: function(name, value) {
      this._state[name] = value;
      this.save();
    },
    save: function() {
      _.cookie.set('sensorsdata2015jssdk', JSON.stringify(this._state));
    },
    _state: {},
    init: function() {
      var ds = _.cookie.get('sensorsdata2015jssdk');
      if (ds !== null) {
        this.toState();
      } else {
        this.set('distinct_id', _.UUID());
      }
    }
  };
  /*
   * @param {string} event
   * @param {string} properties
   * */
  sd.track = function(e, p) {
    if (saEvent.check({event: e, properties: p})) {
      saEvent.send({
        type: 'track',
        event: e,
        properties: p
      });
    }
  };

  /*
   * @param {object} properties
   * */
  sd.setProfile = function(p) {
    if (saEvent.check({propertiesMust: p})) {
      saEvent.send({
        type: 'profile_set',
        properties: p
      });
    }
  };
  /*
   * @param {object} properties
   * */
  sd.appendProfile = function(p) {
    if (saEvent.check({propertiesMust: p})) {
      saEvent.send({
        type: 'profile_append',
        properties: p
      });
    }
  };
  /*
   * @param {object} properties
   * */
  sd.incrementProfile = function(p) {
    var str = p;
    if (_.isString(p)) {
      p = {}
      p[str] = 1;
    }
    function isChecked(p) {
      for (var i in p) {
        if (!/-*\d+/.test(String(p[i]))) {
          return false;
        }
      }
      return true;
    }

    if (saEvent.check({propertiesMust: p})) {
      if (isChecked(p)) {
        saEvent.send({
          type: 'profile_increment',
          properties: p
        });
      } else {
        logger.info('profile_increment的值只能是数字');
      }
    }
  };

  sd.deleteProfile = function() {
    saEvent.send({
      type: 'profile_delete'
    });
    store.set('distinct_id', _.UUID());
  };
  /*
   * @param {object} properties
   * */
  sd.unsetProfile = function(p) {
    var str = p;
    var temp = {};
    if (_.isString(p)) {
      p = [];
      p.push(str);
    }
    if (_.isArray(p)) {
      _.each(p, function(v) {
        if (_.isString(v)) {
          temp[v] = 1;
        } else {
          logger.info('profile_unset给的数组里面的值必须时string,已经过滤掉', v);
        }
      });
      saEvent.send({
        type: 'profile_unset',
        properties: temp
      });
    } else {
      logger.info('profile_unset的参数是数组');
    }
  };
  /*
   * @param {string} distinct_id
   * */
  sd.identify = function(id) {
    if (!id) {
      store.set('distinct_id', _.UUID());
    } else if (saEvent.check({distinct_id: id})) {
      store.set('distinct_id', id);
    }
  };
  /*
   * @param {string} distinct_id
   * @param {string} event
   * @param {object} properties
   * */
  sd.trackSignup = function(id, e, p) {
    if (saEvent.check({distinct_id: id, event: e, properties: p})) {
      saEvent.send({
        original_id: store.getDistinctId(),
        distinct_id: id,
        type: 'track_signup',
        event: e,
        properties: p
      });
      store.set('distinct_id', id);
    }
  };
  /*
   * @param {string} testid
   * @param {string} groupid
   * */
  sd.trackAbtest = function(t, g) {
    if (saEvent.check({test_id: t, group_id: g})) {
      saEvent.send({
        type: 'track_abtest',
        properties: {
          test_id: t,
          group_id: g
        }
      });
    }
  };

  sd.init = function() {
    store.init();
    _.each(sd._q, function(content) {
      sd[content[0]].apply(null, content[1]);
    });
  };
  sd.init();

})(window['sensorsDataAnalytic201505']);
