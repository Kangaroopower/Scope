// Find and Replace Actions
		window.FindReplace.Actions.replaceall = function (regex) {
			var txtofind,
				txtarea = $('textarea')[0].value,
				rawtxtofind = $('#fr-find-text').val(),
				txtoreplace = $('#fr-replace-text').val();
			if (regex === true) {
				if ($('input#fr-cs').is(':checked')) {
					txtofind = RegExp(rawtxtofind, 'g');
				} else {
					txtofind = RegExp(rawtxtofind,'ig');
				}
			} else {
				txtofind = rawtxtofind;
			}
			var thematches = txtarea.match(txtofind).length;
			$('textarea')[0].value = $('textarea')[0].value.replace(txtofind, txtoreplace);
			$("#fr-status").html( thematches+' replacement(s) made!');
		};
 
		window.FindReplace.Actions.replace = function (regex) {
			var txtofind,
				rawtxtofind = $('#fr-find-text').val(),
				txtoreplace = $('#fr-replace-text').val();
			if (regex === true) {
				if ($('input#fr-cs').is(':checked')) {
					txtofind = RegExp(rawtxtofind);
				} else {
					txtofind = RegExp(rawtxtofind,'i');
				}
				$('textarea')[0].value = $('textarea')[0].value.replace(txtofind, txtoreplace);
				$("#fr-status").html('One Replacement made.');
			} else {
				$("#fr-status").html('Sorry, non-Regex FindReplace is currently not supported for single replaces, only for replace all.');
			}
		};
 
		window.FindReplace.Actions.find = function () {
			var regex;
			if ($('input#fr-cs').is(':checked')) {
				regex = RegExp(rawtxtofind);
			} else {
				regex = RegExp(rawtxtofind,'i');
			}
			$('#fr-find-prev').attr('disabled', null === regex);
			$('#fr-find-next').attr('disabled', null === regex);
			window.FindReplace.Shadow.regex = regex;
			window.FindReplace.Shadow.synch();
		};

		window.FindReplace.Actions.regcheck = function (type) {
			if (type == "null") {
				if ($('input#fr-reg').is(':checked')) {
					window.FindReplace.Actions.replace(true);
				} else {
					window.FindReplace.Actions.replace(false);
				}
			} else {
				if ($('input#fr-reg').is(':checked')) {
					window.FindReplace.Actions.replaceall(true);
				} else {
					window.FindReplace.Actions.replaceall(false);
				}
			}
		};
    window.FindReplace.registerModule("Actions")