## SAT - 预置属性补丁
## 功能
将采集数据中的 
_latest_wx_ad_click_id 替换为 $latest_wx_ad_click_id


_latest_wx_ad_callbacks 替换为 $latest_wx_ad_callbacks 


_latest_wx_ad_hash_key 替换为 $latest_wx_ad_hash_key 


_sa_channel_landing_url 替换为 $ad_landing_page_url


_sa_channel_landing_url_error 替换为 $sa_channel_landing_url_error


## 集成
### ES Module 方式
```js
import satPropsPatch  from '/dist/web/plugin/sat-props-patch/index.es6.js';
sensors.use(satPropsPatch);
```
## 变动
- 如功能说明中将采集数据中属性名进行重命名。
## ⚠️ 注意
- 需 SAT 0.4 以上版本支持。
- 需 WEB SDK 1.22.9 以上版本支持。
- 请联系技术顾问确认是否使用该插件! 该插件非 SDK 通用功能，仅限在 SAT 特定环境下使用。
- 插件功能为修改 channel 插件上报属性值，独立该插件使用无效。必须搭配 channel 插件或者 wechat-webview-channel 插件使用，且必须放前两者后面。