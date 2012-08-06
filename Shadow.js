/* Shadow Module */
 Scope.Shadow = {
	'matches': [],
	'highlighted': -1,
	'regex': null, 
	'replace': null,
	'numTraversed': 0
};
var m;

Scope.Shadow.init = function () {
	sctextarea.after('<div id="sc-shadow" style="left: 0px; top: 0px; border: 0px none; display: block; outline: none medium; margin: 0px; padding: 0px; resize: none; position: absolute; z-index: 0; font-family: Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace; font-size: 14px; line-height: normal; white-space: pre-wrap; background-color: transparent; color: transparent; overflow: auto; height: 529px; "></div>');
	var commonCSS = {
		width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
		outline: 'medium none', margin: 0, padding: 0, resize: 'none'
	};
	sctextarea.css(commonCSS).css({
		position: 'relative', zIndex: '1',
		backgroundColor: 'transparent'
	});
	sctextarea.scroll(function () {
		$('#sc-shadow').scrollTop(sctextarea.scrollTop());
	});
	sctextarea.focus();
	sctextarea.keyup(Scope.Shadow.synch);
	sctextarea.click(Scope.Shadow.synch);
	Scope.Shadow.synch();
};

Scope.Shadow.synch = function() {
	console.log('synching');
	Scope.Shadow.matches = [];
	if (Scope.Shadow.regex instanceof RegExp) {
		var s = sctextarea.val();
		Scope.Shadow.regex.lastIndex = 0;
		while (m = Scope.Shadow.regex.exec(s)) {
			Scope.Shadow.matches.push({
				found: m[0], index: m.index, traversed: false
			});
			Scope.Shadow.regex.lastIndex = m.index + m[0].length;
		}
		$('#sc-count').html(Scope.Shadow.matches.length + ' matches');
	} else {
		$('#sc-count').html('&nbsp;');
	}
	$('#sc-shadow').html(function () {
		var s = sctextarea.val();
		var r = '';
		for (var i = 0, start = 0; i < Scope.Shadow.matches.length; i++) {
			r += s.substr(start, Scope.Shadow.matches[i].index - start);
			start = Scope.Shadow.matches[i].index + Scope.Shadow.matches[i].found.length;
			r += '<span id="sc' + i + '" style="background-color:#700066;">' + Scope.Shadow.matches[i].found + '</span>';
		}
		if (s.substr(start+1).length > 0) {
			r += s.substr(start+1);
		} 
			return r.length ? r : s;
	});
	$('#sc-shadow').css('height', sctextarea.height()); 
	$('#sc-shadow').css('width', sctextarea.width());
	$('#sc-shadow').scrollTop(sctextarea.scrollTop());
};

Scope.Shadow.highlight = function(high) {
	if (-1 !== Scope.Shadow.highlighted) {
		$('#sc' + Scope.Shadow.highlighted).css({backgroundColor:'#700066'});
	}
	$('#sc' + high).css({backgroundColor:'#0000FF'});
	Scope.Shadow.highlighted = high;
	sctextarea.setSelection(Scope.Shadow.matches[high].index, Scope.Shadow.matches[high].index + Scope.Shadow.matches[high].found.length);
	if (Scope.Shadow.numTraversed === Scope.Shadow.matches.length) {
		for (var i = 0; i < Scope.Shadow.matches.length; i++) Scope.Shadow.matches[i].traversed = false;
		Scope.Shadow.numTraversed = 0;
	}
	if (!Scope.Shadow.matches[high].traversed) {
		Scope.Shadow.matches[high].traversed = true;
		Scope.Shadow.numTraversed++;
		$('#sc-count').html(Scope.Shadow.numTraversed + ' of ' + Scope.Shadow.matches.length);
	} 
};

Scope.Shadow.next = function  () {
	if (!Scope.Shadow.matches.length) return;
	sctextarea.focus();
	var n = 0;
	var sel = sctextarea.getSelection();
	for (var i = 0; i < Scope.Shadow.matches.length; i++) {
		if (sel.end < Scope.Shadow.matches[i].index + Scope.Shadow.matches[i].found.length) {
			n = i;
			break;
		}
	}
	Scope.Shadow.highlight(n);
};

Scope.Shadow.prev = function  () {
	if (!Scope.Shadow.matches.length) return;
	sctextarea.focus();
	var p = Scope.Shadow.matches.length-1;
	var sel = sctextarea.getSelection();
	for (var i = Scope.Shadow.matches.length-1; i >= 0; i--) {
		if (sel.start > Scope.Shadow.matches[i].index) {
			p = i;
			break;
		}
	}
	Scope.Shadow.highlight(p);
};