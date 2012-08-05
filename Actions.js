/* Actions */
Scope.Actions = {
	undotext: null,
	operator: null
};
Scope.Actions.replace = function (reg, type) {
	var txtoreplace = $('#sc-replace-text').val();
	Scope.Actions.undotext = WikiaEditor.getInstance().getEditbox().val();
	if ($("#sc-op option:selected").val() === "and") {
		var rne = WikiaEditor.getInstance().getEditbox().val().match(reg[0]).length,
			rwo = WikiaEditor.getInstance().getEditbox().val().match(reg[1]).length;
		for(var  j=0 ; i < reg.length; j++ ) WikiaEditor.getInstance().getEditbox().val(WikiaEditor.getInstance().getEditbox().val().replace(reg[j], txtoreplace));
		Scope.Actions.status([reg[0], reg[1]], [rne, rwo]);
	} else {
		Scope.Actions.status(reg, WikiaEditor.getInstance().getEditbox().val().match(reg).length);
		WikiaEditor.getInstance().getEditbox().val(WikiaEditor.getInstance().getEditbox().val().replace(reg, txtoreplace));
	}
	$('#sc-operator').css({width: '99px'});
	if (!$('#sc-undo')) $('#sc-operator').after('<a id="sc-undo" href="javascript:Scope.Actions.undo()"><img src="https://github.com/Kangaroopower/Scope/raw/master/undo.png" style="vertical-align:middle;"/></a>');
	Scope.Actions.find();
};


Scope.Actions.status = function (word, number) {
	var scfind = $('#sc-find-text').val();
	if ($("#sc-op option:selected").val() === "and") {
			if (number[0] === null) number[0] = "no";
			if (number[1] === null) number[1] = "no";
			$("#sc-status").html('Replaced '+number[0] +' match(es) of '+scfind+' and '+number[1] +' match(es) of '+$('#sc-operator').val()+'!');
	} else if ($("#sc-op option:selected").val() === "but") {
		if (number === null) number = "no";
		$("#sc-status").html('Replaced '+number+' match(es) of '+scfind+' standing alone!');
	} else {
		if (number === 1) number = "One";
		if (number === null) number = "No";
		$("#sc-status").html(number+' replacement(s) made!');
	}
};

Scope.Actions.find = function () {
	var regex,
		rawtxtofind = $('#sc-find-text').val();
	if (rawtxtofind !== "") regex = Scope.Actions.evaluate(true);
	else regex = null;
	$('#sc-find-prev').attr('disabled', null === regex);
	$('#sc-find-next').attr('disabled', null === regex);
	Scope.Shadow.regex = regex;
	Scope.Shadow.synch();
};
 
Scope.Actions.evaluate = function (rall, find) {
	var rawtxtofind, but;
	if (find === undefined) rawtxtofind = $('#sc-find-text').val();
	else rawtxtofind = $('#sc-operator').val();

	if ($("#sc-op option:selected").val() === "but") but = true;
	else but = false;

	if ($('input#sc-reg').is(':checked')) {
		if (rall === true) {
			if ($('input#sc-cs').is(':checked')) {
				if (but === true) return RegExp('\\b'+rawtxtofind+'\\b', 'g');
				else RegExp(rawtxtofind, 'g');
			} else {
				if (but === true) return RegExp('\\b'+rawtxtofind+'\\b', 'ig');
				else return RegExp(rawtxtofind, 'ig');
			}
		} else {
			if ($('input#sc-cs').is(':checked')) {
				if (but === true) return RegExp('\\b'+rawtxtofind+'\\b', 'g');
				else return RegExp(rawtxtofind);
			} else {
				if (but === true) return RegExp('\\b'+rawtxtofind+'\\b', 'ig');
				else return RegExp(rawtxtofind, 'i');
			}
		}
	} else {
		var txtofind = Scope.Actions.escape(rawtxtofind);
		if (rall === true) {
			if ($('input#sc-cs').is(':checked')) {
				if (but === true) return RegExp('\\b'+txtofind+'\\b', 'g');
				else return RegExp(txtofind, 'g');
			} else {
				if (but === true) return RegExp('\\b'+txtofind+'\\b', 'ig');
				else return RegExp(txtofind, 'ig');
				}
		} else {
			if ($('input#sc-cs').is(':checked')) {
				if (but === true) return RegExp('\\b'+txtofind+'\\b', 'g');
				else return RegExp(txtofind);
			} else {
				if (but === true) return RegExp('\\b'+txtofind+'\\b', 'ig');
				else return RegExp(txtofind, 'i');
			}
		}				
	}
};


Scope.Actions.params = function (rall) {
	if (rall !== "undefined") {
		if ($('#sc-operator').val() !== "" && $("#sc-op option:selected").val() === 'and') Scope.Actions.replace([Scope.Actions.evaluate(true), Scope.Actions.evaluate(true, true)]);
		else Scope.Actions.replace(Scope.Actions.evaluate(true));
	} else {
		if ($('#sc-operator').val() !== "" && $("#sc-op option:selected").val() === 'and') Scope.Actions.replace([Scope.Actions.evaluate(),Scope.Actions.evaluate(false, true)]);
		else Scope.Actions.replace(Scope.Actions.evaluate());
	}
};

Scope.Actions.escape = function (s) {
	return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

Scope.Actions.undo = function () {
	if (Scope.Actions.undotext !== null) {
		WikiaEditor.getInstance().getEditbox().val(Scope.Actions.undotext);
		$("#sc-status").html('Undid last replace!');
		Scope.Actions.undotext = null;
		Scope.Actions.synch();
		$('#sc-undo').hide();
	} else {
		$("#sc-status").html('Could not undo last replace!');
	}
};