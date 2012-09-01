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
	var sctxt, sel, scfind = $('#sc-find').val(), matches = [], root ='https://raw.github.com/Kangaroopower/Scope/master';

	//Base for functions
	window.Scope = {
		version: "3.0 Alpine",
		libraries: {
			'TextInputs': root+'/lib/Rangy.js',
			'Dialog': root+'/lib/Dialog.js',
			'jQueryUI': 'http://code.jquery.com/ui/1.9.0-rc.1/jquery-ui.min.js'
		},
		modules: {
			'Actions': root+'/modules/Actions.js',
			'GUI': root+'/modules/Gui.js',
			'Shadow': root+'/modules/Shadow.js'
		}
	};

	var Sc = window.Scope;

	/* Controls loading process */
	(function () {
		var subs = {};
		//Adds an event listener
		jQuery.csub = function (type, func) {
			if(!subs[type]) subs[type] = [];
			subs[type].push(func);
			return true;
		};

		//Calls an event listener
		jQuery.psub = function (type) {
			if(!subs[type]) return false;
			if(subs[type].length === 0) return true;
			var args = [];
			for(var i = 1; i < arguments.length; i++) args.push(arguments[i]);
			for(var j = 0; j < subs[type].length; j++) subs[type][j].apply(this, args);
			return true;
		};
	}());

	/* Load editor before everything else (and make sure it's in source mode!)*/
	$.csub('doc', function () {
		if (window.RTE && RTE.getInstance && RTE.getInstance()) {
			if ('source' === RTE.getInstance().mode) $.psub('editor');
			else $.psub('close');
		} else if (window.CKEDITOR) {
			CKEDITOR.on('instanceReady', function () {
				RTE.getInstance().on('wysiwygModeReady', $.psub('close'));
				RTE.getInstance().on('sourceModeReady', $.psub('editor'));
			});
		} else if (window.WikiaEditor) {
			if (WikiaEditor.getInstance && WikiaEditor.getInstance()) {
				if ('source' === WikiaEditor.getInstance().mode) $.psub('editor');
				else $.psub('close');
			} else if (GlobalTriggers) GlobalTriggers.on('WikiaEditorReady', $.psub('editor'));
		}
	});
	/* Load libraries before actual script */
	$.csub('editor', function () {
		for (var i in Scope.libraries) $.getScript(Scope.libraries[i], console.log('Scope: '+i+' loaded'));
		sctxt = WikiaEditor.getInstance().getEditbox();
		sel = sctxt.getSelection();
		console.log('Scope: Editor Loaded');
		$.psub('modules');
	});

	/* Load modules before script */
	$.csub('modules', function () {
		for (var i in Scope.modules) $.getScript(Scope.modules[i], console.log('Scope: '+i+' loaded'));
		$('span.cke_toolbar_expand').before('<img id="sc-start" src="'+root+'/util/Replace.png"/>');
		$('#sc-start').click($.psub('open'));
		console.log('Loaded: Scope', Scope.version);
	});

	//Load on edit
	if (wgAction === 'edit' && wgNamespaceNumber !== (1200||1201)) $.psub('doc');
});