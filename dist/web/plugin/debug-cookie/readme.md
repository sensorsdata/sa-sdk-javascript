# SaCookieDebug（cookie 诊断插件）

诊断浏览器环境下 SDK cookie 的写入/读取能力，定位「cookie 被写到 `.www.xxx.com` 子域」（SCB-329579）这类域名降级问题。根域 cookie 测试失败时，插件会先禁止本次数据采集，再补发一条诊断事件说明原因。

## 背景

SDK 默认通过 `getCookieTopLevelDomain` 逐级写测试 cookie 探测根域（`.lbank.com`），失败后会**降级**到下一级（`.www.lbank.com`）再把用户身份 cookie 写到子域上，导致：

- 同名 cookie（如 `sensorsdata2015jssdkcross`）在根域和子域各一条；
- `cookie.get` 读到哪条取决于浏览器序列化顺序，用户身份跨子域漂移。

本插件复刻该探测逻辑并采集每一级的成败明细，用于定位降级原因（浏览器隐私策略、iframe 三方 cookie 拦截、站点脚本干扰、SameSite 配置等）。

## 功能描述（执行流程）

整个流程按五个阶段同步执行（均在 `sdkAfterInitAPI` 生命周期内完成，早于 store 初始化和任何数据发送）。

### 1. 挂载时机与配置解析

选在 `sdkAfterInitAPI` 执行是因为此时四个前提刚好全部就绪：`sd.para` 已合并完（能读到 `cross_subdomain`、`set_cookie_samesite` 等配置）；sender 插件已在 `sdkAfterInitPara` 注册好发送拦截器（诊断事件能真正发出）；disable-sdk 插件已在 `sdkInitAPI` 初始化完（`sd.disableSDK` 已存在）；但 **store 尚未初始化、任何数据都还没发过**——诊断赶在所有埋点之前。

init 时先解析配置（仅从 `use` 的 option 传入），随后同步执行诊断。

### 2. 基础环境采集（只摸底，不做判断）

按顺序读取并记录：

1. `navigator.cookieEnabled`（非布尔按 true 处理，读取抛异常按 false）；
2. `navigator.userAgent`（定位具体浏览器/内核）；
3. 是否在 iframe（`window.top !== window.self`）；在的话再尝试读 `window.top.location.protocol`，抛异常说明是**跨域 iframe**（只记布尔值，不上报 URL）；
4. `location.hostname` / `location.protocol`（file:// 等极端环境容错）；
5. 当前域 cookie 总条数与 `document.cookie` 总长度（httpOnly 不可见）；
6. SDK 身份 cookie 名（`sd.store.getCookieName()`）及**该名字在 document.cookie 中出现的条数**——等于 2 即「同名 cookie 在根域和子域各一条」的直接证据。

### 3. 逐项能力测试（顺序有讲究）

1. **host-only 写入测试**（最先做，无前置条件）：用本次唯一随机键名以**不带 domain 属性**的方式写测试 cookie → 回读 → 立即清理。对应 `cross_subdomain: false` 场景和一切降级兜底场景。
2. **短路检查**：cookie 被禁用 → 直接定论 `cookie_disabled`，后续全部跳过。
3. **hostname 校验**（仅 `cross_subdomain` 非 false 时）：按 `getSafeHostname` 同款正则校验，标签数 < 2 或为 IP/localhost（候选序列为空）→ 定论 `hostname_invalid`。这两种情况 SDK 本来就退化为 host-only，属于设计内行为。
4. **根域逐级探测（关键步骤）**：复刻 `getCookieTopLevelDomain` 生成候选序列（`www.lbank.com` → `['.lbank.com', '.www.lbank.com']`；若配置了 `current_domain` 则候选只有配置域），然后逐级测试：
   - 每级用**独立键名**（`_root0`、`_root1`……）做「写入 → 回读 → 清理」，结果记入 attempts（最多 4 级）；
   - **第一个成功的级别**记为 `root_domain_resolved`，与 SDK 实际行为一致——`.lbank.com` 失败而 `.www.lbank.com` 成功时它就是 `.www.lbank.com`，即客户看到的现象；
   - **异常判定以第一个候选（期望根域）为准**：`.lbank.com` 失败即异常，哪怕降级后成功——降级本身就是问题。
