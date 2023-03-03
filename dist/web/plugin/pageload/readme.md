# 页面加载时长
## 功能
页面加载时长是分析网站性能一个常见的指标，对用户留存，用户体验有重要的作用，计算原理是：从浏览器准备通过 http 请求获取页面到页面 DOM 加载完成、所有脚本运行完成的时间及页面加载资源大小。  
原理：在 window.onload 事件触发时利用 performance API 获取页面加载时长及此时加载的页面资源大小，并进行上报。  

## 集成
### ES Module 方式
```javascript
import pageload from '/dist/web/plugin/pageload/index.es6.js';
// 见下文初始化参数说明
sensors.use(pageload,{max_duration:120});
```

### 初始化参数
初始化参数对象属性：
- `max_duration`：最大页面加载时长，超过这个时长将不再上报 `event_duration` 属性。 类型：Number ，单位：秒 ，默认：1800  (30分钟) ，范围：大于 0，可选。
  
## 变动
- 新增事件：$WebPageLoad，页面加载事件。
- 新增属性：
  - `event_duration`：页面加载时长。
  - `$page_resource_size`：页面资源大小。


## ⚠️ 注意
 
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。
