# 自定义存储采集数据并自定义发送时机
>⚠️ 此插件已自动集成在 SDK 中，<font color=red>禁止手动使用！</font>

## 功能
通过初始化 Web SDK 配置 `jsapp` 为参数，通过 `jsapp.setData` 方法获取并存储采集数据。在网络或需要发送数据时， 通过 `quick("setOnlineState", true)` 通知 Web SDK 通过 `jsapp.getData` 方法获取存储的采集数据并发送。

## 集成
### ES Module 方式
```js
sensors.init({
    // ... 其他配置
    jsapp:{
        setData: function (data){
            // 自行存储页面采集数据
        },
        getData: function (){
            // 返回存储的页面采集数据集合
            return []
        }
    }

});
```

## ⚠️ 注意
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。