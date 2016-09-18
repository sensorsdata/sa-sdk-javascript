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