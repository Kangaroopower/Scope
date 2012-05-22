// Find and Replace Actions
  	window.FindReplace.Actions.replaceall = function () {
			var txtofind,
				txtarea = $('textarea')[0].val(),
				rawtxtofind = $('#fr-find-text').val(),
				txtoreplace = $('#fr-replace-text').val();
			if ($('input#fr-cs').is(':checked')) {
				txtofind = RegExp(rawtxtofind, 'g');
			} else {
				txtofind = RegExp(rawtxtofind,'ig');
			}
			var thematches = txtarea.match(txtofind).length,
			txtoreplace = $('#fr-replace-text').val();
			txtarea = txtarea.replace(txtofind, txtoreplace);
			$("#fr-status").html( thematches+' replacement(s) made!');
		};
 
		window.FindReplace.Actions.replace = function () {
			var txtofind,
				txtarea = $('textarea')[0].val(),
				rawtxtofind = $('#fr-find-text').val(),
				txtoreplace = $('#fr-replace-text').val();
			if ($('input#fr-cs').is(':checked')) {
				txtofind = RegExp(rawtxtofind);
			} else {
				txtofind = RegExp(rawtxtofind,'i');
			}
			txtarea = txtarea.replace(txtofind, txtoreplace);
			$("#fr-status").html('One Replacement made.');
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
    
    window.FindReplace.registerModule("Actions")