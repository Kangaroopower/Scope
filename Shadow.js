(function (window, $) {
	var shtext, findbox, msg, shadowcss, textareacss, commoncss, regex, matchcolor, highlightcolor;
	function Shadow (textarea, params) {
		var args = params || {};
		shtext = textarea;
		findbox = setParams(args, 'findplace', $('#sc-find-text'));
		msg = setParams(args, 'msgplace', $('#sc-count'));
		shadowcss = setParams(args, 'shadowcss', {
				height: '100%', 'text-align': 'left', overflow: 'auto', 
				'line-height': '140%', 'font-size': '13.5px', 
				'font-family': 'Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace',
				position: 'absolute', zIndex: '0', 'white-space': 'pre-wrap', 
				'background-color': 'transparent', color: 'transparent'
			});
		textareacss = setParams(args, 'textareacss', {
				position: 'relative', zIndex: '1', 'background-color': 'transparent'
			});
		commoncss = setParams(args, 'commoncss', {
				width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
				outline: 'medium none', margin: 0, padding: 0, resize: 'none'
			});
		regex = setParams(args, 'regex');
		matchcolor = setParams(args, 'matchcolor', '#08c');
		highlightcolor = setParams(args, 'regex', '#700066');
	}

	var matches = [], nTrav = 0, sch = -1;

	/**** START UTILITY FUNCTIONS ****/

	//logs Shadow stuff in console
	var note = (window.console && function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('Shadow:');
		return window.console.log.apply(window.console, args);
	}) || function () {};

	//sets the parameters for Scope
	var setParams = function (obj, name, fallback) {
		var res;
		if (name in obj) {
			res = obj[name];
		} else {
			if (fallback) {
				res = fallback;
			} else {
				res = null;
			}
		}
		return res;
	};

	//credits to http://stackoverflow.com/questions/384286/
	var isElement = function (o){
		return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
			o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
		);
	};

	//Returns the response from shadow- different from log- that outputs to console.log
	//all the time (and that too only debug data), while this outputs info important to the user
	//in any place, be it a function or a html element.
	var response = function (text, place) {
		if (isElement(place)) {
			place.innerHTML =text;
		} else if (typeof place === 'function') {
			place(text);
		} else {
			return;
		}
	};

	//credits to http://jsperf.com/style-versus-jquery-css/8
	var css = function (elements, obj) {
		var style = elements.style;
		if (!style) {
			for (var e = 0, elen = elements.length; e < elen; e++) {
				css(elements[e], obj);
			}
		} else {
			for (var i in obj) {
				style[i] = obj[i];
			}
		}
	};

	//credits to http://stackoverflow.com/questions/171251/
	var merge = function(obj1, obj2){
		var obj3 = {};
		for (var firstattrname in obj1) { obj3[firstattrname] = obj1[firstattrname]; }
		for (var secondattrname in obj2) { obj3[secondattrname] = obj2[secondattrname]; }
		return obj3;
	};

	//Imports scripts
	var asset = function (script, callback) {
		var s = document.createElement('script');
			s.setAttribute('src', script);
			s.setAttribute('type', 'text/javascript');
		document.getElementsByTagName('head')[0].appendChild(s);
		script.onload = callback();
	};

	//allows for functions to be passed into innerhtml
	var inhtml = function (func, elem) {
		var thehtml = func();
		elem.innerHTML = thehtml;
	};

	//Array forEach implementation for IE 8
	var forEach = function(array, func) {
		for(var i = 0; i < array.length; ++i) {
			func.call(this, array[i]);
		}
	};

	/**** START SHADOW ****/

	Shadow.prototype.init = function () {
		asset('http://raw.github.com/Kangaroopower/Scope/master/Rangy.js', function () {
			var theshadow = document.createElement('div');
			theshadow.id = 'shadow';
			shtext.parentNode.insertBefore(theshadow, shtext.nextSibling);
			css(shtext, merge(commoncss, textareacss));
			css($('#shadow'), merge(commoncss, shadowcss));
			shtext.onscroll = function () { 
				$('#shadow').scrollTop = shtext.scrollTop;
			}; 
			shtext.focus();
			var properties = ['onpaste', 'oncut', 'onclick', 'onkeyup'];
			forEach(properties, function (val) {
				shtext[val] = Shadow.prototype.synch;
				findbox[val] = Shadow.prototype.synch;
			});
			Shadow.prototype.synch();
		});
	};

	Shadow.prototype.synch = function () {
		note('synching');
		var s = shtext.value.replace('<', '&lt;'), regex, m;
		if (findbox.value === '') {
			regex = null;
		} else {
			if (typeof regex === 'function') {
				regex = eval(''+regex+'();' );
			} else {
				regex = regex;
			}
		}
		note('regex', regex);
		note('isregex', regex instanceof RegExp);
		matches = [];
		if (regex instanceof RegExp) {
			while (m = regex.exec(s)) {
				matches.push(m.index);
			}
			response(matches.length + ' matches!', msg);
			note(matches);
		} else {
			response('&nbsp;', msg);
		}
		inhtml(function () {
			var r = '', sanitizedfind = findbox.value.replace('<', '&lt;');
			for (var i = 0, start = 0; i < matches.length; i++) {
				r += s.substr(start, matches[i] - start);
				start = matches[i] + findbox.value.length;
				r += '<span id="sc' + i + '"class="sc-match" style="background-color:'+highlightcolor+'">' + sanitizedfind + '</span>';
			}
			if (s.substr(start+1).length > 0) {
				r += s.substr(start+1);
			}
			var rltxt = r.length ? r : s;
			return rltxt;
		}, $('#shadow'));
		if (matches.length) {
			css($('#sc-down'), {cursor: 'pointer'});
		}
		css($('#shadow'), {
			height: shtext.style.height,
			width: shtext.style.width
		});
	};

	Shadow.prototype.highlight = function (high) {
		shtext.setSelection(matches[high], matches[high] + findbox.value.length);
		$('#sc' + sch).removeAttribute('style');
		sch = high;
		if (nTrav === matches.length) {
			nTrav = 0;
		}
		nTrav++;
		response(nTrav + ' of ' + matches.length, msg);
		Shadow.prototype.synch();
	};

	Shadow.prototype.prev = function () {
		note(nTrav);
		if (!matches.length) {
			response('No matches found', msg);
			return;
		}
		shtext.focus();
		var p = matches.length-1, sel = shtext.getSelection();
		for (var i = matches.length-1; i >= 0; i--) {
			if (sel.start > matches[i]) {
				p = i;
				break;
			}
		}
		Shadow.prototype.highlight(p);
	};

	Shadow.prototype.next = function () {
		note(nTrav);
		if (!matches.length) {
			response('No matches found', msg);
			return;
		}
		shtext.focus();
		var n = 0, sel = shtext.getSelection();
		if (!sel || sel.end >= shtext.value.length) {
			shtext.setSelection(0, 0);
			sel = shtext.getSelection();
		}
		for (var i = 0; i < matches.length; i++) {
			if (sel.end < matches[i] + findbox.value.length) {
				n = i;
				break;
			}
		}
		Shadow.prototype.highlight(n);
	};
	//Expose Shadow
	window.Shadow = Shadow;
})(window, window.document.querySelectorAll);