/* Shadow Module */
 Scope.Shadow = {
	'matches': [],
	'highlighted': -1,
	'nTrav': 0
};
	/* Shadow Module */
	(function (ns) {
		//Synchs shadow's contents with the contents of the textarea
		ns.synch = function (next) {
			console.log('synching');
			var ref = 0;
			ns.matches = [];
			while(text.indexOf(scfind, ref) !== -1) {
				if (!$('input#sc-cs').is(':checked')) ns.matches.push(sctextarea.val().toLowerCase().indexOf(scfind));
				else ns.push(sctextarea.val().toLowerCase().indexOf(scfind));
				ref = sctextarea.val().indexOf(scfind, ref) + 1;
			}
			$('#sc-shadow').html(function () {
				var r = '', s = sctextarea.val();
				for (var i = 0, start = 0; i < ns.matches.length; i++) {
					r += s.substr(start, ns.matches[i] - start);
					start = ns.matches[i] + scfind.length;
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
		ns.highlight = function (next) {
			if (!ns.matches.length) return;
			sctxtarea.focus();
			var high;
			if (next === true) {
				if (high === ns.matches.length) high = 0; 
				else high++;
				$('#sc' + high).css({backgroundColor:'#0000FF'});
				$('#sc' + (high + 1)).css({backgroundColor:'#700066'});
			} else {
				if (high === 0) high = ns.matches.length;
				else high--;
				$('#sc' + high).css({backgroundColor:'#0000FF'});
				$('#sc' + (high + 1)).css({backgroundColor:'#700066'});
			}
			sctxtarea.setSelection(ns.matches[high], ns.matches[high] + scfind.length);
			if (ns.nTrav === ns.matches.length) ns.numTraversed = 0;
			ns.numTraversed++;
			$('#sc-count').html(ns.nTrav + ' of ' + ns.matches.length);
			ns.highlighted = high;
		};
	})(Scope.Shadow);