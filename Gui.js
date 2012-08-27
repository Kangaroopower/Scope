/* GUI operations- open/close (Actual dialog is stored at Mediawiki:Scope/gui.js) */
$.sub('open', function () {
	if (document.querySelector('#sc-ui')) $.pub('close');
	else {
		$('.cke_toolbar_expand').after(Scope.dialog);
		$('#sc-cog').click(function (e) {
			e.preventDefault();
			if ($('##sc-drop').css('display') === 'none') $('#sc-drop').show();
			else $('#sc-drop').hide()
		});
		if (matches.length) $('#sc-down').css({cursor: 'pointer'});
		$('#sc-find, #sc-cs, '+ sctxt).on('keyup paste', $.pub('synch'));
		$('#sc-find').val(sel.text).focus();
		var commonCSS = {
			width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
			outline: 'medium none', margin: 0, padding: 0, resize: 'none'
		};
		sctxt.css(commonCSS).after('<div id="sc-shadow"></div>').focus();
		$('#sc-shadow').css(commonCSS);
		$.pub('synch');
	}
});

$.sub('close', function () {
	$('#sc-shadow, #sc-ui, #sc-style').remove();
	sctxt.removeAttr('style');
});