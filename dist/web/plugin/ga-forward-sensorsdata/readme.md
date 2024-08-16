# GA4 数据转发到神策

## 功能
通过监听当前页面的 GA 数据，获取到 GA 请求后，解析出数据 并调用 Web SDK 发送。
## 集成
### ES Module 方式
```html
<script>
import sensors from '/dist/web/sensorsdata.es6';
import ga from '/dist/web/plugin/ga-forward-sensorsdata/index.es6';
sensors.use(ga);
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
  sensors.use(SensorsDataWebJSSDKPlugin.GAForwardSensorsData);
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