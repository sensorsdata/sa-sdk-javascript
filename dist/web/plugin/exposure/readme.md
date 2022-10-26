# 元素曝光事件采集

## 功能
某视图元素，由不可见到可见，满足一定的限制条件（可见比例、有效停留时长），该插件上报该视图元素曝光事件。

## 集成
### ES Module 方式
```javascript
import exposure from '/dist/web/plugin/exposure/index.es6';
sensors.use(exposure, {
  area_rate: 0, 
  stay_duration: 2, 
  repeated: true 
});
```
### 参数配置
1. 通过初始化参数设置全局统一的曝光采集逻辑的配置。  
- `area_rate`：曝光比例。默认：0，值域：0~1。类型：Number
- `stay_duration`: 有效曝光停留时长。 默认：0。类型：Number
- `repeated`:  重复曝光。 默认：true。类型：Boolean

2. 通过 HTML 配置曝光参数
除了通过初始化参数配置全局曝光事件采集逻辑，还可以通过设置 HTML 属性针对指定元素进行曝光事件采集配置。

```html
<div data-sensors-exposure-event-name="home_top_banner" data-sensors-exposure-config-area_rate="1"  data-sensors-exposure-config-stay_duration="2" data-sensors-exposure-config-repeated="true" data-sensors-exposure-property-propA="valueA" data-sensors-exposure-property-propB="valueB"></div>
```
- `data-sensors-exposure-event-name` 设置曝光事件名称
- `data-sensors-exposure-config-area_rate`  设置曝光比例
- `data-sensors-exposure-config-stay_duration` 设置有效曝光停留时长
- `data-sensors-exposure-config-repeated` 设置重复曝光
- `data-sensors-exposure-property-*`   设置该元素曝光事件自定义属性。属性值为 String。无法是其他类型。

3. 通过 API 配置曝光参数
```javascript
exposure.addExposureView(document.getElementById('exposure_ele'), {
    eventName:'exposure_ele',
    config: {
        area_rate: 0.5,
        stay_duration: 0,
        repeated: true
    },
    properties: {
        d: 'abc',
        e: false
    }
})
```
- `element`：曝光元素。类型：HTMLElement
- `option`：
    - `eventName `：曝光事件名称。必填。类型：String。同 track 事件名称
    - `config`：曝光配置
       - `area_rate`：曝光比例。默认：0，值域：0~1。类型：Number
       - `stay_duration`: 有效曝光停留时长。 默认：0。类型：Number
       - `repeated`: 重复曝光。 默认：true。类型：Boolean
    - `properties` 自定义属性。类型：Object。同 track 自定义属性

## 变动
- 新增事件：通过 HTML 或 API 自定义曝光事件名。
- 新增属性： 通过 HTML 或 API 自定义事件属性。

## ⚠️ 注意
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。