/* Shadow Module */
  	window.FindReplace.Shadow.init = function () {
			$('textarea')[0].val().after('<div id="fr-shadow" style="width: 100%; left: 0px; top: 0px; border: 0px none; display: block; outline: none medium; margin: 0px; padding: 0px; resize: none; position: absolute; z-index: 0; font-family: Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace; font-size: 14px; line-height: normal; white-space: pre-wrap; background-color: transparent; color: transparent; overflow: auto; height: 529px; "></div>');
			var commonCSS = {
				width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
				outline: 'medium none', margin: 0, padding: 0, resize: 'none'
			};
			$('textarea')[0].val().css(commonCSS).css({
				position: 'relative', zIndex: '1',
				backgroundColor: 'transparent'
			});
			$('textarea')[0].val().scroll(function () {
				$('#fr-shadow').scrollTop($('textarea')[0].val().scrollTop());
			});
			$('textarea')[0].val().focus();
			$('textarea')[0].val().keyup (window.FindReplace.Shadow.synch);
			$('textarea')[0].val().click (window.FindReplace.Shadow.synch);
			window.FindReplace.Shadow.synch();
		};

		window.FindReplace.Shadow.synch = function() {
			console.log('synching');
			window.FindReplace.Shadow.matches = [];
			if (window.FindReplace.Shadow.regex instanceof RegExp) {
				var s = $('textarea')[0].val();
				window.FindReplace.Shadow.regex.lastIndex = 0;
				while (m = window.FindReplace.Shadow.regex.exec(s)) {
					window.FindReplace.Shadow.matches.push({
						found: m[0], index: m.index, traversed: false
					});
					window.FindReplace.Shadow.regex.lastIndex = m.index + m[0].length;
				}
				$('#fr-status').html('found ' + window.FindReplace.Shadow.matches.length + ' window.FindReplace.Shadow["matches"]');
			} else {
				$('#fr-status').html('&nbsp;');
			}
			$('#fr-shadow').html(function () {
				var s = $('textarea')[0].val();
				var r = '';
				for (var i = 0, start = 0; i < window.FindReplace.Shadow.matches.length; i++) {
					r += s.substr(start, window.FindReplace.Shadow.matches[i].index - start);
					start = window.FindReplace.Shadow.matches[i].index + window.FindReplace.Shadow.matches[i].found.length;
					r += '<span id="fr' + i + '" style="background-color:#700066;">' + window.FindReplace.Shadow.matches[i].found + '</span>';
				}
				if (s.substr(start+1).length > 0) {
					r += s.substr(start+1);
				}
				return r.length ? r : s;
			});
			$('#fr-shadow').css('height', $('textarea')[0].val().height());
			$('#fr-shadow').scrollTop($('textarea')[0].val().scrollTop());
		};

		window.FindReplace.Shadow.highlight = function(high) {
			if (-1 !== window.FindReplace.Shadow.highlighted) {
				$('#fr' + window.FindReplace.Shadow.highlighted).css({backgroundColor:'#700066'});
			}
			$('#fr' + high).css({backgroundColor:'#0000FF'});
			window.FindReplace.Shadow.highlighted = high;
			$('textarea')[0].val().setSelection(window.FindReplace.Shadow.matches[high].index, window.FindReplace.Shadow.matches[high].index + window.FindReplace.Shadow.matches[high].found.length);
			if (window.FindReplace.Shadow.numTraversed === window.FindReplace.Shadow.matches.length) {
				for (var i = 0; i < window.FindReplace.Shadow.matches.length; i++) window.FindReplace.Shadow.matches[i].traversed = false;
				window.FindReplace.Shadow.numTraversed = 0;
			}
			if (!window.FindReplace.Shadow.matches[high].traversed) {
				window.FindReplace.Shadow.matches[high].traversed = true;
				window.FindReplace.Shadow.numTraversed++;
				$('#fr-status').html('match ' + window.FindReplace.Shadow.numTraversed + ' of ' + window.FindReplace.Shadow.matches.length);
			} 
		};

		window.FindReplace.Shadow.next = function  () {
			if (!window.FindReplace.Shadow.matches.length) return;
			$('textarea')[0].val().focus();
			var n = 0;
			var sel = $('textarea')[0].val().getSelection();
			for (var i = 0; i < window.FindReplace.Shadow.matches.length; i++) {
				if (sel.end < window.FindReplace.Shadow.matches[i].index + window.FindReplace.Shadow.matches[i].found.length) {
					n = i;
					break;
				}
			}
			window.FindReplace.Shadow.highlight(n);
		};

		window.FindReplace.Shadow.prev = function  () {
			if (!window.FindReplace.Shadow.matches.length) return;
			$('textarea')[0].val().focus();
			var p = window.FindReplace.Shadow.matches.length-1;
			var sel = $('textarea')[0].val().getSelection();
			for (var i = window.FindReplace.Shadow.matches.length-1; i >= 0; i--) {
				if (sel.start > window.FindReplace.Shadow.matches[i].index) {
					p = i;
					break;
				}
			}
			window.FindReplace.Shadow.highlight(p);
      
      window.FindReplace.registerModule("Shadow");