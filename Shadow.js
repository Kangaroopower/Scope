/* Shadow Module */
(function (ns) {
	var matches = [], highlighted = -1, nTrav = 0;
	//Synchs shadow's contents with the contents of the textarea
	ns.synch = function () {
		console.log('synching');
		var ref = 0;
		matches = [];
		while(scfind.indexOf(scfind, ref) !== -1) {
			if (!$('input#sc-cs').is(':checked')) matches.push(sctxtarea.val().toLowerCase().indexOf(scfind));
			else ns.push(sctxtarea.val().toLowerCase().indexOf(scfind));
			ref = sctxtarea.val().indexOf(scfind, ref) + 1;
		}
		$('#sc-shadow').html(function () {
			var r = '', s = sctxtarea.val();
			for (var i = 0, start = 0; i < matches.length; i++) {
				r += s.substr(start, matches[i] - start);
				start = matches[i] + scfind.length;
				r += '<span id="sc' + i + '" style="background-color:#700066;">' + scfind + '</span>';
			}
			if (s.substr(start+1).length > 0) r += s.substr(start+1);
			return r.length ? r : s;
		});
		$('#sc-shadow').css('height', sctxtarea.height()); 
		$('#sc-shadow').css('width', sctxtarea.width());
		$('#sc-shadow').scrollTop(sctxtarea.scrollTop());	
	};

	//Does the actual match highlighting
	ns.highlight = function (high) {
		if (!matches.length) return;
		sctxtarea.focus();
		$('#sc' + high).css({backgroundColor:'#0000FF'});
		highlighted = high;
		sctxtarea.setSelection(matches[high], matches[high] + scfind.length);
		if (nTrav === matches.length) nTrav = 0;
		nTrav++;
		$('#sc-count').html(nTrav + ' of ' + matches.length);
	};

	//This exists because I am lazy... integrate into highlight
	ns.dir = function  (next) {
		if (next === true) for (var n = 0; n < matches.length; n++) if (sel.end < matches[n] + matches[n].length) Scope.Shadow.highlight(n);
		else for (var p = matches.length-1; p >= 0; p--) if (sel.start > matches[p]) Scope.Shadow.highlight(p);
	};

})(Scope.Shadow = Scope.Shadow || {});