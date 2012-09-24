/**
 * Find and Replace 3.0
 * 
 * Creates a Find and Replace Module
 *
 * @author Kangaroopower
 * @Shadow author Pecoes
 *
 */
(function() {
	//Meta Vars
	var scfind, sctxt, root ='https://raw.github.com/Kangaroopower/Scope/master';

	//Scope Class
	window.Scope = {
		version: "3.0 Alpine",
		lib: [
				{ name: 'Dialog', url: root+'/Dialog.js' },
				{ name: 'Rangy', url: 'http://dev.wikia.com/wiki/Textinputs_jquery.js?action=raw&ctype=text/javascript' }
			],
		modules: [
				{ name: 'Actions', url: 'Actions.js' },
				{ name: 'GUI', url: 'Gui.js' },
				{ name: 'GUI', url: 'Shadow.js' }
			]
	};

	var Scope = window.Scope;


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
 
	/* Load modules */
	function setup () {
		log('Editor Loaded');
		sctxt = WikiaEditor.getInstance().getEditbox();
		var loaded = 0,
			onload = function (name) {
				return function () {
					log(name + ' loaded');
					if (++loaded === Scope.modules.length) {
						if (!$('#sc-start').length) $('span.cke_toolbar_expand').before('<img id="sc-start" src="//raw.github.com/Kangaroopower/Scope/master/util/Replace.png"/>');
						$('#sc-start').click(show);
						log('Loaded: Scope', Scope.version);
					}
				};
			};
		for (var i = 0; i < Scope.modules.length; i++) {
			console.log('loading ', Scope.modules[i].name, '...');
			$.getScript(root+'/modules/'+Scope.modules[i].url, onload(Scope.modules[i].name));
		}
	}

	//Load on edit
	$(load);
});