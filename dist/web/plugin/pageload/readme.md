# 页面加载时长
## 功能
页面加载时长是分析网站性能一个常见的指标，对用户留存，用户体验有重要的作用，计算原理是：从浏览器准备通过 http 请求获取页面到页面 DOM 加载完成、所有脚本运行完成的时间及页面加载资源大小。  
原理：在 window.onload 事件触发时利用 performance API 获取页面加载时长及此时加载的页面资源大小，并进行上报。  

## 集成
### ES Module 方式
```javascript
import pageload from '/dist/web/plugin/pageload/index.es6.js';
sensors.use(pageload);
```
## 变动
- 新增事件：$WebPageLoad，页面加载事件。
- 新增属性：
  - `event_duration`：页面加载时长。
  - `$page_resource_size`：页面资源大小。


## ⚠️ 注意
- 版本要求
    - SCA v0.5.11736 及以上版本
 
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。
