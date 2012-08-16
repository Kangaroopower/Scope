/* Shadow Module */
 Scope.Shadow = {};
		/* Shadow Module */
		(function (ns) {
			var matches = [], highlighted = -1, nTrav = 0;
			//Synchs shadow's contents with the contents of the textarea
			ns.synch = function (next) {
				console.log('synching');
				var ref = 0;
				matches = [];
				while(text.indexOf(scfind, ref) !== -1) {
					if (!$('input#sc-cs').is(':checked')) matches.push(sctextarea.val().toLowerCase().indexOf(scfind));
					else ns.push(sctextarea.val().toLowerCase().indexOf(scfind));
					ref = sctextarea.val().indexOf(scfind, ref) + 1;
				}
				$('#sc-shadow').html(function () {
					var r = '', s = sctextarea.val();
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
			ns.highlight = function (next) {
				if (!matches.length) return;
				sctxtarea.focus();
				var high;
				if (next === true) {
					if (high === matches.length) high = 0; 
					else high++;
					$('#sc' + high).css({backgroundColor:'#0000FF'});
					$('#sc' + (high + 1)).css({backgroundColor:'#700066'});
				} else {
					if (high === 0) high = matches.length;
					else high--;
					$('#sc' + high).css({backgroundColor:'#0000FF'});
					$('#sc' + (high + 1)).css({backgroundColor:'#700066'});
				}
				sctxtarea.setSelection(matches[high], matches[high] + scfind.length);
				if (nTrav === matches.length) nTrav = 0;
				nTrav++;
				$('#sc-count').html(nTrav + ' of ' + matches.length);
				highlighted = high;
			};
		})(Scope.Shadow);

	String.prototype.regexIndexOf = function(regex, startpos) {
		var indexOf = this.substring(startpos || 0).search(regex);
		return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
	};