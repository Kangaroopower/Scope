/*global WikiaEditor:true, CKEDITOR:true, RTE:true, GlobalTriggers:true */
/**
 * Find and Replace 3.0 Alpine
 * 
 * Creates a Find and Replace Module
 *
 * @author Kangaroopower
 * @Shadow author Pecoes
 *
 */
(function () {
	//Base for functions
	window.Scope = {
		version: "3.5 Edge",
		lib: [
				{ name: 'Dialog', url: 'http://kangaroopower.wikia.com/wiki/Mediawiki:Dialog.js?action=raw&ctype=text/javascript&maxage=0&smaxage=0' },
				{ name: 'Bootstrap', url: 'http://raw.github.com/Kangaroopower/Scope/master/lib/bootstrap.min.js' },
				{ name: 'Shadow', url: 'https://raw.github.com/Kangaroopower/Scope/master/Shadow%20dev.js' },
				{ name: 'Rangy', url: 'http://dev.wikia.com/wiki/Textinputs_jquery.js?action=raw&ctype=text/javascript' }
			]
	};
 
	//Meta Vars
	var scfind, sctxt, Scope = window.Scope, shadow;
 
	/* Logs stuff */
	var log = (window.console && function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('Scope:');
		return window.console.log.apply(window.console, args);
	}) || $.noop;
 
	/* Load libraries first */
	function load () {
		if (!/\boasis-one-column\b/.test(document.body.className)) return false;
		var loaded = 0,
			onload = function (name) {
				return function () {
					log(name + ' loaded');
					if (++loaded === Scope.lib.length) $(editor);
				};
			};
		for (var i = 0; i < Scope.lib.length; i++) {
			console.log('loading ', Scope.lib[i].name, '...');
			$.getScript(Scope.lib[i].url, onload(Scope.lib[i].name));
		}
	}
 
	/* Check if editor has loaded after libraries have */
	function editor () {
		log('doc');
		if (window.RTE && RTE.getInstance && RTE.getInstance()) {
			if (RTE.getInstance().mode === 'source') setup();
			else if(RTE.getInstance().mode === 'wysiwyg') hide();
			else log('Cannot detect editor');
		} else if (window.CKEDITOR) {
			CKEDITOR.on('instanceReady', function () {
				RTE.getInstance().on('wysiwygModeReady', hide);
				RTE.getInstance().on('sourceModeReady', setup);
			});
		} else if (window.WikiaEditor) {
			if (WikiaEditor.getInstance && WikiaEditor.getInstance()) {
				if (WikiaEditor.getInstance().mode === 'source') setup();
				else hide();
			} else if (GlobalTriggers) GlobalTriggers.on('WikiaEditorReady', setup);
			else log('Cannot detect editor');
		} else log('Cannot detect editor');
	}
 
	/* Load script */
	function setup () {
		log('Editor Loaded');
		sctxt = WikiaEditor.getInstance().getEditbox();
		shadow = sctxt.shadow();
		if (!$('#sc-start').length) $('span.cke_toolbar_expand').before('<img id="sc-start" src="//raw.github.com/Kangaroopower/Scope/master/pics/Replace.png"/>');
		$('#sc-start').click(show);
		log('Loaded: Scope', Scope.version);
	}
 
	/* Opens and sets up gui */
	function show () {
		log('opening dialog');
		if (!$('#sc-ui').length) {
			$('span.cke_toolbar_expand').after(Scope.dialog);
			$('#sc-replace-button').click(replace);
			$('#sc-rall-button').click(function () {
				replace(true);
			});
			//$('#sc-down').click(next);
			$('#sc-cog').dropdown();
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
			$('#sc-find-text').val(sctxt.getSelection().text).focus();
			shadow.synch();
		} else hide();
	}
 
	/* hides gui */
	function hide () {
		var height = sctxt.css('height');
		$('#shadow, #sc-ui').remove();
		sctxt.removeAttr('style').css({height:height});
	}
 
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
			var ctest = s.match(evaluate(true)).length, count = ctest === 1 ? "One" : ctest;
			sctxt.val(s.replace(evaluate(true), rtxt));
			shadow.synch();
			$("#sc-count").html('Done!').attr('title', count + ' replacement(s) made!');
		} else {
			var sel = sctxt.getSelection();
			if (sel.text === "") sctxt.val(s.replace(evaluate(), rtxt));
			else if (scfind.val().test(s.substring(sel.start, sel.end)))sctxt.val(s.substring(0, sel.start) + rtxt + s.substring(sel.end));
			shadow.synch();
			$("#sc-count").html('Done!').attr('title', 'One replacement made!');
		}
		if (!$('#sc-undo').length) $('#sc-replace-text').after('<img id="sc-undo"src="//raw.github.com/Kangaroopower/Scope/master/pics/undo.png"/>');
		$('#sc-undo').click(function () {
			sctxt.val(undotext);
			$("#sc-count").html('Undone!').attr('title', '');
			shadow.synch();
			$('#sc-undo').hide();
		});
	}
	//Load on edit
	$(load);
}());