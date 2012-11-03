/*global mw:true, WikiaEditor:true, CKEDITOR:true, RTE:true, GlobalTriggers:true, Shadow:true */
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
	//Scope Class
	window.Scope = {
		version: "3.0 Alpine",
		lib: [
				{ name: 'Dialog', url: 'http://raw.github.com/Kangaroopower/Scope/master/Dialog.js' },
				{ name: 'Shadow', url: 'http://raw.github.com/Kangaroopower/Scope/master/Shadow.js' }
			]
	};

	//Meta Vars
	var sctxt, Scope = window.Scope, scshadow, scfind;

	/* Logs stuff */
	var log = (window.console && function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('Scope:');
		return window.console.log.apply(window.console, args);
	}) || $.noop;

	/* Load libraries first */
	function load () {
		if (!/\boasis-one-column\b/.test(document.body.className)) return;
		var loaded = 0,
			onload = function (name) {
				return function () {
					log(name + ' loaded');
					if (++loaded === Scope.lib.length) $(editor);
				};
			};
		for (var i = 0; i < Scope.lib.length; i++) {
			log('loading ', Scope.lib[i].name, '...');
			$.getScript(Scope.lib[i].url, onload(Scope.lib[i].name));
		}
	}

	/* Check if editor has loaded after libraries have */
	function editor () {
		log('doc');
		if (window.RTE && RTE.getInstance && RTE.getInstance()) {
			if (RTE.getInstance().mode === 'source') show();
			else if(RTE.getInstance().mode === 'wysiwyg') hide();
			else log('Cannot detect editor');
		} else if (window.CKEDITOR) {
			CKEDITOR.on('instanceReady', function () {
				RTE.getInstance().on('wysiwygModeReady', hide);
				RTE.getInstance().on('sourceModeReady', show);
			});
		} else if (window.WikiaEditor) {
			if (WikiaEditor.getInstance && WikiaEditor.getInstance()) {
				if (WikiaEditor.getInstance().mode === 'source') show();
				else hide();
			} else if (GlobalTriggers) GlobalTriggers.on('WikiaEditorReady', show);
			else log('Cannot detect editor');
		} else if (mw.config.get('skin') === 'monobook') show(true);
		else log('Cannot detect editor');
	}
 
	/* Shows GUI */
	function show (monobook) {
		log('Editor loaded');
		if (!$('#sc-start').length) {
			if (monobook) $('div#toolbar').append('<img id="sc-start" src="//raw.github.com/Kangaroopower/Scope/master/pics/Replace.png"/>');
			else $('span.cke_toolbar_expand').before('<img id="sc-start" src="//raw.github.com/Kangaroopower/Scope/master/pics/Replace.png"/>');
		} 
		$('#sc-start').click(function () {
			if ($('#sc-ui').length) {
				log('closing dialog');
				hide();
				return;
			}
			log('opening dialog');
			if (monobook) $('div#toolbar').after(Scope.dialog);
			else $('span.cke_toolbar_expand').after(Scope.dialog);
			
			if (monobook) {
				sctxt = $('#wpTextbox1');
				//Monobook needs special css
				scshadow = new Shadow($('#wpTextbox1'), {
					regex: window.Scope.evaluate
				});
			} else {
				sctxt = WikiaEditor.getInstance().getEditbox();
				scshadow = new Shadow(WikiaEditor.getInstance().getEditbox(), {
					regex: window.Scope.evaluate
				});
			}
		});
		log('Loaded version:', Scope.version);
		setup();
	}
 
	/* Opens and sets up gui */
	function setup () {
		scshadow.init();
		$('#sc-replace-button').click(replace);
		$('#sc-down').click(scshadow.next);
		$('#sc-rall-button').click(replace(true));
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
		$('#sc-cs, #sc-reg').click(function (e) {
			e.preventDefault();
			if($(this).hasClass('scactive')) $(this).removeClass('scactive');
			else $(this).addClass('scactive');
		});
		$('#sc-find-text, #sc-cs').on('keyup paste click', scshadow.synch);
		$('#sc-find-text').val(sctxt.getSelection().text).focus();
		scshadow.synch();
	}

	/* hides gui */
	function hide () {
		var height = sctxt.css('height');
		$('#sc-shadow, #sc-ui').remove();
		sctxt.removeAttr('style').css({height:height});
	}
 
	/* Evaluates the regex to be used- Public because it's used by Shadow */
	function evaluate (alone) {
		var mod = alone ? '' : 'g';
		if (!$('#sc-cs').hasClass('scactive')) mod += 'i';
		if ($('#sc-reg').hasClass('scactive')) return new RegExp(scfind.val(), mod);
		else return new RegExp(scfind.val().replace(/\[\-[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), mod);
	};

	/* Does the replace */
	function replace (rall) {
		var rtxt = $('#sc-replace-text').val(), s = sctxt.val(), undotext = sctxt.val();
		scfind = $('#sc-find-text');
		if (rall === true) {
			var count;
			if (s.match(evaluate()).length === 1) count = "One";
			else count = s.match(evaluate()).length;
			sctxt.val(s.replace(evaluate(), rtxt));
			$("#sc-count").html('Done!').attr('title', count + ' replacement(s) made!');
		} else {
			var sel = scfind.val().test(s.substring(sctxt.getSelection().start, sctxt.getSelection().end));
			if (sctxt.getSelection().text === "") sctxt.val(s.replace(evaluate(true), rtxt));
			else if (sel) sctxt.val(s.substring(0, sctxt.getSelection().start) + rtxt + s.substring(sctxt.getSelection().end));
			scshadow.next();
			$("#sc-count").html('Done!').attr('title', 'One replacement made!');
		}
		if (!$('#sc-undo').length) $('#sc-replace-text').after('<img id="sc-undo"src="//raw.github.com/Kangaroopower/Scope/master/pics/undo.png"/>');
		$('#sc-undo').click(function () {
			sctxt.val(undotext);
			$("#sc-count").html('Undone!').attr('title', '');
			scshadow.synch();
			$('#sc-undo').hide();
		});
		scshadow.synch();
	}

	//expose evaluate
	Scope.evaluate = evaluate;

	//Load on edit
	$(load);
}());