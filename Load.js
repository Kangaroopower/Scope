/**
 * Find and Replace 3.0
 * 
 * Creates a Find and Replace Module
 *
 * @author Kangaroopower
 * @Shadow author Pecoes
 *
 */
$(document).ready(function( ) {
	//Meta Vars
	var sctxt, sel, scfind = $('#sc-find').val(), matches = [], root ='https://raw.github.com/Kangaroopower/Scope/master/';

	//Base for functions
	var Scope = {
		version: "3.0 Dev",
		libraries: {
			'TextInputs': root+'Rangy.js',
			'Dialog': root+'Dialog.js',
			'jQueryUI': '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js',
			'Tooltip': 'http://view.jqueryui.com/master/ui/jquery.ui.tooltip.js'
		},
		modules: {
			'Actions': root+'Actions.js',
			'GUI': root+'Gui.js',
			'Shadow': root+'Shadow.js'
		}
	};


	/* Controls loading process */
	(function () {
		var subs;
		$.fn.extend({
			sub: function (topic, callback) {
				if (!subs[topic]) subs[topic] = [];
				subs[topic].push({
					subscriber: this,
					callback: callback
				});
				return this;
			}
		});
		$.extend({
			pub: function (topic) {
				subs[topic] && $.each(subs[topic], this.callback.apply(this.subscriber, topic));
			}
		});
	})();

	/* Load editor before everything else (and make sure it's in source mode!)*/
	$.sub('doc', function () {
		if (window.RTE && RTE.getInstance && RTE.getInstance()) {
			if ('source' === RTE.getInstance().mode) $.pub('editor');
			else $.pub('close');
		} else if (window.CKEDITOR) {
			CKEDITOR.on('instanceReady', function () {
				RTE.getInstance().on('wysiwygModeReady', $.pub('close'));
				RTE.getInstance().on('sourceModeReady', $.pub('editor'));
			});
		} else if (window.WikiaEditor) {
			if (WikiaEditor.getInstance && WikiaEditor.getInstance()) {
				if ('source' === WikiaEditor.getInstance().mode) $.pub('editor');
				else $.pub('close');
			} else if (GlobalTriggers) GlobalTriggers.on('WikiaEditorReady', $.pub('editor'));
		}
	});
	/* Load libraries before actual script */
	$.sub('editor', function () {
		for (var i in Scope.libraries) $.getScript(Scope.libraries[i]);
		sctxt = WikiaEditor.getInstance().getEditbox();
		sel = sctxt.getSelection();
		console.log('Scope: Editor Loaded');
		$.pub('modules');
	});

	/* Load modules before script */
	$.sub('modules', function () {
		for (var i in Scope.modules) $.getScript(Scope.modules[i]);
		$('span.cke_toolbar_expand').before('<img id="sc-start" src="'+root+'Replace.png"/>');
		$('#sc-start').click($.pub('open'));
		console.log('Loaded: Scope', Scope.version);
	});

	//Load on edit
	if (wgAction === 'edit' && wgNamespaceNumber !== (1200||1201)) $.pub('doc');
});