# 采集页面高度属性

## 功能
该插件用于采集页面高度。集成该插件后，除 `$pageview` 以及设置用户属性相关数据的上报以外其他上报数据都会携带 `$page_height`。

## 集成
### ES Module 方式
```js
import rgh  from '/dist/web/plugin/register-property-page-height/index.es6.js';
sensors.use(rgh);
```

## ⚠️ 注意
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。