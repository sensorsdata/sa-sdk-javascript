# beacon 发送数据
>⚠️ 此插件已自动集成在 SDK 中，<font color=red>禁止手动使用！</font>

## 功能
初始化 Web SDK 配置 `send_type` 为 `beacon` 时，页面行为数据通过 `navigator.sendBeacon` 方法发送采集数据。使用该方式发送数据的浏览器必须支持 `navigator.sendBeacon` 方法，否则自动降级为使用 `image` 发送数据。

## ⚠️ 注意
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。