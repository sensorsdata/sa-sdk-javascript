(function(){function define_url(it
/**/) {
var out='<div class="sensors-jssdk-trigger-box-out"> <div class="sensors-jssdk-trigger-box-header sensors-jssdk-clearfix"> 所有已埋点页面 </div> <div class="sensors-jssdk-trigger-box-content"> <ul> '; for(var key in it) {  out+=' <li class="sensors-jssdk-trigger-box-content-li"> <div class="sensors-jssdk-clearfix sensors-jssdk-trigger-box-content-title"> <span>'+(key || '' )+'</span> </div> <ul class="sensors-jssdk-trigger-box-content-list"> '; for(var keyUrl in it[key]) {  out+=' <li class="sensors-jssdk-clearfix"> <a href="'+(it[key][keyUrl])+'" title="'+(it[key][keyUrl])+'" target="_blank"> ... '+(keyUrl)+' </a> </li> '; } out+=' </ul> </li> '; } out+=' </ul> </div></div>';return out;
}var itself=define_url, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());doT.gtemplate = doT.gtemplate || {};doT.gtemplate['define_url'] = itself;}());
(function(){function head_box(it
/**/) {
var out='<div class="sensors-jssdk-head-out" sensors_ignore_tag="all"> <div class="sensors-jssdk-head-in"> <div class="sensors-jssdk-head-in-right">  <button class="sensors-jssdk-btn" data-sensors-action="define_url">切换已埋点页面</button> <button class="sensors-jssdk-btn" data-sensors-action="trigger_box">本页埋点</button> <button class="sensors-jssdk-btn" data-sensors-action="exit_login">退出</button> <button class="sensors-jssdk-btn" style="background:#097;font-weight:bold;" data-sensors-action="mini-right"> &gt; </button>  <!-- <button class="sensors-jssdk-btn" style="display:none;background:#097;font-weight:bold;" data-sensors-action="mini-right-2"> &lt; </button>           --> </div> <div class="sensors-jssdk-head-in-left"> <a href="javascript:;" style="cursor:move;background:url(https://www.sensorsdata.cn/img/logo-6a5f89d488.svg) no-repeat scroll center center / 120px 41px;display: inline-block;height:40px;text-decoration:none !important;width: 130px;"> </a> </div> <div class="sensors-jssdk-head-in-main"> <button data-sensors-action="define_mode" class="sensors-jssdk-btn';if(it.navStatus === 'defineMode'){out+=' sensors-jssdk-btn-success';}out+='" >埋点模式</button> <button data-sensors-action="test_mode" class="sensors-jssdk-btn';if(it.navStatus === 'testMode'){out+=' sensors-jssdk-btn-success';}out+='" >测试模式</button> </div>  </div> </div>';return out;
}var itself=head_box, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());doT.gtemplate = doT.gtemplate || {};doT.gtemplate['head_box'] = itself;}());
(function(){function popover_box(it
/**/) {
var out='<div class="sensors-jssdk-modal-dialog sensors-jssdk-modal-box"> <div class="sensors-jssdk-modal-content"> <div class="sensors-jssdk-modal-header"> <button type="button" class="sensors-jssdk-close" data-dismiss="modal" aria-hidden="true"> &times; </button> <div class="sensors-jssdk-color-green" style="font-size: 14px;line-height:1;font-weight:bold;margin:0;"> 添加埋点 </div> </div> <div class="sensors-jssdk-modal-body"><div style="position: relative;padding:0;margin:0;"><div style="color:#f11;display:none;padding: 5px 0;text-align: left;" class="sensors-jssdk-popover-head-error-notice"></div> <div class="sensors-jssdk-popover-line"> <p class="sensors-jssdk-color-green">事件名</p> <div> <input class="sensors-jssdk-input-large" type="text" data-name="name" value="'+(it.name || '')+'" placeholder="支持英文、数字和下划线"/> </div> </div> <div class="sensors-jssdk-popover-line"> <p class="sensors-jssdk-color-green">事件显示名</p> <div> <input class="sensors-jssdk-input-large" type="text" data-name="cname" value="'+(it.cname || '')+'"/> </div> </div> <div class="sensors-jssdk-popover-line sensors-jssdk-popover-line-url-radio">  <p class="sensors-jssdk-color-green">URL匹配方式</p> <div class="clearfix"> <div class="sensors-jssdk-gselectbox-out"> <select data-name="sensorsdata-vtrack-url-radio"> <option value="fixed">固定URL</option> <option value="part">部分匹配</option> <option title="可以使用js正则表达式匹配url" value="regexp">正则匹配</option> </select> </div> <input style="float:right; width: 69%; height: 36px;" class="sensors-jssdk-input-large" type="text" data-name="url" value="'+(it.url || '')+'"/>             </div> </div> <div class="sensors-jssdk-popover-line"> <p class="sensors-jssdk-color-green">限定元素内容</p> <div class="sensors-jssdk-clearfix">  <div class="sensors-jssdk-gselectbox-out"> <select data-name="selfTextCheck"> <option value="no">否</option> <option value="yes">是</option> </select> </div> <input style="float:right; width: 69%; height: 36px;" type="text" data-name="selfText" value="'+(it.selfText || '')+'"/> </div> </div> <p> <a href="javascript:;" class="sensors-jssdk-popover-button">添加埋点</a> </p> </div> </div> </div> </div>';return out;
}var itself=popover_box, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());doT.gtemplate = doT.gtemplate || {};doT.gtemplate['popover_box'] = itself;}());
(function(){function testmode_box(it
/**/) {
var out='<div id="sensors_jssdk_right_box" class="sensors-jssdk-right-box" style="border-radius: 2px;box-shadow:-3px 3px 6px #555;font-family: monospace;font-size:12px;line-height:12px;width: 300px; right: 0px; background: #eee; opacity:0.95; top:0; bottom:68px; position: fixed; z-index: 99999; overflow-y:auto;"> <section> <header style="cursor:move;padding:10px 20px;background:#2e384a;color:#ececee;"> 已触发事件 </header> <ul> </ul> </section></div>';return out;
}var itself=testmode_box, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());doT.gtemplate = doT.gtemplate || {};doT.gtemplate['testmode_box'] = itself;}());
(function(){function trigger_box(it
/**/) {
var out='<div class="sensors-jssdk-trigger-box-out"> <div class="sensors-jssdk-trigger-box-header sensors-jssdk-clearfix"> <button class="sensors-jssdk-trigger-box-deploy-btn" style="background:#19b27b;border:none;border-radius: 4px;color: #fff;float: right;padding: 6px;cursor: pointer;font-size:14px;font-weight:bold;">部署生效</button> <span class="sensors-jssdk-trigger-box-header-title-change">您有新的改动，需要部署才能生效</span> </div> <div class="sensors-jssdk-trigger-box-content"> <ul> '; for(var key in it) {  out+=' <li class="sensors-jssdk-trigger-box-content-li"> <div class="sensors-jssdk-clearfix sensors-jssdk-trigger-box-content-title"> <!--<span class="sensors-jssdk-trigger-box-content-delete"> X </span>--> <span>'+(it[key].cname || '' )+((' ( '+it[key].name+' ) ' )|| '')+'</span> </div> <ul class="sensors-jssdk-trigger-box-content-list"> ';var arr1=it[key].triggers;if(arr1){var obj,index=-1,l1=arr1.length-1;while(index<l1){obj=arr1[index+=1];out+=' <li class="sensors-jssdk-clearfix ';if((obj.to_del || !obj.deployed)){out+='sensors-jssdk-trigger-box-attention-red';}out+='" data-trigger="'+(String(obj.trigger_id))+'" data-deploy="'+(String(obj.deployed))+'">  ';if(obj.to_del){out+=' <span class="sensors-jssdk-trigger-box-left-sign"> — </span> <span class="sensors-jssdk-trigger-box-condition"><strike>点击 '+((obj.nthEle.join(' ') + (obj.selfAttr.text ? '且包含内容'+obj.selfAttr.text : '') ))+'</strike></span> ';}else if(obj.deployed){out+=' <span class="sensors-jssdk-trigger-box-left-sign" style="visibility: hidden;"> ＝ </span> <span class="sensors-jssdk-trigger-box-condition">点击 '+((obj.nthEle.join(' ') + (obj.selfAttr.text ? '且包含内容'+obj.selfAttr.text : '') ))+'</span> ';}else{out+=' <span class="sensors-jssdk-trigger-box-left-sign"> ＋ </span> <span class="sensors-jssdk-trigger-box-condition">点击 '+((obj.nthEle.join(' ') + (obj.selfAttr.text ? '且包含内容'+obj.selfAttr.text : '') ))+'</span> ';}out+=' ';if(!obj.to_del){out+=' <span class="sensors-jssdk-trigger-box-content-delete"> 删除 </span> ';}else{out+=' <span class="sensors-jssdk-trigger-box-content-revert"> 恢复 </span> ';}out+=' </li> ';} } out+=' </ul> </li> '; } out+=' </ul> </div></div>';return out;
}var itself=trigger_box, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());doT.gtemplate = doT.gtemplate || {};doT.gtemplate['trigger_box'] = itself;}());