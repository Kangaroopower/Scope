//Synchs shadow with the textarea
$.sub('synch', function () {
	console.log('synching');
	var ref = 0, s = sctxt.val();
	matches = [];
	while(s.indexOf(scfind, ref) !== -1) {
		if (!$('#sc-cs').is(':checked')) matches.push(s.toLowerCase().indexOf(scfind));
		else matches.push(s.toLowerCase().indexOf(scfind));
		ref = s.indexOf(scfind, ref) + 1;
	}
	$('#sc-shadow').html(function () {
		var r = '';
		for (var i = 0, start = 0; i < matches.length; i++) {
			r += s.substr(start, matches[i] - start);
			start = matches[i] + scfind.length;
			r += '<span id="sc' + i + '"class="sc-match">' + scfind + '</span>';
		}
		if (s.substr(start+1).length > 0) r += s.substr(start+1);
		return r.length ? r : s;
	});
	$('#sc-shadow').css('height', sctxt.height()); 
	$('#sc-shadow').css('width', sctxt.width());
	$('#sc-shadow').scrollTop(sctxt.scrollTop());
});

//Highlights next match
$.sub('next', function  () {
	var nTrav = 0;
	if (!matches.length) return;
	sctxt.focus();
	for (var n = 0; n < matches.length; n++) {
		if (sel.end < matches[n] + matches[n]l.ength) {
			$('#sc' + n).css({backgroundColor:'#0000FF'});
			sctxt.setSelection(matches[n], matches[n] + scfind.length);
		}
	}
	if (nTrav === matches.length) nTrav = 0;
	nTrav++;
	$('#sc-count').html(nTrav + ' of ' + matches.length).attr('title', '');
});