sensorsDataAnalytic201505.modules['SiteLinkerConcatUtm'] = (function () {
  'use strict';

  var siteLinker = {};

  // 检查指定URL是否匹配打通规则
  siteLinker.getPart = function (part) {
    var temp = false;
    var len = this.option.length;
    if (len) {
      for (var i = 0; i < len; i++) {
        if (part.indexOf(this.option[i]['part_url']) > -1) {
          return true;
        }
      }
    }
    return temp;
  };

  siteLinker.getPartHash = function (part) {
    var len = this.option.length;
    var temp = false;
    if (len) {
      for (var i = 0; i < len; i++) {
        if (part.indexOf(this.option[i]['part_url']) > -1) {
          return this.option[i]['after_hash'];
        }
      }
    }
    return !!temp;
  };

  // 得到当前页面编码后的 ID
  siteLinker.getCurrenId = function () {
    var distinct_id = this.store.getDistinctId() || '',
      first_id = this.store.getFirstId() || '';
    if (this._.urlSafeBase64 && this._.urlSafeBase64.encode) {
      distinct_id = distinct_id ? this._.urlSafeBase64.trim(this._.urlSafeBase64.encode(this._.base64Encode(distinct_id))) : '';
    } else if (this._.rot13obfs) {
      distinct_id = distinct_id ? this._.rot13obfs(distinct_id) : '';
    }
    // 若有 first_id，则格式是 'f' + distinct_id，对应的旧版格式是 'u' + distinct_id
    // 否则格式是 'd' + distinct_id，对应的旧版格式是 'a' + distinct_id
    var urlId = first_id ? 'f' + distinct_id : 'd' + distinct_id;
    return encodeURIComponent(urlId);
  };

  siteLinker.rewriteUrl = function (url, target) {
    var _this = this;
    var reg = /([^?#]+)(\?[^#]*)?(#.*)?/;
    var arr = reg.exec(url),
      nurl = '';
    if (!arr) {
      return;
    }
    var host = arr[1] || '',
      search = arr[2] || '',
      hash = arr[3] || '';
    var idIndex;
    var sa_id = '_sasdk=' + this.getCurrenId();
    var changeSaId = function (str) {
      var arr = str.split('&');
      var new_arr = [];
      _this._.each(arr, function (val) {
        if (val.indexOf('_sasdk=') > -1) {
          new_arr.push(sa_id);
        } else {
          new_arr.push(val);
        }
      });
      return new_arr.join('&');
    };

    if (this.getPartHash(url)) {
      idIndex = hash.indexOf('_sasdk');
      var queryIndex = hash.indexOf('?');
      if (queryIndex > -1) {
        if (idIndex > -1) {
          nurl = host + search + '#' + hash.substring(1, idIndex) + changeSaId(hash.substring(idIndex, hash.length));
        } else {
          nurl = host + search + hash + '&' + sa_id;
        }
      } else {
        nurl = host + search + '#' + hash.substring(1) + '?' + sa_id;
      }
    } else {
      idIndex = search.indexOf('_sasdk');
      var hasQuery = /^\?(\w)+/.test(search);
      if (hasQuery) {
        if (idIndex > -1) {
          nurl = host + '?' + changeSaId(search.substring(1)) + hash;
        } else {
          nurl = host + search + '&' + sa_id + hash;
        }
      } else {
        nurl = host + '?' + sa_id + hash;
      }
    }

    if (target) {
      target.href = nurl;
    }
    return nurl;
  };

  siteLinker.getUrlId = function () {
    /* eslint-disable no-useless-escape */
    var sa_id = location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);
    if (this._.isArray(sa_id) && sa_id[1]) {
      var uid = decodeURIComponent(sa_id[1]);
      if (uid && (uid.substring(0, 1) === 'f' || uid.substring(0, 1) === 'd')) {
        if (this._.urlSafeBase64 && this._.urlSafeBase64.isUrlSafeBase64 && this._.urlSafeBase64.isUrlSafeBase64(uid)) {
          uid = uid.substring(0, 1) + this._.base64Decode(this._.urlSafeBase64.decode(uid.substring(1)));
        } else if (this._.rot13defs) {
          uid = uid.substring(0, 1) + this._.rot13defs(uid.substring(1));
        }
      }
      return uid;
    } else {
      return '';
    }
  };

  siteLinker.setRefferId = function () {
    var distinct_id = this.store.getDistinctId();
    var urlId = this.getUrlId();
    if (urlId === '') {
      return false;
    }
    var isAnonymousId = urlId.substring(0, 1) === 'a' || urlId.substring(0, 1) === 'd';
    urlId = urlId.substring(1);

    if (urlId === distinct_id) {
      return false;
    }
    if (urlId && isAnonymousId && this.store.getFirstId()) {
      this.sd.identify(urlId, true);
      this.sd.saEvent.send(
        {
          original_id: urlId,
          distinct_id: distinct_id,
          type: 'track_signup',
          event: '$SignUp',
          properties: {}
        },
        null
      );
    }
    if (urlId && isAnonymousId && !this.store.getFirstId()) {
      this.sd.identify(urlId, true);
    }
    if (urlId && !isAnonymousId && !this.store.getFirstId()) {
      this.sd.login(urlId);
    }
  };

  siteLinker.addListen = function () {
    var that = this;
    var clickFn = function (event) {
      var target = event.target;
      var nodeName = target.tagName.toLowerCase();
      var parent_target = target.parentNode;
      var sasdk_url;
      var sasdk_target;
      if ((nodeName === 'a' && target.href) || (parent_target && parent_target.tagName && parent_target.tagName.toLowerCase() === 'a' && parent_target.href)) {
        if (nodeName === 'a' && target.href) {
          sasdk_url = target.href;
          sasdk_target = target;
        } else {
          sasdk_url = parent_target.href;
          sasdk_target = parent_target;
        }
        var location = that._.URL(sasdk_url);
        var protocol = location.protocol;
        if (protocol === 'http:' || protocol === 'https:') {
          if (that.getPart(sasdk_url)) {
            that.rewriteUrl(sasdk_url, sasdk_target);
          }
        }
      }
    };
    that._.addEvent(document, 'mousedown', clickFn);
    if (!!window.PointerEvent && 'maxTouchPoints' in window.navigator && window.navigator.maxTouchPoints >= 0) {
      that._.addEvent(document, 'pointerdown', clickFn);
    }
  };

  siteLinker.init = function (sd, option) {
    this.sd = sd;
    this._ = sd._;
    this.store = sd.store;
    this.para = sd.para;
    if (this._.isObject(option) && this._.isArray(option.linker) && option.linker.length > 0) {
      this.setRefferId();
      this.addListen();
    } else {
      sd.log('请配置打通域名参数！');
      return;
    }
    this.option = option.linker;
    this.option = resolveOption(this.option);

    function resolveOption(option) {
      var len = option.length,
        arr = [];
      for (var i = 0; i < len; i++) {
        if (/[A-Za-z0-9]+\./.test(option[i].part_url) && Object.prototype.toString.call(option[i].after_hash) == '[object Boolean]') {
          arr.push(option[i]);
        } else {
          sd.log('linker 配置的第 ' + (i + 1) + ' 项格式不正确，请检查参数格式！');
        }
      }
      //option = arr;
      return arr;
    }
  };

  var siteLinkerConcatUtm = siteLinker;
  var oldRewriteUrl = siteLinker.rewriteUrl;

  // 重写 siteLinker 的 rewriteUrl 方法，原方法基础上拼接 utm 参数
  siteLinkerConcatUtm.rewriteUrl = function (url, target) {
    var me = this;
    var newUrl = oldRewriteUrl.call(this, url, target);

    var reg = /([^?#]+)(\?[^#]*)?(#.*)?/;

    // 获取 url 中的 search 参数，返回 object
    function getSearchParams(arr) {
      var obj = {};
      if (me._.isArray(arr)) {
        var temp_search = arr[2] || '';
        if (temp_search !== '') {
          var sArr = temp_search.slice(1).split('&');
          for (var i = 0; i < sArr.length; i++) {
            var tmp = sArr[i].split('=');
            obj[tmp[0]] = tmp[1];
          }
        }
      }
      return obj;
    }
    // 获取 url 中的 hash 参数，返回 object
    function getHashParams(arr) {
      var obj = {};
      if (me._.isArray(arr)) {
        var temp_hash = arr[3] || '';
        if (temp_hash !== '') {
          var temp = temp_hash.split('?');
          if (temp[1]) {
            var hArr = temp[1].split('&');
            for (var j = 0; j < hArr.length; j++) {
              var tmp = hArr[j].split('=');
              obj[tmp[0]] = tmp[1];
            }
          }
        }
      }
      return obj;
    }

    // 拼接 utm
    // 解析当前页面的 url
    var curPage = reg.exec(location.href);
    var searchObj = getSearchParams(curPage);
    var hashObj = getHashParams(curPage);

    // 来自 A 页面的 utm 参数
    var utm_type = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', '_channel_track_key'];
    // 用来处理 utm
    function utmHandler(arr) {
      var m = arr.length;
      while (m--) {
        var cur = arr.shift();
        var key = cur.split('=')[0];
        if (utm_type.indexOf(key) == -1) {
          arr.push(cur);
        }
      }
      return arr;
    }

    var utmObj = {};
    this._.each(utm_type, function (type) {
      if (type in searchObj) {
        utmObj[type] = searchObj[type];
      }
      if (type in hashObj && !(type in utmObj)) {
        utmObj[type] = hashObj[type];
      }
    });

    var resultUrl = '';
    if (!this._.isEmptyObject(utmObj)) {
      var utmStr = '';
      for (var key1 in utmObj) {
        utmStr += '&' + key1 + '=' + utmObj[key1];
      }

      // 找 B 页面中的 utm 参数，有则删除
      // 解析 newUrl
      var new_arr = reg.exec(newUrl);
      var new_host = new_arr[1] || '';
      var new_search = new_arr[2] || '';
      var new_hash = new_arr[3] || '';
      resultUrl += new_host;

      // 处理 search 部分的 utm 参数，均删除
      var search_arr = [];
      if (new_search !== '') {
        search_arr = utmHandler(new_search.slice(1).split('&'));
        if (search_arr.length) {
          resultUrl += '?' + search_arr.join('&');
        }
      }

      // 处理 hash 部分的 utm 参数，均删除
      var hash_arr = [];
      // hash 片段中 ? 之前的部分
      var hash_first = '';
      // hash 片段中 ? 之后的部分
      var hash_second = '';
      if (new_hash !== '') {
        var temp = new_hash.split('?');
        hash_first = temp[0] || '';
        hash_second = temp[1] || '';
        resultUrl += hash_first;
      }
      if (hash_second !== '') {
        hash_arr = utmHandler(hash_second.split('&'));
        if (hash_arr.length) {
          resultUrl += '?' + hash_arr.join('&');
        }
      }

      // 最后把 utm 参数拼接在 sasdk 参数之前
      var start = resultUrl.indexOf('_sasdk=');
      newUrl = resultUrl.slice(0, start) + utmStr.slice(1) + '&' + resultUrl.slice(start);
    }

    if (target) {
      target.href = newUrl;
    }
    return newUrl;
  };

  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.SiteLinkerConcatUtm = window.SensorsDataWebJSSDKPlugin.SiteLinkerConcatUtm || siteLinkerConcatUtm;
    // 避免 SiteLinker 影响 SiteLinkerConcatUtm 插件功能
    window.SensorsDataWebJSSDKPlugin.SiteLinker = { init: function () {} };
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      SiteLinkerConcatUtm: siteLinkerConcatUtm,
      SiteLinker: { init: function () {} }
    };
  }

  return siteLinkerConcatUtm;

}());
