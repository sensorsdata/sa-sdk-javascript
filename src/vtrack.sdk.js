_.loadScript = function(para) {
  para = _.extend({
    success: function() {},
    error: function() {},
    appendCall: function(g) {
      document.getElementsByTagName('head')[0].appendChild(g);
    }
  }, para);
  return new Promise(function(resolve, reject) {
    var g = null;
    if (para.type === 'css') {
      g = document.createElement('link');
      g.rel = 'stylesheet';
      g.href = para.url;
    }
    if (para.type === 'js') {
      g = document.createElement('script');
      g.async = 'async';
      g.src = para.url;
      g.type = 'text/javascript';
    }
    g.onload = g.onreadystatechange = function() {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        resolve();
        para.success();
        g.onload = g.onreadystatechange = null;
      }
    };
    g.onerror = function() {
      reject();
      para.error();
      g.onerror = null;
    };
    // 为iframe 设计
    para.appendCall(g);

  });
};


function SdkMain() {
  // 是否load过


  this.SAS = {};
  this.SAS.IGNORE = {
    tag: 'sensors_ignore_tag',
    iself: 'self',
    iall: 'all',
    // 过滤已有的class样式
    iclass: {
      'sensors-outline-highlight-frame': true,
      'sensors-outline-highlight-frame-deployed': true,
      'sensors-outline-highlight-frame-select': true
    }
  };

  // jsonp名字
  this.jsonpCallback = 'sensorsDataAnalytic201505callback';

  var urlParse;
  // 如果有web_url
  if (sd.para.web_url) {
    urlParse = new _.urlParse(sd.para.web_url);
    urlParse._values.Path = '/api';
  } else {
    // 否则用config_url
    urlParse = new _.urlParse(sd.para.config_url);
    urlParse._values.Path = '/api';
  }

  this.apiDomain = urlParse.getUrl();

  // config  这个是config url里的值。其他全部是web的url
  var vtrack_config_url = sd.para.config_url.split('?');
  if (vtrack_config_url.length === 2) {
    this.deployUrl = vtrack_config_url[0].replace(/\/$/, '') + '/Web.json' + '?' + vtrack_config_url[1];
  } else if (vtrack_config_url.length === 1) {
    this.deployUrl = vtrack_config_url[0].replace(/\/$/, '') + '/Web.json';
  } else {
    logger.info('config_url不合法');
  }

  // token
  urlParse._values.Path = '/api/vtrack/edit_mode';
  this.tokenUrl = urlParse.getUrl();
  // define event
  urlParse._values.Path = '/api/vtrack/event';
  this.defineUrl = urlParse.getUrl();
  // 所有绑定的事件
  urlParse._values.Path = '/api/vtrack/binding/Web.json';
  this.getAllVtrackUrl = urlParse.getUrl();
  // 显示所有vtack的事件
  urlParse._values.Path = '/api/vtrack/events/all';
  this.vtrackEventsUrl = urlParse.getUrl();

  urlParse._values.Path = '/api/vtrack/triggers';
  this.vtrackDeleteUrl = urlParse.getUrl();

  urlParse._values.Path = '/api/vtrack/deploy/Web';
  this.vtrackDeployUrl = urlParse.getUrl();


  // 可视化模式cookie名字
  this.visualCookie = 'sensorsdata2015_visual_mode';
  // 可视化模式session时长20分
  this.visualCookieExistTime = 20 * 60 + 's';
  // 可视化模式search
  this.visualSearchName = '?sensorsdata_visual_mode_in';

  this.visualCookieNavStatusName = 'navStatus';
  // 存储调试模式中的测试数据的
  this.visualStorageName = 'sensorsdata_vtrack_data';

  var sdk_url = sd.para.sdk_url.replace(/\/[^\/]+$/, '');
  var sdk_version = sd.para.sdk_url.match(/\/[^\/]+$/, '')[0].replace(/^\/[^\.]+/, '').replace(/[^.]+$/, '');

  this.sdkJsUrl = sd.para.vtrack_js_file || (sdk_url + '/vendor' + sdk_version + 'js' + sd.para.noCache);
  this.sdkCssUrl = sd.para.vtrack_css_file || (sdk_url + '/vendor' + sdk_version + 'css' + sd.para.noCache);

  this.deployData = null;
  if(sd.para.auto_init === true){
    this._init();
  }
}

