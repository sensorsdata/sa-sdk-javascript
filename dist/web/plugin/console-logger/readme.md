# 控制台日志输出
## 功能
提供控制台日志输出能力，在控制台打印 SDK 及 SDK 插件中的日志。该插件在 SDK 中已默认集成并使用，<font color=red>请勿手动使用！</font>
## 集成
### ES Module 方式
```javascript
import consoleLogger from '/dist/web/plugin/console-logger/index.es6.js';
sensors.use(consoleLogger);
```
## ⚠️ 注意
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。