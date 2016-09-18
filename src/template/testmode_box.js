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