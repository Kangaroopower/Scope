/**
 * Find and Replace 3.0 Alpine
 * 
 * Creates a Find and Replace Module
 *
 * @author Kangaroopower
 * @Shadow author Pecoes
 *
 */
$(function () {
	//Meta Vars
	var sctxt, matches = [], root = '//raw.github.com/Kangaroopower/Scope/master';

	//Base for functions
	window.Scope = {
		version: "3.0 Alpine",
		lib: {
			'Dialog': root+'/lib/Dialog.js',
			'Rangy': root+'/lib/Rangy.js',
			'jQueryUI': 'http://code.jquery.com/ui/1.9.0-rc.1/jquery-ui.min.js'
		}
	};

	var ns = window.Scope;

	/* Logs stuff */
	ns.log = (window.console && function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('Scope: ');
		return window.console.log.apply(window.console, args);
	}) || $.noop;

	/* Controls loading process */
	(function () {
		var subs = {};
		$.extend({
			scribe: function (topic, callback) {
			if (!subs[topic]) subs[topic] = $.Callbacks();
				subs[topic].add(callback);
			},
			pub: function (topic) {
				if (!subs[topic]) ns.log('unknown topic');
				else {
					var parameters = Array.prototype.splice.call(arguments, 1);
					subs[topic].fire.apply(null, parameters);
				}
			}
		});
	}());

	/* Load editor before everything else (and make sure it's in source mode!)*/
	$.scribe('doc', function () {
		if (window.RTE && RTE.getInstance && RTE.getInstance()) {
			if (RTE.getInstance().mode === 'source') $.pub('editor');
			else if(RTE.getInstance().mode === 'wysiwyg') $.pub('close');
			else ns.log('Cannot detect editor');
		} else if (window.CKEDITOR) {
			CKEDITOR.on('instanceReady', function () {
				RTE.getInstance().on('wysiwygModeReady', function () {
					$.pub('editor');
				});
				RTE.getInstance().on('sourceModeReady', function () {
					$.pub('editor');
				});
			});
		} else if (window.WikiaEditor) {
			if (WikiaEditor.getInstance && WikiaEditor.getInstance()) {
				if (WikiaEditor.getInstance().mode === 'source') $.pub('editor');
				else $.pub('close');
			} else if (GlobalTriggers) GlobalTriggers.on('WikiaEditorReady', function () {
				$.pub('editor');
			});
			else ns.log('Cannot detect editor');
		} else ns.log('Cannot detect editor');
	});

	/* Load libraries before actual script */
	$.scribe('editor', function () {
		ns.log('Scope: Editor Loaded');
		for (var i in ns.lib) $.getScript(ns.lib[i], ns.log('Scope: '+i+' loaded'));
		sctxt = WikiaEditor.getInstance().getEditbox();
		$('span.cke_toolbar_expand').before('<img id="sc-start" src="'+root+'/util/Replace.png"/>');
		$('#sc-start').click(function () {
			$.pub('open');
		});
		ns.log('Loaded: Scope', ns.version);
	});

	/* GUI operations- open/close (Actual dialog is stored at Mediawiki:Sc/gui.js) */
	$.scribe('open', function () {
		if (document.querySelector('#sc-ui')) $.pub('return');
		else {
			$('.cke_toolbar_expand').after(ns.dialog);
			$('#sc-cog').click(function (e) {
				e.preventDefault();
				if ($('#sc-drop').css('display') === 'none') $('#sc-drop').show();
				else $('#sc-drop').hide();
			});
			$('#sc-count').tooltip();
			if (matches.length) $('#sc-down').css({cursor: 'pointer'});
			$('#sc-find, #sc-cs, '+ sctxt).on('keyup paste', function () {
				$.pub('synch');
			});
			$('#sc-find').val(sctxt.getSelection().text).focus();
			var commonCSS = {
				width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
				outline: 'medium none', margin: 0, padding: 0, resize: 'none'
			};
			sctxt.css(commonCSS).after('<div id="sc-shadow"></div>').focus();
			$('#sc-shadow').css(commonCSS);
			$.pub('synch');
		}
	});

	$.scribe('close', function () {
		$('#sc-shadow, #sc-ui, #sc-style').remove();
		sctxt.removeAttr('style');
	});

	/* Does the replace */
	$.scribe('replace', function () {
		var rtxt = $('#sc-replace-text').val(), s = sctxt.val(), undotext = s;
		if ($('#sc-rall').is(':checked')) {
			var matchIndex = s.indexOf($('#sc-find').val()), count = 0;
			while (matchIndex !== -1) {
				if (!$('#sc-cs').is(':checked')) sctxt.val(s.toLowerCase().replace($('#sc-find').val(), rtxt));
				else sctxt.val(s.replace($('#sc-find').val(), rtxt));
				matchIndex = s.indexOf($('#sc-find').val());
				count++;
			}
			if (count === 1) count = "One";
			$("#sc-count").html('Done!').attr('title', count + ' replacement(s) made!');
		} else {
			if (!$('#sc-cs').is(':checked')) sctxt.val(s.toLowerCase().replace($('#sc-find').val(), rtxt));
			if (sctxt.getSelection().text === "") sctxt.val(s.replace($('#sc-find').val(), rtxt));
			else if ($('#sc-find').val().test(s.substring(sctxt.getSelection().start, sctxt.getSelection().end))) sctxt.val(s.substring(0, sctxt.getSelection().start) + rtxt + s.substring(sctxt.getSelection().end));
			$.pub('next');
			$("#sc-count").html('Done!').attr('title', 'One replacement made!');
		}
		if (!$('#sc-undo').length) $('#sc-replace-text').after('<img id="sc-undo"src="'+root+'/util/undo.png"/>');
		$('#sc-undo').click(function () {
			sctxt.val(undotext);
			$("#sc-count").html('Undone!').attr('title', '');
			$.pub('synch');
			$('#sc-undo').hide();
		});
		$.pub('synch');
	});
	
	//Synchs shadow with the textarea
	$.scribe('synch', function () {
		ns.log('synching');
		var ref = 0, s = sctxt.val();
		matches = [];
		while(s.indexOf($('#sc-find').val(), ref) !== -1) {
			if (!$('#sc-cs').is(':checked')) matches.push(s.toLowerCase().indexOf($('#sc-find').val()));
			else matches.push(s.toLowerCase().indexOf($('#sc-find').val()));
			ref = s.indexOf($('#sc-find').val(), ref) + 1;
		}
		$('#sc-shadow').html(function () {
			var r = '';
			for (var i = 0, start = 0; i < matches.length; i++) {
				r += s.substr(start, matches[i] - start);
				start = matches[i] + $('#sc-find').val().length;
				r += '<span id="sc' + i + '"class="sc-match">' + $('#sc-find').val() + '</span>';
			}
			if (s.substr(start+1).length > 0) r += s.substr(start+1);
			return r.length ? r : s;
		});
		$('#sc-shadow').css('height', sctxt.height()); 
		$('#sc-shadow').css('width', sctxt.width());
		$('#sc-shadow').scrollTop(sctxt.scrollTop());
	});

	//Highlights next match
	$.scribe('next', function  () {
		var nTrav = 0;
		if (!matches.length) return;
		sctxt.focus();
		for (var n = 0; n < matches.length; n++) {
			if (sctxt.getSelection().end < matches[n] + matches[n].length) {
				$('#sc' + n).css({backgroundColor:'#0000FF'});
				sctxt.setSelection(matches[n], matches[n] + $('#sc-find').val().length);
			}
		}
		if (nTrav === matches.length) nTrav = 0;
		nTrav++;
		$('#sc-count').html(nTrav + ' of ' + matches.length).attr('title', '');
	});

	//Load on edit
	if (wgAction === 'edit' && wgNamespaceNumber !== (1200||1201)) $.pub('doc');
});