/* Actions */
 
/* Replaces text */
Scope.replace = function (rall) {
	var replacetxt = $('#sc-replace-text').val(),
		undotext = sctxtarea.val();
		if (rall === true) {
			var matchIndex = sctxtarea.val().indexOf(scfind), count = 0;
			while (matchIndex !== -1) {
				if (!$('input#sc-cs').is(':checked')) sctxtarea.val(sctxtarea.val().toLowerCase().replace(scfind, replacetxt));
				else sctxtarea.val(sctxtarea.val().replace(scfind, replacetxt));
				matchIndex = sctxtarea.val().indexOf(scfind);
				count++
			}
			if (count === 1) count = "One";
			$("#sc-status").html(count + ' replacement(s) made!');
		} else {
			if (!$('input#sc-cs').is(':checked')) sctxtarea.val(sctxtarea.val().toLowerCase().replace(scfind, replacetxt));
			var sel = sctxtarea.getSelection();
			if (sel.text === "") sctxtarea.val(sctxtarea.val().replace(scfind, replacetxt));
			else if (sel && scfind.test(sctxtarea.val().substring(sel.start, sel.end))) sctxtarea.val(sctxtarea.val().substring(0, sel.start) + replacetxt + sctxtarea.val().substring(sel.end));
			Scope.Shadow.next();
			$("#sc-status").html('One replacement made!');
		}
		if (!document.querySelector('#sc-undo')) $('#sc-status').append('<img id="sc-undo"src="https://github.com/Kangaroopower/Scope/raw/master/undo.png" style="vertical-align:middle;"/>');
		$('#sc-undo').click(function () {
			sctxtarea.val(Scope.Actions.undotext);
			$("#sc-status").html('Undid last replace!');
			Scope.Shadow.synch();
			$('#sc-undo').hide();				
		});
		Scope.Shadow.synch();
};