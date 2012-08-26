/* Does the replace */
$.sub('replace', function () {
	var replacetxt = $('#sc-replace-text').val(), s = sctxt.val(), undotext = s;
	if ($('#sc-rall').is(':checked')) {
		var matchIndex = s.indexOf(scfind), count = 0;
		while (matchIndex !== -1) {
			if (!$('#sc-cs').is(':checked')) sctxt.val(s.toLowerCase().replace(scfind, replacetxt));
			else sctxt.val(s.replace(scfind, replacetxt));
			matchIndex = s.indexOf(scfind);
			count++;
		}
		if (count === 1) count = "One";
		$("#sc-count").html('Done!').attr('title', count + ' replacement(s) made!');
	} else {
		if (!$('#sc-cs').is(':checked')) sctxt.val(s.toLowerCase().replace(scfind, replacetxt));
		if (sel.text === "") sctxt.val(s.replace(scfind, replacetxt));
		else if (scfind.test(s.substring(sel.start, sel.end))) sctxt.val(s.substring(0, sel.start) + replacetxt + s.substring(sel.end));
		$.pub('next');
		$("#sc-count").html('Done!').attr('title', 'One replacement made!');
	}
	if (!$('#sc-undo').length) $('#sc-replace-text').append('<img id="sc-undo"src="'+root+'undo.png"/>');
	$('#sc-undo').click(function () {
		sctxt.val(undotext);
		$("#sc-count").html('Undone!').attr('title', '');;
		$.pub('synch');
		$('#sc-undo').hide();
	});
	$.pub('synch');
});