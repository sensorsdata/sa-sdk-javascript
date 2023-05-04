# SAT - 渠道链接监测和回传

## 功能
Web JS SDK 支持针对特定渠道进行更精准的渠道匹配和向广告平台进行事件回传。

### 原理
解析当前链接地址中的 `sat_cf` 参数，如果有改参数则将当前页面地址作为落地页地址并上报 `$ChannelLinkReaching` 事件。

### 效果
可以使用 `sensors.track(eventName)` 来对特定的事件进行渠道追溯。

>- 从站外进入渠道推广落地页、首次触发回传事件，记录事件并进行渠道匹配和回传。
>- 非首次触发回传事件，记录事件但不会进行渠道匹配及回传，直到下一次重新从站外进入渠道推广落地页，重新进行首次计算。 

示例数据： 

```js
{
    "distinct_id": "17838fda69c577-06233a8ff9a91a-7d7d326e-181760-17838fda69db9c",
    "lib": {
        "$lib": "js"
        "$lib_method": "code"
        "$lib_version": "1.16.6"
    },
    "properties": {
        "$timezone_offset": -480,
        "$screen_height": 568,
        "$screen_width": 320,
        "$lib": "js",
        "$lib_version": "1.16.6",
        "$latest_traffic_source_type":"直接流量",
        "$latest_search_keyword":"未取到值_直接打开",
        "$latest_referrer":"",
        "_sa_channel_landing _url": "http://www.ls.com:8080/sdkCode/intergrated-test/sakchannel/index.html?channel_id=27878&sat_cf=1234",
        "$is_channel_callback_event": true,
        "$is_first_day":true,
        "$url": "http://www.ls.com:8080/sdkCode/intergrated-test/sdkchannel/index.html?channel_id=27878&sat_cf=1234",
        "$title": "test channel"
    },
    "anonymous_id": "17838fda69c577-06233a8f9a91a-7d7d326-181760-17838fda69db9c",
    "type": "track",
    "event": "ViewProduct",
    "_track_id":"435539772"
}
```

## 集成
### ES Module 方式
```javascript
import SensorsChannel from '/dist/web/plugin/channel/index.min.js';
sensors.use(SensorsChannel);
```

## 变动
新增事件：`$ChannelLinkReaching`，该事件表示渠道链接落地。
<br>

- 新增属性：`_sa_channel_landing_url`，落地页地址。
- 新增属性：`_sa_channel_landing_url_error`，落地页取值异常信息。

## ⚠️ 注意

- 上述规则适用于同名事件，不同事件之间不相互影响。
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。