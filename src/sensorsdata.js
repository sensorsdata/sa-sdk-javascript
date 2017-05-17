/**
 * @fileoverview sensors analytic javascript sdk
 * @author shengyonggen@sensorsdata.cn
 */
try{

(function(sd) {

  // 防止重复引入
  sd = window[sd];

  if ((typeof sd !== 'function' && typeof sd !== 'object') || sd.has_load_sdk) {
    return false;
  }
  sd._t = sd._t || 1 * new Date();

  sd.has_load_sdk = true;

@@include('sa-sdk-javascript/src/json2.js')

@@if (sensorsdata_mode === 'vtrack') {
  @@include('sa-sdk-javascript/src/promise.min.js')
  }

  var _ = sd._ = {};

@@if (sensorsdata_mode === 'vtrack') {
  @@include('sa-sdk-javascript/src/jquery.js')
    sd.$ = $;

    sd.customEv = $({});
  }
  // 默认配置
  sd.para = sd.para || {};
  sd.para_default = {
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

    is_track_device_id: false,

    use_app_track: false

  };
  // 合并配置
  for (var i in sd.para_default) {
    if (sd.para[i] === void 0) {
      sd.para[i] = sd.para_default[i];
    }
  }
  // 优化配置
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

  @@include('sa-sdk-javascript/src/sdk.js')

@@if (sensorsdata_mode === 'vtrack') {
  @@include('sa-sdk-javascript/src/vtrack.sdk.js')
  }

@@if (sensorsdata_mode !== 'vtrack') {
    sd._init();
  }


})(window['sensorsDataAnalytic201505']);


  
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