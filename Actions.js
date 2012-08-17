/* Does the replace */
Scope.replace = function (rall) {
	var replacetxt = $('#sc-replace-text').val(),
		undotext = sctxtarea.val();
	if (rall === true) {
		var matchIndex = sctxtarea.val().indexOf(scfind), count = 0;
		while (matchIndex !== -1) {
			if (!$('input#sc-cs').is(':checked')) sctxtarea.val(sctxtarea.val().toLowerCase().replace(scfind, replacetxt));
			else sctxtarea.val(sctxtarea.val().replace(scfind, replacetxt));
			matchIndex = sctxtarea.val().indexOf(scfind);
			count++;
		}
		if (count === 1) count = "One";
		$("#sc-status").html(count + ' replacement(s) made!');
	} else {
		if (!$('input#sc-cs').is(':checked')) sctxtarea.val(sctxtarea.val().toLowerCase().replace(scfind, replacetxt));
		var sel = sctxtarea.getSelection();
		if (sel.text === "") sctxtarea.val(sctxtarea.val().replace(scfind, replacetxt));
		else if (sel && scfind.test(sctxtarea.val().substring(sel.start, sel.end))) sctxtarea.val(sctxtarea.val().substring(0, sel.start) + replacetxt + sctxtarea.val().substring(sel.end));
		Scope.Shadow.highlight(true);
		$("#sc-status").html('One replacement made!');
	}
	Scope.Shadow.synch();
};
