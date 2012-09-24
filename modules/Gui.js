	/* Opens and sets up gui */
	function show () {
		log('opening dialog');
		if (!$('#sc-ui').length) {
			$('.cke_toolbar_expand').after(Scope.dialog);
			$('#sc-replace-button').click(replace);
			$('#sc-rall-button').click(function () {
				replace(true);
			});
			$('#sc-down').click(next);
			$('#sc-cog').click(function (e) {
				e.preventDefault();
				if ($('#sc-drop').css('display') === 'none') $('#sc-drop').show();
				else $('#sc-drop').hide();
			});
			$('#sc-find-text, #sc-replace-text').keydown(function (e) {
				if(e.which === 13) {
					e.preventDefault();
					replace(true);
				}
			});
			scfind = $('#sc-find-text');
			$('#sc-cs, #sc-reg').click(function (e) {
				e.preventDefault();
				if($(this).hasClass('scactive')) $(this).removeClass('scactive');
				else $(this).addClass('scactive');
			});
			$('#sc-find-text, #sc-cs').on('keyup paste click', synch);
			sctxt.on('keyup paste click', synch).scroll(function () {
				$('#sc-shadow').scrollTop(sctxt.scrollTop());
			});
			$('#sc-find-text').val(sctxt.getSelection().text).focus();
			var commonCSS = {
				width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
				outline: 'medium none', margin: 0, padding: 0, resize: 'none'
			};
			sctxt.css({position: 'relative', zIndex: '1', backgroundColor: 'transparent'}).after('<div id="sc-shadow"></div>');
			$('#sc-shadow, '+sctxt).css(commonCSS);
			synch();
		} else hide();
	}
 
	/* hides gui */
	function hide () {
		var height = sctxt.css('height');
		$('#sc-shadow, #sc-ui').remove();
		sctxt.removeAttr('style').css({height:height});
	}