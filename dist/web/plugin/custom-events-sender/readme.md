# 自定义数据接收端

## 功能
根据每一条采集数据中的某个属性自定义决定，数据接收端。并可设置同一条数据发送到多个数据接收端。

## 集成
### ES Module 方式
```javascript
import customEventsSender from '/dist/web/plugin/custom-events-sender/index.es6';
sensors.use(customEventsSender, function(option){
    var event_name = option.event_name; // 当前触发采集数据的事件名称
    var data = option.data; // 当前触发采集数据的完整数据
    var server_url = option.server_url; // 当前触发采集数据的默认发送数据接收端地址
    if(event_name === 'test'){
        return ['自定义数据接收端 1'] // 仅发送数据到自定义数据接收端 1
    }
    if(event_name === 'test1'){
         return ['自定义数据接收端 1', server_url] // 发送数据到自定义数据接收端 1及默认数据接收端 server_url
    }

    if(event_name === 'test2'){
         return [] // 任何数据接收端都不发送
    }
    return [server_url] // 仅发送数据接收端 server_url
});

```
## ⚠️ 注意
- 不能与 sf-instant-event 智能运营即时事件上报插件共用。
- 该插件必须有返回值，若无返回值则不会发送到任何接收端。
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的DK 和插件进行使用。