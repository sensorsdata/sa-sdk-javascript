(function() {
  var sd = window['sensorsDataAnalytic201505'];
  sd = window[sd];

  if ((typeof sd !== 'function' && typeof sd !== 'object' ) || !sd.has_load_sdk || sd.has_load_vendor) {
    return false;
  }
  sd.has_load_vendor = true;

  var _ = sd._;
  var sdkMain = sd.sdkMain;
  var sdkVisual = {};
  sd.sdkVisual = sdkVisual;
  var $ = sd.$;
  // 一些常量，过滤
  var SAS = sdkMain.SAS;

  var doT = {};
@@include('sa-sdk-javascript/src/template.js')
  sd.template = doT.gtemplate;

  //json格式化

  @@include('sa-sdk-javascript/src/jsontree.js')
  sd.JSONTree = JSONTree;


  // suggest
  @@include('sa-sdk-javascript/src/suggest.js')

  var Utils = {};
  Utils.Formatting = {
    escape: function(str) {
      return str.replace(/"/g, '\\"').replace(/'/g, '\\\'');
    },
    capitalize: function(str, leadingOnly) {
      var capitalizeWord;
      if (str == null) {
        str = '';
      }
      capitalizeWord = function(str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
      };
      if (leadingOnly) {
        return capitalizeWord(str);
      }
      return str.split(' ').map(capitalizeWord).join(' ');
    },
    numberWithCommas: function(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  };


@@include('sa-sdk-javascript/src/modal.js')

  $.fn.gSelectBox = function() {
    return $(this).each(function(a, b) {
      $(b).css({position: 'relative'});
      var label = $('<label></label>');
      $(b).prepend(label);
      var arrow = $('<i class="sensors_jssdk_gselect_box_arrow">&lt;</i>');
      arrow.css({color: 'rgb(0, 178, 122)', display: 'block', font: '14px Comic Sans MS', position: 'absolute', right: '10px', top: '8px', transform: 'rotate(270deg)'});
      $(b).prepend(arrow);
      var select = $(b).find('select');
      select.addClass('sensors_jssdk_gselect_box_select').css({cursor: 'pointer', position: 'absolute', opacity: 0, width: '100%', height: '100%', left: 0, top: 0}).off('change').on('change', function() {
        label.text($(this).find('option:checked').text());
      });
      label.text(select.find('option:checked').text());

    });
  };


  // draggable
  (function() {
    $.fn.gdrag = function(o) {
      o = $.extend({
        bar: null,
        sty: 'draggable'
      }, o);
      $(this).each(function() {
        $(this).on('mousedown', function(e) {
          if (e.target.tagName === 'BUTTON') {
            return false;
          }
          var that = o.bar || $(this),
            startfx = e.pageX,
            startfy = e.pageY,
            starttx = that.offset().left,
            startty = that.offset().top;
          e.preventDefault();
          $(document).on("mousemove", movehand).on("mouseup", uphand);
          function movehand(event) {
            that.addClass(o.sty).offset({
              top: startty + event.pageY - startfy,
              left: starttx + event.pageX - startfx
            })
            if (!o.keepBottom) {
              that.css({
                bottom: 'auto'
              });
            }
            event.stopPropagation();
          }

          function uphand(event) {
            that.removeClass(o.sty);
            $(document).off("mousemove", movehand).off("mouseup", uphand);
            event.stopPropagation();
          }
        })
      });
      return $(this);
    };
  })();


  // highlight

  function Highlight(className) {
    this.state = [];
    this.highlightClass = className;
  }

  Highlight.prototype = {
    // 下次再次掉用时会自动清楚上次的
    add: function($t) {
      this.removeAll();
      this.addMore($t);
    },
    remove: function($t) {
      $t.removeClass(this.highlightClass);
    },
    removeAll: function() {
      for (var i = 0; i < this.state.length; i++) {
        if (this.state[i]) {
          this.state[i].removeClass(this.highlightClass);
        }
      }
      this.state = [];
    },
    removeHTML: function() {
      $('.' + this.highlightClass).removeClass(this.highlightClass);
      this.state = [];
    },
    // 多次的掉用，不会清除上次的
    addMore: function($t) {
      if ($t && ($t instanceof $)) {
        $t.addClass(this.highlightClass);
        this.state.push($t);
      }
    }
  };

  //元素点击时的高亮
  var highlightSelected = new Highlight('sensors-outline-highlight-frame');
  // 部署过的元素的高亮
  var highlightDeployedSelected = new Highlight('sensors-outline-highlight-frame-deployed');


  function EventDefine() {

  }

  EventDefine.prototype = {

    getSelfAttr: function($target) {
      var selector = {}, text, href, tagName = $target.prop('tagName').toLowerCase();

      text = $target.text();
      if (text) {
        selector.text = text;
      }

      return selector;

    },
    toSelector: function($target) {
      var isValidAttr = function(attr) {
        return /^[\w-]+$/g.test(attr);
      };
      var classes, err, finalSelector, id, illegalId, produceSelector, selector, tag, _ref;
      tag = $target.prop('tagName').toLowerCase();
      id = $target.attr('id');

      // todo     classes = _.compact((_ref = $target.attr('class')) != null ? _ref.split(' ') : void 0);

      _ref = $target.prop('className');
      if (_ref != null) {
        _ref = ' ' + $target.prop('className') + ' ';
        for (var i in SAS.IGNORE.iclass) {

          _ref = _ref.replace(' ' + i + ' ', '');

        }
        _ref = _ref.replace(/^\s+/, '').replace(/\s+$/, '');
        if (_ref === '') {
          classes = [];
        } else {
          classes = _ref.split(' ')
        }
      } else {
        classes = [];
      }


      selector = tag;

      if (id && (!sd.para.vtrack_ignore.ignore_id || !sd.para.vtrack_ignore.ignore_id(id))) {
        selector += "#" + id;
      }

      produceSelector = function(classes) {
        if (classes.length) {
          return "" + selector + "." + (classes.join('.'));
        } else {
          return selector;
        }
      };
      try {
        finalSelector = produceSelector(classes);
        $(finalSelector);
      } catch (_error) {
        err = _error;
        classes = classes.filter(isValidAttr);
        finalSelector = produceSelector(classes);
      }
      return finalSelector;
    },
    toAllSelector: function($target, outDocuemnt) {
      outDocuemnt = outDocuemnt ? $(outDocuemnt) : $(document);
      var $parent, newSelSize, newSelector, parts, selSize, selector, targetSel;
      selector = this.toSelector($target, outDocuemnt);
      $parent = $target.parent();
      selSize = outDocuemnt.find(selector).length;
      while ($parent.prop('tagName') !== 'BODY' && selSize !== 1) {
        newSelector = '' + (this.toSelector($parent)) + ' ' + selector;
        newSelSize = outDocuemnt.find(newSelector).length;
        if (newSelSize < selSize) {
          selector = newSelector;
          selSize = newSelSize;
        }
        $parent = $parent.parent();
      }
      var nthEle = selector;
      var selfAttr = this.getSelfAttr($target);

      return {
        nthEle: nthEle,
        selfAttr: selfAttr
      };

    }


  };


  // 浮层模块
  function Floatlayer() {

    this.ignore = SAS.IGNORE;

    //this.textErrorEle = this.eleError.text();

    this.verifyRule = Floatlayer.rule;


    this.eleOut = $('<div class="sensors-jssdk-modal sensors-jssdk-fade" id="sensorsdata_vtrack_floatlayer_out" tabindex="-1" role="dialog" aria-hidden="true" sensors_ignore_tag="all"></div>');
    this.eleOut.appendTo($(document.body));


    this.tpl = sd.template.popover_box;

    this.eleOut.on('hide.bs.modal', function() {
      highlightSelected.removeAll();
    });


  }

  Floatlayer.rule = {
    name: function(val) {
      var reg = /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i;
      return reg.test(val) ? true : '英文事件名只支持英文、数字和下划线，且不能是预置名字。';
    },
    url: function(val) {
      return val !== '' ? true : 'url不能为空';
    },
    selfText: function(val) {
      return val !== '' ? true : '包含内容不能为空';
    }
  };


  Floatlayer.prototype = {
    init: function(obj) {


      this.target = obj.target;
      this.selector = obj.selector;

      var $parent = this.target;
      if ($parent.prop('tagName') === 'BODY' || $parent.attr(this.ignore.tag) === this.ignore.iself) {
        return false;
      }
      $parent = $parent.parent();
      while ($parent.prop('tagName') !== 'BODY') {
        if ($parent.attr(this.ignore.tag) === this.ignore.iall) {
          return false;
        }
        $parent = $parent.parent();
      }

      highlightSelected.add(this.target);
      this.show();


    },
    getEleData: function() {
      this.dataDefine = {
        name: '',
        nthEle: this.selector.nthEle.split(' '),
        //selfAttr: this.selector.selfAttr,
        selfText: this.selector.selfAttr.text
      }
      return this.dataDefine;
    },
    checkUrlMethodShow: function() {
      // 文峰要求如果是没有search和hash的url，就默认是固定匹配
      var href = location.href.replace(/\?$/, '').replace(/#$/, '');
      var mode = 'part';
      if (location.search === '' && location.hash === '') {
        mode = 'fixed';
      }

      this.eleOut.find('[data-name="sensorsdata-vtrack-url-radio"]').val(mode);
      var urlInput = this.eleOut.find('[data-name="url"]');
      urlInput.val(href);

      if (mode === 'fixed') {
        urlInput.prop('disabled', true);
      } else if (mode === 'part') {
        urlInput.prop('disabled', false);
        href = href.replace(/\?.+$/, '').replace(/#.+$/, '');
        urlInput.val(href);
      }

      try {
        urlInput.get(0).selectionStart = urlInput.get(0).value.length;
      } catch (e) {
      }

    },
    show: function() {
      var me = this;
      var data = this.getEleData();
      this.eleOut.html(this.tpl(data));

      this.checkUrlMethodShow();

      this.eleOut.find('.sensors-jssdk-gselectbox-out').gSelectBox();

      this.eleOut.modal({
        sacallback: function() {
          setTimeout(function() {

            var name = me.eleOut.find('input[data-name="name"]');
            var cname = me.eleOut.find('input[data-name="cname"]');


            _.ajax({
              url: sdkMain.vtrackEventsUrl,
              cors: true,
              header: {cors: "true"},
              success: function(data) {
                data = data || [];
                if (data.length === 0) {
                  return false;
                }

                var suggest = new Awesomplete(name[0], {
                  filter: Awesomplete.FILTER_CONTAINS,
                  maxItems: 10,
                  list: data,
                  minChars: 0,
                  data: function(text, input) {
                    return {label: text.name + ' (' + text.cname + ')', value: text.name, cname: text.cname};
                  },
                  awesomplete_select: function(text, origin) {
                    var nameval = text.text.value;
                    if (nameval !== '') {
                      var name2 = $.grep(data, function(obj) {
                        return obj.name === nameval;
                      });
                      if (name2.length !== 0) {
                        cname.val(name2[0].cname);
                      } else {
                        cname.val('');
                      }
                    }
                  }
                });

                name.focus().on('input', function() {
                  var nameval = name.val();
                  if (nameval !== '') {
                    var name2 = $.grep(data, function(obj) {
                      return obj.name === nameval;
                    });
                    if (name2.length !== 0) {
                      cname.val(name2[0].cname);
                    } else {
                      cname.val('');
                    }
                  }
                });


              },
              error: function() {
              }
            });


          }, 0);
        }
      });

      this.events_();


    },
    events_: function() {
      var me = this;
      this.eleOut.find('.sensors-jssdk-popover-button').off().on('click', function() {
        me.defineEvent();
      });

      this.eleOut.find('[data-name="sensorsdata-vtrack-url-radio"]').on('change', function() {
        me.eleOut.find('[data-name="url"]').prop('disabled', false);
      });

      var ele = this.eleOut.find('[data-name="selfText"]');
      var eleSelect = this.eleOut.find('[data-name="selfTextCheck"]');
      eleSelect.on('change', function() {
        if ($(this).val() === 'yes') {
          ele.show();
        } else {
          ele.hide();
        }
      });

      if (eleSelect.val() === 'yes') {
        ele.show();
      } else {
        ele.hide();
      }


    },
    close: function() {
      this.eleOut.modal('hide');
    },
    getSelfSelector: function() {
      var out = this.eleOut;
      var selfSelector = {};
      //var selector = $(this.dataDefine.nthEle);

      if (out.find('[data-name="selfTextCheck"] option:checked').val() === 'yes') {
        selfSelector.text = out.find('[data-name="selfText"]').val();
      }
      return selfSelector;
    },
    getDefineData: function() {

      var out = this.eleOut;
      return {
        name: out.find('[data-name="name"]').val(),
        cname: out.find('[data-name="cname"]').val(),
        url: out.find('[data-name="url"]').val(),
        urlMode: out.find('[data-name="sensorsdata-vtrack-url-radio"] option:checked').val(),
        selfAttr: this.getSelfSelector()
        //selector: this.getSelector()
      };
    },
    checkDefineData: function(pageDefineData) {
      var temp = null;
      for (var i in pageDefineData) {
        if (this.verifyRule[i]) {
          temp = this.verifyRule[i](pageDefineData[i]);
          if (temp !== true) {
            return temp;
          }
        }

      }
      return true;
    },
    closePop: function() {
      highlightSelected.removeAll();
      sdkVisual.floatlayer.close();
    },
    //   {name:'事件名', url:'', triggers:  JSON.stringify {nthEle:['层级从外到内'],selfAttr:{href:'',text:''},url:''}}
    defineEvent: function() {
      var me = this;

      var originalData = this.getDefineData();
      var dataEvent = {};

      dataEvent.name = originalData.name;
      if (originalData.cname !== '') {
        dataEvent.cname = originalData.cname;
      }

      dataEvent.triggers = [];
      dataEvent.triggers[0] = {};
      dataEvent.triggers[0].lib = 'Web';
      dataEvent.triggers[0].url = JSON.stringify({
        url: originalData.url,
        mode: originalData.urlMode,
        origin: location.href
      });
      dataEvent.triggers[0].config = {};
      dataEvent.triggers[0].snapshot = '';


      dataEvent.triggers[0].config.eventName = originalData.name;
      //    dataEvent.triggers[0].config.cname = originalData.cname;

      // 注意先后顺序问题，影响
      dataEvent.triggers[0].config.nthEle = this.dataDefine.nthEle;
      dataEvent.triggers[0].config.selfAttr = originalData.selfAttr;

      //      dataEvent.triggers[0].config.selector = orginal.selector;
      //      dataEvent.triggers[0].config.url = dataEvent.url;

      dataEvent.triggers[0].config = JSON.stringify(dataEvent.triggers[0].config);


      var dataCheck = {
        name: originalData.name,
        url: originalData.url
      };
      /*
       if(this.eleOut.find('[data-name="selfTextCheck"]').is(':visible')){
       dataCheck.selfText = originalData.selfAttr.text || '';
       }*/
      var data = this.checkDefineData(dataCheck);


      if (typeof data === 'string' || !data) {
        this.showError(data);
        return false;
      }

      _.ajax({
        url: sdkMain.defineUrl,
        type: 'POST',
        cors: true,
        header: {cors: "true"},
        contentType: 'application/json',
        data: JSON.stringify(dataEvent),
        success: function(data) {
          me.closePop();
          sdkVisual.triggerBox.show();
        },
        error: function(data, code) {
          if (code === 409) {
            me.showError('已经有了相同的埋点条件');
          }
        }

      });


    },

    showError: function(data) {
      var errorEle = this.eleOut.find('.sensors-jssdk-popover-head-error-notice');
      errorEle.text(data).show();
      setTimeout(function() {
        errorEle.hide();
      }, 6000)

    }

  }


  sdkVisual.floatlayer = new Floatlayer();

  function HeaderBar(para) {
    this.tpl = sd.template.head_box;
    this.bar = null;
    this.btnDefine = null;
    this.btnTest = null;
    this.btnQuit = null;
    this.btnMini = null;

    this.data = para.data;

    this.init();
  }

  HeaderBar.prototype = {
    init: function() {

      var tpl = this.tpl(this.data);
      this.bar = $(tpl);

      $(document.body).append(this.bar);

      this.btnDefine = this.bar.find('[data-sensors-action="define_mode"]');
      this.btnTest = this.bar.find('[data-sensors-action="test_mode"]');
      this.btnQuit = this.bar.find('[data-sensors-action="exit_login"]');

      this.btnDefineUrl = this.bar.find('[data-sensors-action="define_url"]');
      this.btnTrigger = this.bar.find('[data-sensors-action="trigger_box"]');

      this.btnMini = this.bar.find('[data-sensors-action="mini-right"]');
      this.btnMini2 = $('<div sensors_ignore_tag="all" class="sensors-jssdk-head-out" style="width: auto;display:none;"> <div class="sensors-jssdk-head-in"><div class="sensors-jssdk-head-in-right" style="width: auto;"><button data-sensors-action="mini-right-2" style="background: rgb(0, 153, 119) none repeat scroll 0% 0%; font-weight: bold;" class="sensors-jssdk-btn"> &lt; </button></div></div></div>');
      $(document.body).append(this.btnMini2);

      this.events_();
    },
    quit: function() {
      var me = this;
      _.ajax({
        url: sdkMain.tokenUrl,
        type: 'delete',
        cors: true,
        header: {cors: "true"},
        success: function() {
          sdkMain.removeLifeCookie();
          location.reload();
        },
        error: function() {

        }
      });

    },
    defineMode: function() {
      if (this.btnDefine.hasClass('sensors-jssdk-btn-success')) {
        return false;
      } else {
        sdkMain.setLifeCookieNavStatus('defineMode');

        location.reload();
      }
    },
    testMode: function() {
      if (this.btnTest.hasClass('sensors-jssdk-btn-success')) {
        return false;
      } else {
        sdkMain.setLifeCookieNavStatus('testMode');

        location.reload();
      }
    },
    events_: function() {
      var me = this;

      me.bar.gdrag({except: 'button'});


      this.btnDefine.on('click', function() {
        me.defineMode();
      });
      this.btnTest.on('click', function() {
        me.testMode();
      });
      this.btnQuit.on('click', function() {
        me.quit();
      });
      this.btnDefineUrl.on('click', function() {
        sdkVisual.triggerBox.hide();
        sdkVisual.defineUrlBox.toggle(me.btnDefineUrl);
      });
      this.btnTrigger.on('click', function() {
        sdkVisual.defineUrlBox.hide();
        sdkVisual.triggerBox.toggle(me.btnTrigger);
      });


      this.btnMini.on('click', function() {
        me.btnMini2.show();
        me.bar.hide();

      });

      this.btnMini2.on('click', function() {
        me.btnMini2.hide();
        me.bar.show();
      });


    }
  };


  function TestMode(data) {
    this.dataStore = [];
    this.maxStoreTime = 10;
    this.init();
  }

  TestMode.prototype = {
    addToStore: function(data) {
      var storage = [];
      this.dataStore.unshift(data);

      if (this.dataStore.length > this.maxStoreTime) {
        storage = this.dataStore.slice(0, this.maxStoreTime);
      } else {
        storage = this.dataStore;
      }
      this.save(storage);
    },
    save: function(data) {
      _.localStorage.set(sdkMain.visualStorageName, JSON.stringify(data));
    },
    get: function() {
      var historyStr = '';
      if (localStorage.getItem(sdkMain.visualStorageName) !== null) {
        historyStr = _.localStorage.parse(sdkMain.visualStorageName) || '';
      }
      return historyStr;
    },
    init: function() {
      sd.init();
      var me = this;
      sd.customEv.on('debugInfo', function(ev, data) {
        me.showTrackInfo(data, 'vtrack')
      });

      sdkVisual.headerBar.btnDefineUrl.hide();
      sdkVisual.headerBar.btnTrigger.hide();
    },
    createTestBox: function() {
      var tpl = sd.template.testmode_box({});
      tpl = $(tpl);

      var data = this.get();

      if ($.isArray(data)) {
        this.dataStore = data.slice(0, 10);
      }


      $(document.body).append(tpl);

      this.eleOutput = tpl.find('ul');

      tpl.find('header').gdrag({bar: tpl, keepBottom: true});

      this.eleOutput.append(this.dataStore.join(''));


    },
    //parse vtrack events all
    parseData: function(data) {
      this.dataUndeployed = data.binding;
      this.requireData = sdkMain.checkUrl(this.dataUndeployed);
      this.listenEvents();

    },
    //测试模式下的 listen vtrack events all
    listenEvents: function() {
      var data = this.requireData;
      var me = this;
      var tempEle = null;
      for (var i = 0; i < data.length; i++) {
        tempEle = sdkMain.getEleExcept(data[i]);
        if (tempEle) {
          tempEle.on('click', function(data) {
            return function() {
              me.showOutput(data);
            }
          }(data[i]));
        }
      }
    },
    //测试模式下 显示debug信息
    showOutput: function(data) {
      var str = '<li>';

      str += data.eventName != null ? '<span style="color:#ff4e00;">' + data.eventName + '</span><span>' : '未定义事件名';
      str += data.deployed ? '（已部署）' : '（未部署）';
      var date = new Date();

      function left2(data) {
        data = String(data);
        if (data.length === 1) {
          return '0' + data;
        } else {
          return data;
        }
      }

      str += left2(date.getHours()) + ':' + left2(date.getMinutes()) + ':' + left2(date.getSeconds()) + '</span>';


      this.storeStr_ = str;

      sd.sdkMain.doVTrackAction(data);


    },
    showTrackInfo: function(data, mode) {
      var str = this.storeStr_ + '<br/>';

      str += JSONTree.create(data);
      str += '</li>';

      this.addToStore(str);

      str = $(str).hide().css({background: '#cfe5d8'});

      this.eleOutput.prepend(str);
      str.slideDown();
      setTimeout(function() {
        str = str.css({background: 'none'});
      }, 1500);

    }


  }


  function NoTrackMain() {

    this.switchNav();

  }

  NoTrackMain.prototype = {
    switchNav: function() {
      var navState = sdkMain.getLifeCookieNavStatus() || 'defineMode';
      sdkVisual.headerBar = new HeaderBar({data: {navStatus: navState}});

      if (navState === 'defineMode') {
        this.showDefineMode();
      } else if (navState === 'testMode') {
        this.showTestMode();
      }
    },
    showTestMode: function() {
      // 标志是test模式
      sd.vtrack_mode = 'testMode';


      $(document).on('click', function(e) {
        var target = $(e.target);
        if (target.prop('tagName') === 'A') {
          e.preventDefault();
        }
      });

      //render
      sdkVisual.testMode = new TestMode();

      //get vtrack events all
      _.ajax({
        url: sdkMain.getAllVtrackUrl,
        cors: true,
        header: {cors: "true"},
        success: function(data) {
          sdkVisual.testMode.parseData(data);
        },
        error: function() {

        }
      });

      sdkVisual.testMode.createTestBox();

    },
    iframeEv: function(eventDefine) {
      var iframes = $('iframe');

      function iframeIsSameDomain($ele) {
        if ($ele && ($ele instanceof jQuery)) {
          var src = $ele.attr('src');
          if (src.indexOf('http') === 0) {
            var h = location.protocol + '//' + location.hostname;
            if (src.indexOf(h) === 0) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        } else {
          return false;
        }
      }

      function addIframeSelector(baseSelector, addIframe) {
        baseSelector.nthEle = addIframe + ' ' + baseSelector.nthEle;
        return baseSelector;
      }

      for (var i = 0; i < iframes.length; i++) {

        (function() {
          var tempSelector = 'iframe[src="' + iframes.eq(i).attr('src') + '"]';
          if ($(tempSelector).length > 1) {
            tempSelector = tempSelector + ':eq(' + i + ')';
          }
          var iframeSelectorDocument = null;

          try {
            if (iframeIsSameDomain($(tempSelector))) {
              iframeSelectorDocument = $(tempSelector).contents();
            }
          } catch (e) {
          }
          ;

          if (!iframeSelectorDocument) {
            return false;
          }

          iframeSelectorDocument.on('click', function(e) {
            var target = $(e.target);
            if (target.prop('tagName') === 'BODY' || target.prop('tagName') === 'HTML' || target.attr(SAS.IGNORE.tag) === SAS.IGNORE.iself) {
              return false;
            }
            var selector = eventDefine.toAllSelector($(e.target), iframeSelectorDocument);
            sdkVisual.floatlayer.init({
              target: $(e.target),
              selector: addIframeSelector(selector, tempSelector)
            });
          });

          iframeSelectorDocument.on('click', 'a', function(e) {
            if ($(this).parents('[' + SAS.IGNORE.tag + '="' + SAS.IGNORE.iall + '"]').length === 0) {
              var selector = eventDefine.toAllSelector($(e.target), iframeSelectorDocument);
              sdkVisual.floatlayer.init({
                target: $(e.target),
                selector: addIframeSelector(selector, tempSelector)
              });
              e.preventDefault();
              return false;
            }
          });

        })(i);
      }

    },
    showDefineMode: function() {
      sd.vtrack_mode = 'defineMode';

      var eventDefine = new EventDefine();

      //sdkVisual.triggerBox = new TriggerBox();

      // 过滤掉不需要的点击
      $(document).on('click', '[' + SAS.IGNORE.tag + '="' + SAS.IGNORE.iall + '"]', function(e) {
        e.stopPropagation();
      });

      $(document).on('click', function(e) {
        var target = $(e.target);
        if (target.prop('tagName') === 'BODY' || target.prop('tagName') === 'HTML' || target.attr(SAS.IGNORE.tag) === SAS.IGNORE.iself) {
          return false;
        }
        var selector = eventDefine.toAllSelector($(e.target));
        sdkVisual.floatlayer.init({
          target: $(e.target),
          selector: selector
        });
      });

      $(document).on('click', 'a', function(e) {
        if ($(this).parents('[' + SAS.IGNORE.tag + '="' + SAS.IGNORE.iall + '"]').length === 0) {
          var selector = eventDefine.toAllSelector($(e.target));
          sdkVisual.floatlayer.init({
            target: $(e.target),
            selector: selector
          });
          e.preventDefault();
          return false;
        }
      });

      this.iframeEv(eventDefine);


    }


  };


  sdkVisual.main = new NoTrackMain();


  function DefineUrlBox() {
    this.eleOut_ = null;
    this.templateOut_ = sd.template.define_url;

    this.vtrackDeleteUrl = sdkMain.vtrackDeleteUrl;

    this.vtrackDeployUrl = sdkMain.vtrackDeployUrl;


    this.init();

  }

  DefineUrlBox.prototype = {
    init: function() {
      this.eleOut_ = $('<div sensors_ignore_tag="all" class="sensors-jssdk-trigger-box-outlet"></div>');

      $(document.body).append(this.eleOut_);
    },
    toggle: function(eleBtn) {

      this.eleTitleBtn = eleBtn || sdkVisual.headerBar.btnDefineUrl;
      if (this.isShow) {
        this.hide();
      } else {
        this.show();
      }
    },
    show: function() {
      this.eleTitleBtn = this.eleTitleBtn || sdkVisual.headerBar.btnDefineUrl;
      var me = this;
      this.eleOut_.hide();
      this.eleTitleBtn.addClass('sensors-jssdk-title-select');
      this.refreshList(function() {});
      me.eleOut_.css({right: -320, display: 'block'}).animate({right: 0}, 500);
      me.isShow = true;
    },
    hide: function() {
      if (!this.isShow) {
        return false;
      }
      this.eleTitleBtn.removeClass('sensors-jssdk-title-select');
      var me = this;
      this.eleOut_.animate({right: -320}, 500, function() {
        me.eleOut_.hide();
      });

      this.isShow = false;
    },

    // 获取事件列表
    ajaxTriggerBox: function() {
      var me = this;
      return new Promise(function(rs, rj) {
        _.ajax({
          url: sdkMain.getAllVtrackUrl,
          cors: true,
          header: {cors: "true"},
          success: function(data) {
            data = data || {};
            rs(data);
          },
          error: function() {

          }
        });
      });
    },
    getOriginUrl: function(data) {
      var urlObj = null;

      var urlDataByDomain = {};

      var urlDataByPage = {};

      var temp = null;

      function getOrigin(url) {
        return _.urlParse(url)._values.Origin;
      }

      for (var i in data) {
        if (_.isJSONString(i)) {
          urlObj = JSON.parse(i);
        } else {
          continue;
        }

        temp = getOrigin(urlObj.origin);

        urlDataByDomain[temp] = urlDataByDomain[temp] || {};
        urlDataByDomain[temp][urlObj.origin.replace(temp, '')] = urlObj.origin;
      }

      // 所有网站
      return urlDataByDomain;

    },
    refreshList: function(callback) {
      var me = this;
      // 按照trigger_id做key的列表，用来显示hover效果时选中的元素。
      this.dataByDomain = {};

      this.ajaxTriggerBox().then(function(data) {

        var dataOrigin = null;
        if (data && data.binding) {
          dataOrigin = me.getOriginUrl(data.binding);
        }

        me.eleOut_.html(me.templateOut_(dataOrigin));

        callback && callback();

      });
    }

  }

  sdkVisual.defineUrlBox = new DefineUrlBox();

  /*
   ----逻辑流程图----
   1. 以下情况，重新渲染列表。有新增trigger，删除已部署，删除未部署，点击部署生效
   2. 删除已部署的数据时候，并不会真删除，而是把把数据保存下来
   3. 是否有改动的判断，通过 是否有删除数据  和 有未部署的trigger
   4. format的数据 ＝ ajax数据 ＋ 当前删除数据
   5. 删除，增加，已部署的三种状态的表示如下
   删除(肯定是部署) － 有部署的删除
   部署   ＝ 已部署
   未部署  ＋ 有未部署的增加
   */
  function TriggerBox() {
    this.eleOut_ = null;
    this.templateOut_ = sd.template.trigger_box;

    this.eleTitleChange = null;


    // 用来判断是否有未部署的
    this.dataTitleChange = false;
    // 临时保存删除的状态,需要再部署后清楚
    this.dataToDelete = [];

    this.vtrackDeleteUrl = sdkMain.vtrackDeleteUrl;
    this.vtrackDeployUrl = sdkMain.vtrackDeployUrl;


    this.init();

    //  this.show

  }

  TriggerBox.prototype = {
    init: function() {
      this.eleOut_ = $('<div sensors_ignore_tag="all" class="sensors-jssdk-trigger-box-outlet"></div>');

      $(document.body).append(this.eleOut_);
      this.events_();

      this.refreshAllDeployedSelect();
    },
    toggle: function(eleBtn) {

      this.eleTitleBtn = eleBtn || sdkVisual.headerBar.btnTrigger;
      if (this.isShow) {
        this.hide();
      } else {
        this.show();
      }
    },
    show: function() {
      var me = this;

      this.eleTitleBtn = this.eleTitleBtn || sdkVisual.headerBar.btnTrigger;

      this.eleOut_.hide();
      this.eleTitleBtn.addClass('sensors-jssdk-title-select');
      this.refreshList(function() {
      });
      me.eleOut_.css({right: -320, display: 'block'}).animate({right: 0}, 500);
      me.isShow = true;
    },
    hide: function() {
      if (!this.isShow) {
        return false;
      }
      this.eleTitleBtn.removeClass('sensors-jssdk-title-select');

      var me = this;
      this.eleOut_.animate({right: -320}, 500, function() {
        me.eleOut_.hide();
      });

      this.isShow = false;
    },
    hasChange: function() {
      // 判断是否有未部署的状态
      if (this.dataTitleChange === false && this.dataToDelete.length !== 0) {
        this.dataTitleChange = true;
      }

      var eleTitleChange = this.eleOut_.find('.sensors-jssdk-trigger-box-header-title-change');
      if (this.dataTitleChange) {
        eleTitleChange.css({color: '#f55'}).text('当前页面有未部署的改动');
        this.eleOut_.find('.sensors-jssdk-trigger-box-deploy-btn').show();
      } else {
        eleTitleChange.css({color: '#555'}).text('当前页面已部署的触发条件');
        this.eleOut_.find('.sensors-jssdk-trigger-box-deploy-btn').hide();
      }
    },
    events_: function() {
      var me = this;
      this.eleOut_.on('click', '.sensors-jssdk-trigger-box-deploy-btn', function() {
        me.deployData();
      });
      this.eleOut_.on('click', '.sensors-jssdk-trigger-box-content-delete', function() {
        var eleLi = $(this).closest('li');
        var id = eleLi.attr('data-trigger');
        if (eleLi.attr('data-deploy') === 'true') {
          me.dataToDelete.push(id);
          me.refreshList();
        } else {
          me.deleteTrigger([id], function() {
            me.refreshList();
          });
        }
      });

      this.eleOut_.on('click', '.sensors-jssdk-trigger-box-content-revert', function() {
        var eleLi = $(this).closest('li');
        var id = eleLi.attr('data-trigger');


        me.dataToDelete.splice($.inArray(id, me.dataToDelete), 1);

        me.refreshList();
      });


      this.eleOut_.on('mouseenter', '.sensors-jssdk-trigger-box-content-list li', function() {
        me.hoverSelectedTrigger(true, $(this).attr('data-trigger'));
      }).on('mouseleave', '.sensors-jssdk-trigger-box-content-list li', function() {
        me.hoverSelectedTrigger(false, $(this).attr('data-trigger'));
      });


    },
    // 获取事件列表
    ajaxTriggerBox: function() {
      var me = this;
      return new Promise(function(rs, rj) {
        _.ajax({
          url: sdkMain.getAllVtrackUrl,
          cors: true,
          header: {cors: "true"},
          success: function(data) {
            data = data || {};
            rs(data);
          },
          error: function() {

          }
        });
      });
    },
    ajaxAllEvents: function() {
      return new Promise(function(rs, rj) {
        _.ajax({
          url: sdkMain.vtrackEventsUrl,
          cors: true,
          header: {cors: "true"},
          success: function(data) {
            data = data || {};
            rs(data);
          },
          error: function() {
          }
        });
      });
    },
    refreshList: function(callback) {
      var me = this;

      // 重置数据
      this.dataTitleChange = false;
      // 按照trigger_id做key的列表，用来显示hover效果时选中的元素。
      this.dataByTriggerId = {};

      Promise.all([this.ajaxTriggerBox(), this.ajaxAllEvents()]).then(function(arr) {

        // 当前页面的trigger，和cname
        var data = sdkMain.checkUrl(arr[0].binding),
          data2 = arr[1];

        // 刷新已部署
        me.refreshAllDeployedSelect(data);

        // format后的数据
        var formatData = {};
        // cname的对应关系
        var cnameRelation = {};

        // 获取cname
        $.each(data2, function(a, b) {
          cnameRelation[b.name] = b.cname;
        });

        // 转化成event>trigger格式的数据
        $.each(data, function(a, b) {
          // 把当前页面需要删除的数据标记
          if ($.inArray(String(b.trigger_id), me.dataToDelete) !== -1) {
            b.to_del = true;
          }
          // 判断是否有未部署的
          if (me.dataTitleChange === false && b.deployed === false) {
            me.dataTitleChange = true;
          }

          //生成hover效果需要的数据
          me.dataByTriggerId[b.trigger_id] = b;


          if (formatData[b.eventName]) {
            formatData[b.eventName].triggers.push(b);
          } else {
            formatData[b.eventName] = {};
            formatData[b.eventName].triggers = [b];
            formatData[b.eventName].cname = cnameRelation[b.eventName] || '';
            formatData[b.eventName].name = b.eventName;
          }

        });

        me.eleOut_.html(me.templateOut_(formatData));

        me.hasChange();

        callback && callback();


      });
    },

    // 删除事件
    deleteTrigger: function(data, callback) {
      if (!$.isArray(data)) {
        return false;
      }
      _.ajax({
        url: this.vtrackDeleteUrl,
        cors: true,
        type: 'DELETE',
        header: {cors: 'true'},
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function() {
          callback && callback();
        }
      });


    },

    deployData: function() {
      var me = this;

      function callback() {
        _.ajax({
          cors: true,
          header: {cors: "true"},
          url: me.vtrackDeployUrl,
          type: 'PUT',
          success: function() {
            // 成功后，重置数据
            me.dataToDelete = [];
            me.dataTitleChange = false;

            me.refreshList();
          }
        });
      }

      // 如果有等待删除的，先删除掉
      if (this.dataTitleChange) {
        if (this.dataToDelete.length !== 0) {
          this.deleteTrigger(this.dataToDelete, callback);
        } else {
          callback();
        }
      }

    },
    refreshAllDeployedSelect: function(data) {
      highlightDeployedSelected.removeAll();
      function refreshList(data) {
        $.each(data, function(a, b) {
          if (b.deployed === true) {
            highlightDeployedSelected.addMore(sdkMain.getEleExcept(b));
          }
        });
      }

      if (!data) {
        this.ajaxTriggerBox().then(function(data) {
          refreshList(sdkMain.checkUrl(data.binding));
        });
      } else {
        refreshList(data);
      }

    },
    hoverSelectedTrigger: function(isShow, data) {
      var temp = this.dataByTriggerId[data];
      var ele = sdkMain.getEleExcept(temp);
      if (temp && ele && (ele instanceof $)) {
        if (isShow) {
          ele.addClass('sensors-outline-highlight-frame-select');
        } else {
          ele.removeClass('sensors-outline-highlight-frame-select');
        }
      }
    }
  };

  sdkVisual.triggerBox = new TriggerBox();


})();
