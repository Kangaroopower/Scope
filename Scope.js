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
		version: "3.0 Alpine",
		lib: [
			{ name: 'Dialog', url: 'http://kangaroopower.wikia.com/wiki/Dialog.js?action=raw&ctype=text/javascript&maxage=0&smaxage=0' },
			{ name: 'Rangy', url: 'http://dev.wikia.com/wiki/Textinputs_jquery.js?action=raw&ctype=text/javascript' }		]
	};

	//Meta Vars
	var scfind, sctxt, matches = [], Scope = window.Scope;

	/* Logs stuff */
	var log = (window.console && function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('Scope:');
		return window.console.log.apply(window.console, args);
	}) || $.noop;


	/* Load libraries first */
	function load () {
		if (wgAction !== 'edit'  && [1200,1201].indexOf(wgNamespaceNumber) !== -1 ) return;
		var loaded = 0,
			onload = function (name) {
				return function () {
					log(name + ' loaded');
					if (++loaded === Scope.lib.length) $(doc);
				};
			};
		for (var i = 0; i < Scope.lib.length; i++) {
			console.log('loading ', Scope.lib[i].name, '...');
			$.getScript(Scope.lib[i].url, onload(Scope.lib[i].name));
		}
	}

	/* Check if editor has loaded after libraries have */
	function doc () {
		log('doc');
		if (window.RTE && RTE.getInstance && RTE.getInstance()) {
			if (RTE.getInstance().mode === 'source') editor();
			else if(RTE.getInstance().mode === 'wysiwyg') close();
			else log('Cannot detect editor');
		} else if (window.CKEDITOR) {
			CKEDITOR.on('instanceReady', function () {
				RTE.getInstance().on('wysiwygModeReady', close);
				RTE.getInstance().on('sourceModeReady', editor);
			});
		} else if (window.WikiaEditor) {
			if (WikiaEditor.getInstance && WikiaEditor.getInstance()) {
				if (WikiaEditor.getInstance().mode === 'source') editor();
				else close();
			} else if (GlobalTriggers) GlobalTriggers.on('WikiaEditorReady', editor);
			else log('Cannot detect editor');
		} else log('Cannot detect editor');
	}

	/* Load script */
	function editor () {
		log('Editor Loaded');
		sctxt = WikiaEditor.getInstance().getEditbox();
		$('span.cke_toolbar_expand').before('<img id="sc-start" src="//raw.github.com/Kangaroopower/Scope/master/util/Replace.png"/>');
		$('#sc-start').click(open);
		log('Loaded: Scope', Scope.version);
	}

	/* GUI operations- open/close */
	function open () {
		log('opening dialog');
		if (!document.querySelector('#sc-ui')) {
			$('.cke_toolbar_expand').after(Scope.dialog);
			scfind = $('#sc-find-text');
			$('#sc-replace-button').click(replace);
			$('#sc-cog').click(function (e) {
				e.preventDefault();
				if ($('#sc-drop').css('display') === 'none') $('#sc-drop').show();
				else $('#sc-drop').hide();
			});
			$('#sc-cs, #sc-rall, #sc-reg').click(function () {
				$(this).addClass('active');
			});
			$('#sc-find, #sc-cs, '+ sctxt).on('keyup paste click', synch);
			scfind.val(sctxt.getSelection().text).focus();
			var commonCSS = {
				width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
				outline: 'medium none', margin: 0, padding: 0, resize: 'none'
			};
			sctxt.css({position: 'relative', zIndex: '1', backgroundColor: 'transparent'}).after('<div id="sc-shadow"></div>');
			$('#sc-shadow, '+sctxt).css(commonCSS);
			synch();
		} else close();
	}

	function close () {
		var height = sctxt.css('height');
		$('#sc-shadow, #sc-ui').remove();
		sctxt.removeAttr('style').css({height:height});
	}

	function evaluate (find) {
		var mod;
		find ? mod = 'g' : mod = '';
		if (!$('input#sc-cs').is(':checked')) mod += 'i';
		if ($('input#sc-rall').is(':checked') && !find) mod += 'g';
		if ($('input#sc-reg').is('checked')) return RegExp(scfind.val(), mod);
		else return RegExp(scfind.val().replace(/\[\-[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), mod);
	}

	/* Does the replace */
	function replace () {
		var rtxt = $('#sc-replace-text').val(), s = sctxt.val(), undotext = s;
		if ($('#sc-rall').is(':checked')) {
			var count;
			sctxt.val(s.replace(evaluate(), rtxt))
			s.match(evaluate()).length = 1 ? count = "One" : s.match(evaluate()).length;
			$("#sc-count").html('Done!').attr('title', count + ' replacement(s) made!');
		} else {
			if (sctxt.getSelection().text === "") sctxt.val(s.replace(evaluate(), rtxt));
			else sctxt.val(s.substring(0, sctxt.getSelection().start) + rtxt + s.substring(sctxt.getSelection().end));
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
	
	//Synchs shadow with the textarea
	function synch () {
		log('synching');
		var ref = 0, s = sctxt.val();
		matches = [];
		while(s.regexIndexOf(evaluate(true), ref) !== -1) {
			matches.push(s.regexIndexOf(evaluate(true)));
			ref = s.regexIndexOf(scfind.val(), ref) + 1;
		}
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
		$('#sc-shadow').scrollTop(sctxt.scrollTop());
	}
	//Highlights next match
	function next () {
		var nTrav = 0;
		if (!matches.length) return;
		sctxt.focus();
		for (var n = 0; n < matches.length; n++) {
			if (sctxt.getSelection().end < matches[n] + matches[n].length) {
				$('#sc' + n).css({backgroundColor:'#0000FF'});
				sctxt.setSelection(matches[n], matches[n] + scfind.val().length);
			}
		}
		if (nTrav === matches.length) nTrav = 0;
		nTrav++;
		$('#sc-count').html(nTrav + ' of ' + matches.length).attr('title', '');
	}

	//Regex Index of feature
	String.prototype.regexIndexOf = function(regex, startpos) {
		var indexOf = this.substring(startpos || 0).search(regex);
		return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
	}

	//Load on edit
	load();
}());