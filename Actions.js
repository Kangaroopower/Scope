// Find and Replace Module
window.FindReplace.Actions.replaceall = function (reg) {
	var txtoreplace = $('#fr-replace-text').val(),
		thematches = $('textarea')[0].value.match(reg).length;
	$('textarea')[0].value = $('textarea')[0].value.replace(reg, txtoreplace);
	if (thematches != "undefined") {
		$("#fr-status").html( thematches+' replacement(s) made!');
	} else {
		$("#fr-status").html( 'No replacements made!');
	}
};
 
window.FindReplace.Actions.replaceone = function (reg) {
	var txtoreplace = $('#fr-replace-text').val(),
		thematches =  $('textarea')[0].value.match(reg).length;
	$('textarea')[0].value = $('textarea')[0].value.replace(reg, txtoreplace);
	if (thematches != "undefined") {
		$("#fr-status").html( 'One replacement made!');
	} else {
		$("#fr-status").html( 'No replacements made!');
	}	
};
 
window.FindReplace.Actions.find = function () {
	var regex,
		rawtxtofind = $('#fr-find-text').val();
	if ($('input#fr-reg').is(':checked')) {
		if ($('input#fr-cs').is(':checked')) {
			regex = RegExp(rawtxtofind, 'g');
		} else {
			regex = RegExp(rawtxtofind,'ig');
		}
	} else {
		if ($('input#fr-cs').is(':checked')) {
			regex = RegExp(window.FindReplace.Actions.escape(rawtxtofind), 'g');
		} else {
			regex = RegExp(window.FindReplace.Actions.escape(rawtxtofind),'ig');
		}				
	}
	$('#fr-find-prev').attr('disabled', null === regex);
	$('#fr-find-next').attr('disabled', null === regex);
	window.FindReplace.Shadow.regex = regex;
	window.FindReplace.Shadow.synch(); 
};
 
window.FindReplace.Actions.evaluate = function (rall) {
	var regex,
		rawtxtofind = $('#fr-find-text').val();
	if ($('input#fr-reg').is(':checked')) {
		if (rall != undefined) {
			if ($('input#fr-cs').is(':checked')) {
				regex = RegExp(rawtxtofind, 'g');
				window.FindReplace.Actions.replaceall(regex);
			} else {
				regex = RegExp(rawtxtofind,'ig');
				window.FindReplace.Actions.replaceall(regex);
			}					
		} else {
			if ($('input#fr-cs').is(':checked')) {
				regex = RegExp(rawtxtofind);
				window.FindReplace.Actions.replaceone(regex);
			} else {
				regex = RegExp(rawtxtofind,'i');
				window.FindReplace.Actions.replaceone(regex);
			}					
		}
	} else {
		var txtofind;
		if (rall != undefined) {
			txtofind = window.FindReplace.Actions.escape(rawtxtofind);
			if ($('input#fr-cs').is(':checked')) {
				regex = RegExp(txtofind);
				window.FindReplace.Actions.replaceone(regex, 'g');
			} else {
				regex = RegExp(txtofind, 'ig');
				window.FindReplace.Actions.replaceone(regex);
			}
		} else {
			if ($('input#fr-cs').is(':checked')) {
				regex = RegExp(txtofind);
				window.FindReplace.Actions.replaceone(regex);
			} else {
				regex = RegExp(txtofind, 'i');
				window.FindReplace.Actions.replaceone(regex);
			}
		}				
	}
};
 
window.FindReplace.Actions.escape = function (s) {
	return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

window.FindReplace.registerModule("Actions");