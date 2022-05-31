sensorsDataAnalytic201505.modules['SessionEvent'] = (function () {
  'use strict';

  /**
   * 添加自定义属性
   *
   * @param { JSON } data 数据日志
   * @param { Object } instance 当前 use 插件的实例
   * @return { JSON } 添加完毕后的数据日志
   */
  function addProperties(data, instance) {
    if (data.type !== 'track') return data;
    var sd = instance.sd;
    var _ = sd._;
    var check = sd.saEvent.check;

    // 克隆数据，阻止 hookRegister 中无法对原有 data 的更改
    var copyData = _.extend2Lev({ properties: {} }, data);
    var currentProps = instance.currentProps;
    var properties = copyData.properties;
    var event = copyData.event;
    var props = {};

    _.each(currentProps, function (prop) {
      if (_.isObject(prop)) {
        if (prop.events.indexOf(event) > -1) {
          // 校验属性及属性值是否合法
          if (check({ properties: prop.properties })) {
            props = _.extend(props, prop.properties);
          }
        }
      } else if (_.isFunction(prop)) {
        var callbackProp = prop({
          event: event,
          properties: properties,
          data: copyData
        });
        // 校验属性及属性值是否合法
        if (_.isObject(callbackProp) && !_.isEmptyObject(callbackProp) && check({ properties: callbackProp })) {
          props = _.extend(props, callbackProp);
        }
      }
    });
    data.properties = _.extend(properties, props);
    return data;
  }

  function DataStageImpl(registerInstance) {
    var _this = this;
    this.sd = registerInstance.sd;
    this.currentProps = registerInstance.customRegister;
    this.interceptor = {
      addCustomProps: {
        priority: 0,
        entry: function (data) {
          addProperties(data, _this);
          return data;
        }
      }
    };
  }
  /**
   *  DataStageImpl 必须有 init 方法，可以为空方法
   */
  DataStageImpl.prototype.init = function () {};

  function registerPropertiesFeature(registerInstance) {
    // assign dataStage for registerFeature to find the dataStage implementation
    this.dataStage = new DataStageImpl(registerInstance);
  }

  function RegisterProperties() {
    this.sd = null;
    this.log = (window.console && window.console.log) || function () {};
    this.customRegister = [];
  }
  RegisterProperties.prototype.init = function (sd) {
    if (sd) {
      this.sd = sd;
      this._ = sd._;
      this.log = sd.log;
      sd.registerFeature(new registerPropertiesFeature(this));
    } else {
      this.log('神策JS SDK未成功引入');
    }
  };

  RegisterProperties.prototype.register = function (customProps) {
    if (!this.sd) {
      this.log('神策JS SDK未成功引入');
      return;
    }
    if (this._.isObject(customProps) && this._.isArray(customProps.events) && customProps.events.length > 0 && this._.isObject(customProps.properties) && !this._.isEmptyObject(customProps.properties)) {
      this.customRegister.push(customProps);
    } else {
      this.log('RegisterProperties: register 参数错误');
    }
  };

  RegisterProperties.prototype.hookRegister = function (customFun) {
    if (!this.sd) {
      this.log('神策JS SDK未成功引入');
      return;
    }
    if (this._.isFunction(customFun)) {
      this.customRegister.push(customFun);
    } else {
      this.log('RegisterProperties: hookRegister 参数错误');
    }
  };

  function Store(sd) {
    this.sd = sd;
    this._ = sd._;
    this.cookie_value = null;
  }
  Store.prototype.saveObjectVal = function (name, value) {
    if (!this._.isString(value)) {
      value = JSON.stringify(value);
    }
    if (this.sd.para.encrypt_cookie == true) {
      value = this._.encrypt(value);
    }
    if (this._.cookie.isSupport()) {
      this._.cookie.set(name, value);
    }
    this.cookie_value = value;
  };

  Store.prototype.readObjectVal = function (name) {
    var value = this._.cookie.isSupport() ? this._.cookie.get(name) : this.cookie_value;
    if (!value) return null;
    value = this._.decryptIfNeeded(value);
    return this._.safeJSONParse(value);
  };

  var COOKIE_NAME = 'sensorsdata2015jssdksession';

  function SessionEvent() {
    this.registerProperties = null;
    this.store = null;
    this.sd = null;
    this._ = null;
    this.log = (window.console && window.console.log) || function () {};
    this.cookie_name = '';
    this.prop = {};
  }

  SessionEvent.prototype.init = function (sd) {
    if (!sd || typeof sd !== 'object') {
      this.log('Session Event 插件初始化失败！');
      return;
    }
    var _this = this;
    this.sd = sd;
    this._ = sd._;
    this.log = sd.log;
    this.cookie_name = COOKIE_NAME + (sd.para.sdk_id || '');
    this.registerProperties = new RegisterProperties();
    this.registerProperties.init(sd);
    this.store = new Store(sd);
    this.registerProperties.hookRegister(function () {
      return _this.addSessionID();
    });
  };

  SessionEvent.prototype.addSessionID = function () {
    var time = +new Date();
    this.prop = this.store.readObjectVal(this.cookie_name) || {};

    var first_time = this.prop.first_session_time;
    var latest_time = this.prop.latest_session_time;
    // 切换逻辑：首次 || 向前调整时间 || 首次时间与当前时间差大于 12 小时 || 当前时间与上次触发时间大于30分钟
    if (!first_time || !latest_time || first_time > time || latest_time > time || time - first_time > 12 * 60 * 60 * 1000 || time - latest_time > 30 * 60 * 1000) {
      var uuid = this._.UUID();
      this.prop = {
        session_id: uuid.replace(/-/g, ''),
        first_session_time: time,
        latest_session_time: time
      };
    } else {
      this.prop.latest_session_time = time;
    }

    this.store.saveObjectVal(this.cookie_name, this.prop);
    return {
      $event_session_id: this.prop.session_id
    };
  };

  var instance = new SessionEvent();
  instance.__constructor__ = SessionEvent;
  // 对外公开 PageLoad 插件
  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.SessionEvent = window.SensorsDataWebJSSDKPlugin.SessionEvent || instance;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      SessionEvent: instance
    };
  }

  return instance;

}());