SdkMain.prototype = {
  browserIsSupport: function() {
    // 必须支持localstorage的浏览器
    if (typeof window.localStorage === "object" && window.localStorage.setItem) {
      return true;
    } else {
      return false;
    }
  },
  showErrorTip: function(obj) {
    if (typeof obj !== 'object') {
      return false;
    }
    var errorTip = $('<div style="background:#e55b41;border:none;border-radius:8px;color:#fff;font-size:18px;left:50%;margin-left:-300px;padding:15px;position: fixed;text-align: center;top: 0;width:600px;z-index:9999;">' + obj.tip + '</div>');

    errorTip.appendTo(document.body);

    setTimeout(function() {

      obj.func && obj.func();
      errorTip.remove();

    }, obj.time);
  },
  getLifeCookieNavStatus: function() {
    return this.getLifeCookie()[this.visualCookieNavStatusName];
  },
  // 获取生命周期内的cookie obj
  getLifeCookie: function() {
    var str = _.cookie.get(this.visualCookie);
    if (str === null) {
      return {};
    } else {
      return JSON.parse(str);
    }
  },
  setLifeCookieNavStatus: function(value) {
    this.setLifeCookie(this.visualCookieNavStatusName, value);
  },
  // 设置生命周期内的cookie
  setLifeCookie: function(key, value) {
    var cookieVal = _.cookie.get(this.visualCookie);
    var cookieObj = cookieVal ? JSON.parse(cookieVal) : {};
    if (typeof key === 'undefined') {
      if (cookieVal) {
        _.cookie.set(this.visualCookie, cookieVal, this.visualCookieExistTime);
      } else {
        _.cookie.set(this.visualCookie, '{}', this.visualCookieExistTime);
      }
    } else {
      cookieObj[key] = value;
      _.cookie.set(this.visualCookie, JSON.stringify(cookieObj), this.visualCookieExistTime);
    }

  },
  removeLifeCookie: function() {
    _.cookie.remove(this.visualCookie);
  },

  isShowVisual: function() {

    var url = location.href;
    var replaceTag = '';

    var me = this;

    function isSupportBrowser() {
      if (!me.browserIsSupport()) {
        me.showErrorTip({
          tip: '对不起，可视化埋点暂不支持你当前的浏览器，请升级至ie10以上，推荐使用chrome，firefox，safari等浏览器',
          time: 10000
        });
        return false;
      } else {
        return true;
      }
    }

    function removeUrlPara() {
      url = url.replace(/\?sensorsdata_visual_mode_in/, '');

      location.replace(url);

    }

    if (url.indexOf(this.visualSearchName) !== -1) {
      if (!isSupportBrowser()) {
        return false;
      }
      // 如果有参数
      this.getToken({
        successCallback: function() {
          window.localStorage.removeItem(me.visualStorageName);
          me.setLifeCookie();
          removeUrlPara();
        }, errorCallback: function() {

          me.showErrorTip({
            time: 50000,
            tip: '您未被授权，请检查链接是否有效',
            func: function() {
              //me.removeLifeCookie();
              removeUrlPara();
            }
          });

        }
      });

    } else if (_.cookie.get(this.visualCookie)) {
      if (!isSupportBrowser()) {
        return false;
      }
      // 如果是
      this.getToken({
        successCallback: function() {
          me.enterVisibleMode();
        }, errorCallback: function() {
          me.removeLifeCookie();
          me.enterNormalMode();
        }
      });

    } else {
      this.enterNormalMode();
    }

  },
  getDeployFile: function() {
    return _.loadScript({
      url: this.deployUrl,
      type: 'js'
    });
  },
  getToken: function(para) {
    var me = this;
    para = para || {};
    para.enterNext = para.enterNext || true;

    para = _.extend({
      successCallback: function() {},
      errorCallback: function() {}
    }, para);

    var url = '';
    if (me.tokenUrl.indexOf('?') !== -1) {
      url = me.tokenUrl + '&url=' + location.href.replace(me.visualSearchName, '');
    } else {
      url = me.tokenUrl + '?url=' + location.href.replace(me.visualSearchName, '');
    }

    return _.ajax({
      cors: true,
      type: 'GET',
      url: url,
      header: {cors: "true"},
      success: function(data) {
        if (data.login === true) {
          para.successCallback();
        } else {
          para.errorCallback();
        }
      },
      error: function() {
        para.errorCallback();
      }
    });

  },


  initJsonp: function() {
    var me = this;
    window[this.jsonpCallback] = {};
    window[this.jsonpCallback].vTrack = function(data) {
      me.deployData = data.binding;
    };
  },
  _init: function() {

    sd._init();
    this.initJsonp();
    if(!sd.is_heatmap_render_mode){
      this.isShowVisual();
    }

  },
  //------------visible mode
  enterVisibleMode: function() {
    var me = this;
    // 每隔10分钟set一次coookie用来保证前端用户一直登录
    setInterval(function() {
      me.setLifeCookie();
      _.ajax({
        cors: true,
        type: 'GET',
        url: me.tokenUrl,
        header: {cors: "true"}
      });
    }, 1000 * 60 * 10);

    // 标志是visual模式
    sd.vtrack_mode = 'visualMode';

    // 登录成功，设置cookie表示已经登录
    this.setLifeCookie();


    // 这里可以再优化下，如果没加载成功，提示
    var me = this;
    var loadJs = _.loadScript({
      url: me.sdkJsUrl,
      type: 'js'
    });

    var loadCss = _.loadScript({
      url: me.sdkCssUrl,
      type: 'css'
    });

    // 给iframe里的页面加载css
    $('iframe').each(function(a, b) {
      _.loadScript({
        url: me.sdkCssUrl,
        type: 'css',
        appendCall: function(g) {
          try {
            $(b).contents()[0].getElementsByTagName('head')[0].appendChild(g);
          } catch (e) {
          }
          ;

        }
      });
    });

  },

  //-------------normal mode
  enterNormalMode: function() {
    sd.vtrack_mode = 'normalMode';

    var me = this;
    this.getDeployFile().then(function() {
      me.parseDeployFile();
    });
  },
  parseDeployFile: function() {
    this.requireData = this.checkUrl(this.deployData);
    this.listenEvents();
  },
  getEle: function(data) {
    var ele;
    if ($(data.nthEle[0]) && $(data.nthEle[0]).prop('tagName') === 'IFRAME') {
      try {
        ele = $(data.nthEle[0]).contents().find(data.nthEle.slice(1).join(' '));
      } catch (e) {
      }
      ;

    } else {
      ele = $(data.nthEle.join(' '));
    }
    if (data.selfAttr && data.selfAttr.text !== void 0) {
      ele = ele.filter(':contains(' + data.selfAttr.text + ')');
    }
    return ele;
  },
  getEleExcept: function(data) {
    var SAS = this.SAS;
    var ele;
    var newEle = null;
    //var ele = all.filter(':not([sensors_ignore_tag])');

    if ($(data.nthEle[0]) && $(data.nthEle[0]).prop('tagName') === 'IFRAME') {

      try {
        newEle = $(data.nthEle[0]).contents().find(data.nthEle.slice(1).join(' '));
      } catch (e) {
      }
      ;

      if (data.selfAttr && data.selfAttr.text !== void 0) {
        newEle = newEle.filter(':contains(' + data.selfAttr.text + ')');
      }

    } else {
      ele = $(data.nthEle.join(' '));

      if (data.selfAttr && data.selfAttr.text !== void 0) {
        ele = ele.filter(':contains(' + data.selfAttr.text + ')');
      }
      ele.each(function(a, b) {
        b = $(b);
        if (b.closest('[' + SAS.IGNORE.tag + '="' + SAS.IGNORE.iall + '"]').length === 0 && b.attr(SAS.IGNORE.tag) !== SAS.IGNORE.iself) {
          newEle = newEle ? newEle.add(b) : b;
        }
      });

    }
    return newEle;
  },
  // {'eventProxy':[],'eventBind':[]}
  //listen vtrack events all  普通模式下，监听事件
  listenEvents: function() {
    var data = this.requireData;
    var me = this;
    for (var i = 0; i < data.length; i++) {
      this.getEle(data[i]).on('click', function(ev) {
        return function() {
          me.doVTrackAction(ev);
        }
      }(data[i]));
    }
  },
  doVTrackAction: function(data) {
    sd.track(
      data.eventName,
      {
        $from_vtrack: String(data.trigger_id)
      },
      {
        $lib_method: 'vtrack',
        $lib_detail: String(data.trigger_id)
      }
    );
  },
  // 检测url是否符合当前页面
  checkUrl: function(data) {
    var returnData = [];
    var currentUrl = location.href.replace(/#.*$/, '');
    var urlObj = null;
    for (var i in data) {
      if (_.isJSONString(i)) {
        urlObj = JSON.parse(i);
      } else {
        continue;
      }
      urlObj.url = urlObj.url.replace(/#.*$/, '');
      // 所有网站
      if (urlObj.url === '') {
        returnData = returnData.concat(data[i]);
        //把＃后的认为一致
      } else if (urlObj.mode === 'fixed') {
        if (urlObj.url === currentUrl) {
          returnData = returnData.concat(data[i]);
        }
      } else if (urlObj.mode === 'part') {
        if (currentUrl.indexOf(urlObj.url) !== -1) {
          returnData = returnData.concat(data[i]);
        }
      } else if (urlObj.mode === 'regexp') {
        if ((new RegExp(urlObj.url)).test(currentUrl)) {
          returnData = returnData.concat(data[i]);
        }
      }
    }
    return returnData;
  }
};

sd.sdkMain = new SdkMain();