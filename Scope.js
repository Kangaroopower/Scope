/*global WikiaEditor:true, CKEDITOR:true, RTE:true, GlobalTriggers:true */
/**
 * Find and Replace 3.0 Edge
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
			$('#sc-down').click(next);
			$('#sc-cog').dropdown();
			$('#sc-find-text, #sc-replace-text').keydown(function (e) {
				if(e.which === 13) {
					e.preventDefault();
					replace(true);
				}
			});
			scfind = $('#sc-find-text');
			$('#sc-cs, #sc-reg, #sc-ww').click(function (e) {
				e.preventDefault();
				if($(this).hasClass('scactive')) $(this).removeClass('scactive');
				else $(this).addClass('scactive');
				synch();
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
			$('#sc-shadow').css(commonCSS);
			sctxt.css(commonCSS);
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
	function evaluate (rall, shadow) {
		var mod = rall ? 'g' : '', ww = false;
		if (!$('#sc-cs').hasClass('scactive')) mod += 'i';
		if ($('#sc-ww').hasClass('scactive')) ww = true;
		if ($('#sc-reg').hasClass('scactive')) return shadow ? {'mod': mod, 'reg': scfind.val()} : new RegExp(scfind.val(), mod);
		else {
			var regex = scfind.val().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
			if (ww) regex = "\\b" + regex + "\\b";
			return shadow ? {'mod': mod, 'reg': regex} : new RegExp(regex, mod);
		}
	}
 
	/* Does the replace */
	function replace (rall) {
		var rtxt = $('#sc-replace-text').val(), s = sctxt.val(), undotext = sctxt.val();
		if (scfind.val() === '') return;
		if (rall === true) {
			var count, ctest = s.match(evaluate(true)).length;
			count = ctest === 1 ? "One" : ctest;
			sctxt.val(s.replace(evaluate(true), rtxt));
			synch();
			$("#sc-count").html('Done!').attr('title', count + ' replacement(s) made!');
		} else {
			var sel = sctxt.getSelection();
			if (sel.text === "") sctxt.val(s.replace(evaluate(), rtxt));
			else if (scfind.val().test(s.substring(sel.start, sel.end)))sctxt.val(s.substring(0, sel.start) + rtxt + s.substring(sel.end));
			next();
			$("#sc-count").html('Done!').attr('title', 'One replacement made!');
		}
		if (!$('#sc-undo').length) $('#sc-replace-text').after('<img id="sc-undo"src="//raw.github.com/Kangaroopower/Scope/master/pics/undo.png"/>');
		$('#sc-undo').click(function () {
			sctxt.val(undotext);
			synch();
			$("#sc-count").html('Undone!').attr('title', '');
			$('#sc-undo').hide();
		});
	}
 
	var T_TEXT = 1, T_ENTITY = 2;
	
	function tokenize (text) {
		var start = 0, tokens = text.split(/([<&>])/);

		var ENTITIES = {
			'<': '&lt;', '&': '&amp;', '>': '&gt;'
		};

		for (var t, i = 0; i < tokens.length; i++) {
			t = tokens[i];
			tokens[i] = {
				text: t,
				type: T_TEXT,
				start: start,
				length: t.length
			};
			start += t.length;
			if (t.length === 1 && ENTITIES[t]) {
				tokens[i].type = T_ENTITY;
				tokens[i].alt  = ENTITIES[t];
			}
		}
		return tokens;
	}
	
	function render (tokens) {
		var out = '';
		for (var t, i = 0; i < tokens.length; i++) {
			t = tokens[i];
			if (t.type === T_TEXT) {
				out += t.text;
			} else if (t.type === T_ENTITY) {
				out += t.alt;
			}
		}
		return out;
	}
	
	function synch () {
		var s = render(tokenize(sctxt.val())),
			regex,
			m,
			postfix = { "\r":1,"\n":1 }[s[s.length - 1]] ?  '&nbsp;' : '';

		if (scfind.val() === '') regex = null;
		else {
			var r = evaluate(true, true);
			regex = new RegExp(render(tokenize(r.reg)), r.mod);
		}
		matches = [];

		if (regex instanceof RegExp) {
			while (m = regex.exec(s)) matches.push({'index':m.index, 'phrase':m[0]});
			$('#sc-count').html(matches.length + ' match(es)!');
			log(matches);
		} else $('#sc-count').html('&nbsp;');

		if (matches.length) $('#sc-down').css({cursor: 'pointer'});
		else $('#sc-down').css({cursor: 'default'});

		$('#sc-shadow').css('height', sctxt.height()); 
		$('#sc-shadow').css('width', sctxt.width());

		$('#sc-shadow').html(function () {
			var r = '';
			for (var i = 0, start = 0; i < matches.length; i++) {
				r += s.substr(start, matches[i].index - start);
				start = matches[i].index + matches[i].phrase.length;
				r += '<span id="sc' + i + '"class="sc-match">' + matches[i].phrase + '</span>';
			}
			if (s.substr(start+1).length > 0) r += s.substr(start+1);
			return (r.length ? r : s)  + postfix;
		});
	}
 
	//Highlight a certain match
	function highlight (h) {
		sctxt.setSelection(matches[h].index, matches[h].index + matches[h].phrase.length);
		$('#sc' + sch).removeAttr('style');
		$('#sc' + h).css({backgroundColor:'#0000FF'});
		sch = h;
		if (nTrav === matches.length) nTrav = 0;
		nTrav++;
		$('#sc-count').html(nTrav + ' of ' + matches.length).attr('title', '');
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
			if (sel.end < matches[i].index + matches[i].phrase.length) {
				n = i;
				break;
			}
		}
		highlight(n);
	}
 
	//Load on edit
	$(load);
}());
