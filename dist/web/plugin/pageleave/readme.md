# 页面浏览时长

## 功能
页面浏览时长是网站分析中很常见的一个指标，用于反映用户在某些页面上浏览时间的长短，体现了用户对网站的黏性。

## 集成
### ES Module 方式
```javascript
import pageleave from '/dist/web/plugin/pageleave/index.es6.js';
sensors.use(pageleave,{
  custom_props:{
    prop1:'value1'
  }
  heartbeat_interval_time: 5,
  max_duration: 5 * 24 * 60 * 60,
  isCollectUrl: function(url){
    // url 为要采集页面浏览时长的页面地址。
    return true; // 采集
    // return false; // 不采集
  }
});
```
### 初始化参数
初始化参数对象属性：
- `custom_props`：页面浏览时长自定义属性。   类型：Object，可选。
- `heartbeat_interval_time`：心跳记录刷新时间。 类型：Number ，单位：秒 ，默认：5，范围：大于 0，可选。
- `max_duration`：最大页面浏览时长。 类型：Number ，单位：秒 ，默认：432000  (5天) ，范围：大于 0，可选。
- `isCollectUrl`：设置是否采集当前页面浏览时长。 类型：Function 。必须为具有返回值的 Function，返回 `true` 为需要采集，返回 `false` 或者不返回则为不采集。可选。

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
