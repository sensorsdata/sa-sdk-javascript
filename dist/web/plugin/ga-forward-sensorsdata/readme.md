# GA4 数据转发到神策

## 功能
通过监听当前页面的 GA 数据，获取到 GA 请求后，解析出数据 并调用 Web SDK 发送。
## 集成
### ES Module 方式
```html
<script>
import sensors from '/dist/web/sensorsdata.es6';
import ga from '/dist/web/plugin/ga-forward-sensorsdata/index.es6';
sensors.use(ga, {
    domain: ['analytics.google.com', 'google-analytics.com']  // 默认值，不填默认监听这两个域名，有修改时必须填写
});
sensors.init({
    server_url: '...',
    heatmap: {},
    show_log: true
  });
sensors.quick('autoTrack');
</script>
<script>
  //ga 代码的引入
</script>
```

### Script 方式
```html

<script src="/sa-sdk-javascript/dist/web/sensorsdata.full.js"></script>
<script src="/sa-sdk-javascript/dist/web/plugin/ga-forward-sensorsdata/ga-forward-sensorsdata.js"></script>
<script>
  var sensors = sensorsDataAnalytic201505;
  sensors.use(SensorsDataWebJSSDKPlugin.GAForwardSensorsData, {
    domain: ['analytics.google.com', 'google-analytics.com']  // 默认值，不填默认监听这两个域名，有修改时必须填写
  });
  sensors.init({
    server_url: '...',
    heatmap: {},
    show_log: true
  });
  sensors.quick('autoTrack');
</script>

<script>
  //ga 代码的引入
</script>
```


## ⚠️ 注意
- 注意 SDK 引入顺序，必须按照上述顺序，先引入神策的 SDK，再引入 GA
- 默认只监听 `analytics.google.com` 和 `google-analytics.com` 两个域名下的 GA 请求
- 可通过 `domain` 配置项指定其他域名，值为数组类型：
  ```javascript
  sensors.use(ga, {
      domain: ['your-ga-proxy.example.com']
  });
  ```
- `domain` 为可选配置项，不填则仅监听默认的两个 Google 域名
- **如果 GA 请求不是发往 Google 域名（例如自建 GA 代理/私有化部署），必须配置 `domain` 参数，否则无法转发数据**