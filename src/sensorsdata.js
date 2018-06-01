/**
 * @fileoverview sensors analytic javascript sdk
 * @author shengyonggen@sensorsdata.cn
 * 紧急招聘前端工程师，运维工程师，大数据工程师等，各种级别的都可以，求发送到我邮箱，我会严格保密，谢谢
 */

;(function(root,factory) {

  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  } @@if (sensorsdata_amd_mode === 'amd') {
  else if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define(factory);
  } }else{
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

  sd.para_default = {
    //scrollmap:{delay:6000}

    name: 'sa',
    // referrer字符串截取
    max_referrer_string_length: 200,
    //通用字符串截取，超过7000的字符串会导致url超长发不出去，所以限制长度
    max_string_length: 500,
    //    send_error_event: true,
    cross_subdomain: true,
    show_log: true,
    is_debug: false,
    debug_mode: false,
    debug_mode_upload: false,

    // todo 前端session时长
    session_time: 0,

    use_client_time: false,
    //来源参数名字
    source_channel: [],

    send_type: 'image',

    // 七鱼过滤id
    vtrack_ignore: {},

    auto_init: true,

    is_single_page: false,

    // 如果要设置，设置数组
    source_type: {},
    callback_timeout: 200,
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
  // 修复没有配置协议的问题，自动取当前页面的协议
  if(typeof sd.para.server_url === 'string' && sd.para.server_url.slice(0,3) === '://'){
    sd.para.server_url = location.protocol + sd.para.server_url;
  }
  if(typeof sd.para.web_url === 'string' && sd.para.web_url.slice(0,3) === '://'){
    sd.para.web_url = location.protocol + sd.para.web_url;
  }

  if(sd.para.send_type !== 'image' && sd.para.send_type !== 'ajax' && sd.para.send_type !== 'beacon'){
    sd.para.send_type = 'image';
  }
  //优化自动取heatmap.min.js
  if(!sd.para.heatmap_url && sd.para.sdk_url){
    sd.para.heatmap_url = sd.para.sdk_url.replace(/[^\/]+\.js[^\/]*$/,'heatmap.min.js');
  }
  
  var search_type = ['www.baidu.','m.baidu.','m.sm.cn','so.com','sogou.com','youdao.com','google.','yahoo.com/','bing.com/','ask.com/'];
  var social_type = ['weibo.com','renren.com','kaixin001.com','douban.com','qzone.qq.com','zhihu.com','tieba.baidu.com','weixin.qq.com'];
  var search_keyword = {baidu:['wd','word','kw','keyword'],google:'q',bing:'q',yahoo:'p',sogou:'query',so:'q',sm:'q'};

  if(typeof sd.para.source_type === 'object'){
    sd.para.source_type.search = _.isArray(sd.para.source_type.search) ? sd.para.source_type.search.concat(search_type) : search_type;
    sd.para.source_type.social = _.isArray(sd.para.source_type.social) ? sd.para.source_type.social.concat(social_type) : social_type;
    sd.para.source_type.keyword = _.isObject(sd.para.source_type.keyword) ?  _.extend(search_keyword,sd.para.source_type.keyword) : search_keyword;
  }

  if(_.isObject(sd.para.heatmap)) {
    sd.para.heatmap.clickmap = sd.para.heatmap.clickmap || 'default';
    sd.para.heatmap.scroll_notice_map = sd.para.heatmap.scroll_notice_map || 'default';   
    sd.para.heatmap.scroll_delay_time = sd.para.heatmap.scroll_delay_time || 4000;
  }
  // 优化配置
  if(typeof sd.para.server_url === 'object' && sd.para.server_url.length){
    for(i = 0; i < sd.para.server_url.length; i++){ 
      if (!/sa\.gif[^\/]*$/.test(sd.para.server_url[i])) {
        sd.para.server_url[i] = sd.para.server_url[i].replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
      }
    }
  }else if (!/sa\.gif[^\/]*$/.test(sd.para.server_url)) {
    sd.para.server_url = sd.para.server_url.replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
  }
  if(typeof sd.para.server_url === 'string'){
    sd.para.debug_mode_url = sd.para.debug_mode_url || sd.para.server_url.replace('sa.gif', 'debug');
  } 
  // 是否需要非cache，等于每次请求文件
  if (sd.para.noCache === true) {
    sd.para.noCache = '?' + (new Date()).getTime();
  } else {
    sd.para.noCache = '';
  }

};

  @@include('sa-sdk-javascript/src/sdk.js')

@@if (sensorsdata_mode === 'vtrack') {
  @@include('sa-sdk-javascript/src/vtrack.sdk.js')
  }

@@if (sensorsdata_mode !== 'vtrack') {
    sd.init();
  }
  
  return sd;
  
}catch(err){
  if (typeof console === 'object' && console.log) {
    try {console.log(err)} catch (e) {};
  }

  (function(){

    var sd = window['sensorsDataAnalytic201505'];
    if(typeof sd === 'string'){
      sd = window[sd];
      if((sd != null) && (typeof sd === 'function' || typeof sd === 'object') && (typeof sd.para === 'object') && sd.para.is_debug){
        sd.track && sd.track('_js_sdk_error',{_js_sdk_error_msg:JSON.stringify(err),$url:location.href}); 
      }
    }


  })();


}



});