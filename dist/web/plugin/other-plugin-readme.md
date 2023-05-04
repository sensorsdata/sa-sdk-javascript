# 其他插件使用方式
## 为什么推荐用 ES Module 

我们推荐使用 ES Module 的方式来使用插件，因为我们需要让插件实例暴露出来，但是如果直接暴露在 window 全局的话，会存在全局变量冲突的风险，这样会影响客户现有的环境。因此我们推荐 ES Module 匿名模块的形式。

除此之外，为了兼容传统的 Script 直接加载的方式，还有如下两种模式。

## 插件名字符串
这是 v1.24.1 之前的就使用插件的模式，这种方式在以后也是可以直接使用的。

使用方式：

- 选择使用插件目录下打包出来的不带后缀的 index.js （如果是内置的插件，不需要引入，是否是内置查看官方插件文档）
- use 传入 “插件名字符串” 既可（插件名字符串下面可查）
```javascript
<script src='/dist/web/sensorsdata.min.js'>
<script src='/dist/web/plugin/xx-plugin/index.js'>
var sensors = window.sensorsDataAnalytic201505;
sensors.use('xxx');
sensors.init()
```

下面是对应的 “插件名字符串”， key 是插件文件夹的名字，value 是插件名字符串，其中数组表示 其中的值 都可以用。
```javascript
{
    'aes-encryption': 'AesEncryption',
    'amp': 'Amp',
    'android-bridge': 'AndroidBridge',
    'android-obsolete-bridge': 'AndroidObsoleteBridge',
    'channel': 'SensorsChannel',
    'channel-utm': 'ChannelUtm',
    'deeplink': ['Deeplink', 'deeplink'],
    'ios-bridge': 'IOSBridge',
    'ios-obsolete-bridge': 'IOSObsoleteBridge',
    'pageleave': 'PageLeave',
    'pageload': 'PageLoad',
    'register-properties': 'RegisterProperties',
    'register-property-page-height': 'RegisterPropertyPageHeight',
    'session-event': 'SessionEvent',
    'site-linker': 'SiteLinker',
    'site-linker-concat-utm': 'SiteLinkerConcatUtm',
    'utm': 'Utm',
    'exposure': 'Exposure',
    'wechat-webview-channel': 'WechatWebViewChannel'
}
```

## 手动标记插件变量名
为了提高扩展性和稳定性，我们默认不提供挂在 window 全局变量的插件。但是如果客户一定使用全局变量，可以使用我们提供的 index.closure.js 修改

手动打开 index.clousure.js 的压缩的源码，并把压缩代码首位的 ` ! ` 叹号改成 `window.myxx = ` 来标记你对这个插件的全局变量名。   

```js
// index.closure.js 中源代码格式 !function(){...
// 改成
window.myxx = function(){....
``` 
有了全局名字之后，后面就可以使用传统的 `script` 方式引入 
```js
<script src='/dist/web/sensorsdata.min.js'>
<script src='/dist/web/plugin/xx-plugin/index.closure.js'>
var sensors = window.sensorsDataAnalytic201505;
sensors.use(window.myxx);
sensors.init()
```

## 常见问题
1. 为什么不给插件提供全局变量 
   
    插件提供全局变量可能会导致和客户的代码中的变量冲突，另外这种模式无法支持一个插件引入多次的场景。
2. 为什么不推荐使用插件名字符串的方式 
   
    这种方式不使用全局变量，可以解决全局变量引发的变量冲突的问题，但是同样解决不了一个插件多次引入的场景。并且你必须知道插件名字是什么。所以并不符合插件长远的发展规划。
3. 手动标记变量的方式是否推荐 

    虽然也是设置全局变量，但因为是客户自己设置，所以理论上不会存在冲突。同时如果需要使用多次引入同一个插件，可以自己配置不同的变量名。所以这种方式的扩展性是可以的，不会跟我们长远的插件规划冲突，只是需要手动配置。