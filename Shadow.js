(function (window) {
	var Shadow = function (textarea, args) {
		var args = args || {};
		this.find = args.find || document.querySelector('#sc-find-text');
		this.msg = args.msgplace || document.querySelector('#sc-count');
		this.shadowcss = args.shadowcss || {
				height: '100%', 'text-align': 'left', overflow: 'auto', 
				'line-height': '140%', 'font-size': '13.5px', 
				'font-family': 'Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace',
				position: 'absolute', zIndex: '0', 'white-space': 'pre-wrap', 
				backgroundColor: 'transparent', color: 'transparent'
			};
		this.textareacss = args.textareacss || {
			position: 'relative', zIndex: '1', backgroundColor: 'transparent'
		};
		this.commoncss = args.commoncss || {
			width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
			outline: 'medium none', margin: 0, padding: 0, resize: 'none'
		};
		this.regex = args.regex;
		this.matchcolor = args.matchcolor || '08c';
		this.highlightcolor = args.highlightcolor || '#0000FF';
	};

	var matches = [], nTrav = 0, sch = -1, shtext = WikiaEditor.getInstance().getEditbox()[0];

	/**** START UTILITY FUNCTIONS ****/

	//logs Shadow stuff in console
	var note = (window.console && function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('Shadow:');
		return window.console.log.apply(window.console, args);
	}) || function () {};

	//credits to http://stackoverflow.com/questions/384286/
	var isElement = function (o){
		return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
			o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
		);
	};

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
			css(shtext, merge(this.commoncss, this.textareacss));
			css(document.querySelector('#shadow'), merge(this.commoncss, this.shadowcss));
			shtext.onscroll = function () { 
				document.querySelector('#shadow').scrollTop = shtext.scrollTop;
			}; 
			shtext.focus();
			var properties = ['onpaste', 'oncut', 'onclick', 'onkeyup'];
			forEach(properties, function (val) {
				shtext[val] = this.synch;
				this.find[val] = this.synch;
			});
			document.querySelectorAll('.sc-match').style.backgroundColor = this.highlightcolor;
			this.synch();
		});
	};

	Shadow.prototype.synch = function () {
		note('synching');
		var s = shtext.value, regex, m;
		if (this.find.value === '') {
			regex = null;
		} else {
			regex = window.Scope.evaluate();
		}
		matches = [];
		if (regex instanceof RegExp) {
			while (m = regex.exec(s)) {
				matches.push(m.index);
			}
			response(matches.length + ' matches!', this.msg);
			note(matches);
		} else {
			response('&nbsp;', this.msg);
		}
		inhtml(function () {
			var r = '';
			for (var i = 0, start = 0; i < matches.length; i++) {
				r += s.substr(start, matches[i] - start);
				start = matches[i] + this.find.value.length;
				r += '<span id="sc' + i + '"class="sc-match">' + this.find.value + '</span>';
			}
			if (s.substr(start+1).length > 0) {
				r += s.substr(start+1);
			}
			var rltxt = r.length ? r : s;
			return rltxt.replace('<', '&lt;');
		}, document.querySelector('#shadow'));
		if (matches.length) {
			css(document.querySelector('#sc-down'), {cursor: 'pointer'});
		}
		css(document.querySelector('#shadow'), {
			height: shtext.style.height,
			width: shtext.style.width
		});
	};

	Shadow.prototype.highlight = function (high) {
		shtext.setSelection(matches[high], matches[high] + this.find.value.length);
		document.querySelector('#sc' + sch).removeAttribute('style');
		css(document.querySelector('#sc' + high), {backgroundColor:'#0000FF'});
		sch = high;
		if (nTrav === matches.length) {
			nTrav = 0;
		}
		nTrav++;
		response(nTrav + ' of ' + matches.length, this.msg);
	};

	Shadow.prototype.prev = function () {
		note(nTrav);
		if (!matches.length) {
			response('No matches found', this.msg);
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
		this.highlight(p);
	};

	Shadow.prototype.next = function () {
		note(nTrav);
		if (!matches.length) {
			response('No matches found', this.msg);
			return;
		}
		shtext.focus();
		var n = 0, sel = shtext.getSelection();
		if (!sel || sel.end >= shtext.value.length) {
			shtext.setSelection(0, 0);
			sel = shtext.getSelection();
		}
		for (var i = 0; i < matches.length; i++) {
			if (sel.end < matches[i] + this.find.value.length) {
				n = i;
				break;
			}
		}
		this.highlight(n);
	};
	//Expose Shadow
	window.Shadow = Shadow;
}(window));