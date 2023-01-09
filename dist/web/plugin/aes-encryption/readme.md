# 埋点数据 AES 加密

## 功能
为了加强埋点数据的安全性，神策分析支持对埋点数据进行加密，并以密文的形式对数据进行发送。<br>
AES 加密插件在数据上报前通过 AES 算法对数据进行加密。

## 集成
### ES Module 方式
```javascript
import AesEncryption from '/dist/web/plugin/aes-encryption/index.es6.js';
sensors.use(AesEncryption,{
    k:'加密密钥',
    kid: '密钥编号',
    khash: '密钥哈希值'
});
```

### 参数说明：
- `k`: AES 加密密钥，类型：string。
- `kid`: 加密密钥 id，类型：number。
- `khash`: 密钥哈希值，类型：string。


初始化参数信息需要从神策服务器后端获取。<br>
登录神策服务器，执行以下命令：

1. 生成对称密钥命令<br>
`sh /sensorsdata/main/program/edge/edge/bin/generate_web_symmetric_key.sh -t AES`
2. 生成密钥后需要重启 Edge 模块才能生效<br>
`spadmin restart -p edge -m edge`

## 变动
加密后的数据在上报时，通过抓包或浏览器网络请求栏查看数据消息体中可以看到 payload 参数，payload 参数的值为加密后的密文。

## ⚠️ 注意
- 批量发送方式不支持 AES 加密插件。
- 本功能需要服务端的配合，可以联系神策客户成功/项目经理协助开通服务端解密功能。
- 开启加密后，如果服务端不支持解密，数据无法入库，会丢失，埋点管理中不会有报错。
- 版本要求
   - Edge v0.3.0 及以上版本
   - SDF 2.3 及以上版本

- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。