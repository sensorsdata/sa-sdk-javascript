# 禁用启用 SDK 
>⚠️ 此插件已自动集成在 SDK 中，<font color=red>禁止手动使用！</font>

## 功能
该插件集成后会为 SDK 新增 disableSDK、 enableSDK 和 getDisabled 三个 API。

用户可以在任何时候通过这 disableSDK 方法完成对 SDK 数据采集行为的禁用。同样，用户可以在任何时候通过 enableSDK 方法再次启用 SDK 数据采集。

在 App 和 内嵌 H5 页面打通成功的情况下，如果 App 禁用了采集，那么内嵌 H5 页面也会禁用采集。

### API 说明
- disableSDK: 禁用 SDK，调用后 SDK 不再进行数据采集发送
- enableSDK: 启用 SDK，调用后 SDK 进行数据采集发送
- getDisabled: 获取 SDK 是否禁用的状态

## 注意
- 打通成功情况下 App 禁用采集同步禁用内嵌 H5 功能，需要配置支持同步禁用内嵌 H5 的 App SDK 使用。