5. **SameSite 正式写入测试**（仅当根域可用且配置了 `set_cookie_samesite`）：在解析域上带 SameSite（及 secure）属性再写一次。专门抓「探测 cookie 无 SameSite 属性能过、正式 cookie 带 `SameSite=None` 未配 `Secure` 被 Chrome 拒绝」这类独立问题。

所有测试键独立随机、用完即清，不污染 SDK 自身探测键 `sensorsdata_domain_test`，也不留残余。

### 4. 分类定论

`fail_reason` 按优先级从高到低判定，取值见下文 [fail_reason 取值](#fail_reason-取值)。另外：只有**发生过降级**（attempts 超过一级）才把逐级明细序列化进 `test_attempts`，正常用户不上传冗余数据。

### 5. 处置与上报

- `fail_reason !== 'ok'` 即视为异常：
  1. **先终止采集**（`disable_sdk: true` 时）：调 `sd.disableSDK()` 拦住所有数据 API 入口（checkState 包装），再注册 priority 0 的 sendDataStage 拦截器兜底——覆盖不走数据 API 的内部直发路径。
  2. **再补发诊断事件**：等 store 初始化完（`sdkReady`；init 后才 use 的场景立即发），因为 `kit.buildData` 要取 distinct_id。发送走 `sd.kit.sendData` 通道——不经过 checkState 包装器，**不受 disableSDK 影响**；发送时置 `sendingDiag` 标记，自身发送拦截器看到标记即放行，保证诊断事件是终止前发出的最后一条（也是唯一一条）数据。
- `always_send: true` 时正常环境也上报（仅上报，不终止）；默认异常才报。
- 兜底：kit 不可用、订阅 sdkReady 失败等均有 warnLog；`disable-sdk` 未加载时提示「已用发送拦截兜底」。

## 使用方式

```javascript
import sensors from 'dist/web/sensorsdata.full.js';
import SaCookieDebug from 'dist/web/plugin/debug-cookie/index.es6.js';

sensors.use(SaCookieDebug, {
  event_name: 'sa_web_cookie_debug', // 诊断事件名，可自定义
  disable_sdk: true,                 // 异常时是否终止本次数据采集，默认 true
  always_send: false                 // true 时全量上报诊断事件，用于排查分布，默认 false
});
sensors.init({ ... });

// 也支持字符串方式：sensors.use('SaCookieDebug', { ... })（需在构建工具 pluginNamesMap 登记后）
```

- 插件挂在 `sdkAfterInitAPI` 生命周期执行诊断，早于 store 初始化和任何数据发送；
- 诊断异常且 `disable_sdk: true` 时：调用 `disableSDK()`（需 disable-sdk 插件，full 包内置）并在发送阶段兜底拦截，之后所有数据不会发出；
- 诊断事件在 store 就绪后（`sdkReady`）通过 `sd.kit.sendData` 补发，不经过被 disable 拦截的数据 API 入口，因此一定能在终止前发出；
- 需要与 `disable-sdk` 插件配合（full 包已内置并自动 use）。
- 配置仅通过 `use` 的 option 传入。

## 诊断事件属性

| 属性 | 说明 |
| --- | --- |
| cookie_enabled | navigator.cookieEnabled |
| user_agent | navigator.userAgent，用于定位具体浏览器/内核 |
| in_iframe / cross_origin_iframe | 是否在 iframe / 跨域 iframe 中 |
| page_hostname / page_protocol | 当前页面域名与协议 |
| cookie_count / cookie_size | 当前域 cookie 条数 / document.cookie 总长度（httpOnly 不可见） |
| cross_subdomain | SDK 配置的 cross_subdomain |
| current_domain_config | 配置的 current_domain（未配置为空） |
| set_cookie_samesite / is_secure_cookie | SDK 配置的 SameSite / Secure |
| root_domain_candidate | 期望的根域（如 `.lbank.com`） |
| root_domain_test | 根域测试结果：ok / fail / skipped |
| root_domain_resolved | 实际会写入的域（空串表示 SDK 将退化为 host-only） |
| root_samesite_test | 带 SameSite 属性的正式写入测试（SameSite=None 未配 Secure 会 fail） |
| host_write_test | host-only 写入测试：ok / fail / skipped |
| test_attempts | 逐级测试明细 JSON（发生过降级才上报） |
| sdk_cookie_name / sdk_cookie_entry_count | SDK 身份 cookie 名 / 同名条数（为 2 即「两条 cookie」现象） |
| fail_reason | 见下表 |

## fail_reason 取值

| 值 | 含义 |
| --- | --- |
| ok | 正常 |
| cookie_disabled | 浏览器禁用 cookie |
| hostname_invalid | hostname 非法（IP、localhost、单标签），SDK 会退化为 host-only |
| root_domain_write_fail | 根域测试失败，SDK 将降级写入子域 —— 本次问题场景 |
| host_write_fail | host-only 写入失败 |
| all_write_fail | 根域与 host-only 均失败 |
| samesite_write_fail | 带 SameSite 属性的正式写入会失败（根域测试本身通过） |

## 如何从上报数据判断发生了子域降级

判定「发生了异常且 cookie 会写到 `.www.lbank.com` 这类子域」，看以下核心字段（组合条件，缺一不可）：

| 属性 | 判定值 | 说明 |
| --- | --- | --- |
| fail_reason | `root_domain_write_fail` | 该取值本身即意味着：期望根域写失败**且** host-only 写入正常——即「降级」路径，排除了全失败/禁 cookie 等其他异常 |
| root_domain_test | `fail` | 期望根域（`.lbank.com`）测试写入/回读失败，这是触发 SDK 降级的直接原因 |
| root_domain_resolved | `.www.lbank.com` | **实际会写入的域**（复刻 SDK `getCookieTopLevelDomain` 的返回值，SDK 写身份 cookie 用的就是它）。等于完整 hostname 加点即降到了子域；等于 `.lbank.com` 则正常 |

佐证字段：

- `root_domain_candidate` 与 `root_domain_resolved` 不相等 → 发生了降级；
- `test_attempts` 非空 → 逐级明细，如 `[{"domain":".lbank.com","ok":false},{"domain":".www.lbank.com","ok":true}]`（注意：非空只说明测试了多级，`all_write_fail` 也是多级，必须结合 fail_reason 判断）；
- `host_write_test` = `ok` → 子域显式写入能成功，cookie **真的会**落在 `.www.lbank.com` 上（若也是 fail 则为 `all_write_fail`，什么 cookie 都写不进去）；
- `cross_subdomain` = `true` 且 `current_domain_config` 为空 → 排除配置导致（`cross_subdomain: false` 是设计内 host-only；配置 `current_domain` 是显式指定，均不算降级）；
- `sdk_cookie_entry_count` = `2` → 该浏览器已**实际固化**两条同名 cookie（历史根域一条 + 降级新写子域一条），直接对应客户观察到的现象。时序细节：诊断发生在 store 初始化之前、本次正式 cookie 写入之前，首次出问题的浏览器可能是 1，刷新后变 2；
- `in_iframe` / `cross_origin_iframe` / `user_agent` / `cookie_count` / `cookie_size` → 不是判定条件，是**归因维度**：出问题的浏览器是否嵌在跨域 iframe、什么 UA、cookie 是否已很多，用于回答「为什么根域写不进」。

用其他 fail_reason 取值排除（均不是降级到子域）：

| fail_reason | 原因 |
| --- | --- |
| cookie_disabled / hostname_invalid | 未做逐级测试，`root_domain_test` 为 `skipped`、`resolved` 为空 |
| all_write_fail | host 也写不进，`resolved` 为空，cookie 机制整体不可用，不会产生子域 cookie |
| samesite_write_fail | `root_domain_test` 为 `ok`、`resolved` 是根域，cookie 会写在根域（只是正式写入被 SameSite 拒） |
| host_write_fail | `resolved` 是根域，仅 host 级异常 |

SA 平台事件分析的查询口径：

```
事件: sa_web_cookie_debug
筛选: fail_reason = root_domain_write_fail
     且 root_domain_resolved ≠ root_domain_candidate
     且 root_domain_resolved ≠ ''
```

满足即「降级发生且写到子域」。确认后按 `user_agent` × `in_iframe` × `cross_origin_iframe` 分组看分布，定位是哪类浏览器、哪种页面形态出的问题；`test_attempts` 模糊匹配 `.lbank.com","ok":false` 也可快速筛选。

## 如何从上报属性归因降级原因

归因核心思路：**单条事件提供的是「环境画像」，归因靠的是降级事件（异常组）的属性分布与正常组的差异**——差异集中在哪个维度，原因就指向哪个。

### 直接归因的属性组合

| 属性组合 | 指向的原因 |
| --- | --- |
| in_iframe=true + cross_origin_iframe=true | 页面被嵌在**跨站 iframe** 里，根域带 domain 属性的写入被三方 cookie 策略拦截（Safari ITP、Chrome 三方限制/分区 cookie）。行情/交易组件被外嵌是交易所常见形态，优先查 |
| in_iframe=true + cross_origin_iframe=false | 同域 iframe，浏览器 iframe 策略基本排除 → 指向页面脚本干扰 |
| in_iframe=false | 顶层页面也失败 → iframe 维度排除，只剩浏览器差异和站点脚本两个方向 |
| user_agent（及预置属性 $browser × $browser_version × $os）集中在特定浏览器/内核 | 该浏览器的 cookie 策略差异；UA 含 WebView/WKWebView 字样说明发生在 App 内嵌浏览器 |
| cookie_count 很高（100+，接近 Chrome 180 / Firefox 150 的每域上限） | 配额压力导致根域写入被拒/驱逐；cookie_size 大是辅助信号 |
| page_protocol='http:' + is_secure_cookie=true | secure 属性在 http 下写不进——但通常伴随 host 也失败（呈现为 all_write_fail），在降级场景基本可排除 |
| 以上都不显著（非 iframe、UA 分散、cookie 不多） | **排除法指向站点自身脚本**（CMP/风控/WAF hook 或清理 document.cookie）。插件属性测不出「是哪个脚本」，最终确认需在客户环境对 document.cookie setter 下断点抓调用栈 |

### 降级场景中无区分度、仅用于排除的字段

- `cookie_enabled`：恒为 true（否则是 cookie_disabled）；
- `current_domain_config`：恒为空（否则是配置问题不是降级）；
- `root_samesite_test`：降级场景为 skipped（SameSite 测试只在根域可用时做，服务 samesite_write_fail 场景）；
- `host_write_test`：恒为 ok（否则是 all_write_fail）；
- `test_attempts`：只是逐级事实明细，不参与归因。

### 间接但有价值的信号

- `sdk_cookie_entry_count` = 2：根域旧 cookie 还在 + 子域新 cookie，说明该浏览器**曾经正常写过根域**、后来才失败——环境发生过变化（浏览器升级、新装隐私插件、站点上了 CMP）；若刷新后 entry 仍为 1（根域从未写过），更像该环境一直如此。可用于区分「新问题」还是「存量问题」。
- `$url`（buildData 自动携带的预置属性）：失败集中在哪些页面路径，能对上「被外嵌的页面」还是全站。

### 平台侧操作步骤（归因主要发生在这里）

1. **排查期开 `always_send: true` 拿对照组**——正常组 vs 异常组的属性分布差异，比单看异常组可靠得多；
2. 筛出 `fail_reason = root_domain_write_fail`，按 `$browser × $browser_version × $os` 分组看集中度 → 浏览器归因；
3. 按 `in_iframe` / `cross_origin_iframe` 分组 → iframe 占比；
4. `cookie_count` 做数值分布对比（均值/分位数）→ 配额归因；
5. `sdk_cookie_entry_count` = 2 的占比 → 影响面（已固化两条 cookie 的用户量）。

> 边界说明：插件能归因到**环境类别**（iframe / 浏览器 / 配额 / 站点脚本），归因不到「具体哪个脚本拦的」；后者的最终确认要靠客户环境 setter 断点，或拿聚集的 UA 实机复现。

## 注意事项

1. 单实例使用（插件内部持有单例状态）。
2. 测试 cookie 使用随机后缀键名，诊断后立即清理，不影响正式数据。
3. 诊断读到的 cookie 条数不含 httpOnly cookie。
4. `disable_sdk` 开启后该浏览器将完全不采数据（包括后续刷新），用于「宁可不采也不采错」的场景；只想观察原因时请设为 `false`。
