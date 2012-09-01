$(function () {
	//Meta Vars
	var sctxt, sel, scfind = $('#sc-find').val(), matches = [], root = '//raw.github.com/Kangaroopower/Scope/master';

	//Base for functions
	window.Scope = {
		version: "3.0 Alpine",
		lib: {
			'TextInputs': root+'/lib/Rangy.js',
			'Dialog': root+'/lib/Dialog.js',
			'jQueryUI': 'http://code.jquery.com/ui/1.9.0-rc.1/jquery-ui.min.js'
		},
		subs: {}
	};

	var Scope = window.Scope;

	/* Controls loading process */
	(function () {
		$.extend({
			scribe: function (topic, callback) {
			if (!Scope.subs[topic]) Scope.subs[topic] = $.Callbacks();
				Scope.subs[topic].add(callback);
			},
			pub: function (topic) {
				if (!Scope.subs[topic]) console.log('unknown topic');
				else {
					var parameters = Array.prototype.splice.call(arguments, 1);
					Scope.subs[topic].fire.apply(null, parameters);
				}
			}
		});
	}());

	/* Load editor before everything else (and make sure it's in source mode!)*/
	$.scribe('doc', function () {
		if (window.RTE && RTE.getInstance && RTE.getInstance()) {
			if (RTE.getInstance().mode === 'source') $.pub('editor');
			else if(RTE.getInstance().mode === 'wysiwyg') $.pub('close');
			else console.log('Cannot detect editor');
		} else if (window.CKEDITOR) {
			CKEDITOR.on('instanceReady', function () {
				RTE.getInstance().on('wysiwygModeReady', $.pub('editor'));
				RTE.getInstance().on('sourceModeReady', $.pub('editor'));
			});
		} else if (window.WikiaEditor) {
			if (WikiaEditor.getInstance && WikiaEditor.getInstance()) {
				if (WikiaEditor.getInstance().mode === 'source') $.pub('editor');
				else $.pub('close');
			} else if (GlobalTriggers) GlobalTriggers.on('WikiaEditorReady', $.pub('editor'));
			else console.log('Cannot detect editor');
		} else console.log('Cannot detect editor');
	});

	/* Load libraries before actual script */
	$.scribe('editor', function () {
		console.log('Scope: Editor Loaded');
		for (var i in Scope.lib) $.getScript(Scope.lib[i], console.log('Scope: '+i+' loaded'));
		sctxt = WikiaEditor.getInstance().getEditbox();
		sel = sctxt.getSelection();
		$('span.cke_toolbar_expand').before('<img id="sc-start" src="'+root+'/util/Replace.png"/>');
		$('#sc-start').click($.pub('open'));
		console.log('Loaded: Scope', Scope.version);
	});

	/* GUI operations- open/close (Actual dialog is stored at Mediawiki:Sc/gui.js) */
	$.scribe('open', function () {
		if (document.querySelector('#sc-ui')) $.pub('return');
		else {
			$('.cke_toolbar_expand').after(Scope.dialog);
			$('#sc-cog').click(function (e) {
				e.preventDefault();
				if ($('#sc-drop').css('display') === 'none') $('#sc-drop').show();
				else $('#sc-drop').hide();
			});
			$('#sc-count').tooltip();
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

	$.scribe('close', function () {
		$('#sc-shadow, #sc-ui, #sc-style').remove();
		sctxt.removeAttr('style');
	});

	/* Does the replace */
	$.scribe('replace', function () {
		var rtxt = $('#sc-replace-text').val(), s = sctxt.val(), undotext = s;
		if ($('#sc-rall').is(':checked')) {
			var matchIndex = s.indexOf(scfind), count = 0;
			while (matchIndex !== -1) {
				if (!$('#sc-cs').is(':checked')) sctxt.val(s.toLowerCase().replace(scfind, rtxt));
				else sctxt.val(s.replace(scfind, rtxt));
				matchIndex = s.indexOf(scfind);
				count++;
			}
			if (count === 1) count = "One";
			$("#sc-count").html('Done!').attr('title', count + ' replacement(s) made!');
		} else {
			if (!$('#sc-cs').is(':checked')) sctxt.val(s.toLowerCase().replace(scfind, rtxt));
			if (sel.text === "") sctxt.val(s.replace(scfind, rtxt));
			else if (scfind.test(s.substring(sel.start, sel.end))) sctxt.val(s.substring(0, sel.start) + rtxt + s.substring(sel.end));
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
		console.log('synching');
		var ref = 0, s = sctxt.val();
		matches = [];
		while(s.indexOf(scfind, ref) !== -1) {
			if (!$('#sc-cs').is(':checked')) matches.push(s.toLowerCase().indexOf(scfind));
			else matches.push(s.toLowerCase().indexOf(scfind));
			ref = s.indexOf(scfind, ref) + 1;
		}
		$('#sc-shadow').html(function () {
			var r = '';
			for (var i = 0, start = 0; i < matches.length; i++) {
				r += s.substr(start, matches[i] - start);
				start = matches[i] + scfind.length;
				r += '<span id="sc' + i + '"class="sc-match">' + scfind + '</span>';
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
			if (sel.end < matches[n] + matches[n].length) {
				$('#sc' + n).css({backgroundColor:'#0000FF'});
				sctxt.setSelection(matches[n], matches[n] + scfind.length);
			}
		}
		if (nTrav === matches.length) nTrav = 0;
		nTrav++;
		$('#sc-count').html(nTrav + ' of ' + matches.length).attr('title', '');
	});

	//Load on edit
	if (wgAction === 'edit' && wgNamespaceNumber !== (1200||1201)) $.pub('doc');
});