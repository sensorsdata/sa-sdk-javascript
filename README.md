# sa-sdk-javascript
Sensors Analytics JavaScript SDK
具体使用方法请参考 http://www.sensorsdata.cn/manual/js_sdk.html  
如有疑问请联系邮箱 shengyonggen@sensorsdata.cn 比较着急的话可以QQ 522370351

## 1.4.3
增加sa.quick('autoTrack')方法，可以自动追踪pv，和设置首次来源。  
同时对于属性的验证放宽，如果属性名错误，一样会发到后端。之前是会在前端抛掉。目前这样做可以方便在后端看到错误，方便debug错误原因。

