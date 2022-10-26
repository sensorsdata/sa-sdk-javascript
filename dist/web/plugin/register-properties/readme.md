# 自定义属性
## 功能
该插件为上报事件添加自定义属性，可以针对指定事件类型添加自定义属性。也可以通过传入回调函数接收并处理事件属性，返回自定义属性，返回的自定义属性将被插件合并到上报属性中。
## 集成
该插件需要通过 sdk `use` 方法返回的实例进行 API 的调用来注册自定义属性。

### ES Module 方式
```javascript
import rgp from '/dist/web/plugin/register-properties/index.es6';
var registerPlugin = sensors.use(rgp);
```

### 插件 API 说明
1. 注册静态属性

```javascript
registerPlugin.register({
  events:events,
  properties: properties
})
```

- `events`: 需添加自定义属性的事件列表。上报日志中的 `event` 属性值。该值数据日志中的 `type` 必须为 `track`。 类型: Array<String>    例如：`$pageview` 、`$WebPageLeave` 及自定义事件名称

- `properties`：自定义属性，类型：Object< String | Number | Boolean | Array<String> | Date> 

2. 注册处理函数: 
``` javascript
registerPlugin.hookRegister(function(eventInfo){
    var event = eventInfo.event;
    var properties = eventInfo.properties
    var data = eventInfo.data
    var customProperties = {}
    if(evnet === '$pageview'){
       customProperties['tag'] = 'homePage'
    }
 
    if(properties.title === 'home'){
       customProperties['sub_title'] = '首页'
    }
 
    return customProperties
})
```
处理函数入参说明：
- `eventInfo`：
  - `event`：事件名称
  - `properties`：事件属性
  - `data`：包含所有属性的事件对象
 
## 改动
- 新增属性: 所有自定义属性。

## ⚠️ 注意
- 对指定事件注册属性，可以通过 `register`
- 如果要对所有事件进行注册属性，可以通过 `hookRegister`
- 如果注册的属性需要动态判断，可以通过 `hookRegister`
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。