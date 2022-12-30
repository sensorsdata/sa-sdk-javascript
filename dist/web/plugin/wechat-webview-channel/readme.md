# SAT - 小程序 webview 渠道归因

## 功能：
实现微信小程序 webview 内嵌 H5 页面用户打通及渠道归因功能。

需与微信小程序 SDK 的 `ad-channel-h5-linker` 插件共同使用。

行为：
读取 URL 参数，包含用户id，小程序 appid，小程序标记。
用户 id 用来改变当前用户，使得当前页面用户跟外层一致。
appid 和小程序标记，作为公共属性，在非预置事件中发送。

## 集成
### ES Module 方式
```js
import wechatWebviewChannel from '/dist/web/plugin/wechat-webview-channel/index.js';
sensors.use(wechatWebviewChannel);
```

## ⚠️ 注意
- 该插件需要配合 微信小程序的 `ad-channel-h5-linker` 插件同时使用
- 该插件仅在小程序 webview 中使用，不能在传统 web 中使用
- 该插件不能和 `SiteLinker` 插件同时使用
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。