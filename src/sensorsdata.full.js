/**
 * @fileoverview sensors analytic javascript sdk
 * @author shengyonggen@sensorsdata.cn
 */

;(function(root,factory) {

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  }else{
    factory();
  }

})(this,function(){

try{
  var sd = window['sensorsDataAnalytic201505'],has_declare;
  if(sd){
    sd = window[sd];
    has_declare = true;
  }else{
    sd = {};
    has_declare = false;
  }
  // 防止重复引入
  if ((typeof sd !== 'function' && typeof sd !== 'object') || sd.has_load_sdk) {
    return false;
  }
  sd._t = sd._t || 1 * new Date();

  sd.has_load_sdk = true;

// 压缩后的json库
if(typeof JSON!=='object'){JSON={}}(function(){'use strict';var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function f(n){return n<10?'0'+n:n}function this_value(){return this.valueOf()}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value}var gap,indent,meta,rep;function quote(string){rx_escapable.lastIndex=0;return rx_escapable.test(string)?'"'+string.replace(rx_escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify')}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);rx_dangerous.lastIndex=0;if(rx_dangerous.test(text)){text=text.replace(rx_dangerous,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(rx_one.test(text.replace(rx_two,'@').replace(rx_three,']').replace(rx_four,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse')}}}());




  var _ = sd._ = {};



  sd.para_default = {
    name: 'sa',
    // referrer字符串截取
    max_referrer_string_length: 200,
    //通用字符串截取，超过7000的字符串会导致url超长发不出去，所以限制长度
    max_string_length: 500,
    //    send_error_event: true,
    cross_subdomain: true,
    show_log: true,
    debug_mode: false,
    debug_mode_upload: false,

    // todo 前端session时长
    session_time: 0,

    use_client_time: false,
    //来源参数名字
    source_channel: [],

    // 七鱼过滤id
    vtrack_ignore: {},

    auto_init: true,

    is_single_page: false,

    is_trackLink:true,
    // 如果要设置，设置数组
    source_type_config:{
      utm: null,
      search: null,
      social: null
    },

    is_track_device_id: false,

    use_app_track: false

  };

sd.initPara = function(para){
    // 默认配置
  sd.para = para || sd.para || {};

  var i;
  // 合并配置
  for (i in sd.para_default) {
    if (sd.para[i] === void 0) {
      sd.para[i] = sd.para_default[i];
    }
  }
  // 优化配置
  if(typeof sd.para.server_url === 'object' && sd.para.server_url.length){
    for(i = 0; i < sd.para.server_url.length; i++){ 
      if (!/sa\.gif[^\/]*$/.test(sd.para.server_url[i])) {
        sd.para.server_url[i] = sd.para.server_url[i].replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
      }
    }
  }

  if (!/sa\.gif[^\/]*$/.test(sd.para.server_url)) {
    sd.para.server_url = sd.para.server_url.replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
  }
  sd.para.debug_mode_url = sd.para.debug_mode_url || sd.para.server_url.replace('sa.gif', 'debug');

  // 是否需要非cache，等于每次请求文件
  if (sd.para.noCache === true) {
    sd.para.noCache = '?' + (new Date()).getTime();
  } else {
    sd.para.noCache = '';
  }

}

  var ArrayProto = Array.prototype
  , FuncProto = Function.prototype
  , ObjProto = Object.prototype
  , slice = ArrayProto.slice
  , toString = ObjProto.toString
  , hasOwnProperty = ObjProto.hasOwnProperty
  , LIB_VERSION = '1.7.1.3';

sd.lib_version = LIB_VERSION;

// 提供错误日志
var error_msg = [];
var is_first_visitor = false;

var just_test_distinctid = 0;
var just_test_distinctid_2 = 0;
var just_test_distinctid_detail = 0;
var just_test_distinctid_detail2 = 0;


// 标准广告系列来源
var source_channel_standard = 'utm_source utm_medium utm_campaign utm_content utm_term';


var logger = typeof logger === 'object' ? logger : {};
logger.info = function() {
  if (!sd.para.show_log) {
    return false;
  }
  if (typeof console === 'object' && console.log) {
    try {
      return console.log.apply(console, arguments);
    } catch (e) {
      console.log(arguments[0]);
    }
  }
};

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

  _.logger = logger;
  // 普通的extend，不能到二级
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
  // 允许二级的extend
  _.extend2Lev = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0) {
          if (_.isObject(source[prop]) && _.isObject(obj[prop])) {
            _.extend(obj[prop], source[prop]);
          } else {
            obj[prop] = source[prop];
          }
        }
      }
    });
    return obj;
  };
  // 如果已经有的属性不覆盖,如果没有的属性加进来
  _.coverExtend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0 && obj[prop] === void 0) {
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
    if(!f){
      return false;
    }
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

})();

_.inherit = function(subclass, superclass) {
  subclass.prototype = new superclass();
  subclass.prototype.constructor = subclass;
  subclass.superclass = superclass.prototype;
  return subclass;
};

_.trim = function(str){
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};

_.isObject = function(obj) {
  return (toString.call(obj) == '[object Object]') && (obj != null);
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

_.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
};

_.isJSONString = function(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
// gbk等编码decode会异常
_.decodeURIComponent = function(val){
  var result = '';
  try{
    result = decodeURIComponent(val);
  }catch(e){
    result = val;
  };
  return result;
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

_.hashCode = function(str){
  var hash = 0;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash;
  }
  return hash;
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

// 把日期格式全部转化成日期字符串
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
// 把字符串格式数据限制字符串长度
_.formatString = function(str) {
  if (str.length > sd.para.max_string_length) {
    logger.info('字符串长度超过限制，已经做截取--' + str);
    return str.slice(0, sd.para.max_string_length);
  } else {
    return str;
  }
};

// 把字符串格式数据限制字符串长度
_.searchObjString = function(o) {
  if (_.isObject(o)) {
    _.each(o, function(a, b) {
      if (_.isObject(a)) {
        _.searchObjString(o[b]);
      } else {
        if (_.isString(a)) {
          o[b] = _.formatString(a);
        }
      }
    });
  }
};


// 数组去重复
_.unique = function(ar) {
  var temp, n = [], o = {};
  for (var i = 0; i < ar.length; i++) {
    temp = ar[i];
    if (!(temp in o)) {
      o[temp] = true;
      n.push(temp);
    }
  }
  return n;
};


// 只能是sensors满足的数据格式
_.strip_sa_properties = function(p) {
  if (!_.isObject(p)) {
    return p;
  }
  _.each(p, function(v, k) {
    // 如果是数组，把值自动转换成string
    if (_.isArray(v)) {
      var temp = [];
      _.each(v, function(arrv) {
        if (_.isString(arrv)) {
          temp.push(arrv);
        } else {
          logger.info('您的数据-', v, '的数组里的值必须是字符串,已经将其删除');
        }
      });
      if (temp.length !== 0) {
        p[k] = temp;
      } else {
        delete p[k];
        logger.info('已经删除空的数组');
      }
    }
    // 只能是字符串，数字，日期,布尔，数组
    if (!(_.isString(v) || _.isNumber(v) || _.isDate(v) || _.isBoolean(v) || _.isArray(v))) {
      logger.info('您的数据-', v, '-格式不满足要求，我们已经将其删除');
      delete p[k];
    }
  });
  return p;
};

// 去掉undefined和null
_.strip_empty_properties = function(p) {
  var ret = {};
  _.each(p, function(v, k) {
    if (v != null) {
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
    var ua = navigator.userAgent, i, ch, buffer = [], ret = 0;

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
    // 有些浏览器取个屏幕宽度都异常...
    var se = String(screen.height * screen.width);
    if (se && /\d{5,}/.test(se)) {
      se = se.toString(16);
    } else {
      se = String(Math.random() * 31242).replace('.', '').slice(0, 8);
    }
    var val = (T() + '-' + R() + '-' + UA() + '-' + se + '-' + T());
    if(val){
      just_test_distinctid_2 = 1;
      return val; 
    }else{
      just_test_distinctid_2 = 2;
      return (String(Math.random()) + String(Math.random()) + String(Math.random())).slice(2, 15);
    }

  };
})();


_.getQueryParam = function(url, param) {
  param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + param + "=([^&#]*)",
    regex = new RegExp(regexS),
    results = regex.exec(url);
  if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
    return '';
  } else {
    return _.decodeURIComponent(results[1]).replace(/\+/g, ' ');
  }
};

_.urlParse = function(para) {
  var URLParser = function(a) {
    this._fields = {
      Username: 4,
      Password: 5,
      Port: 7,
      Protocol: 2,
      Host: 6,
      Path: 8,
      URL: 0,
      QueryString: 9,
      Fragment: 10
    };
    this._values = {};
    this._regex = null;
    this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

    if (typeof a != 'undefined') {
      this._parse(a)
    }
  };
  URLParser.prototype.setUrl = function(a) {
    this._parse(a)
  };
  URLParser.prototype._initValues = function() {
    for (var a in this._fields) {
      this._values[a] = ''
    }
  };
  URLParser.prototype.getUrl = function() {
    var url = '';
    url += this._values.Origin;
    url += this._values.Port ? ':' + this._values.Port : '';
    url += this._values.Path;
    url += this._values.QueryString ? '?' + this._values.QueryString : '';
    return url;
  };
  URLParser.prototype._parse = function(a) {
    this._initValues();
    var b = this._regex.exec(a);
    if (!b) {
      throw 'DPURLParser::_parse -> Invalid URL'
    }
    for (var c in this._fields) {
      if (typeof b[this._fields[c]] != 'undefined') {
        this._values[c] = b[this._fields[c]]
      }
    }
    this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '');
    this._values['Origin'] = this._values['Protocol'] + '://' + this._values['Hostname'];

  };
  return new URLParser(para);
}

/* ulr预置
_.referringDomain = function(referrer) {
  var split = referrer.split('/');
  if (split.length >= 3) {
    return split[2];
  }
  return '';
};

_.getDomainByHost = function(url) {
  if (typeof url === 'string' && url.split('.').length >= 2) {
    var temp = url.match(/[^\.]+\.[^.]+$/);
    if (temp && temp[0]) {
      return temp[0];
    } else {
      return '';
    }
  } else {
    return '';
  }
}
*/

_.draggable = function(elementToDrag, event) {
  function getScrollOffsets() {
    var w = document;
    if (w.pageXOffset != null) {
      return {
        x: w.pageXOffset,
        y: w.pageYOffset
      };
    } else {
      return {
        x: w.documentElement.scrollLeft,
        y: w.documentElement.scrollTop
      };
    }
  }

  var scroll = getScrollOffsets();
  var startX = event.clientX + scroll.x;
  var startY = event.clientY + scroll.y;
  var origX = elementToDrag.offsetLeft;
  var origY = elementToDrag.offsetTop;
  var deltaX = startX - origX;
  var deltaY = startY - origY;
  if (document.addEventListener) {
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  } else if (document.attachEvent) {
    document.attachEvent("onmousemove", moveHandler);
    document.attachEvent("onmouseup", upHandler);
  }
  if (event.stopPropagation) event.stopPropagation();
  else event.cancelBubble = true; 
  if (event.preventDefault) event.preventDefault(); 
  else event.returnValue = false; 

  elementToDrag.style.bottom = 'auto';

  function moveHandler(e) {
    e = e || window.event; 
    var scroll = getScrollOffsets();
    elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
    elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true; 
  }
  function upHandler(e) {
    if (!e) e = window.event; 
    if (document.removeEventListener) {
      document.removeEventListener("mouseup", upHandler);
      document.removeEventListener("mousemove", moveHandler);
    } else if (document.detachEvent) {
      document.detachEvent("onmouseup", upHandler);
      document.detachEvent("onmousemove", moveHandler);
    }
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true; 
  }
}

// 是否有标准的浏览器环境,如果不是发送$errorEnviroment:{$errorReson:'没有window'}
_.hasStandardBrowserEnviroment = function() {
  if (!window) {
    return 'window';
  }
  if (!document) {
    return 'document';
  }
  if (!navigator) {
    return 'navigator';
  }
  if (!screen) {
    return 'screen';
  }

};

_.bindReady = function(handler) {
  var called = false
  function ready() { 
    if (called) {
      return false;
    }
    called = true;
    handler();
  }
  if ( document.addEventListener ) {
    document.addEventListener( "DOMContentLoaded", ready, false );
  } else if ( document.attachEvent ) {
    try {
      var isFrame = window.frameElement != null
    } catch(e) {}
    if ( document.documentElement.doScroll && !isFrame ) {
      function tryScroll(){
        if (called) return
        try {
          document.documentElement.doScroll("left")
          ready()
        } catch(e) {
          setTimeout(tryScroll, 10)
        }
      }
      tryScroll()
    }
    document.attachEvent("onreadystatechange", function(){
      if ( document.readyState === "complete" ) {
        ready()
      }
    })
  }
  if (window.addEventListener){
    window.addEventListener('load', ready, false)
  } else if (window.attachEvent) {
    window.attachEvent('onload', ready)
  } else {
    var fn = window.onload;
    window.onload = function() {
      fn && fn();
      ready();
    }
  }
};


_.addEvent = function() {
    var register_event = function(element, type, handler) {
        if (element && element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else {
            var ontype = 'on' + type;
            var old_handler = element[ontype];
            element[ontype] = makeHandler(element, handler, old_handler);
        }
    };
    function makeHandler(element, new_handler, old_handlers) {
        var handler = function(event) {
            event = event || fixEvent(window.event);
            if (!event) {
                return undefined;
            }
            event.target = event.srcElement;

            var ret = true;
            var old_result, new_result;
            if (_.isFunction(old_handlers)) {
                old_result = old_handlers(event);
            }
            new_result = new_handler.call(element, event);
            if ((false === old_result) || (false === new_result)) {
                ret = false;
            }
            return ret;
        };
        return handler;
    }

    function fixEvent(event) {
        if (event) {
            event.preventDefault = fixEvent.preventDefault;
            event.stopPropagation = fixEvent.stopPropagation;
        }
        return event;
    }

    fixEvent.preventDefault = function() {
        this.returnValue = false;
    };
    fixEvent.stopPropagation = function() {
        this.cancelBubble = true;
    };
    register_event.apply(null,arguments);
};

_.addHashEvent = function(callback){
  var hashEvent = ('pushState' in window.history ? 'popstate' : 'hashchange');
  _.addEvent(window,hashEvent,callback);
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
        return _.decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  },
  set: function(name, value, days, cross_subdomain, is_secure) {
    cross_subdomain = typeof cross_subdomain === 'undefined' ? sd.para.cross_subdomain : cross_subdomain;
    var cdomain = '', expires = '', secure = '';
    days = days == null ? 73000 : days;

    if (cross_subdomain) {
      var domain = _.url('domain',location.href);

      cdomain = ((domain) ? '; domain=.' + domain : '');
    }

    // 0 session
    // -1 马上过期
    //
    if (days !== 0) {
      var date = new Date();
      // 默认是填，可以是秒
      if (String(days).slice(-1) === 's') {
        date.setTime(date.getTime() + (Number(String(days).slice(0, -1)) * 1000));
      } else {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      }

      expires = '; expires=' + date.toGMTString();
    }

    if (is_secure) {
      secure = '; secure';
    }

    document.cookie = name + '=' + encodeURIComponent(value) + expires
      + '; path=/' + cdomain + secure;
  },

  remove: function(name, cross_subdomain) {
    cross_subdomain = typeof cross_subdomain === 'undefined' ? sd.para.cross_subdomain : cross_subdomain;
    _.cookie.set(name, '', -1, cross_subdomain);

  },

  getCookieName: function(name_prefix){
    var sub = '';
    if(sd.para.cross_subdomain === false){
      sub = _.url('sub',location.href);
      if(typeof sub === 'string' && sub !== ''){
        sub = 'sajssdk_2015_' + name_prefix + '_' + sub;
      }else{
        sub = 'sajssdk_2015_root_' + name_prefix;
      }
    }else{
      sub = 'sajssdk_2015_cross_' + name_prefix;
    } 
    return sub;
  },
// 针对新用户的兼容性判断,兼容子域名
  getNewUser: function(){
    var prefix = 'new_user';
    if(this.get('sensorsdata_is_new_user') !== null || this.get(this.getCookieName(prefix)) !== null){
      return true;
    }else{
      return false;
    }
  }
};

// 获取元素的一些信息
_.getEleInfo = function(obj){
  if(!obj.target){
    return false;
  }

  var target = obj.target;
  var tagName = target.tagName.toLowerCase();


  var props = {};

  props.$element_type = tagName;
  props.$element_name = target.getAttribute('name');
  props.$element_id = target.getAttribute('id');
  props.$element_class_name = typeof target.className === 'string' ? target.className : null;
  props.$element_target_url = target.getAttribute('href');

  // 获取内容
  if (target.textContent) {
    var textContent = _.trim(target.textContent);
    if (textContent) {
      textContent = textContent.replace(/[\r\n]/g, ' ').replace(/[ ]+/g, ' ').substring(0, 255);
    }
    props.$element_content = textContent || '';
  }
  // 针对inut只采集button和submit非名感的词汇
  if(tagName === 'input' && (target.type === 'button' || target.type === 'submit')){
    props.$element_content = target.value || '';
  }


  props = _.strip_empty_properties(props);

  props.$url = location.href;
  props.$url_path = location.pathname;
  props.$title = document.title;

  return props;

};


// _.localStorage
_.localStorage = {
  get: function(name) {
    return window.localStorage.getItem(name);
  },

  parse: function(name) {
    var storedValue;
    try {
      storedValue = JSON.parse(_.localStorage.get(name)) || null;
    } catch (err) {
    }
    return storedValue;
  },

  set: function(name, value) {
    window.localStorage.setItem(name, value);
  },

  remove: function(name) {
    window.localStorage.removeItem(name);
  },

  isSupport: function() {
    var supported = true;
    try {
      var key = '__sensorsdatasupport__',
        val = 'testIsSupportStorage';
      _.localStorage.set(key, val);
      if (_.localStorage.get(key) !== val) {
        supported = false;
      }
      _.localStorage.remove(key);
    } catch (err) {
      supported = false;
    }
    return supported;
  }

};

_.xhr = function(cors) {
  if (cors) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      return xhr;
    } else if (typeof XDomainRequest != "undefined") {
      return new XDomainRequest();
    } else {
      return xhr;
    }
  } else {
    if (XMLHttpRequest) {
      return new XMLHttpRequest();
    }
    if (window.ActiveXObject) {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP')
      } catch (d) {
        try {
          return new ActiveXObject('Microsoft.XMLHTTP')
        } catch (d) {
        }
      }
    }
  }
};

