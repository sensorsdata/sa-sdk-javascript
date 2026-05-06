# indexedDB 批量发送数据

## 功能
通过 indexedDB 来批量发送数据，和 localStorage 批量发送数据类似，都是批量发送。   
因为同开多个标签页会导致互相读取乱套。为了解决这个问题，引入了锁的机制。但是浏览器的锁需要 https 才能生效。所以对于低版本浏览器或者 http 环境，是不支持当前功能的。此时会自动使用图片发送代替。     
当前版本存储的数据，如果 server_url 有变换，都是以当前发送时候的 sever_url 为准。   
如果浏览器不支持 indexedDB，会自动使用 图片发送代替。   


## 集成
### ES Module 方式
```javascript
import sensors '.....';
import idb from '/dist/web/plugin/indexeddb/index.es6.js';
sensors.use(idb,{
  send_length: 20        // 单次最大发送多少条数据
  send_interval: 10000     // 每隔多少毫秒发一次数据
});
sensors.init();
```

### script 方式
```html
<script src="...sensorsdata.js"></script>
<script src="/dist/web/plugin/indexeddb/index.js"></script>
<script>
var sensors = window['sensorsDataAnalytic201505'];
var idb = window.SensorsDataWebJSSDKPlugin.IndexedDB;
sensors.use(idb,{
  send_length: 20        // 单次最大发送多少条数据
  send_interval: 10000     // 每隔多少毫秒发一次数据
});
sensors.init();
</script>
```



## ⚠️ 注意
- init 的配置项中不要出现 app_js_bridge （打通） 和 batch_send （localStorage 的批量发送）的配置。不能同时使用。
- 浏览器版本必须支持 锁 的功能，navigator.locks 。另外必须使用 https （navigator.locks 的要求）
