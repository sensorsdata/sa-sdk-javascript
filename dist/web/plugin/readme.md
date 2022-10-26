# 插件使用规范
为了满足多变的需求，提供可无限扩展的能力。神策的 Web SDK 将逐步演化为插件式架构。   
SDK 会越来越轻量化，不久的将来只剩下 SDK 只会包含 CORE 的代码。    
一切都是插件，业务都是通过插件来实现。   

## 插件使用注意点
1. **按顺序引入插件 ！先 `import` 主 SDK，后 `import` plugin。先调用 `use`，后调用 `init`。**
2. **版本必须一致 ！如果单独升级了插件，必须同时单独更新主 SDK。建议 dist 下的目录一起更新，这样就不会出现版本不一致。**

## 插件目录说明
```
dist
├── web
    ├── plugin
    │   ├── plugin-xx
    │   │   ├── index.es6.js
    │   │   ├── index.closure.js
    │   │   ├── index.js
    |── sensorsdata.es6.min.js
    |── sensorsdata.min.js
```
插件文件在 /dist/web/plugin/[插件名]/ 下 ，有如图所示的几种格式。
* .es6.js 是打包出来的 es6 格式 ，适用于下面的标准 ES Module 写法
* .closure.js 是打包出来的匿名函数 ，参考下面的其他方式
* .js 兼容  use('插件名字符串') 的历史用法 ，参考下面的其他方式

## 代码示例
### **1. ES Module 方式 (推荐方式)**
引入 /dist/web/plugin/xx/index.es6.js   
```javascript
import sensors from './dist/web/sensorsdata.es6.js';
import pluginXX from './dist/web/plugin/xx/index.es6.js';
sensors.use(pluginXX,config);    
sensors.init();  
``` 

### 2. 其他方式  
参考 [其他插件方式](https://manual.sensorsdata.cn/pages/viewpage.action?pageId=103022598)
