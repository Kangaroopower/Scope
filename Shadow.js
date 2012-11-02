$(function () {
	var Shadow = function (textarea, find, msgplace, shadowcss, textareacss, commoncss, regex, matchcolor, highlightcolor) {
		this.textarea = textarea;
		this.find = find || $('#sc-find-text');
		this.msg = msgplace || $('#sc-count').html;
		this.shadowcss = shadowcss || {
				left: '0px', top: '0px', border: '0px none', display: 'block',
				outline: 'none medium', margin: '0px', padding: '0px', resize: 'none', 
				position: 'absolute', zIndex: '0', 'font-size': '14px', 'line-height': '140%',
				'font-family': 'Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace',
				'white-space': 'pre-wrap', backgroundColor: 'transparent', color: 'transparent',
				overflow: 'auto', height: '529px'
			};
		this.textareacss = textareacss || {
			position: 'relative', zIndex: '1', backgroundColor: 'transparent'
		};
		this.commoncss = commoncss || {
				width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
				outline: 'medium none', margin: 0, padding: 0, resize: 'none'
			};
		this.regex = regex || window.Scope.evaluate;
		this.matchcolor = matchcolor || '08c';
		this.highlight = highlightcolor || '#0000FF';
	};

	var matches = [], nTrav = 0, sch = -1, rhtml = false;

	var note = (window.console && function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('Shadow:');
		return window.console.log.apply(window.console, args);
	}) || $.noop;

	var isElement = function (o){
		return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
			o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
		);
	};

	var response = function (text) {
		if (rhtml === true) {
			this.msg.html(text).attr('title', '');
		} else {
			this.msg(text);
		}
	};

	Shadow.prototype.init = function () {
		this.textarea.after('<div id="sc-shadow"></div>');
		this.textarea.css(this.commoncss).css(this.textareacss);
		$('#sc-shadow').css(this.commoncss).css(this.shadowcss);
		this.textarea.scroll(function () {
			$('#sc-shadow').scrollTop(this.textarea.scrollTop());
		});
		this.textarea.focus().on('keyup paste click', this.synch);
		this.synch();
		if (isElement(this.msg)) {
			rhtml = true;
		} else {
			rhtml = false;
		}
	};

	Shadow.prototype.synch = function () {
		note('synching');
		var s = this.textarea.val(), regex, m;
		if (this.find.val() === '') {
			regex = null;
		} else {
			regex = this.regex();
		}
		matches = [];
		if (regex instanceof RegExp) {
			while (m = regex.exec(s)) {
				matches.push(m.index);
			}
			response(matches.length + ' matches!');
			note(matches);
		} else {
			response('&nbsp;');
		}
		$('#sc-shadow').html(function () {
			var r = '';
			for (var i = 0, start = 0; i < matches.length; i++) {
				r += s.substr(start, matches[i] - start);
				start = matches[i] + this.find.val().length;
				r += '<span id="sc' + i + '"class="sc-match">' + this.find.val() + '</span>';
			}
			if (s.substr(start+1).length > 0){
				r += s.substr(start+1);
			}
			var rltxt = r.length ? r : s;
			return rltxt.replace('<', '&lt;');
		});
		if (matches.length) {
			$('#sc-down').css({cursor: 'pointer'});
		}
		$('#sc-shadow').css('height', this.textarea.height()); 
		$('#sc-shadow').css('width', this.textarea.width());
	};

	Shadow.prototype.highlight = function (high) {
		this.textarea.setSelection(matches[high], matches[high] + this.find.val().length);
		$('#sc' + sch).removeAttr('style');
		$('#sc' + high).css({backgroundColor:'#0000FF'});
		sch = high;
		if (nTrav === matches.length) {
			nTrav = 0;
		}
		nTrav++;
		response(nTrav + ' of ' + matches.length);
	};

	Shadow.prototype.prev = function () {
		note(nTrav);
		if (!matches.length) {
			response('No matches found');
			return;
		}
		this.textarea.focus();
		var p = matches.length-1, sel = this.textarea.getSelection();
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
			response('No matches found');
			return;
		}
		this.textarea.focus();
		var n = 0, sel = this.textarea.getSelection();
		if (!sel || sel.end >= this.textarea.val().length) {
			this.textarea.setSelection(0, 0);
			sel = this.textarea.getSelection();
		}
		for (var i = 0; i < matches.length; i++) {
			if (sel.end < matches[i] + this.find.val().length) {
				n = i;
				break;
			}
		}
		this.highlight(n);
	};
	//Expose Shadow
	window.Shadow = Shadow;
});