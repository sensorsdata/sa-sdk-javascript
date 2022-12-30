# 批量发送数据
>⚠️ 此插件已自动集成在 SDK 中，<font color=red>禁止手动使用！</font>

## 功能
初始化 Web SDK 配置 `batch_send` 为 `true` 时，页面行为数据先记录到 `localStorage` 中，并每隔 6s （可通过 `batch_send.send_interval` 修改轮询时间）轮询一次发送数据。使用该方式发送数据的浏览器必须支持 `localStorage` 方法，否则自动降级为使用 `send_type` 所设置的发送方式发送数据。[详细文档](https://manual.sensorsdata.cn/sa/latest/sdk-api-web-87917024.html#id-.SDKAPI(Web)v2.4-%E5%BC%80%E5%90%AF%E6%95%B0%E6%8D%AE%E7%9A%84%E6%89%B9%E9%87%8F%E5%8F%91%E9%80%81)
## ⚠️ 注意
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。