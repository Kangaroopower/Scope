/**
 * Find and Replace 3.0
 * 
 * Creates a Find and Replace Module
 *
 * @author Kangaroopower
 * @Shadow author Pecoes
 *
 */
$(function( ) {
	//Meta Vars
	var sctxt, sel, scfind = $('#sc-find').val(), matches = [], root ='https://raw.github.com/Kangaroopower/Scope/master/';

	//Base for functions
	window.Scope = {
		version: "3.0 Alpha",
		libraries: {
			'TextInputs': root+'/lib/Rangy.js',
			'Dialog': root+'/lib/Dialog.js',
			'jQueryUI': '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js',
			'Tooltip': 'http://view.jqueryui.com/master/ui/jquery.ui.tooltip.js'
		},
		modules: {
			'Actions': root+'/modules/Actions.js',
			'GUI': root+'/modules/Gui.js',
			'Shadow': root+'/modules/Shadow.js'
		}
	};

	var Scope = window.Scope;

	/* Controls loading process */
	(function () {
		var subs = {};
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
				var params = [];
				for (var i = 0; i < arguments.length; i++) params.push(arguments[i]);
				subs[topic] && $.each(subs[topic], function () {
					this.callback.apply(this.subscriber, params);
				});
			}
		});
	}());

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
		for (var i in Scope.libraries) $.getScript(Scope.libraries[i], console.log('Scope: '+i+' loaded'));
		sctxt = WikiaEditor.getInstance().getEditbox();
		sel = sctxt.getSelection();
		console.log('Scope: Editor Loaded');
		$.pub('modules');
	});

	/* Load modules before script */
	$.sub('modules', function () {
		for (var i in Scope.modules) $.getScript(Scope.modules[i], console.log('Scope: '+i+' loaded'));
		$('span.cke_toolbar_expand').before('<img id="sc-start" src="'+root+'/util/Replace.png"/>');
		$('#sc-start').click($.pub('open'));
		console.log('Loaded: Scope', Scope.version);
	});

	//Load on edit
	if (wgAction === 'edit' && wgNamespaceNumber !== (1200||1201)) $.pub('doc');
});