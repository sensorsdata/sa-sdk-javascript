# SAT - 渠道 utm 参数采集
## 功能
该插件用于采集广告渠道推广信息，集成后会自动解析当前页面地址中的 
`channel_utm_source`,
`channel_utm_medium`,
`channel_utm_campaign`,
`channel_utm_content`,
`channel_utm_term`,
查询参数，并添加到上报数据中。<br>
上报数据中 `utm` 相关属性仍然以 `utm_` 前缀。

## 集成
### ES Module 方式
```javascript
import channelUtm from '/dist/web/plugin/channel-utm/index.es6.js';
sensors.use(channelUtm);
```

## 变动
该插件集成后，如果页面地址中既有 `channel_utm_source` 又有 `utm_source`，那么上报数据中的 `utm_source` 会被 `channel_utm_source` 覆盖，其他几个参数同理。

## ⚠️ 注意
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。