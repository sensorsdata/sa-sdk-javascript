# sa-sdk-javascript

Sensors Analytics JavaScript SDK

完整文档请[点击这里](http://www.sensorsdata.cn/manual/js_sdk.html)，如有疑问请联系邮箱 shengyonggen@sensorsdata.cn。

需要使用的文件说明：

* sensorsdata.min.js：打包压缩后的，数据采集文件， sdk_url 使用这个文件的位置   
* heatmap.min.js：打包压缩后的，点击图渲染时候需要用的文件（ 1.9 以上版本新加 ）， heatmap_url 指定这个文件的位置   

> 注意 SDK 可能不完全向前兼容，请阅读具体的 Release Log。如果不确定是否支持，请联系神策技术支持人员！例如使用 1.9 版本 SDK ，神策分析系统必须也升级到 1.9 以上！
 
请根据需要 [Releases](https://github.com/sensorsdata/sa-sdk-javascript/releases) 里下载对应的文件     

插播广告一条：
 * 紧急招聘前端工程师，求发送到我邮箱 (shengyonggen@sensorsdata.cn)

 
最近更新：   
1.11.6 优化超时机制，增加自定义域名   
1.11.7 使用npm模块引入时候，多次init的判断   
1.11.8 在1.10.1 - 1.11.7间的版本有这个问题，必须更新！部分浏览器，发送相同数据时，不会发送，导致丢失数据的问题！  
1.11.9 heatmap增加了setContent参数，setContent是一个函数，有一个element参数，用户可以对元素内容进行操作，然后返回想要显示的内容，返回的内容会在点击图中的"当前内容"中显示  
1.11.10 增加autoTrackSinglePage首次可以触发profile_set_once的功能