# 页面浏览时长

## 功能
页面浏览时长是网站分析中很常见的一个指标，用于反映用户在某些页面上浏览时间的长短，体现了用户对网站的黏性。

## 集成
### ES Module 方式
```javascript
import pageleave from '/dist/web/plugin/pageleave/index.es6.js';
sensors.use(pageleave,option);
```
### 初始化参数
初始化参数对象属性：
- `option.custom_props`：页面浏览时长自定义属性。   类型：Object，可选。
- `option.heartbeat_interval_time`：心跳记录刷新时间。 类型：Number ，单位：秒 ，默认：5，范围：大于 0，可选。
- `option.max_duration`：最大页面浏览时长。 类型：Number ，单位：秒 ，默认：432000  (5天) ，范围：大于 0，可选。

## 变动
- 新增事件：`$WebPageLeave`，页面离开事件。
- 新增属性：
  - `event_duration`，页面停留时长。
  - 初始化参数自定义属性。

## ⚠️ 注意

- 版本要求
  - SCA v0.5.10375 及以上版本（SDG 版本 0.9 以下，升级 SCA 到 v0.5.10375 及以上版本后，需要手动执行 `scaadmin preset_metadata download` ，重启 Extractor 才会生效）

- 单页面浏览时长版本要求
  - SCA v0.5.11757 及以上或者 v0.6.1.9 及以上版本（SDG 版本 0.9 以下，升级 SCA 到 v0.5.10375 及以上版本后，需要手动执行 `scaadmin preset_metadata download` ，重启 Extractor 才会生效）

- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。
