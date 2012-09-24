	var matches = [], nTrav = 0, sch = -1;
	//Highlights next match
	function next () {
		log(nTrav);
		if (!matches.length) {
			$('#sc-count').html('No matches found').attr('title', '');
			return;
		}
		sctxt.focus();
		var n = 0, sel = sctxt.getSelection();
		if (!sel || sel.end >= sctxt.val().length) {
			sctxt.setSelection(0, 0);
			sel = sctxt.getSelection();
		}
		for (var i = 0; i < matches.length; i++) {
			if (sel.end < matches[i] + scfind.val().length) {
				n = i;
				break;
			}
		}
		highlight(n);
	}
 
	//PUBLIC FUNCTIONS
	/* Synchs shadow with the textarea */
	var synch = function () {
		log('synching');
		var s = sctxt.val(), regex, m;
		if (scfind.val() === '') regex = null;
		else regex = evaluate(true);
		matches = [];
		if (regex instanceof RegExp) {
			while (m = regex.exec(s)) matches.push(m.index);
			$('#sc-count').html(matches.length + ' matches!');
			log(matches);
		} else $('#sc-count').html('&nbsp;');
		$('#sc-shadow').html(function () {
			var r = '';
			for (var i = 0, start = 0; i < matches.length; i++) {
				r += s.substr(start, matches[i] - start);
				start = matches[i] + scfind.val().length;
				r += '<span id="sc' + i + '"class="sc-match">' + scfind.val() + '</span>';
			}
			if (s.substr(start+1).length > 0) r += s.substr(start+1);
			return r.length ? r : s;
		});
		if (matches.length) $('#sc-down').css({cursor: 'pointer'});
		$('#sc-shadow').css('height', sctxt.height()); 
		$('#sc-shadow').css('width', sctxt.width());
	},

	//Highlight a certain match- also public
	highlight = function (high) {
		sctxt.setSelection(matches[high], matches[high] + scfind.val().length);
		$('#sc' + sch).removeAttr('style');
		$('#sc' + high).css({backgroundColor:'#0000FF'});
		sch = high;
		if (nTrav === matches.length) nTrav = 0;
		nTrav++;
		$('#sc-count').html(nTrav + ' of ' + matches.length).attr('title', '');
	};

	Scope.highlight = highlight;
	Scope.synch = synch;