_.ajax = function(para) {
  function getJSON(data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  }

  var g = _.xhr(para.cors);
  if (!para.type) {
    para.type = para.data ? 'POST' : 'GET';
  }
  para = _.extend({
    success: function() {},
    error: function() {}
  }, para);


  g.onreadystatechange = function() {
    if (g.readyState == 4) {
      if ((g.status >= 200 && g.status < 300) || g.status == 304) {
        para.success(getJSON(g.responseText));
      } else {
        para.error(getJSON(g.responseText), g.status);
      }
      g.onreadystatechange = null;
      g.onload = null;
    }
  };


  g.open(para.type, para.url, true);

  try {
    g.withCredentials = true;

    if (_.isObject(para.header)) {
      for (var i in para.header) {
        g.setRequestHeader(i, para.header[i]);
      }
    }

    if (para.data) {
      g.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      if (para.contentType === 'application/json') {
        g.setRequestHeader("Content-type", "application/json; charset=UTF-8");
      } else {
        g.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }

    }
  } catch (e) {
  }

  g.send(para.data || null);


};


//https://github.com/websanova/js-url

_.url = (function() {

    function _t() {
        return new RegExp(/(.*?)\.?([^\.]*?)\.?(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/);
    }

    function _d(s) {
      return _.decodeURIComponent(s.replace(/\+/g, ' '));
    }

    function _i(arg, str) {
        var sptr = arg.charAt(0),
            split = str.split(sptr);

        if (sptr === arg) { return split; }

        arg = parseInt(arg.substring(1), 10);

        return split[arg < 0 ? split.length + arg : arg - 1];
    }

    function _f(arg, str) {
        var sptr = arg.charAt(0),
            split = str.split('&'),
            field = [],
            params = {},
            tmp = [],
            arg2 = arg.substring(1);

        for (var i = 0, ii = split.length; i < ii; i++) {
            field = split[i].match(/(.*?)=(.*)/);

            // TODO: regex should be able to handle this.
            if ( ! field) {
                field = [split[i], split[i], ''];
            }

            if (field[1].replace(/\s/g, '') !== '') {
                field[2] = _d(field[2] || '');

                // If we have a match just return it right away.
                if (arg2 === field[1]) { return field[2]; }

                // Check for array pattern.
                tmp = field[1].match(/(.*)\[([0-9]+)\]/);

                if (tmp) {
                    params[tmp[1]] = params[tmp[1]] || [];
                
                    params[tmp[1]][tmp[2]] = field[2];
                }
                else {
                    params[field[1]] = field[2];
                }
            }
        }

        if (sptr === arg) { return params; }

        return params[arg2];
    }

    return function(arg, url) {
        var _l = {}, tmp, tmp2;

        if (arg === 'tld?') { return _t(); }

        url = url || window.location.toString();

        if ( ! arg) { return url; }

        arg = arg.toString();

        if (tmp = url.match(/^mailto:([^\/].+)/)) {
            _l.protocol = 'mailto';
            _l.email = tmp[1];
        }
        else {

            // Ignore Hashbangs.
            if (tmp = url.match(/(.*?)\/#\!(.*)/)) {
                url = tmp[1] + tmp[2];
            }

            // Hash.
            if (tmp = url.match(/(.*?)#(.*)/)) {
                _l.hash = tmp[2];
                url = tmp[1];
            }

            // Return hash parts.
            if (_l.hash && arg.match(/^#/)) { return _f(arg, _l.hash); }

            // Query
            if (tmp = url.match(/(.*?)\?(.*)/)) {
                _l.query = tmp[2];
                url = tmp[1];
            }

            // Return query parts.
            if (_l.query && arg.match(/^\?/)) { return _f(arg, _l.query); }

            // Protocol.
            if (tmp = url.match(/(.*?)\:?\/\/(.*)/)) {
                _l.protocol = tmp[1].toLowerCase();
                url = tmp[2];
            }

            // Path.
            if (tmp = url.match(/(.*?)(\/.*)/)) {
                _l.path = tmp[2];
                url = tmp[1];
            }

            // Clean up path.
            _l.path = (_l.path || '').replace(/^([^\/])/, '/$1').replace(/\/$/, '');

            // Return path parts.
            if (arg.match(/^[\-0-9]+$/)) { arg = arg.replace(/^([^\/])/, '/$1'); }
            if (arg.match(/^\//)) { return _i(arg, _l.path.substring(1)); }

            // File.
            tmp = _i('/-1', _l.path.substring(1));
            
            if (tmp && (tmp = tmp.match(/(.*?)\.(.*)/))) {
                _l.file = tmp[0];
                _l.filename = tmp[1];
                _l.fileext = tmp[2];
            }

            // Port.
            if (tmp = url.match(/(.*)\:([0-9]+)$/)) {
                _l.port = tmp[2];
                url = tmp[1];
            }

            // Auth.
            if (tmp = url.match(/(.*?)@(.*)/)) {
                _l.auth = tmp[1];
                url = tmp[2];
            }

            // User and pass.
            if (_l.auth) {
                tmp = _l.auth.match(/(.*)\:(.*)/);

                _l.user = tmp ? tmp[1] : _l.auth;
                _l.pass = tmp ? tmp[2] : undefined;
            }

            // Hostname.
            _l.hostname = url.toLowerCase();

            // Return hostname parts.
            if (arg.charAt(0) === '.') { return _i(arg, _l.hostname); }

            // Domain, tld and sub domain.
            if (_t()) {
                tmp = _l.hostname.match(_t());

                if (tmp) {
                    _l.tld = tmp[3];
                    _l.domain = tmp[2] ? tmp[2] + '.' + tmp[3] : undefined;
                    _l.sub = tmp[1] || undefined;
                }
            }

            // Set port and protocol defaults if not set.
            _l.port = _l.port || (_l.protocol === 'https' ? '443' : '80');
            _l.protocol = _l.protocol || (_l.port === '443' ? 'https' : 'http');
        }

        // Return arg.
        if (arg in _l) { return _l[arg]; }

        // Return everything.
        if (arg === '{}') { return _l; }

        // Default to undefined for no match.
        return '';
    };
})();

_.ry = function(dom){  
  return new _.ry.init(dom);
};
_.ry.init = function(dom){
  this.ele = dom;
};
_.ry.init.prototype = {
  addClass: function(para){
    var classes = ' ' + this.ele.className + ' ';
    if(classes.indexOf(' ' + para + ' ') === -1){
      this.ele.className = this.ele.className + (this.ele.className === '' ? '' : ' ') + para;
    }
    return this;
  },
  removeClass: function(para){
    var classes = ' ' + this.ele.className + ' ';
    if(classes.indexOf(' ' + para + ' ') !== -1){
      this.ele.className = classes.replace(' ' + para + ' ', ' ').slice(1,-1);
    }
    return this;
  },
  hasClass: function(para){
    var classes = ' ' + this.ele.className + ' ';    
    if(classes.indexOf(' ' + para + ' ') !== -1){
      return true;
    }else{
      return false;
    }
  },
  attr: function(key,value){
    if(typeof key === 'string' && _.isUndefined(value)){
      return this.ele.getAttribute(key);
    }
    if(typeof key === 'string'){
      value = String(value);
      this.ele.setAttribute(key,value);
    }
    return this;
  },
  offset: function(){
      var rect = this.ele.getBoundingClientRect();
      if ( rect.width || rect.height ) {
        var doc = this.ele.ownerDocument;
        var docElem = doc.documentElement;

        return {
          top: rect.top + window.pageYOffset - docElem.clientTop,
          left: rect.left + window.pageXOffset - docElem.clientLeft
        };
      }else{
        return {
          top: 0,
          left: 0
        }
      }

  },
  getSize: function(){
    if (!window.getComputedStyle) {
      return {width: this.ele.offsetWidth, height: this.ele.offsetHeight};
    }
    try {
      var bounds = this.ele.getBoundingClientRect();
      return {width: bounds.width, height: bounds.height};
    } catch (e){
      return {width: 0, height: 0};
    }
  },
  getStyle: function(value){
    if(this.ele.currentStyle){
      return this.ele.currentStyle[value];
    }else{
      return this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(value);
    }
  },
  wrap: function(elementTagName){
    var ele = document.createElement(elementTagName);
    this.ele.parentNode.insertBefore(ele, this.ele);
    ele.appendChild(this.ele);
    return _.ry(ele);
  },
  getCssStyle: function(prop){
    var result = this.ele.style.getPropertyValue(prop);
    if (result) {
        return result;
    }
    var rules = getMatchedCSSRules(this.ele);
    if(!rules || !_.isArray(rules)){
      return null;
    }
    for (var i = rules.length - 1; i >= 0; i--) {
        var r = rules[i];
        result = r.style.getPropertyValue(prop);
        if (result) {
            return result;
        }
    }
  }
};

_.querySelectorAll = function(val){
  if(typeof val !== 'string'){
    logger.info('错误',val);
    return [];    
  }
  try{
     return document.querySelectorAll(val);
  }catch(e){
    logger.info('错误',val);
    return [];
  }
};

_.getReferrer = function(referrer){
  var referrer = referrer || document.referrer;
  if(typeof referrer !== 'string'){
    return '取值异常';
  }
  if (referrer.indexOf("https://www.baidu.com/") === 0) {
    referrer =  referrer.split('?')[0];
  }
  referrer = referrer.slice(0, sd.para.max_referrer_string_length);
  return (typeof referrer === 'string' ? referrer : '' );
};

_.getKeywordFromReferrer = function(){
  var search_keyword = {baidu:'wd',google:'q',bing:'q',yahoo:'p',sogou:'query',so:'q'}
  if(document && typeof document.referrer === 'string'){
    if(document.referrer.indexOf('http') === 0) {
      var domain = _.url('domain',document.referrer);
      var query = _.url('?',document.referrer);
      for(var i in search_keyword){
        if(domain.indexOf(i) === 0){
          if(typeof query === 'object' && query[search_keyword[i]]){
            return query[search_keyword[i]];
          }
        }
      }
    }else{
      return '未取到值';
    }
  }else{
    return '取值异常';
  }
};

_.getSourceFromReferrer = function(){
  function getMatchStrFromArr(arr,str){
    for(var i = 0; i<arr.length; i++){
      if(str.split('?')[0].indexOf(arr[i]) !== -1){
        return true;
      }
    }
  }

  var search_engine = ['www.baidu.','so.com','sogou.com','youdao.com','google.','yahoo.com/','bing.com/','ask.com/'];
  var social_engine = ['weibo.com','renren.com','kaixin001.com','douban.com','qzone.qq.com','zhihu.com','tieba.baidu.com','weixin.qq.com'];

  var referrer = document.referrer || '';
  var url = _.info.pageProp.url;
  if(url){
    var utm_match = url.match(/(utm_source|utm_medium|utm_campaign|utm_content|utm_term)\=[^&]+/);    
    if(utm_match && utm_match[0]){
      return '付费广告流量';
    }else if(getMatchStrFromArr(search_engine,referrer)){
      return '自然搜索流量';
    }else if(getMatchStrFromArr(social_engine,referrer)){
      return '社交网站流量';
    }else if(referrer === ''){
      return '直接流量';
    }else{
      return '引荐流量';
    }
  }else{
    return '获取url异常';
  }
};

_.info = {
  initPage: function() {
    var referrer = _.getReferrer();
    var referrer_host = referrer ? _.url('hostname',referrer) : referrer;
    var referrer_domain = referrer ? _.url('domain',referrer) : referrer;
    var url = location.href;
    var url_host = url ? _.url('hostname',url) : url;
    var url_domain = url ? _.url('domain',url) : url;
    this.pageProp = {
      referrer: referrer,
      referrer_host: referrer_host,
      referrer_domain: referrer_domain,
      url: url,
      url_host: url_host,
      url_domain: url_domain
    };
  },
  //当前页面的一些属性，在store初始化是生成
  pageProp: {}, 

  campaignParams: function() {
    var campaign_keywords = source_channel_standard.split(' ')
      , kw = ''
      , params = {};
    if (_.isArray(sd.para.source_channel) && sd.para.source_channel.length > 0) {
      campaign_keywords = campaign_keywords.concat(sd.para.source_channel);
      campaign_keywords = _.unique(campaign_keywords);
    }
    _.each(campaign_keywords, function(kwkey) {
      kw = _.getQueryParam(location.href, kwkey);
      if (kw.length) {
        params[kwkey] = kw;
      }
    });

    return params;
  },
  campaignParamsStandard: function(prefix,prefix_add) {
    prefix = prefix || '';
    prefix_add = prefix_add || '';
    var utms = _.info.campaignParams();
    var $utms = {}, otherUtms = {};
    for (var i in utms) {
      if ((' ' + source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
        $utms[prefix + i] = utms[i];
      } else {
        otherUtms[prefix_add + i] = utms[i];
      }
    }
    return {
      $utms: $utms,
      otherUtms: otherUtms
    };
  },
  // 预置属性
  properties: function() {
    return {
      $screen_height: Number(screen.height) || 0,
      $screen_width: Number(screen.width) || 0,
      // 我说两遍写的重复，佳捷说就写两遍
      $lib: 'js',
      $lib_version: String(LIB_VERSION)
    };
  },
  // 保存临时的一些变量，只针对当前页面有效
  currentProps: {},
  register: function(obj) {
    _.extend(_.info.currentProps, obj);
  }
};

// 数据发送状态
sd.sendState = {}
//成功发送数
sd.sendState._complete = 0;
//接受发送数
sd.sendState._receive = 0;

sd.sendState.getSendCall = function(data, callback) {
  // 点击图渲染模式不发数据
  if(sd.is_heatmap_render_mode){
    return false;
  }

  // 加cache防止缓存
  data._nocache = (String(Math.random()) + String(Math.random()) + String(Math.random())).replace(/\./g,'').slice(0,15);
  data = JSON.stringify(data);
  logger.info(data);
  // 打通app传数据给app
  if(sd.para.use_app_track){
    if((typeof SensorsData_APP_JS_Bridge === 'object') && SensorsData_APP_JS_Bridge.sensorsdata_track){
      SensorsData_APP_JS_Bridge.sensorsdata_track(data);
      (typeof callback === 'function') && callback();      
    }else if(/sa-sdk-ios/.test(navigator.userAgent) && !window.MSStream){
      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'sensorsanalytics://trackEvent?event=' + encodeURIComponent(data));
      document.documentElement.appendChild(iframe);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
      (typeof callback === 'function') && callback();      
    }else{
      this.prepareServerUrl(data,callback);      
    }
  }else{
    this.prepareServerUrl(data,callback);
  }
};

sd.sendState.getUrlPara = function(url,data){
  var base64Data = _.base64Encode(data);
  var crc = 'crc=' + _.hashCode(base64Data);
  if (url.indexOf('?') !== -1) {
    return url + '&data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc);
  }else{
    return url + '?data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc);
  }

};

sd.sendState.prepareServerUrl = function(data,callback){
  if(_.isArray(sd.para.server_url)){
    for(var i =0; i<sd.para.server_url.length;i++){
      this.sendCall(this.getUrlPara(sd.para.server_url[i],data),callback);
    }
  }else{
    this.sendCall(this.getUrlPara(sd.para.server_url,data),callback);
  }
};

sd.sendState.callBack = function(callback){

  (typeof callback === 'function') && callback();

};

sd.sendState.sendCall = function(server_url,callback){


  ++this._receive;
  var state = '_state' + this._receive;
  var me = this;
  this[state] = document.createElement('img');
  
  this[state].onload = function(e) {
    me[state].onload = null;
    delete me[state];
    ++me._complete;
    me.callBack(callback);
  };
  this[state].onerror = function(e) {
    me[state].onerror = null;
    delete me[state];
    me.callBack(callback);
  };
  this[state].onabort = function(e) {
    delete me[state];
    me.callBack(callback);
  };

  this[state].src = server_url;

};

// 检查是否是新用户（第一次种cookie，且在8个小时内的）
var saNewUser = {
  checkIsAddSign: function(data) {
    if (data.type === 'track') {
      if (_.cookie.getNewUser()) {
        data.properties.$is_first_day = true;
      } else {
        data.properties.$is_first_day = false;
      }
    }
  },
  is_first_visit_time: false,
  checkIsFirstTime: function(data) {
    if (data.type === 'track' && data.event === '$pageview') {
      if (this.is_first_visit_time) {
        data.properties.$is_first_time = true;
        this.is_first_visit_time = false;
      } else {
        data.properties.$is_first_time = false;
      }
    }
  },
  setDeviceId: function(uuid){
    // deviceid必须跨子域
    var device_id = null;
    var ds = _.cookie.get('sensorsdata2015jssdkcross');
    var state = {};
    if (ds != null && _.isJSONString(ds)) {
      state = JSON.parse(ds);
      if(state.$device_id) {
        device_id = state.$device_id;
      }
    }

    device_id = device_id || uuid;

    if(sd.para.cross_subdomain === true){
      store.set('$device_id',device_id);
    }else{
      state.$device_id = device_id;
      _.cookie.set('sensorsdata2015jssdkcross',JSON.stringify(state),null,true);
    }

    if(sd.para.is_track_device_id){
      _.info.currentProps.$device_id = device_id;
    }

  },
  storeInitCheck: function() {
    // 如果是新用户，种cookie
    if (is_first_visitor) {

      var date = new Date();
      var obj = {
        h: 23 - date.getHours(),
        m: 59 - date.getMinutes(),
        s: 59 - date.getSeconds()
      };
      _.cookie.set(_.cookie.getCookieName('new_user'), '1', obj.h * 3600 + obj.m * 60 + obj.s + 's');
      // 如果是is_first_visit_time，且第一次，那就发数据
      this.is_first_visit_time = true;
    } else {
      // 如果没有这个cookie，肯定不是首日
      if (!_.cookie.getNewUser()) {
        this.checkIsAddSign = function(data) {
          if (data.type === 'track') {
            data.properties.$is_first_day = false;
          }
        };
      }
      // 如果不是第一次打开的用户，肯定不是首次访问
      this.checkIsFirstTime = function(data) {
        if (data.type === 'track' && data.event === '$pageview') {
          data.properties.$is_first_time = false;
        }
      }
    }
  },
  //检查是否是latest
  checkIsFirstLatest: function() {
    var url_domain = _.info.pageProp.url_domain;
    var referrer_domain = _.info.pageProp.referrer_domain;
    // 判断最近一次，如果前向地址跟自己域名一致，且cookie中取不到值，认为有异常
    // 最近一次站外前向地址，如果域名不一致，就register为latest
    if(url_domain === referrer_domain){
      if(!store.getProps() || !store.getProps().$latest_referrer){
        sd.register({
          $latest_referrer: '取值异常',
          $latest_referrer_host: '取值异常'
          //$latest_traffic_source_type: '取值异常',
          //$latest_search_keyword: '取值异常'
        });
      }
    } else {
      sd.register({
        //$latest_traffic_source_type:_.getSourceFromReferrer(),
        $latest_referrer: _.info.pageProp.referrer,
        $latest_referrer_host: _.info.pageProp.referrer_host
        //$latest_search_keyword: _.getKeywordFromReferrer()        
      });
    }
    // utm
    var allUtms = _.info.campaignParamsStandard('$latest_','_latest_');
    var $utms = allUtms.$utms;
    var otherUtms = allUtms.otherUtms;
    if (!_.isEmptyObject($utms)) {
      sd.register($utms);
    }
    if (!_.isEmptyObject(otherUtms)) {
      sd.register(otherUtms);
    }
  }

};

var saEvent = {};

saEvent.checkOption = {
  // event和property里的key要是一个合法的变量名，由大小写字母、数字、下划线和$组成，并且首字符不能是数字。
  regChecks: {
    regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i
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
      //return false;
      return true;
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
          logger.info('properties里的key必须是由字符串数字_组成，且不能是系统保留字');
          //return false;
          return true;
        }
      } else {
        logger.info('properties可以没有，但有的话必须是对象');
        return true;
        //return false;
      }
    } else {
      return true;
    }
  },
  propertiesMust: function(p) {
    _.strip_sa_properties(p);
    if (p === undefined || !_.isObject(p) || _.isEmptyObject(p)) {
      logger.info('properties必须是对象且有值');
      return true;
      //return false;
    } else {
      if (this.checkPropertiesKey(p)) {
        return true;
      } else {
        logger.info('properties里的key必须是由字符串数字_组成，且不能是系统保留字');
        return true;
        //return false;
      }
    }
  },
  // event要检查name
  event: function(s) {
    if (!_.isString(s) || !this['regChecks']['regName'].test(s)) {
      logger.info('请检查参数格式,必须是字符串,且eventName必须是字符串_开头,且不能是系统保留字');
      //return false;
      return true;
    } else {
      return true;
    }

  },
  test_id: 'str',
  group_id: 'str',
  distinct_id: function(id) {
    if (_.isString(id) && /^.{1,255}$/.test(id)) {
      return true;
    } else {
      logger.info('distinct_id必须是不能为空，且小于255位的字符串');
      return false;
    }
  }
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

saEvent.send = function(p, callback) {
  var data = {
    distinct_id: store.getDistinctId(),
    lib: {
      $lib: 'js',
      $lib_method: 'code',
      $lib_version: String(LIB_VERSION)
    },
    properties: {}
  };

  if (_.isObject(p) && _.isObject(p.properties) && !_.isEmptyObject(p.properties) && p.properties.$lib_detail) {
    data.lib.$lib_detail = p.properties.$lib_detail;
    delete p.properties.$lib_detail;
  }

  // 测试部分数据没有distinct_id的问题
  if (typeof store.getDistinctId() !== 'string' || typeof store.getDistinctId() === '') {
    var wrong_case = '';
    switch (store.getDistinctId()) {
      case null :
        wrong_case = 'null';
        break;
      case (void 0) :
        wrong_case = 'undefined';
        break;
      case '':
        wrong_case = '空';
        break;
      default:
        wrong_case = String(store.getDistinctId());
    }
    error_msg.push('distinct_id-' + just_test_distinctid + '-' + just_test_distinctid_2 + '-' + wrong_case + '-' + just_test_distinctid_detail + '-' + just_test_distinctid_detail2);
  }

  _.extend(data, p);

  if (error_msg.length > 0) {
    data.jssdk_error = error_msg.join('--');
  }

  // 合并properties里的属性
  if (_.isObject(p.properties) && !_.isEmptyObject(p.properties)) {
    _.extend(data.properties, p.properties);
  }
  // 合并lib里的属性
  if (_.isObject(callback)) {
    _.extend(data.lib, callback);
  }

  // profile时不传公用属性
  if (!p.type || p.type.slice(0, 7) !== 'profile') {
    // 传入的属性 > 当前页面的属性 > session的属性 > cookie的属性 > 预定义属性
    data.properties = _.extend({}, _.info.properties(), store.getProps(), store.getSessionProps(), _.info.currentProps, data.properties);
  }
  // 如果$time是传入的就用，否则使用服务端时间
  if (data.properties.$time && _.isDate(data.properties.$time)) {
    data.time = data.properties.$time * 1;
    delete data.properties.$time;
  } else {
    if (sd.para.use_client_time) {
      data.time = (new Date()) * 1;
    }
  }
  _.searchObjDate(data);
  _.searchObjString(data);
  //判断是否要给数据增加新用户属性
  saNewUser.checkIsAddSign(data);
  saNewUser.checkIsFirstTime(data);
    
  
    if (sd.para.debug_mode === true) {
      logger.info(data);
      this.debugPath(JSON.stringify(data), callback);
    } else {
      sd.sendState.getSendCall(data, callback);
    }

  };

  // 发送debug数据请求
  saEvent.debugPath = function(data, callback) {
    var _data = data; //存数据
    var url = '';
    if (sd.para.debug_mode_url.indexOf('?') !== -1) {
      url = sd.para.debug_mode_url + '&data=' + encodeURIComponent(_.base64Encode(data));
    } else {
      url = sd.para.debug_mode_url + '?data=' + encodeURIComponent(_.base64Encode(data));
    }

    _.ajax({
         url: url,
         type: 'GET',
         cors: true,
         header: {'Dry-Run': String(sd.para.debug_mode_upload)},
         success:function(data){
         // debug 模式下 提示框 
          _.isEmptyObject(data) === true ? alert('debug数据发送成功' + _data) : alert('debug失败 错误原因' + JSON.stringify(data));
         }
       });

  };
  
  var store = sd.store = {
      _sessionState: {},
      _state: {},
      getProps: function() {
        return this._state.props;
      },
      getSessionProps: function() {
        return this._sessionState;
      },
      getDistinctId: function() {
        return this._state.distinct_id;
      },
      getFirstId: function(){
        return this._state.first_id;
      },
      toState: function(ds) {
        var state = null;
        if (ds != null && _.isJSONString(ds)) {
          state = JSON.parse(ds);
          this._state = _.extend(state);
          if (state.distinct_id) {
            if(typeof(state.props) === 'object'){
              for(var key in state.props){
                if(typeof state.props[key] === 'string'){
                  state.props[key] = state.props[key].slice(0, sd.para.max_referrer_string_length);
                }
              }
              this.save();
            }

          } else {
            this.set('distinct_id', _.UUID());
            error_msg.push('toStateParseDistinctError');
          }
        } else {
          this.set('distinct_id', _.UUID());
          error_msg.push('toStateParseError');
        }
      },
      initSessionState: function() {
        var ds = _.cookie.get('sensorsdata2015session');
        var state = null;
        if (ds !== null && (typeof (state = JSON.parse(ds)) === 'object')) {
          this._sessionState = state || {};
        }
      },

      setOnce: function(a, b) {
        if (!(a in this._state)) {
          this.set(a, b);
        }
      },
      set: function(name, value) {
        this._state = this._state || {};
        this._state[name] = value;
        this.save();
      },
      // 针对当前页面修改
      change: function(name, value) {
        this._state[name] = value;
      },
      setSessionProps: function(newp) {
        var props = this._sessionState;
        _.extend(props, newp);
        this.sessionSave(props);
      },
      setSessionPropsOnce: function(newp) {
        var props = this._sessionState;
        _.coverExtend(props, newp);
        this.sessionSave(props);
      },
      setProps: function(newp) {
        var props = this._state.props || {};
        _.extend(props, newp);
        this.set('props', props);
      },
      setPropsOnce: function(newp) {
        var props = this._state.props || {};
        _.coverExtend(props, newp);
        this.set('props', props);
      },
      clearAllProps: function() {
        this._sessionState = {};      
        for(var i in this._state.props){
          if(i.indexOf('latest_') !== 1){
            delete this._state.props[i];
          }
        }
        this.sessionSave({});
        this.save();
      },
    sessionSave: function(props) {
      this._sessionState = props;
      _.cookie.set('sensorsdata2015session', JSON.stringify(this._sessionState), 0);
    },
    save: function() {
      _.cookie.set(this.getCookieName(), JSON.stringify(this._state), 73000, sd.para.cross_subdomain);
    },
    getCookieName: function(){
      var sub = '';
      if(sd.para.cross_subdomain === false){
        sub = _.url('sub',location.href);
        if(typeof sub === 'string' && sub !== ''){
          sub = 'sa_jssdk_2015_' + sub;
        }else{
          sub = 'sa_jssdk_2015_root';
        }
      }else{
        sub = 'sensorsdata2015jssdkcross';
      } 
      return sub;
    },
    init: function() {
      // 如果不支持cookie，设置新的id，并且带有error_msg
      if (!navigator.cookieEnabled) {
        error_msg.push('cookieNotEnable');
        if (!_.localStorage.isSupport) {
          error_msg.push('localStorageNotEnable');
        }
      }

      this.initSessionState();
      var uuid = _.UUID();
      var cross = _.cookie.get(this.getCookieName());
      if (cross === null) {
        // null肯定是首次，非null，看是否有distinct_id
        is_first_visitor = true;
        
        just_test_distinctid = 1;
        
        this.set('distinct_id', uuid);
      } else {
        
        just_test_distinctid = 2;
        just_test_distinctid_detail = JSON.stringify(cross);
        just_test_distinctid_detail2 = navigator.userAgent+'^_^'+document.cookie;                                           

        if (!_.isJSONString(cross) || !(JSON.parse(cross)).distinct_id){
          is_first_visitor = true;
        }

        this.toState(cross);
      }


      // 如果没有跨域的cookie，且没有当前域cookie，那当前域的cookie和跨域cookie一致
        saNewUser.setDeviceId(uuid);

        //判断新用户
        saNewUser.storeInitCheck();
        saNewUser.checkIsFirstLatest();
        // 如果初始化cookie失败，发送错误事件
        /*
         if(error_msg.length > 0 && sd.para.send_error_event){
         sd.track('jssdk_error_msg');
         }*/

      }
    };


  var commonWays = {
    // 获取谷歌标准参数
    getUtm: function() {
      return _.info.campaignParams();
    },
    // 获取当前页面停留时间
    getStayTime: function() {
      return ((new Date()) - sd._t) / 1000;
    },
    //set init referrer
    setInitReferrer: function() {
      var _referrer = _.getReferrer();
      sd.setOnceProfile({
        _init_referrer: _referrer,
        _init_referrer_host: _.info.pageProp.referrer_host
      });
    },
    // set init sessionRegister cookie
    setSessionReferrer: function() {
      var _referrer = _.getReferrer();
      store.setSessionPropsOnce({
        _session_referrer: _referrer,
        _session_referrer_host: _.info.pageProp.referrer_host
      });
    },
    // set default referrr and pageurl
    setDefaultAttr: function() {
      _.info.register({
        _current_url: location.href,
        _referrer: _.getReferrer(),
        _referring_host: _.info.pageProp.referrer_host
      });
    },
    allTrack: function(){
 // 避免没有ready
      if(!document || !document.body){
        setTimeout(this.allTrack,1000);
        return false;
      }

      if(sd.para.heatmap){
        return false;
      }

      sd.para.heatmap = {};
      heatmap.init();
      return false;


      if(sd.allTrack === 'has_init'){
        return false;
      }
      sd.allTrack = 'has_init';

      var trackAll = {

        clickEvents: function(e){
          var props = {};
          var target = e.target;
          var tagName = target.tagName.toLowerCase();         

          if(' button a input '.indexOf(' '+ tagName + ' ') !== -1 ){

            if(tagName === 'input'){
              if(target.getAttribute('type') === 'button' || target.getAttribute('type') === 'submit'){
                props.$element_content = target.value;                
              }else{
                return false;
              }
            }
            
            _.extend(props, _.getEleInfo({target:target}));

            if(tagName === 'a' && sd.para.is_trackLink === true){
              _.trackLink({event:e},'$WebClick',props);
            }else{
              sd.track('$WebClick',props);     
            }
          }

        }
      };


      _.addEvent(document,'click',function(e){trackAll.clickEvents(e);});

    },
    trackHeatMap: function(target){
      if((typeof target === 'object') && target.tagName){
        var tagName = target.tagName.toLowerCase();
        var parent_ele = target.parentNode.tagName.toLowerCase();     
        if (tagName !== 'button' && tagName !== 'a' && parent_ele !== 'a' && parent_ele !== 'button' && tagName !== 'input' && tagName !== 'textarea') {
          heatmap.start(null,target,tagName);
        }
      }
    },
    autoTrackWithoutProfile:function(para){
      this.autoTrack(_.extend(para,{not_set_profile:true}));
    },
    autoTrack: function(para, callback) {
      para = _.isObject(para) ? para : {};

      var utms = _.info.campaignParams();
      var $utms = {};
      for (var i in utms) {
        if ((' ' + source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms['$' + i] = utms[i];
        } else {
          $utms[i] = utms[i];
        }
      }
      // setOnceProfile 如果是新用户，且允许设置profile
      if (is_first_visitor && !para.not_set_profile) {
        sd.setOnceProfile(_.extend({
            // 暂时隐藏，等extractor都部署上去 $first_landing_page: _.info.pageProp.url.slice(0, sd.para.max_referrer_string_length),
            $first_visit_time: new Date(),
            $first_referrer: _.getReferrer(),
            $first_browser_language: navigator.language || '取值异常',
            //$first_browser_charset: document.charset || '取值异常',
            $first_referrer_host: _.info.pageProp.referrer_host
            //$first_traffic_source_type: _.getSourceFromReferrer(),
            //$first_search_keyword: _.getKeywordFromReferrer()
          }, $utms)
        );
      }
      if(para.not_set_profile){
        delete para.not_set_profile;
      }

      // 解决单页面的referrer问题
      var current_page_url = location.href;

      if(sd.para.is_single_page){
        _.addHashEvent(function(){
          var referrer = _.getReferrer(current_page_url);
          sd.track('$pageview', _.extend({
              $referrer: referrer,
              $referrer_host: _.url('hostname',referrer) || '',
              $url: location.href,
              $url_path: location.pathname,
              $title: document.title
            }, $utms,para),callback
          );        
          current_page_url = location.href;
        });
      }
      
      sd.track('$pageview', _.extend({
          $referrer: _.getReferrer(),
          $referrer_host: _.info.pageProp.referrer_host,
          $url: location.href,
          $url_path: location.pathname,
          $title: document.title
        }, $utms,para),callback
      );

    }


  };

  // 一些常见的方法
  sd.quick = function() {
    var arg = slice.call(arguments);
    var arg0 = arg[0];
    var arg1 = arg.slice(1);
    if (typeof arg0 === 'string' && commonWays[arg0]) {
      return commonWays[arg0].apply(commonWays, arg1);
    } else if (typeof arg0 === 'function') {
      arg0.apply(sd, arg1);
    } else {
      logger.info('quick方法中没有这个功能' + arg[0]);
    }
  };


  /*
   * @param {string} event
   * @param {string} properties
   * */
  sd.track = function(e, p, c) {
    if (saEvent.check({event: e, properties: p})) {
      saEvent.send({
        type: 'track',
        event: e,
        properties: p
      }, c);
    }
  };

  _.trackLink = function(obj,event_name,event_prop){
    obj = obj || {};
    var link = null;
    if(obj.ele){
      link = obj.ele;
    }
    if(obj.event){
      if(obj.target){
         link = obj.target;
       }else{
         link = obj.event.target;
       }
    }

    event_prop = event_prop || {};
    if(!link || (typeof link !== 'object')){
      return false;
    }
    // 如果是非当前页面会跳转的链接，直接track
    if (!link.href || /^javascript/.test(link.href) || link.target || link.download || link.onclick) {
      sd.track(event_name, event_prop);
      return false;
    }
    function linkFunc(e){
      e.preventDefault();   // 阻止默认跳转
      var hasCalled = false;
      function track_a_click(){
        if (!hasCalled) {
          hasCalled = true;
          location.href = link.href;  //把 A 链接的点击跳转,改成 location 的方式跳转
        }
      }
      setTimeout(track_a_click, 1000);  //如果没有回调成功，设置超时回调      
      sd.track(event_name, event_prop, track_a_click); //把跳转操作加在callback里
    }
    if(obj.event){
      linkFunc(obj.event);
    }
    if(obj.ele){
      _.addEvent(obj.ele,'click',function(e){
        linkFunc(e);
      });
    }
  };

  sd.trackLink = function(link,event_name,event_prop){
    _.trackLink({ele:link},event_name,event_prop);
  };
    // 跟踪链接
  sd.trackLinks = function(link,event_name,event_prop){
    var ele = link;
    event_prop = event_prop || {};
    if(!link || (typeof link !== 'object')){
      return false;
    }
    if (!link.href || /^javascript/.test(link.href) || link.target) {
      return false;
    }
    _.addEvent(link,'click',function(e){
      e.preventDefault();   // 阻止默认跳转
      var hasCalled = false;
      setTimeout(track_a_click, 1000);  //如果没有回调成功，设置超时回调
      function track_a_click(){
        if (!hasCalled) {
          hasCalled = true;
          location.href = link.href;  //把 A 链接的点击跳转,改成 location 的方式跳转
        }
      }
      sd.track(event_name, event_prop, track_a_click); //把跳转操作加在callback里
    });

  };


  /*
   * @param {object} properties
   * */
  sd.setProfile = function(p, c) {
    if (saEvent.check({propertiesMust: p})) {
      saEvent.send({
        type: 'profile_set',
        properties: p
      }, c);
    }
  };

  sd.setOnceProfile = function(p, c) {
    if (saEvent.check({propertiesMust: p})) {
      saEvent.send({
        type: 'profile_set_once',
        properties: p
      }, c);
    }
  };

  /*
   * @param {object} properties
   * */
  sd.appendProfile = function(p, c) {
    if (saEvent.check({propertiesMust: p})) {
      _.each(p, function(value, key) {
        if (_.isString(value)) {
          p[key] = [value];
        } else if (_.isArray(value)) {

        } else {
          delete p[key];
          logger.info('appendProfile属性的值必须是字符串或者数组');
        }
      });
      if (!_.isEmptyObject(p)) {
        saEvent.send({
          type: 'profile_append',
          properties: p
        }, c);
      }
    }
  };
  /*
   * @param {object} properties
   * */
  sd.incrementProfile = function(p, c) {
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
        }, c);
      } else {
        logger.info('profile_increment的值只能是数字');
      }
    }
  };

  sd.deleteProfile = function(c) {
    saEvent.send({
      type: 'profile_delete'
    }, c);
    store.set('distinct_id', _.UUID());
  };
  /*
   * @param {object} properties
   * */
  sd.unsetProfile = function(p, c) {
    var str = p;
    var temp = {};
    if (_.isString(p)) {
      p = [];
      p.push(str);
    }
    if (_.isArray(p)) {
      _.each(p, function(v) {
        if (_.isString(v)) {
          temp[v] = true;
        } else {
          logger.info('profile_unset给的数组里面的值必须时string,已经过滤掉', v);
        }
      });
      saEvent.send({
        type: 'profile_unset',
        properties: temp
      }, c);
    } else {
      logger.info('profile_unset的参数是数组');
    }
  };
  /*
   * @param {string} distinct_id
   * */
  sd.identify = function(id, isSave) {
    if(typeof id === 'number'){
      id = String(id);
    }
    var firstId = store.getFirstId();
    if (typeof id === 'undefined') {
      if(firstId){      
        store.set('first_id', _.UUID());
      }else{
        store.set('distinct_id', _.UUID());
      }
    } else if (saEvent.check({distinct_id: id})) {
      if (isSave === true) {
        if(firstId){
          store.set('first_id', id);
        }else{
          store.set('distinct_id', id);          
        }
      } else {
        if(firstId){
          store.change('first_id', id);
        }else{
          store.change('distinct_id', id);
        }
      }

    } else {
      logger.info('identify的参数必须是字符串');
    }
  };
  /*
   * 这个接口是一个较为复杂的功能，请在使用前先阅读相关说明:http://www.sensorsdata.cn/manual/track_signup.html，并在必要时联系我们的技术支持人员。
   * @param {string} distinct_id
   * @param {string} event
   * @param {object} properties
   * */
  sd.trackSignup = function(id, e, p, c) {
    if (saEvent.check({distinct_id: id, event: e, properties: p})) {
      saEvent.send({
        original_id: store.getFirstId() || store.getDistinctId(),
        distinct_id: id,
        type: 'track_signup',
        event: e,
        properties: p
      }, c);
      store.set('distinct_id', id);
    }
  };

  /*
   * @param {string} testid
   * @param {string} groupid
   * */
  sd.trackAbtest = function(t, g) {
    /*
     if (saEvent.check({test_id: t, group_id: g})) {
     saEvent.send({
     type: 'track_abtest',
     properties: {
     test_id: t,
     group_id: g
     }
     });
     }*/
  };

  sd.registerPage = function(obj) {
    if (saEvent.check({properties: obj})) {
      _.extend(_.info.currentProps, obj);
    } else {
      logger.info('register输入的参数有误');
    }
  };

  sd.clearAllRegister = function(){
    store.clearAllProps();
  };

  sd.register = function(props) {
    if (saEvent.check({properties: props})) {
      store.setProps(props);
    } else {
      logger.info('register输入的参数有误');
    }
  };

  sd.registerOnce = function(props) {
    if (saEvent.check({properties: props})) {
      store.setPropsOnce(props);
    } else {
      logger.info('registerOnce输入的参数有误');
    }
  };

  sd.registerSession = function(props) {
    if (saEvent.check({properties: props})) {
      store.setSessionProps(props);
    } else {
      logger.info('registerSession输入的参数有误');
    }
  };

  sd.registerSessionOnce = function(props) {
    if (saEvent.check({properties: props})) {
      store.setSessionPropsOnce(props);
    } else {
      logger.info('registerSessionOnce输入的参数有误');
    }
  };

  sd.login = function(id){
    if(typeof id === 'number'){
      id = String(id);
    }
    if (saEvent.check({distinct_id: id})) {
      var firstId = store.getFirstId();
      var distinctId = store.getDistinctId();
      if(id !== distinctId){
        if(firstId){
          sd.trackSignup(id,'$SignUp');
        }else{
          store.set('first_id',distinctId);
          sd.trackSignup(id,'$SignUp');
        }
      }
    } else {
      logger.info('login的参数必须是字符串');
    }
  };

  sd.logout = function(isChangeId){
    var firstId = store.getFirstId();
    if(firstId){
      store.set('first_id','');
      if(isChangeId === true){
        store.set('distinct_id',_.UUID());
      }else{
        store.set('distinct_id',firstId);
      }
    }else{
      logger.info('没有first_id，logout失败');
    }
  };

  function app_js_bridge(){
    var app_info = null;
    var todo = null;
    function setAppInfo(data){
      app_info = data;
      if(_.isJSONString(app_info)){
        app_info = JSON.parse(app_info);
      }
      if(todo){
        todo(app_info);
      }
    }
    //android
    function getAndroid(){
      if(typeof window.SensorsData_APP_JS_Bridge === 'object' && window.SensorsData_APP_JS_Bridge.sensorsdata_call_app){
        app_info = SensorsData_APP_JS_Bridge.sensorsdata_call_app();
        if(_.isJSONString(app_info)){
          app_info = JSON.parse(app_info);
        }
      }
    }
    //ios
    window.sensorsdata_app_js_bridge_call_js = function(data){    
      setAppInfo(data);
    };
    // 通知iOS
    function calliOS() {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "sensorsanalytics://getAppInfo");
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
      }
    }    
    sd.getAppStatus = function(func){
      calliOS();
      //先获取能直接取到的安卓，ios是异步的不需要操作
      getAndroid(); 
      // 不传参数，直接返回数据
      if(!func){
        return app_info;
      }else{
        //如果传参数，保存参数。如果有数据直接执行，没数据时保存
        if(app_info === null){
          todo = func;
        }else{
          func(app_info);
        }
      }
    };
  };


