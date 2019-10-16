(function(para) {
  if(typeof(window['sensorsDataAnalytic201505']) !== 'undefined') {
    return false;
  }
  window['sensorsDataAnalytic201505'] = para.name;
  window[para.name] = {
    para: para
  };
})({
  name: 'sensors',
  server_url:'https://test-syg.datasink.sensorsdata.cn/sa?token=27f1e21b78daf376&project=lixiang',
  //heatmap_url神策分析中点击分析及触达分析功能代码，代码生成工具会自动生成。如果神策代码中 `sensorsdata.min.js` 版本是 1.9.1 及以上版本，这个参数必须配置，低于此版本不需要配置。
  heatmap_url: "https://unpkg.com/sa-sdk-javascript@1.13.11/heatmap.min.js",
  heatmap: {}
});