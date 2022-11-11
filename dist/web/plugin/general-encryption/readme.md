# 非对称加密上报数据

## 功能
通过自定义加密配置及加密方法，提供对上报数据进行自定义加密。
## 集成
### ES Module 方式
```javascript
import generalEncryption from '/dist/web/plugin/general-encryption/index.es6';
sensors.use(generalEncryption, {
  encrypt_utils: {
    encryptEvent: function (data) {
      return "返回数据经过对称加密后的加密结果";
    },
    encryptSymmetricKeyWithPublicKey: function (pub_key) {
      return "返回使用公钥通过非对称加密方法加密对称加密密钥的结果";
    },
  },
  pkv: 0, // 加密标识 类型：Number
  pub_key: "非对称加密公钥",
});

```

`pkv`会原文传输至服务端，作为服务端寻找对应加密方式等必要内容的标识。

### 参数配置
通过初始化参数设置全局统一的非对称加密逻辑的配置。  
- `encrypt_utils`：加密方法配置
  - `encryptEvent`：对称加密数据方法。类型：`Function`
  - `encryptSymmetricKeyWithPublicKey`：加密对称加密密钥的方法。类型：`Function`
- `pkv`: 加密方式标识。类型：`Number`
- `pub_key`:  非对称加密公钥。类型：`String`

## 加密逻辑

1. 触发上报数据行为
2. 根据配置判断是否开启自定义加密
3. 调用自定义加密方法加密上报数据，获取加密后的上报数据
4. 对上报数据进行 Base64 编码
5. 使用`pub_key`公钥通过自定义的非对称加密方法，对自定义对称加密的密钥进行加密，返回加密后的密钥
6. 重新封装数据
7. 发送数据

重新封装后的数据格式为
```javascript
{
    "pkv":"加密方式标识",
    "ekey":"使用公钥通过非对称加密方法加密对称加密密钥的结果",
    "payloads":["加密后的上报数据"]
}
```

## ⚠️ 注意
- 该插件不支持批量上报
- 该插件加密后，需使用自建服务端进行解密，解密后再同步到神策服务端。
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。