var heatmap_render = {
// 保存点击图里所有选择器对应元素，方便删除重新渲染
  heatDataElement:[],
  setRefresh: function(){
    var me = this;
    var div = document.createElement('div');
    div.setAttribute('style','border-radius:3px;font-size:14px;cursor:move;z-index:99999;padding:10px 16px;background:#3790e9;color:#fff;position: fixed;left:10px;bottom:10px;');
    div.innerHTML = '<!-- <svg width="15px" height="13px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-145.000000, -1953.000000)" fill="#FFFFFF"><g transform="translate(132.000000, 1941.000000)"><path d="M27.8813854,14.6046259 L25.720853,15.6691713 C24.4905498,13.2443736 21.804888,11.6623409 18.7741412,12.0615454 C15.7734018,12.4607499 13.3728103,14.900333 13.042729,17.8574034 C12.592618,21.8494485 15.7583981,25.2352941 19.7193742,25.2352941 C22.5700766,25.2352941 24.9706681,23.4906226 25.9459084,21.0214688 L24.2804981,20.4744107 L24.2654944,20.4744107 C23.3952799,22.5295747 21.1297217,23.8602564 18.639108,23.342769 C16.7936532,22.9583499 15.2932835,21.4798147 14.9031874,19.646431 C14.2430247,16.5119364 16.6436163,13.7470755 19.7193742,13.7470755 C21.6548511,13.7470755 23.3052578,14.8411916 24.1154574,16.4380096 L21.8649028,17.5616964 C21.804888,17.5912671 21.804888,17.6947645 21.8799065,17.7095499 L26.3960193,19.1732998 C26.4410304,19.1880851 26.4860415,19.1585144 26.5010452,19.1141583 L27.9864112,14.6637674 C28.0314223,14.6341967 27.9564038,14.5750552 27.8813854,14.6046259 L27.8813854,14.6046259 Z" id="refresh"></path></g></g></g></svg> --> <span style="cursor:pointer;" title="当页面有内容更切换时候，点击刷新数据，重新计算">刷新数据</span>';
    document.body.appendChild(div);
    _.addEvent(div,'click',function(e){
      if(e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'span'){
        me.refreshHeatData();
        me.showErrorInfo(5);
      }
    });
    _.addEvent(div,'mousedown',function(e){
        if(e.target && e.target.tagName && e.target.tagName.toLowerCase() !== 'span'){
          _.draggable(div,e);          
        }
    });    

  },
  showErrorInfo: function(error_type,error_msg){
    var div = document.createElement('div');
    div.setAttribute('style','background:#e55b41;border:none;border-radius:8px;color:#fff;font-size:18px;left:50%;margin-left:-300px;padding:15px;position: fixed;text-align: center;top: 0;width:600px;z-index:9999;');
    
    if(error_type === 1){
      div.innerHTML = '当前页面在所选时间段内暂时没有点击数据';     
    }else if(error_type === 2){
      if(error_msg.error){
        div.innerHTML = error_msg.error;     
      }else{
        div.innerHTML = '请求数据异常';
      }
    }else if(error_type === 3){
      div.innerHTML = '当前页面在所选时间段内暂时没有点击数据';
    }else if(error_type === 4){
      if(error_msg.error){
        div.innerHTML = error_msg.error;     
      }else{
        div.innerHTML = '请求数据异常';
      }      
    }else if(error_type === 5){
      div.style.backgroundColor = '#3790e9';
      div.innerHTML = '刷新点击图数据成功';      
    }

    document.body.appendChild(div);
    setTimeout(function(){
      document.body.removeChild(div);
    },5000)

/*4中错误类型
    带id的正常请求，没有数据
    带id的错误请求
    session里的正常请求，没有数据
    session里的错误请求
*/

  },
  requestType: 1,
  getRequestInfo: function(id,url){

    var me = this;
    if(typeof id === 'string' && sd.para.web_url){

      var urlParse = new _.urlParse(sd.para.web_url);
      urlParse._values.Path = '/api/heat_map/report/' + id;

      var urlParse2 = new _.urlParse(sd.para.web_url);
      urlParse2._values.Path = '/api/heat_map/report/path/' + id;
      var urlParse2Value = urlParse2.getUrl();
      if(urlParse2Value.indexOf('?') === -1){
        urlParse2Value = urlParse2Value + '?pathUrl=' + url;
      }else{
        urlParse2Value = urlParse2Value + '&pathUrl=' + url;
      }

      if(url){
        this.requestType = 3;
        _.ajax({
          url: urlParse2Value,
          type: 'POST',
          cors: true,
          header: {cors: "true"},
          success: function(data) {
            me.bindEffect();
            me.calculateHeatData(data);
          },
          error: function(res){
            me.showErrorInfo(2,res);
            sessionStorage.removeItem('sensors_heatmap_id');

            if(location.href.indexOf('http://www.notrack.com:8080/sdk_test.html') === 0){
              me.bindEffect();
              me.calculateHeatData(window.data_sa_heat_test_data_test_201703130440 || {});  
            }
          }
        });
      }else{
        this.requestType = 1;
        _.ajax({
          url: urlParse.getUrl(),
          type: 'POST',
          cors: true,
          header: {cors: "true"},
          success: function(data) {
            me.bindEffect();
            me.calculateHeatData(data);
          },
          error: function(res){
            me.showErrorInfo(4,res);            
            sessionStorage.removeItem('sensors_heatmap_id');

            if(location.href.indexOf('http://www.notrack.com:8080/sdk_test.html') === 0){
              me.bindEffect();
              me.calculateHeatData(window.data_sa_heat_test_data_test_201703130440 || {});  
            }
          }
        });
      }
    }else{
      _.logger.info('缺少web_url');
    }
  },
  calculateHeatData: function(data){
    this.ajaxHeatData = data;
    var me = this;

    if(!_.isObject(data) || !_.isArray(data.rows) || !_.isObject(data.rows[0])){
      me.showErrorInfo(me.requestType);
      return false;
    }
    var pv = parseInt(data.page_view,10);
    var heat_map_id = data.heat_map_id;
    data = data.rows;

    var dataPageTotal = 0;
    var usableData = [];
    
    _.each(data,function(obj){
      if( obj.by_values[0] && _.querySelectorAll(obj.by_values[0])[0] ){
        usableData.push(obj);
      }
    });

    if(usableData.length === 0){
      me.showErrorInfo(me.requestType);
    }

    data = usableData;

    _.each(data,function(obj,key){
      obj.value_fix = obj.values[0][0];
      dataPageTotal += obj.value_fix;
    });

    me.data_render = data;

    _.each(data,function(obj,key){
      if(obj.by_values[0]){
        obj.data_page_percent = Number(obj.value_fix/dataPageTotal*100).toFixed(2) + '%';

        obj.data_click_percent = Number(obj.value_fix/pv*100).toFixed(2) + '%';

        obj.data_click = Number(obj.value_fix/pv);
        obj.data_page = Number(obj.value_fix/dataPageTotal);


        var urlParse = new _.urlParse(sd.para.web_url);
        urlParse._values.Path = '/web-click/users';
        obj.data_user_link = urlParse.getUrl() + '#heat_map_id=' + heat_map_id + '&element_selector=' + encodeURIComponent(obj.by_values[0]);

        if(String(obj.top_values[0]) === 'null'){
          obj.data_top_value = '没有值';          
        } else {
          obj.data_top_value = String(obj.top_values[0]);
        }

        var selector = _.querySelectorAll(obj.by_values[0]);
        if(typeof selector === 'object' && selector.length > 0){
          me.renderHeatData(selector,obj,key);
        }
      }
    });



  },
  heatData:function(data){
    var heat = [0.005,0.01,0.025,0.05,0.1,0.5];
    for(var i=0; i<heat.length; i++){
      if(data < heat[i]){
        return i;
      }
    }
    return 6;
  },
  heatDataTitle: function(data){
    return ('点击次数 ' + data.value_fix 
      + '\r\n点击概率 ' + data.data_click_percent 
      + '\r\n点击占比 ' + data.data_page_percent + '\r\n历史数据 ' + String(data.top_values[0]).slice(0,30) );
  },
  renderHeatData: function(selector,data,key){
    var dom =  _.ry(selector[0]);
    // 优化input不支持伪类的样式
    if(dom.ele.tagName.toLowerCase() === 'input' || dom.ele.tagName.toLowerCase() === 'textarea'){
        var width = dom.getCssStyle('width');
        dom = dom.wrap('span');        
        if(typeof width === 'string' && width.slice(-1) === '%'){
          dom.ele.style.width = width;
        }
        dom.ele.style.display = 'inline-block';

    }    
    this.heatDataElement.push(dom);
    dom.attr('data-heat-place',String(key))
    .addClass('sa-click-area')
//    .attr('title',this.heatDataTitle(data))
    .attr('data-click',data.data_click_percent)
    .addClass('sa-click-area' + this.heatData(data.data_click));
    if(dom.getStyle('display') === 'inline'){
      selector[0].style.display = 'inline-block';
    }

  },
  refreshHeatData: function(){
    _.each(this.heatDataElement,function(ele){
      ele.removeClass('sa-click-area');
    });
    this.heatDataElement = [];
    this.calculateHeatData(this.ajaxHeatData);

  },
  is_fix_state : null,
  showEffectBox: function(e,div,isShow){
    if(this.is_fix_state === 'fixslidedown'){

      div.style.position = 'fixed';
      div.style.left = 'auto';
      div.style.right = 0;
      div.style.top = 0;
      
      if(isShow){
        div.className = 'sa-heat-box-effect-2017314';
      }

    }else if(this.is_fix_state === 'notfix'){

      var width = heatmap.getBrowserWidth();

      var target = e.target;
      var offset = _.ry(target).offset();
      var size = _.ry(target).getSize();
      var x = offset.left + size.width + 2;
      var y = offset.top+1;

      if(width < (x + 220)){
        x = offset.left - 220;
        if(offset.left < 220){
          x = e.pageX;
        }
      }

      
      div.style.position = 'absolute';
      div.style.left = x + 'px';
      div.style.top = y + 'px';

    }

    if(div.style.display !== 'block'){
      div.style.display = 'block';
    }

  },
  bindEffect: function(){
    var me = this;
    // 浮动层的内容的初始化
    var mouseoverEvent = null;
    var target_is_on_float = false;

    var me = this;
    var str = '<div style="padding: 8px;"><div style="color: #CACACA">当前内容：</div><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{data_current_content}}</div></div><div style="background: #444; height:1px;"></div><div style="padding: 8px;">'+
    '<table style="width:100%;"><tr><td>点击次数: </td><td style="text-align:right;">{{value_fix}}次</td></tr><tr><td style="cursor:pointer;" title="点击次数/当前页面的浏览次数"><span style="float:left;">点击率</span><span style="float:left;margin-left:3px;"><svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-1803.000000, -158.000000)" fill="#979797"><g transform="translate(1737.000000, 84.000000)"><path d="M71,74 C68.24,74 66,76.24 66,79 C66,81.76 68.24,84 71,84 C73.76,84 76,81.76 76,79 C76,76.24 73.76,74 71,74 L71,74 Z M71.5,82.5 L70.5,82.5 L70.5,81.5 L71.5,81.5 L71.5,82.5 L71.5,82.5 Z M72.535,78.625 L72.085,79.085 C71.725,79.45 71.5,79.75 71.5,80.5 L70.5,80.5 L70.5,80.25 C70.5,79.7 70.725,79.2 71.085,78.835 L71.705,78.205 C71.89,78.025 72,77.775 72,77.5 C72,76.95 71.55,76.5 71,76.5 C70.45,76.5 70,76.95 70,77.5 L69,77.5 C69,76.395 69.895,75.5 71,75.5 C72.105,75.5 73,76.395 73,77.5 C73,77.94 72.82,78.34 72.535,78.625 L72.535,78.625 Z" id="prompt"></path></g></g></g></svg></span></td><td style="text-align:right;">{{data_click_percent}}</td></tr><tr><td style="cursor:pointer;" title="点击次数/当前页面的点击总次数"><span style="float:left;">点击占比</span> <span style="float:left;margin-left:3px;"><svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-1803.000000, -158.000000)" fill="#979797"><g transform="translate(1737.000000, 84.000000)"><path d="M71,74 C68.24,74 66,76.24 66,79 C66,81.76 68.24,84 71,84 C73.76,84 76,81.76 76,79 C76,76.24 73.76,74 71,74 L71,74 Z M71.5,82.5 L70.5,82.5 L70.5,81.5 L71.5,81.5 L71.5,82.5 L71.5,82.5 Z M72.535,78.625 L72.085,79.085 C71.725,79.45 71.5,79.75 71.5,80.5 L70.5,80.5 L70.5,80.25 C70.5,79.7 70.725,79.2 71.085,78.835 L71.705,78.205 C71.89,78.025 72,77.775 72,77.5 C72,76.95 71.55,76.5 71,76.5 C70.45,76.5 70,76.95 70,77.5 L69,77.5 C69,76.395 69.895,75.5 71,75.5 C72.105,75.5 73,76.395 73,77.5 C73,77.94 72.82,78.34 72.535,78.625 L72.535,78.625 Z" id="prompt"></path></g></g></g></svg></span></td><td style="text-align:right;">{{data_page_percent}}</td></tr></table>'+
    '</div><div style="background: #444; height:1px;"></div><div style="padding: 8px;"><div style="color: #CACACA;">历史内容：</div><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{data_top_value}}</div></div><div style="background: #444; height:1px;"></div><div style="padding: 6px 8px;"><a style="color:#2a90e2;text-decoration: none;" href="{{data_user_link}}" target="_blank">查看用户列表</a ></div>';

    var newStr = '';
    var isShow = true;
    var div = document.createElement('div');
    document.body.appendChild(div);
    div.setAttribute('style','border-radius:3px;display:none;border:1px solid #000;position: fixed; right:0; top:0; background: #333;line-height:24px;font-size:13px;width:220px;color: #fff;font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;box-shadow: 0 2px 4px rgba(0,0,0,0.24);z-index:99999;');

/*
    div.innerHTML = '<div id="sa_heat_float_right_box_slidedown" class="sa-heat-box-head-2017322">'
    + '<div id="sa_heat_float_right_box_close_btn" style="cursor:pointer;display: inline-block;float: left;padding: 4px;"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.54"><g id="Artboard-4" fill="#000000"><polygon id="Combined-Shape" points="9.77297077 8.7123106 6.06066017 5 5 6.06066017 8.7123106 9.77297077 5 13.4852814 6.06066017 14.5459415 9.77297077 10.8336309 13.4852814 14.5459415 14.5459415 13.4852814 10.8336309 9.77297077 14.5459415 6.06066017 13.4852814 5"></polygon></g></g></svg></div>'
    + '<div id="sa_heat_float_right_box_right_btn" style="cursor:pointer;display: inline-block;float: right;padding: 4px 2px;"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.54"><g id="Artboard-4" fill="#000000"><polygon id="Combined-Shape" points="12.1923882 9.65685425 7.59619408 14.2530483 8.65685425 15.3137085 14.3137085 9.65685425 8.65685425 4 7.59619408 5.06066017"></polygon></g></g></svg></div></div>'
    
    + '<div id="sa_heat_float_right_box_slidedownRight" class="sa-heat-box-head-2017322">'
    + '<div id="sa_heat_float_right_box_left_btn" style="cursor:pointer;display: inline-block;float: left;padding: 4px;"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.54"><g id="Artboard-4" fill="#000000"><polygon id="Combined-Shape" points="8.12132034 9.65685425 12.7175144 14.2530483 11.6568542 15.3137085 6 9.65685425 11.6568542 4 12.7175144 5.06066017"></polygon></g></g></svg></div>'
    + '<div id="sa_heat_float_right_box_btn_slidedown" style="cursor:pointer;display: inline-block;float: right;margin-right:10px;padding: 4px 2px;"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.54"><g fill="#000000"><path d="M6.8,7 L6,7 L6,15 L7.6,15 L7.6,8.6 L14,8.6 L14,7 L6.8,7 Z" transform="translate(10.000000, 11.000000) rotate(-315.000000) translate(-10.000000, -11.000000) "></path></g></g></svg></div></div>'

    + '<div id="sa_heat_float_right_box_slideup" class="sa-heat-box-head-2017322" style="cursor:pointer;">'
    + '<div style="line-height: 30px;display: inline-block;float:right;padding-right: 10px;">展开</div><div style="padding:2px;display: inline-block;float: right;"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.54"><g fill="#000000"><path d="M6.8,4 L6,4 L6,12 L7.6,12 L7.6,5.6 L14,5.6 L14,4 L6.8,4 Z" transform="translate(10.000000, 8.000000) rotate(-135.000000) translate(-10.000000, -8.000000) "></path></g></g></svg></div></div>'

    + '<div id="sa_heat_float_right_box_content" style="clear:both;"></div>';
*/
    div.innerHTML = '<div id="sa_heat_float_right_box_content" style="clear:both;"></div>';

/*
    var eleSlideDown = document.getElementById('sa_heat_float_right_box_slidedown');
    var eleSlideUp = document.getElementById('sa_heat_float_right_box_slideup');
    var eleSlideDownRight = document.getElementById('sa_heat_float_right_box_slidedownRight');    

    var eleBtnSlideDown = document.getElementById('sa_heat_float_right_box_btn_slidedown');
    var eleBtnSlideUp = document.getElementById('sa_heat_float_right_box_btn_slideup');

    var eleBtnClose = document.getElementById('sa_heat_float_right_box_close_btn');
    var eleBtnRight = document.getElementById('sa_heat_float_right_box_right_btn');
    var eleBtnLeft = document.getElementById('sa_heat_float_right_box_left_btn');
*/    
    var eleContent = document.getElementById('sa_heat_float_right_box_content');     

    _.addEvent(div,'mouseleave',function(){
      if(me.is_fix_state === 'notfix'){
        target_is_on_float = false;
        div.style.display = 'none';        
      }
    });

    _.addEvent(div,'mouseenter',function(){
      if(me.is_fix_state === 'notfix'){
        target_is_on_float = true;
      }
    });

/*
    _.addEvent(eleSlideDown,'mousedown',function(e){
        if(e.target.id === 'sa_heat_float_right_box_slidedown'){
          _.draggable(div,e);          
        }
    });

    _.addEvent(eleSlideDownRight,'mousedown',function(e){
        if(e.target.id === 'sa_heat_float_right_box_slidedownRight'){
          _.draggable(div,e);          
        }
    });

    _.addEvent(eleBtnClose,'click',function(e){
      div.style.display = 'none';
    });

    _.addEvent(eleBtnLeft,'click',function(e){
      eleSlideDown.style.display = 'block';
      eleSlideDownRight.style.display = 'none';
      me.is_fix_state = 'notfix';
      _.cookie.set('sensorsdata_heatmap_float_fix_state','notfix'); 
      me.showEffectBox(mouseoverEvent,div,isShow);
    });

    _.addEvent(eleBtnRight,'click',function(e){
      eleSlideDownRight.style.display = 'block';
      eleSlideDown.style.display = 'none';
      me.is_fix_state = 'fixslidedown';
      _.cookie.set('sensorsdata_heatmap_float_fix_state','fixslidedown'); 
      me.showEffectBox(mouseoverEvent,div,isShow);
    });

    _.addEvent(eleBtnSlideDown,'click',function(){
      isShow = false;
      eleSlideDownRight.style.display = 'none';
      eleSlideUp.style.display = 'block';
      eleContent.style.display = 'none';   
      div.style.width = '70px'; 
      div.style.height = '30px';
      me.is_fix_state = 'fixslideup';
      _.cookie.set('sensorsdata_heatmap_float_fix_state','fixslideup'); 
    });

    _.addEvent(eleSlideUp,'click',function(){
      isShow = true;
      eleSlideDownRight.style.display = 'block';
      eleSlideUp.style.display = 'none';
      eleContent.style.display = 'block';   
      div.style.width = '220px'; 
      div.style.height = 'auto';       
      me.is_fix_state = 'fixslidedown';
      _.cookie.set('sensorsdata_heatmap_float_fix_state','fixslidedown');
    });
*/


    _.addEvent(div, 'animationend', function(){
      div.className = '';
    });


      this.is_fix_state = 'notfix';

    //浮动层效果的事件和初始化
    /*
    var fix_state = _.cookie.get('sensorsdata_heatmap_float_fix_state');
    if( fix_state === null){
      this.is_fix_state = 'notfix';
    }else{
      this.is_fix_state = fix_state;      
    }
    
    if(this.is_fix_state === 'notfix'){      
      eleSlideDown.style.display = 'block';
      eleSlideDownRight.style.display = 'none';
      eleSlideUp.style.display = 'none';
    }else if(this.is_fix_state === 'fixslidedown'){

      eleSlideUp.style.display = 'none'; 
      eleSlideDown.style.display = 'none';

      eleSlideDownRight.style.display = 'block';
    }else if(this.is_fix_state === 'fixslideup'){
      isShow = false;
      div.style.width = '70px'; 
      div.style.height = '30px';
      eleContent.style.display = 'none';   
      eleSlideUp.style.display = 'block';
      eleSlideDown.style.display = 'none';
      eleSlideDownRight.style.display = 'none';
    }


*/

    // 绑定浮动层的显示
    var timeEle = 600;

    function showBoxDetailContent(e){
      mouseoverEvent = e;
      var target = e.target;
      var pos = target.getAttribute('data-heat-place');
      var data = me.data_render[pos];
      if(!data){
        return false;
      }

      var textContent = _.trim(target.textContent);
      if (textContent) {
        textContent = textContent.replace(/[\r\n]/g, ' ').replace(/[ ]+/g, ' ').substring(0, 255);
      }

      data.data_current_content = textContent || '没有值';

      newStr = str.replace(/\{\{[^\{\{]+\}\}/g,function(a){
        a = a.slice(2,-2);
        if(typeof a === 'string' && typeof data === 'object'){
          return data[a];
        }
      });
      eleContent.innerHTML = newStr;
      me.showEffectBox(e,div,isShow);
    }
    function showBoxDetail(e){
      var target = e.target;
      setTimeout(function(){
        if(target === current_over){
          showBoxDetailContent(e);
        }
      },timeEle);

    }

    var current_over = null;

    if(/iPhone|Android/i.test(navigator.userAgent)){

      _.addEvent(document,'mouseover',function(e){
        var target = e.target;
        var className = target.className;
        current_over = target;
        if(typeof className !== 'string' || (' ' + className + ' ').indexOf(' sa-click-area ') === -1){
          return false;
        } 
        target.onmouseleave = function(){
          if(me.is_fix_state === 'notfix'){
            setTimeout(function(){
              if(!target_is_on_float){
                target_is_on_float = false;
                div.style.display = 'none';     
              }
            },timeEle);
          }
        }

        showBoxDetail(e);

      });

    }else{
      _.addEvent(document,'mouseover',function(e){
        var target = e.target;
        var className = target.className;
        current_over = target;
        if(typeof className !== 'string' || (' ' + className + ' ').indexOf(' sa-click-area ') === -1){
          return false;
        } 
        showBoxDetail(e);

      });
    }

  },
  setCssStyle: function(){
    var css = '.sa-heat-box-head-2017322{border-bottom:1px solid rgba(0,0,0,.06);cursor:move;height:30px;background:#e1e1e1;color:#999;clear:both}.sa-heat-box-effect-2017314{animation-duration:.5s;animation-fill-mode:both;animation-iteration-count:1;animation-name:sa-heat-box-effect-2017314}@keyframes sa-heat-box-effect-2017314{0%{opacity:.6}to{opacity:1}}.sa-click-area{position:relative}.sa-click-area:before{cursor:pointer;content:"";width:100%;position:absolute;left:0;top:0;bottom:0}.sa-click-area.sa-click-area0:before{background:hsla(60,98%,80%,.75);box-shadow:0 0 0 2px #fefe9b inset}.sa-click-area.sa-click-area0:hover:before,input.sa-click-area.sa-click-area0,textarea.sa-click-area.sa-click-area0{background:hsla(60,98%,80%,.85)}.sa-click-area.sa-click-area1:before{background:rgba(255,236,142,.75);box-shadow:0 0 0 2px #ffec8e inset}.sa-click-area.sa-click-area1:hover:before,input.sa-click-area.sa-click-area1,textarea.sa-click-area.sa-click-area1{background:rgba(255,236,142,.85)}.sa-click-area.sa-click-area2:before{background:rgba(255,188,113,.75);box-shadow:0 0 0 2px #ffbc71 inset}.sa-click-area.sa-click-area2:hover:before,input.sa-click-area.sa-click-area2,textarea.sa-click-area.sa-click-area2{background:rgba(255,188,113,.85)}.sa-click-area.sa-click-area3:before{background:rgba(255,120,82,.75);box-shadow:0 0 0 2px #ff7852 inset}.sa-click-area.sa-click-area3:hover:before,input.sa-click-area.sa-click-area3,textarea.sa-click-area.sa-click-area3{background:rgba(255,120,82,.85)}.sa-click-area.sa-click-area4:before{background:rgba(255,65,90,.75);box-shadow:0 0 0 2px #ff415a inset}.sa-click-area.sa-click-area4:hover:before,input.sa-click-area.sa-click-area4,textarea.sa-click-area.sa-click-area4{background:rgba(255,65,90,.85)}.sa-click-area.sa-click-area5:before{background:rgba(199,0,18,.75);box-shadow:0 0 0 2px #c70012 inset}.sa-click-area.sa-click-area5:hover:before,input.sa-click-area.sa-click-area5,textarea.sa-click-area.sa-click-area5{background:rgba(199,0,18,.85)}.sa-click-area.sa-click-area6:before{background:rgba(127,0,79,.75);box-shadow:0 0 0 3px #7f004f inset}.sa-click-area.sa-click-area6:hover:before,input.sa-click-area.sa-click-area6,textarea.sa-click-area.sa-click-area6{background:rgba(127,0,79,.85)}.sa-click-area .sa-click-area:before{background:0 0!important}.sa-click-area:after{height:14px;line-height:14px;margin:-7px 0 0 -28px;width:56px;color:#fff;content:attr(data-click);font-size:14px;font-weight:700;left:50%;line-height:1em;position:absolute;text-align:center;text-indent:0;text-shadow:1px 1px 2px #000;top:50%;z-index:10}';

    var style = document.createElement('style');
    style.type = 'text/css';
    try{
        style.appendChild(document.createTextNode(css))
    }catch(e){
        style.styleSheet.cssText = css;
    }
    document.getElementsByTagName('head')[0].appendChild(style);

  }


};


var heatmap = {
  getDomIndex: function (el){
    var indexof = [].indexOf;
    if (!el.parentNode) return -1;
    var list = el.parentNode.children;

    if (!list) return -1;
    var len = list.length;

    if (indexof) return indexof.call(list, el);
    for (var i = 0; i < len; ++i) {
      if (el == list[i]) return i;
    }
    return -1;
  },
   selector:function (el){
    //var classname = _.trim(el.className.baseVal ? el.className.baseVal : el.className);
    var i = el.parentNode && 9 == el.parentNode.nodeType ? -1 : this.getDomIndex(el);
    return el.tagName.toLowerCase()
      + (el.id ? '#' + el.id : '')
      //+ (classname ? classname.replace(/^| +/g, '.') : '')
      + (~i ? ':nth-child(' + (i + 1) + ')' : '');
  },
  getDomSelector : function(el,arr) {
    if(!el || !el.parentNode || !el.parentNode.children){
      return false;
    }
    arr = arr && arr.join ? arr : [];
    var name = el.nodeName.toLowerCase();
    if (!el || name === 'body' || 1 != el.nodeType) {
      arr.unshift('body');
      return arr.join(' > ');
    }
    arr.unshift(this.selector(el));
    if (el.id) return arr.join(' > ');
    return this.getDomSelector(el.parentNode, arr);    
  },
  na : function() {
    var a = document.documentElement.scrollLeft || window.pageXOffset;
    return parseInt(isNaN(a) ? 0 : a, 10);
  },
  i : function() {
    var a = 0;
    try {
      a = o.documentElement.scrollTop || m.pageYOffset,
      a = isNaN(a) ? 0 : a;
    } catch (b) {
      a = 0;
    }
    return parseInt(a, 10);
  },
  getBrowserWidth : function() {
    var a = window.innerWidth || document.body.clientWidth;
    return isNaN(a) ? 0 : parseInt(a, 10);
  },
  getBrowserHeight : function() {
    var a = window.innerHeight || document.body.clientHeight;
    return isNaN(a) ? 0 : parseInt(a, 10);
  },
  getScrollWidth : function() {
    var a = parseInt(document.body.scrollWidth, 10);
    return isNaN(a) ? 0 : a;
  },
  getScrollHeight: function() {
    var a = parseInt(document.body.scrollHeight, 10);
    return isNaN(a) ? 0 : a;
  },
  W : function(a) {
    var b = parseInt(+a.clientX + +this.na(), 10);
    var a = parseInt(+a.clientY + +this.i(), 10);
    return {
      x : isNaN(b) ? 0 : b,
      y : isNaN(a) ? 0 : a
    }
  },
  start : function(ev, target, tagName) {
    var selector = this.getDomSelector(target);
    var prop = _.getEleInfo({target:target});

    prop.$element_selector = selector ? selector : '';

    if(tagName === 'a' && sd.para.heatmap && sd.para.heatmap.isTrackLink === true){
      _.trackLink({event:ev,target:target},'$WebClick',prop);
    }else{
      sd.track('$WebClick',prop);     
    }

  },
  sendIframeData: function(){
    var me = this;
    _.bindReady(
      function(){
        if (window && window.parent && window.parent.window && (window !== window.parent.window)) {
          window.parent.window.postMessage({
            method: 'setHeight',
            params: {
              height: me.getScrollHeight()
            }
          },sd.para.web_url); 

          window.parent.window.postMessage({
            method: 'setUrl',
            params: {
              url: location.href
            }
          },sd.para.web_url); 
        }
      }
    );
  },
  prepare: function(todo){
    var match = location.search.match(/sa-request-id=([^&]+)/);
    var me = this;
    function isReady(data,url){
      if(!document.querySelectorAll){
        alert('请更新到最新版浏览器,建议用chrome或者firefox');
        return false;
      }
      //进入渲染模式
      heatmap_render.setCssStyle();
      setTimeout(function(){
        heatmap_render.getRequestInfo(data,url);
        heatmap_render.setRefresh();
        me.sendIframeData();
      },sd.para.heatmap.loadTimeout || 0);
    }
    if(match && match[0] && match[1]){
      sd.is_heatmap_render_mode = true;
      if(typeof window.sessionStorage === 'object' && sessionStorage.setItem){
        sessionStorage.setItem('sensors_heatmap_id',match[1]);
      }
      isReady(match[1]);
    } else if(typeof window.sessionStorage === 'object' && sessionStorage.setItem && typeof sessionStorage.getItem('sensors_heatmap_id') === 'string'){
      sd.is_heatmap_render_mode = true;
      isReady(sessionStorage.getItem('sensors_heatmap_id'),location.href);
    }else{
      todo();
      //进入热力图采集模式
      if (_.isObject(sd.para.heatmap)) {
        this.init();
      }
    }
  },
  init : function() {
    var that = this;
    if (!_.isObject(sd.para.heatmap)) {
      return false;
    }

    // 验证url，function成功就行，非function认为都是全部
    if (_.isFunction(sd.para.heatmap.collect_url) && !sd.para.heatmap.collect_url()) {
      return false;
    }

    if (sd.para.heatmap.collect_elements === 'all') {
      sd.para.heatmap.collect_elements = 'all';
    } else {
      sd.para.heatmap.collect_elements = 'interact';
    }

    if (sd.para.heatmap.collect_elements === 'all') {
      _.addEvent(document, 'click', function(e) {
        var ev = e || window.event;
        var target = ev.target || ev.srcElement;
        var tagName = target.tagName.toLowerCase();
        if(tagName.toLowerCase() === 'body' || tagName.toLowerCase() === 'html'){
          return false;
        }
        if(!target || !target.parentNode || !target.parentNode.children){
          return false;
        }
        var parent_ele = target.parentNode.tagName.toLowerCase();
        if(parent_ele === 'a' || parent_ele === 'button'){
          that.start(ev, target.parentNode, target.parentNode.tagName.toLowerCase());
        }else{
          that.start(ev, target, tagName);
        } 
      });

    } else {
      _.addEvent(document, 'click', function(e) {
        var ev = e || window.event;
        var target = ev.target || ev.srcElement;
        var tagName = target.tagName.toLowerCase();
        if(tagName.toLowerCase() === 'body' || tagName.toLowerCase() === 'html'){
          return false;
        }
        if(!target || !target.parentNode || !target.parentNode.children){
          return false;
        }        
        var parent_ele = target.parentNode.tagName.toLowerCase();     
        if (tagName === 'button' || tagName === 'a' || parent_ele === 'a' || parent_ele === 'button' || tagName === 'input' || tagName === 'textarea') {
          if(parent_ele === 'a' || parent_ele === 'button'){
            that.start(ev, target.parentNode, target.parentNode.tagName.toLowerCase());
          }else{
            that.start(ev, target, tagName);
          }         
        }
      });
    }

  }
};
    
  sd.init = function(para){
    if((!para && has_declare) || (para && !has_declare)){
      sd.initPara(para);
      sd._init();
    }
  };

  sd._init = function() {
    // 防止爬虫等异常情况
    /*
     if(!_.hasStandardBrowserEnviroment()){
     return false;
     }*/
    heatmap.prepare(function(){
      app_js_bridge();
      // 初始化referrer等页面属性 1.6
      _.info.initPage();

      // 初始化distinct_id
      store.init();
      // 发送数据
      if(sd._q && _.isArray(sd._q) && sd._q.length > 0 ){
        _.each(sd._q, function(content) {
          sd[content[0]].apply(sd, slice.call(content[1]));
        });
      }
    });

  };

  






    sd.init();
  
  
  return sd;
  
}catch(err){
  if (typeof console === 'object' && console.log) {
    try {console.log(err)} catch (e) {};
  }
/*
  (function(){

    var sd = window['sensorsDataAnalytic201505'];
    if(typeof sd === 'string'){
      sd = window[sd];
      if((sd != null) && (typeof sd === 'function' || typeof sd === 'object')){
        sd.track && sd.track('_js_sdk_error',{_js_sdk_error_msg:err,$url:location.href}); 
      }
    }


  })();
*/
}



});