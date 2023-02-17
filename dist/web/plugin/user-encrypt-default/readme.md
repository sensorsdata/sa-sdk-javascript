# 默认的用户信息加密
>⚠️ 此插件已自动集成在 SDK 中，<font color=red>禁止手动使用！</font>

## 功能
该插件用来实现用户加密的算法，通过实现 kit.userEncrypt、kit.userDecrypt、kit.userDecryptIfNeeded 完成。  
默认使用的是 dfmapping 加密，同时兼容 rot13。

## 注意
- 当前 kit 的几个方法是必须实现的方法，暂时还没有做在合规前去置空方法。
- 此插件不对外使用，SDK 内置功能