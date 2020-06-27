## 1.15.10 (2020-6-27)
1. 修复
    - 1.15.8 引入的打开页面时候最近一次预置属性取值异常的 bug

## 1.15.9 (2020-6-15)
* 新增：$timezone_offset 预置属性

## 1.15.8 (2020-6-12)
* 修复：1.15.3 引入的在 iframe 里采集数据，第一秒内数据会丢失的 bug

## 1.15.6 (2020-6-5)
* 新增：Web 可视化 Chrome 插件截图功能
* 优化：App 内嵌 H5 时候，使用 file 协议加载 H5 时候导致的解析异常
* 优化：全埋点的点击采集从冒泡模式改为捕获模式
* 优化：增加点击图没有开启 pageview 时候的错误提示

## 1.15.5 (2020-5-22)
* 新增：App 内嵌 H5 的可视化方案
* 新增：第四版打通方案，解决苹果手机 iframe 打通问题
* 优化：Web 可视化中新增 a 链接是 javascript:; 的判断

## 1.15.4 (2020-5-7)

* 新增：Web 多域名打通

## 1.15.3 (2020-5-6)

* 新增：Web 可视化全埋点  

## 1.15.2 (2020-5-6)

* 优化：触达图实线的数据保留2位小数且取小 

## 1.15.1 (2020-4-12)

* 新增：由于弹框需要，新增监听事件发送和 ID 切换功能 
* 新增：为方便接入后续的弹框和可视化功能，新增了设置插件功能 

## 1.14.24 (2020-4-3)

* 新增：$SignUp 事件带上 $url 和 $title 预置属性
* 优化：源码安全性完善

## 1.14.23 (2020-3-9)

* 新增：自动采集含有特殊属性：data-sensors-click 的元素点击事件
* 修复：热力图高亮元素下为子元素增了 saContainer 样式导致样式错位
* 修复：iOS 操作系统 10.2 以下打通兼容问题

## 1.14.22 (2020-2-24)

* 优化：发送采集的数据时，会将与系统保留字段同名的属性过滤
* 修复：identify API 不传第二个参数，仍然会修改 storage 中的 distinct_id
* 优化：源码中移除了一点测试代码
* 新增：新增配置项设置 app 打通校验失败后，是否发送数据

## 1.14.21 (2020-2-10)

* 优化：热力图样式被全局样式干扰问题
* 新增：增加可配置的公共属性 $title
* 优化：热力图筛选功能报错

## 1.14.20 (2020-1-9)

* 优化：按照客户需求，优化触达图的监控逻辑。在单页面情况下，也能通过配置 scroll_map 的 collect_url 来筛选具体哪些页面开启。

## 1.14.18 (2019-12-24)

* 新增：点击图增加浮层用以筛选点击图展示的元素
* 新增：getPresetProperties() 可以获取 $latest_referrer_host 字段
* 修复：批量发送数据功能开启后，在断网/恢复后无法发送数据

## 1.14.17 (2019-12-16)

* 优化：没有调用 init 就执行 track 等相关方法，不报错

## 1.14.16 (2019-12-9)

* 修复：utm设置false时的取值异常问题

## 1.14.15 (2019-12-2)

* 优化：支持属性传入 function

## 1.14.14 (2019-11-25)

* 新增：增加sensorsdata.es6.min.js文件，适用于es6方式import文件

## 1.14.13 (2019-10-28)

* 优化：新版用户关联，每条数据中会有匿名id和真实id。
* 优化：如果单页面中设置了is_track_single_page:true，获取预置属性的接口getPresetProperties得到的$referrer会更新。

## 1.14.12 (2019-10-16)

* 优化：$WebStay 的停留时长，增加最大值的配置 scroll_event_duration，默认5小时。
* 修复：heatmap 配置中 element_selector 设置为 'not_use_id' 时候，$element_selector 取值错误。

## 1.14.11 (2019-10-09)

* 优化：$latest_referrer 为空时，$latest_referrer_host 也为空；只有在含有 $referrer 属性时才增加 $referrer_host 属性


## 1.14.10 (2019-10-08)

