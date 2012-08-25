/* GUI operations- open/close (Actual dialog is stored at Mediawiki:Scope/gui.js) */
$.sub('open', function () {
	if (document.querySelector('#sc-ui')) {
		$('#sc-shadow, #sc-ui').remove();
		sctxtarea.removeAttr('style');
	} else {
		$('#editform').prepend(Scope.dialog);
		$('#sc-find, #sc-cs, '+ sctxtarea).on('keyup paste', $.pub('synch'));
		$('#sc-find').val(sel.text).focus();
		var commonCSS = {
			width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
			outline: 'medium none', margin: 0, padding: 0, resize: 'none'
		};
		sctxtarea.css(commonCSS).css({position: 'relative', zIndex: '1'}).after('<div id="sc-shadow"></div>');
		$('#sc-shadow').css(commonCSS)
		sctxtarea.scroll($('#sc-shadow').scrollTop(sctxtarea.scrollTop()));
		sctxtarea.focus();
		$.pub('synch');
	}
});