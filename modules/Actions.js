	/* Evaluates the regex to be used */
	function evaluate (rall) {
		var mod = rall ? 'g' : '';
		if (!$('#sc-cs').hasClass('scactive')) mod += 'i';
		if ($('#sc-reg').hasClass('scactive')) return new RegExp(scfind.val(), mod);
		else return new RegExp(scfind.val().replace(/\[\-[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), mod);
	}
 
	/* Does the replace */
	function replace (rall) {
		var rtxt = $('#sc-replace-text').val(), s = sctxt.val(), undotext = sctxt.val();
		if (rall === true) {
			var count;
			if (evaluate(true).length === 1) count = "One";
			else count = s.match(evaluate(true)).length;
			sctxt.val(s.replace(evaluate(true), rtxt));
			$("#sc-count").html('Done!').attr('title', count + ' replacement(s) made!');
		} else {
			if (sctxt.getSelection().text === "") sctxt.val(s.replace(evaluate(), rtxt));
			else if (scfind.val().test(s.substring(sctxt.getSelection().start, sctxt.getSelection().end)))sctxt.val(s.substring(0, sctxt.getSelection().start) + rtxt + s.substring(sctxt.getSelection().end));
			next();
			$("#sc-count").html('Done!').attr('title', 'One replacement made!');
		}
		if (!$('#sc-undo').length) $('#sc-replace-text').after('<img id="sc-undo"src="//raw.github.com/Kangaroopower/Scope/master/util/undo.png"/>');
		$('#sc-undo').click(function () {
			sctxt.val(undotext);
			$("#sc-count").html('Undone!').attr('title', '');
			synch();
			$('#sc-undo').hide();
		});
		synch();
	}