* 优化：$referrer 为空时 $referrer_host 也为空
* 新增：新增preset_properties，可以配置 url为true时， 所有事件都自动采集$url。默认是false
* 优化：合并preset_properties和is_track_latest，兼容is_track_latest，但是后续在preset_properties里配置的话，需要增加latest_前缀
* 优化：is_track_single_page:true 在 IE8 和 IE 9上会自动监听hashchange

## 1.14.9 (2019-09-17)

* 优化：解析URL参数值时,不自动替换加号为空格。修复utm里包含%2B时会被替换成空格的问题，不会自动解析表单值里的空格自动转换的+

## 1.14.8 (2019-08-30)
* 优化：sensors.login(id,callback) 增加 callback 功能
* 优化：referrer_host的取值是在发数据前通过referrer解析，不是在触发时候取值。配置项is_track_latest.referrer_host 默认值由 true 改为 false，默认不采集$latest_referrer_host最近一次前向地址


## 1.14.7 (2019-08-26)
* 新增：先存localStorage再发数据的功能，详细用法参考
1.可以解决本地网络如果暂时不好，发不出的话，可以先存储后发
2.可以解决关闭页面发数据丢失问题（通过先存本地，下次打开再发）
[详细文档](https://www.sensorsdata.cn/manual/js_sdk.html#81-batchsend)


## 1.14.6 (2019-08-15)

* 新增：enableLocalLog() 和 disableLocalLog() 方法开启和关闭控制台日志输出

## 1.14.5 (2019-08-06)

 * 修正了直接打开页面时，latest_相关属性显示为“取值异常”的问题
 * 修正了URL解析在部分浏览器上失败的问题

## 1.14.4 (2019-08-06)

 * 优化了解析URL的代码，减小了文件体积

## 1.14.3 (2019-07-30)

* 修复了不能获取搜索引擎关键词的问题

## 1.14.2 (2019-07-25)

* 修复，1.14.1中isReady不能保证sdk已经执行

## 1.14.1 (2019-07-19)

* 大幅优化代码结构。增加重复引入的判断，彻底解决各种异常重复引入问题
* is_track_single_page 参数增加支持 callback 类型
* 增加 img_use_crossorigin 配置项，如果设置为 true 以图片方式发送数据时请求不会附带 cookie，默认值为 false

## 1.13.14 (2019-07-03)

* 回退 1.13.11 增加的 corssOrigin，如果客户在 nginx 转发配置中，去掉了我们原有的 access-allow-origin 会导致请求失败

## 1.13.13 (2019-06-25)

* app和h5打通失败时，增加错误原因

## 1.13.12 (2019-06-21)

* 优化属性不规范的错误提示
* 优化非amd模式下js去掉支持require方式

## 1.13.11 (2019-06-14)

* 减小请求大小，以图片方式向神策后台发送数据时不带上 cookie

## 1.13.10 (2019-06-05)

* 解决了网页热力分析中点击图浮层样式被覆盖的问题
* 解决了设置 send_type: ajax 在 IE6 和 IE7 不工作的问题
* 修复了1.13.9引入的没有开启APP与H5打通时显示打通失败的问题

## 1.13.9 (2019-05-31)

* 增加了APP与H5打通时的日志信息

## 1.13.8 (2019-05-23)

* 修改了trackAllHeatMap必须设置heatmap属性否则会报错的BUG
* 去掉了callback 是对象类型时扩展 lib 属性的功能
* 增加了事件捕获模式支持
* 修复了$WebStay在关闭页面前没有发数据的bug

## 1.13.7 (2019-05-17)

* trackHeatMap 和 trackAllHeatMap 方法增加了自定义属性支持

## 1.13.6 (Unknown)

* 修改微信浏览器中获取不到document.documentElement.scrollTop而报错的异常
* 增加了浏览器发送数据不支持 beacon 时的适配，自动切换为 image 模式

## 1.13.5 (2019-05-13)

* 增加了简化版本的JSAPP功能，提供了存储和发送数据的接口，客户自己实现存储，来达到离线存储的目的，支持file协议

## 1.13.4 (2019-05-08)

* 增加了获取匿名ID的方法 sensors.quick('getAnonymousID') ,返回匿名 id
* 在存储 cookie 时会截取 register 的字符串 max_referrer_string_length 长度

## 1.13.3 (Unknown)

* 增加了新版的域名解析系统

## 1.13.2 (2019-04-10)

* 增加渠道类型中自定义付费广告的相关参数 souce_type.utm 配置
* 修改$latest_landing_page属性取值异常的情况
* 增加对.top的域名解析

## 1.13.1 (2019-04-04)

* 点击图的优化，增加https里发http请求的错误提示，增加heatmap_url没配置时候自动获取cdn，增加heatmap没配置时候无法查看点击图的错误提示

## 1.12.18 (2019-03-11)

* 增加is_track_single_page 自动采集url切换

## 1.12.17 (Unkown)

* 修复了获取搜索引擎关键字sogou和so产生的问题

## 1.12.16 (Unkown)

* 增加了is_track_latest配置属性，用于控制是否采集$latest相关属性，并且增加了$latest_landing_page用于表示最近一次落地页
* **增加了预置属性，可能需要小版本升级神策分析，改功能默认不开启**

## 1.12.15 (2019-03-01)

* referrer_domain参数修改，domain解析库增加ai后缀

## 1.12.14 (2019-02-20)

* trackHeatMap增加新方法trackAllHeatMap可以采集a，input，button标签

## 1.12.13 (Unknown)

* autoTrackSinglePage修改了当前referrer为url的问题

## 1.12.12 (Unknown)

* trackHeatMap方法增加callback属性
* 第一版点击图给点击元素的after和before伪元素增加了pointer-events:none属性

## 1.12.11 (Unknown)

* 增加clearAllRegister删除单个cookie的功能

## 1.12.10 (2019-01-25)

* $WebClick采集元素id的改进

## 1.12.9 (2019-01-22)

* 完善$WebStay对于横向滚动的判断

## 1.12.8 (2019-01-15)

* 增加了第二版点击图对于opacity=0的元素的判断

## 1.12.7 (2019-01-05)

* 增加判断heatmap.js和sensorsdata.js版本是否一致的判断，打印log

## 1.12.6 (2018-12-26)

* 去掉_nocache的防止静态缓存，默认增加_track_id的防止静态缓存，同时_track_id包含去重的功能，但是必须开启use_client_time。use_client_time如果使用客户端时间的话，会自动增加_flush_time来做客户端时间校准
* 完善ajax的timeout在ie6，7，8，9，10，11，edge下的各种异常处理
* 修复获取domain异常时候，设置cookie的domain再某些浏览器异常的问题

## 1.12.5 (2018-11-21)

* 优化关闭页面前，如果有多次发数据时候的性能，queue_timeout 设置成 0 的时候，不再使用setTimeout 0发送，改成直接发送。会脱离队列数据发送的流程，变为直接发送数据

## 1.12.3 (2018-11-14)

* 去除12.1增加的$WebStay的$viewport_left属性导致的埋点管理报错

## 1.12.2 (2018-11-10)

* 增加点击图采集数据时候，采集浏览器宽度
* 调整点击图开始渲染的时间为1秒间隔

## 1.12.1 (2018-11-09)

* 增加点击图第二版，按快捷键z和x，可切换点击图的渲染模式，用于解决某些点击图页面的样式冲突问题
* 增加配置heatmap:{element_selector:'not_use_id'} 不会使用id做为选择器，防止随机id导致的点击图不能使用
* 增加触达率图左右滚动的检查，禁止左右滚动触发scroll
* 增加scrollmap:{collect_url:false}{collect_url:function(){}}的配置。配置false的话，不采集$WebStay也就没有触达率图，配置function的话，会执行fucntion看返回值，返回真就采集，返回假不采集

## 1.11.10 (2018-10-22)

* 增加autoTrackSinglePage首次可以触发profile_set_once的功能

## 1.11.9 (2018-10-15)

* heatmap增加了setContent参数，setContent是一个函数，有一个element参数，用户可以对元素内容进行操作，然后返回想要显示的内容，返回的内容会在点击图中的"当前内容"中显示

## 1.11.8 (2018-09-29)

* 在10.1 - 1.11.7间的版本有这个问题，必须更新！部分浏览器，发送相同数据时，不会发送，导致丢失数据的问题！

## 1.11.7 (2018-09-20)

* 使用npm模块引入时候，多次init的判断

## 1.11.6 (2018-09-10)

* 优化超时机制，增加自定义域名
