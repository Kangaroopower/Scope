/* GUI operations- open/close & shadow GUI (Actual dialog is stored elsewhere) */
Scope.Sequencer('lib').onload(function () {
	$('#sc-start').click(function () {
		if (document.querySelector('#sc-ui')) {
			$('#sc-shadow, #sc-ui').remove();
			sctxtarea.removeAttr('style');
		} else {
			$('#editform').prepend(Scope.dialog);
			$('#sc-find, #sc-cs, '+ sctxtarea).on('keyup paste', Scope.Shadow.synch);
			$('#sc-find').val(sctxtarea.getSelection().text).focus();
			sctxtarea.css(commonCSS).after('<div id="sc-shadow"></div>');
			var commonCSS = {
				width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
				outline: 'medium none', margin: 0, padding: 0, resize: 'none'
			};
			sctxtarea.css(commonCSS).css({position: 'relative', zIndex: '1', backgroundColor: 'transparent'});
			sctxtarea.scroll($('#sc-shadow').scrollTop(sctxtarea.scrollTop()));
			sctxtarea.focus();
			Scope.Shadow.synch();
		}				
	});
}());