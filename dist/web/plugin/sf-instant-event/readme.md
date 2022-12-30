## SF - 即时事件上报
## 功能
根据即时事件配置 `instant_events` 配置的事件名称列表，将符合的事件增加 `instant_event` 标记。用以智能运营优先处理该条数据。
## 集成
### ES Module 方式
```js
import sfInstantEvent  from '/dist/web/plugin/sf-instant-event/index.es6.js';
sensors.use(sfInstantEvent,{
    instant_events:['$pageview','test1'] // 配置即时上报事件名称
});
```
## ⚠️ 注意
- 不能与 custom-events-sender 自定义数据接收端插件共用。
- 需 SF v4.4 以上版本支持。
- 请联系技术顾问确认是否使用该插件! 该插件非 SDK 通用功能，仅限在 SF 特定环境下使用。
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。