/* Actions */
Scope.Actions.replace = function (reg, rall) {
	var txtoreplace = $('#sc-replace-text').val(),
		thematches = WikiaEditor.getInstance().getEditbox().val().match(reg).length;
	WikiaEditor.getInstance().getEditbox().val(WikiaEditor.getInstance().getEditbox().val().replace(reg, txtoreplace));
	if (thematches != "undefined") {
		if (rall === true) {
			$("#sc-status").html( thematches+' replacement(s) made!');
		} else {
			$("#sc-status").html( 'One replacement made!');
		}
	} else {
		$("#sc-status").html( 'No replacements made!');
	}
};
 
Scope.Actions.find = function () {
	var regex,
		rawtxtofind = $('#sc-find-text').val();
	if (rawtxtofind !== "") {
		if ($('input#sc-reg').is(':checked')) {
			if ($('input#sc-cs').is(':checked')) {
				regex = RegExp(rawtxtofind, 'g');
			} else {
				regex = RegExp(rawtxtofind,'ig');
			}
		} else {
			if ($('input#sc-cs').is(':checked')) {
				regex = RegExp(Scope.Actions.escape(rawtxtofind), 'g');
			} else {
				regex = RegExp(Scope.Actions.escape(rawtxtofind),'ig');
			}				
		}
	} else {
		regex = null;
	}
	$('#sc-find-prev').attr('disabled', null === regex);
	$('#sc-find-next').attr('disabled', null === regex);
	Scope.Shadow.regex = regex;
	Scope.Shadow.synch();
};
 
Scope.Actions.evaluate = function (rall) {
	var regex,
		rawtxtofind = $('#sc-find-text').val();
	if ($('input#sc-reg').is(':checked')) {
		if (rall != undefined) {
			if ($('input#sc-cs').is(':checked')) {
				regex = RegExp(rawtxtofind, 'g');
				Scope.Actions.replace(regex, true);
			} else {
				regex = RegExp(rawtxtofind,'ig');
				Scope.Actions.replace(regex, true);
			}					
		} else {
			if ($('input#sc-cs').is(':checked')) {
				regex = RegExp(rawtxtofind);
				Scope.Actions.replace(regex);
			} else {
				regex = RegExp(rawtxtofind,'i');
				Scope.Actions.replace(regex);
			}					
				}
	} else {
		var txtofind = Scope.Actions.escape(rawtxtofind);
		if (rall != undefined) {
			if ($('input#sc-cs').is(':checked')) {
				regex = RegExp(txtofind, 'g');
				Scope.Actions.replace(regex, true);
			} else {
				regex = RegExp(txtofind, 'ig');
				Scope.Actions.replace(regex, true);
			}
		} else {
			if ($('input#sc-cs').is(':checked')) {
				regex = RegExp(txtofind);
				Scope.Actions.replace(regex);
			} else {
				regex = RegExp(txtofind, 'i');
				Scope.Actions.replace(regex);
			}
		}				
	}
};
 
Scope.Actions.escape = function (s) {
	return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

Scope.registerModule("Actions", {});