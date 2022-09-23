sensorsDataAnalytic201505.modules['Exposure'] = (function () {
  'use strict';

  var sd, _, log;
  var EXPOSURE_ATTR_EVENT_NAME = 'data-sensors-exposure-event-name';
  var exposureIntersection = {};
  var exposureEleOption = [];
  var exposureConfig = {
    area_rate: 0,
    stay_duration: 0,
    repeated: true
  };

  function isSupport() {
    if (('MutationObserver' in window || 'WebKitMutationObserver' in window || 'MozMutationObserver' in window) && 'IntersectionObserver' in window) return true;
    return false;
  }

  function formatConfig(config) {
    var conf = {};
    _.each(config, function (value, k) {
      switch (k) {
      case 'area_rate':
        value = Number(value);
        if (!isNaN(value) && value >= 0 && value <= 1) {
          conf.area_rate = value;
        } else {
          log('parameter config.area_rate error. config:', config);
        }
        break;
      case 'stay_duration':
        value = Number(value);
        if (!isNaN(value) && value >= 0) {
          conf.stay_duration = value;
        } else {
          log('parameter config.stay_duration error. config:', config);
        }
        break;
      case 'repeated':
        if (value === 'false' || value === false || value === 'true' || value === true) {
          conf.repeated = value;
        } else {
          log('parameter config.repeated error. config:', config);
        }
        break;
      }
    });
    return conf;
  }
  var exposurePlugin = {
    isReady: false,
    // 插件初始化
    init: function (config) {
      if (!isSupport()) {
        log('The current browser does not support the element exposure key API, and the element exposure plugin initialization failed.');
        return;
      }

      var _this = this;
      if (_.isObject(config)) {
        exposureConfig = _.extend(exposureConfig, formatConfig(config));
      }
      _.bindReady(function () {
        // Dom 加载完毕后，检测当前元素列表，包含的曝光元素
        var nodes = _this.getElesByEventName();
        _this.addObserveByNodes(nodes);
        // 注册 document.body 变动监听
        mutation.init();
      });
      // 单页面切换监听
      sd.ee.spa.on('switch', function (last_url) {
        if (last_url === location.href) return false;
        // 清除上一页监听的曝光元素
        _this.clear();
        // 检测当前页面的曝光元素
        var nodes = _this.getElesByEventName();
        _this.addObserveByNodes(nodes);
      });
      // 浏览器标签页、最小化、最大化切换
      _.listenPageState({
        visible: function () {
          // 开始曝光监听
          _this.start();
        },
        hidden: function () {
          // 关闭曝光监听
          _this.stop();
        }
      });
      this.isReady = true;
    },
    // 获取子元素的所有含有 data-sensors-exposure-event-name 属性的元素。
    getElesByEventName: function (ele) {
      ele = ele || document;
      return ele.querySelectorAll('[' + EXPOSURE_ATTR_EVENT_NAME + ']');
    },
    // 获取当前元素的 data-sensors-exposure-event-name 属性值
    getEleEventName: function (ele) {
      return ele.getAttribute(EXPOSURE_ATTR_EVENT_NAME);
    },
    // 获取当前元素的曝光属性及配置。
    getEleAttr: function (ele, attributes) {
      attributes = attributes || ele.attributes;
      var properties = {};
      var config = {};
      var eventName = this.getEleEventName(ele);

      _.each(attributes, function (attribute) {
        var value = attribute.value;
        try {
          var property = attribute.name.match(/^data-sensors-exposure-property-(.+)/);
          if (property) {
            properties[property[1]] = value;
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
        try {
          var conf = attribute.name.match(/^data-sensors-exposure-config-(.+)/);
          if (conf) {
            switch (conf[1]) {
            case 'area_rate':
              config.area_rate = value;
              break;
            case 'stay_duration':
              config.stay_duration = value;
              break;
            case 'repeated':
              config.repeated = false;
              break;
            default:
              break;
            }
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
      });
      return {
        eventName: eventName,
        config: formatConfig(config),
        properties: properties
      };
    },
    // 根据列表查找曝光元素并注册曝光监听
    addObserveByNodes: function (nodes) {
      if (nodes.length) {
        var _this = this;
        _.each(nodes, function (node) {
          if (node.nodeType === 1 && node.hasAttribute(EXPOSURE_ATTR_EVENT_NAME)) {
            var eleAttrOption = _this.getEleAttr(node);
            eleAttrOption.config = _.extend({}, exposureConfig, eleAttrOption.config);
            eleAttrOption.ele = node;

            _this.addOrUpdateWatchEle(eleAttrOption);
          }
        });
      }
    },

    // 获取视口监听对象，如未注册相关配置的视口监听，则创建。如已注册则根据配置直接返回
    getIntersection: function (config) {
      var intersection = null;
      var _this = this;
      if (exposureIntersection[config.area_rate]) {
        intersection = exposureIntersection[config.area_rate];
      } else {
        intersection = exposureIntersection[config.area_rate] = new IntersectionObserver(
          function () {
            _this.exposure.apply(_this, arguments);
          },
          {
            threshold: config.area_rate
          }
        );
      }
      return intersection;
    },
    // 元素进入视口，并根据延时、重复曝光配置发送曝光事件。
    exposure: function (entries) {
      var _this = this;
      _.each(entries, function (entry) {
        var ele = entry.target;
        var eleOption = _this.getEleOption(ele);

        if (entry.isIntersecting === false || !eleOption || eleOption.config.isSend) {
          if (eleOption && eleOption.timer) {
            clearTimeout(eleOption.timer);
            eleOption.timer = null;
          }
          return;
        }

        //进入视口
        if (entry.intersectionRatio >= eleOption.config.area_rate) {
          if (eleOption.timer) {
            clearTimeout(eleOption.timer);
            eleOption.timer = null;
          }
          eleOption.timer = setTimeout(function () {
            var eleRect = ele.getBoundingClientRect();
            var eleOption = _this.getEleOption(ele);
            // 再次检测
            if (!eleRect.width || !eleRect.height || !eleOption || !eleOption.eventName || eleOption.config.isSend) {
              return;
            }
            var eleDetail = sd.heatmap.getEleDetail(ele);
            sd.track(eleOption.eventName, _.extend({}, eleDetail, eleOption.properties));
            eleOption.config.isSend = true;
            if (eleOption.config.repeated) {
              eleOption.config.isSend = false;
            }
          }, eleOption.config.stay_duration * 1000);
        }
      });
    },
    // 获取某个元的曝光属性及配置
    getEleOption: function (ele) {
      var eleOption = null;
      _.each(exposureEleOption, function (option) {
        if (ele === option.ele) {
          eleOption = option;
        }
      });
      return eleOption;
    },
    // 添加视口监听
    addOrUpdateWatchEle: function (option) {
      var ele = option.ele;
      var config = option.config;

      var eleOption = exposurePlugin.getEleOption(ele);

      if (eleOption) {
        _.extend2Lev(eleOption, option);
        // 如已发送且允许重复发送则置为 未发送
        if (eleOption.config.repeated) {
          eleOption.config.isSend = false;
        }
      } else {
        if (!option.eventName) {
          log('parameter option.eventName error. option:', option);
          return false;
        }
        if (!_.isElement(ele)) {
          log('parameter element error. option:', option);
        }

        var intersection = this.getIntersection(config);

        intersection.observe(ele);
        exposureEleOption.push(option);
      }
    },
    // 移除单一元素视口监听及移除该元素延时曝光事件
    removeWatchEle: function (ele) {
      var eleOption = null;
      var index = -1;
      _.each(exposureEleOption, function (v, i) {
        if (ele === v.ele) {
          eleOption = v;
          index = i;
        }
      });
      if (!eleOption) return;

      var config = eleOption.config;
      var intersection = exposureIntersection[config.area_rate];
      if (!intersection || !_.isElement(ele)) return;
      intersection.unobserve(ele);
      if (eleOption.timer) {
        clearTimeout(eleOption.timer);
        eleOption.timer = null;
      }
      index > -1 && exposureEleOption.splice(index, 1);
    },
    // 根据记录，启动曝光视口监听
    start: function () {
      _.each(exposureEleOption, function (option) {
        var config = option.config;
        var ele = option.ele;
        var intersection = exposureIntersection[config.area_rate];
        if (!intersection || !_.isElement(ele)) return;
        intersection.observe(ele);
      });
    },
    // 根据记录，暂停曝光视口监听，及移除待曝光事件发送
    stop: function () {
      _.each(exposureEleOption, function (option) {
        var config = option.config;
        var ele = option.ele;
        var intersection = exposureIntersection[config.area_rate];
        if (!intersection || !_.isElement(ele)) return;
        intersection.unobserve(ele);
        if (option.timer) {
          clearTimeout(option.timer);
          option.timer = null;
        }
      });
    },
    // 清空当前所有
    clear: function () {
      this.stop();
      exposureIntersection = {};
      exposureEleOption = [];
    }
  };

  var mutation = {
    mo: null,
    init: function () {
      var Mo = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      this.mo = new Mo(this.listenNodesChange);
      this.observe();
    },
    observe: function () {
      this.mo.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeOldValue: true
      });
    },
    listenNodesChange: function (mutationsList) {
      _.each(mutationsList, function (mutation) {
        switch (mutation.type) {
        case 'childList':
          if (mutation.removedNodes.length > 0) {
            _.each(mutation.removedNodes, function (node) {
              if (node.nodeType === 1) {
                // 当前元素
                exposurePlugin.removeWatchEle(node);

                // 变动元素子元素查找
                var removeNodes = exposurePlugin.getElesByEventName(node);
                if (removeNodes.length) {
                  _.each(removeNodes, function (removeNode) {
                    exposurePlugin.removeWatchEle(removeNode);
                  });
                }
              }
            });
          } else if (mutation.addedNodes.length) {
            // 当前元素
            exposurePlugin.addObserveByNodes(mutation.addedNodes);

            // 变动元素子元素查找
            _.each(mutation.addedNodes, function (node) {
              if (node.nodeType === 1) {
                var nodes = exposurePlugin.getElesByEventName(node);
                exposurePlugin.addObserveByNodes(nodes);
              }
            });
          }
          break;
        case 'attributes':
          if (!mutation.attributeName) return false;

          var ele = mutation.target;
          var changeAttrKey = mutation.attributeName;

          // 不属于曝光属性配置不监听
          if (!_.isString(changeAttrKey) || changeAttrKey.indexOf('data-sensors-exposure') < 0) return;

          // 根据改变的属性修改
          var eleEleOption = exposurePlugin.getEleAttr(ele, [{ name: changeAttrKey }]);
          // 如新增属性，则使用默认配置
          var eleOption = exposurePlugin.getEleOption(ele) || { ele: ele, config: exposureConfig };

          // 合并配置
          var updateEleOption = _.extend2Lev({}, eleOption, eleEleOption);

          // 如已注册元素，则仅更新修改的自定义属性
          if (Object.prototype.hasOwnProperty.call(updateEleOption, 'eventName')) {
            exposurePlugin.addOrUpdateWatchEle(updateEleOption);
          } else {
            exposurePlugin.removeWatchEle(ele);
          }
          break;
        }
      });
    }
  };
  /**
   * 初始化曝光插件
   *
   * @param { Object } config 曝光插件初始化配置信息
   *
   * 示例：
   *
   * sensors.use('Exposure',{
   *
   *  area_rate: 0.5, // 可见比例。 类型: Number 值域: 0 ~ 1 默认: 0
   *
   *  stay_duration: 6, // 有效停留时间。 类型: Number 值域: > 0 默认: 0
   *
   *  repeated: false // 重复曝光。 类型: Boolean 默认: true
   *
   * })
   */

  var Exposure = {
    exposureViews: exposureEleOption,
    init: function (sa, option) {
      if (!sa || sd) {
        return false;
      }
      sd = sa;
      _ = sd._;
      log = sd.log;
      if (sd.on && sd.readyState.state < 3) {
        sd.on('sdkAfterInitPara', function () {
          exposurePlugin.init(option);
        });
      } else {
        exposurePlugin.init(option);
      }
      log('Exposure Plugin initialized successfully');
    },
    addExposureView: function (ele, option) {
      if (!exposurePlugin.isReady) {
        log('Exposure Plugin uninitialized.');
        return;
      }
      if (!_.isElement(ele)) {
        log('parameter element error.');
        return;
      }
      var eleOption = {
        ele: ele,
        config: _.isObject(option.config) ? formatConfig(option.config) : {},
        eventName: option.eventName,
        properties: _.isObject(option.properties) ? option.properties : {}
      };
      var exposureEleOption = exposurePlugin.getEleOption(ele);

      if (exposureEleOption) {
        exposureEleOption = _.extend2Lev({}, exposureEleOption, eleOption);
        if (!_.isString(exposureEleOption.eventName) || !exposureEleOption.eventName) {
          log('parameter option.eventName error. option', option);
          return;
        }
        // 如已发送且允许重复发送则置为 未发送
        if (exposureEleOption.config.repeated) {
          exposureEleOption.config.isSend = false;
        }
      } else {
        if (!_.isString(eleOption.eventName) || !eleOption.eventName) {
          log('parameter option.eventName error. option', option);
          return;
        }
        exposurePlugin.addOrUpdateWatchEle(eleOption);
      }
    },
    removeExposureView: function (ele) {
      if (!exposurePlugin.isReady) {
        log('Exposure Plugin uninitialized.');
        return;
      }
      if (!_.isElement(ele)) {
        log('removeExposureView parameter ele errors.');
        return;
      }
      exposurePlugin.removeWatchEle(ele);
    }
  };

  // 对外公开 Exposure 插件
  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.Exposure = window.SensorsDataWebJSSDKPlugin.Exposure || Exposure;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      Exposure: Exposure
    };
  }

  return Exposure;

}());
