# 深度链接
通过 H5 将用户引流至移动端 App，借助于深度链接可以提高活动推广的效果。
## 功能
参考官网说明 [深度链接](https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_deeplink-129827533.html)

## 操作系统识别（getOS）

插件通过 `navigator.userAgent` 识别当前操作系统，决定走哪条唤起链路（iOS / android / harmony，见 `index.js` 的 `openDeepLink`）。识别规则定义在 `helper.js` 的 `OSs` 映射中，按插入顺序遍历、**首个命中的 key 即返回**：

| key | 匹配正则 | 说明 |
| --- | --- | --- |
| `harmony` | `/OpenHarmony/i` | 纯血鸿蒙（HarmonyOS NEXT）ArkWeb 内核 UA 的特征标记 |
| `android` | `/Android/i` | Android 设备，以及旧版鸿蒙（HarmonyOS 2~4，UA 只含 Android 标记） |
| `iOS` | `/iPhone\|iPad\|iPod/i` | iOS 设备 |

### 鸿蒙 UA 识别说明（2026-11 修复）

**问题**：纯血鸿蒙（HarmonyOS NEXT）上 ArkWeb 内核的 UA 为了网页兼容性，会**同时携带** `OpenHarmony` 和 `Android` 两个标记，例如：

```
Mozilla/5.0 (Phone; OpenHarmony 5.0; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 ArkWeb/4.1.6.1 Mobile HuaweiBrowser/6.1.3.321
```

修复前 `OSs` 中 `android` 排在 `harmony` 之前，`getOS()` 对上述 UA 返回 `'android'`，导致插件误用 `android_info`（安卓 scheme / app links）唤起，而不会走 `harmony_info` 的鸿蒙唤起链路。

**修复**：将 `harmony` 调整到 `android` 之前判断。含 `OpenHarmony` 标记的 UA 优先识别为鸿蒙；旧版鸿蒙（HarmonyOS 2~4，基于 AOSP）UA 只含 `Android` 标记，仍识别为 `android` 走安卓链路（其可安装 APK，安卓唤起方式依然适用）。

## ⚠️ 注意
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。
