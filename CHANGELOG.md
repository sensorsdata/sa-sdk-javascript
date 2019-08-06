## 1.14.5

 * 修正了直接打开页面时，latest_相关属性显示为“取值异常”的问题
 * 修正了URL解析在部分浏览器上失败的问题

## 1.14.4

 * 优化了解析URL的代码，减小了文件体积

## 1.14.3

* 修复了不能获取搜索引擎关键词的问题

## 1.14.2

* 修复，1.14.1中isReady不能保证sdk已经执行

## 1.14.1

* 大幅优化代码结构。增加重复引入的判断，彻底解决各种异常重复引入问题
* is_track_single_page 参数增加支持 callback 类型
* 增加 img_use_crossorigin 配置项，如果设置为 true 以图片方式发送数据时请求不会附带 cookie，默认值为 false

## 1.13.14

* 回退 1.13.11 增加的 corssOrigin，如果客户在 nginx 转发配置中，去掉了我们原有的 access-allow-origin 会导致请求失败

## 1.13.13

* app和h5打通失败时，增加错误原因

## 1.13.12

* 优化属性不规范的错误提示
* 优化非amd模式下js去掉支持require方式

## 1.13.11

* 减小请求大小，以图片方式向神策后台发送数据时不带上 cookie

## 1.13.10

* 解决了网页热力分析中点击图浮层样式被覆盖的问题
* 解决了设置 send_type: ajax 在 IE6 和 IE7 不工作的问题
* 修复了1.13.9引入的没有开启APP与H5打通时显示打通失败的问题

## 1.13.9

* 增加了APP与H5打通时的日志信息

## 1.13.8

* 修改了trackAllHeatMap必须设置heatmap属性否则会报错的BUG
* 去掉了callback 是对象类型时扩展 lib 属性的功能
* 增加了事件捕获模式支持
* 修复了$WebStay在关闭页面前没有发数据的bug

## 1.13.7

* trackHeatMap 和 trackAllHeatMap 方法增加了自定义属性支持

## 1.13.6

* 修改微信浏览器中获取不到document.documentElement.scrollTop而报错的异常
* 增加了浏览器发送数据不支持 beacon 时的适配，自动切换为 image 模式

## 1.13.5

* 增加了简化版本的JSAPP功能，提供了存储和发送数据的接口，客户自己实现存储，来达到离线存储的目的，支持file协议

## 1.13.4

* 增加了获取匿名ID的方法 sensors.quick('getAnonymousID') ,返回匿名 id
* 在存储 cookie 时会截取 register 的字符串 max_referrer_string_length 长度

## 1.13.3

* 增加了新版的域名解析系统

## 1.13.2

* 增加渠道类型中自定义付费广告的相关参数 souce_type.utm 配置
* 修改$latest_landing_page属性取值异常的情况
* 增加对.top的域名解析

## 1.13.1

* 点击图的优化，增加https里发http请求的错误提示，增加heatmap_url没配置时候自动获取cdn，增加heatmap没配置时候无法查看点击图的错误提示

## 1.12.18

* 增加is_track_single_page 自动采集url切换

## 1.12.17

* 修复了获取搜索引擎关键字sogou和so产生的问题

## 1.12.16

* 增加了is_track_latest配置属性，用于控制是否采集$latest相关属性，并且增加了$latest_landing_page用于表示最近一次落地页
* **增加了预置属性，可能需要小版本升级神策分析，改功能默认不开启**

## 1.12.15

* referrer_domain参数修改，domain解析库增加ai后缀

## 1.12.14

* trackHeatMap增加新方法trackAllHeatMap可以采集a，input，button标签

## 1.12.13

* autoTrackSinglePage修改了当前referrer为url的问题

## 1.12.12

* trackHeatMap方法增加callback属性
* 第一版点击图给点击元素的after和before伪元素增加了pointer-events:none属性

## 1.12.11

* 增加clearAllRegister删除单个cookie的功能

## 1.12.10

* $WebClick采集元素id的改进

## 1.12.9

* 完善$WebStay对于横向滚动的判断

## 1.12.8

* 增加了第二版点击图对于opacity=0的元素的判断

## 1.12.7

* 增加判断heatmap.js和sensorsdata.js版本是否一致的判断，打印log

## 1.12.6

* 去掉_nocache的防止静态缓存，默认增加_track_id的防止静态缓存，同时_track_id包含去重的功能，但是必须开启use_client_time。use_client_time如果使用客户端时间的话，会自动增加_flush_time来做客户端时间校准
* 完善ajax的timeout在ie6，7，8，9，10，11，edge下的各种异常处理
* 修复获取domain异常时候，设置cookie的domain再某些浏览器异常的问题

## 1.12.5

* 优化关闭页面前，如果有多次发数据时候的性能，queue_timeout 设置成 0 的时候，不再使用setTimeout 0发送，改成直接发送。会脱离队列数据发送的流程，变为直接发送数据

## 1.12.3

* 去除12.1增加的$WebStay的$viewport_left属性导致的埋点管理报错

## 1.12.2

* 增加点击图采集数据时候，采集浏览器宽度
* 调整点击图开始渲染的时间为1秒间隔

## 1.12.1

* 增加点击图第二版，按快捷键z和x，可切换点击图的渲染模式，用于解决某些点击图页面的样式冲突问题
* 增加配置heatmap:{element_selector:'not_use_id'} 不会使用id做为选择器，防止随机id导致的点击图不能使用
* 增加触达率图左右滚动的检查，禁止左右滚动触发scroll
* 增加scrollmap:{collect_url:false}{collect_url:function(){}}的配置。配置false的话，不采集$WebStay也就没有触达率图，配置function的话，会执行fucntion看返回值，返回真就采集，返回假不采集

## 1.11.10

* 增加autoTrackSinglePage首次可以触发profile_set_once的功能

## 1.11.9

* heatmap增加了setContent参数，setContent是一个函数，有一个element参数，用户可以对元素内容进行操作，然后返回想要显示的内容，返回的内容会在点击图中的"当前内容"中显示

## 1.11.8

* 在10.1 - 1.11.7间的版本有这个问题，必须更新！部分浏览器，发送相同数据时，不会发送，导致丢失数据的问题！

## 1.11.7

* 使用npm模块引入时候，多次init的判断

## 1.11.6

* 优化超时机制，增加自定义域名
