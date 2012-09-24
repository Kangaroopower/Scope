/*global mw:true, WikiaEditor:true, CKEDITOR:true, RTE:true, GlobalTriggers:true */
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
				{ name: 'Dialog', url: 'http://kangaroopower.wikia.com/wiki/Mediawiki:Dialog.js?action=raw&ctype=text/javascript&maxage=0&smaxage=0' },
				{ name: 'Rangy', url: 'http://dev.wikia.com/wiki/Textinputs_jquery.js?action=raw&ctype=text/javascript' }
			]
	};

	//Meta Vars
	var scfind, sctxt, matches = [], Scope = window.Scope, nTrav = 0, sch = -1;

	/* Logs stuff */
	var log = (window.console && function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('Scope:');
		return window.console.log.apply(window.console, args);
	}) || $.noop;
 
	/* Load libraries first */
	function load () {
		if (mw.config.get('wgAction') === 'edit'  && [1200,1201].indexOf(mw.config.get('wgNamespaceNumber')) !== -1 ) return;
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
		if (!$('#sc-start').length) $('span.cke_toolbar_expand').before('<img id="sc-start" src="//raw.github.com/Kangaroopower/Scope/master/util/Replace.png"/>');
		$('#sc-start').click(show);
		log('Loaded: Scope', Scope.version);
	}
 
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
			var count;
			if (evaluate(true).length === 1) count = "One";
			else count = s.match(evaluate(true)).length;
			sctxt.val(s.replace(evaluate(true), rtxt));
			$("#sc-count").html('Done!').attr('title', count + ' replacement(s) made!');
		} else {
			if (sctxt.getSelection().text === "") sctxt.val(s.replace(evaluate(), rtxt));
			else if (scfind.val().test(s.substring(sctxt.getSelection().start, sctxt.getSelection().end)))sctxt.val(s.substring(0, sctxt.getSelection().start) + rtxt + s.substring(sctxt.getSelection().end));
			next();
			$("#sc-count").html('Done!').attr('title', 'One replacement made!');
		}
		if (!$('#sc-undo').length) $('#sc-replace-text').after('<img id="sc-undo"src="//raw.github.com/Kangaroopower/Scope/master/util/undo.png"/>');
		$('#sc-undo').click(function () {
			sctxt.val(undotext);
			$("#sc-count").html('Undone!').attr('title', '');
			synch();
			$('#sc-undo').hide();
		});
		synch();
	}

	//Highlights next match
	function next () {
		log(nTrav);
		if (!matches.length) {
			$('#sc-count').html('No matches found').attr('title', '');
			return;
		}
		sctxt.focus();
		var n = 0, sel = sctxt.getSelection();
		if (!sel || sel.end >= sctxt.val().length) {
			sctxt.setSelection(0, 0);
			sel = sctxt.getSelection();
		}
		for (var i = 0; i < matches.length; i++) {
			if (sel.end < matches[i] + scfind.val().length) {
				n = i;
				break;
			}
		}
		highlight(n);
	}
 
	//PUBLIC FUNCTIONS
	/* Synchs shadow with the textarea */
	var synch = function () {
		log('synching');
		var s = sctxt.val(), regex, m;
		if (scfind.val() === '') regex = null;
		else regex = evaluate(true);
		matches = [];
		if (regex instanceof RegExp) {
			while (m = regex.exec(s)) matches.push(m.index);
			$('#sc-count').html(matches.length + ' matches!');
			log(matches);
		} else $('#sc-count').html('&nbsp;');
		$('#sc-shadow').html(function () {
			var r = '';
			for (var i = 0, start = 0; i < matches.length; i++) {
				r += s.substr(start, matches[i] - start);
				start = matches[i] + scfind.val().length;
				r += '<span id="sc' + i + '"class="sc-match">' + scfind.val() + '</span>';
			}
			if (s.substr(start+1).length > 0) r += s.substr(start+1);
			return r.length ? r : s;
		});
		if (matches.length) $('#sc-down').css({cursor: 'pointer'});
		$('#sc-shadow').css('height', sctxt.height()); 
		$('#sc-shadow').css('width', sctxt.width());
	},

	//Highlight a certain match- also public
	highlight = function (high) {
		sctxt.setSelection(matches[high], matches[high] + scfind.val().length);
		$('#sc' + sch).removeAttr('style');
		$('#sc' + high).css({backgroundColor:'#0000FF'});
		sch = high;
		if (nTrav === matches.length) nTrav = 0;
		nTrav++;
		$('#sc-count').html(nTrav + ' of ' + matches.length).attr('title', '');
	};

	Scope.highlight = highlight;
	Scope.synch = synch;

	//Load on edit
	$(load);
}());