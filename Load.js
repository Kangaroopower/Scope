/**
 * Find and Replace 3.0
 * 
 * Creates a Find and Replace Module
 *
 * @author Kangaroopower
 * @Shadow author Pecoes
 *
 */
$('document').ready(function( ) {

	//Base for functions
	window.Scope = {
		version: "3.0 Dev",
		libraries: {
			'TextInputs': '/Kangaroopower/Scope/master/Rangy.js',
			'Dialog': '/Kangaroopower/Scope/master/Dialog.js',
		},
		modules: {
			'Actions', '/Kangaroopower/Scope/master/Actions.js',
			'GUI', '/Kangaroopower/Scope/master/Gui.js',
			'Shadow', '/Kangaroopower/Scope/master/Shadow.js'
		}
	};
	
	//Vars
	var Scope = window.Scope, sctxtarea, sel, scfind = $('#sc-find').val();


	/* Controls loading process */
	(function (ns) {
		var subs, sequence = {};
		$.fn.extend({
			sub: function (topic, callback) {
				if (!subs[topic]) subs[topic] = [];
				subs[topic].push({
					subscriber: this,
					callback: callback
				});
				return this;
			},
			pub: function (topic) {
				var parameters = [];
				for (var i = 1; i < arguments.length; i++) parameters.push(arguments[i]);
				subs[topic] && $.each(subs[topic], this.callback.apply(this.subscriber, parameters));
			}
		});
		ns.Sequencer = function (name) {
			if (!sequence[name]) {
				var callbacks = $.Callbacks('memory unique');
				sequence[name] = {
					loaded: callbacks.fire,
					onload: callbacks.add
				}
			}
			return sequence[name];
		};
	})(Scope);

	/* Load editor before everything else (and make sure it's in source mode!)*/
	Scope.Sequencer('doc').onload(function () {
		if (window.RTE && RTE.getInstance && RTE.getInstance()) {
			if ('source' === RTE.getInstance().mode) Scope.Sequencer('editor').loaded();
			else if (RTE.getInstance().mode === 'wysiwyg') {
				$('#sc-shadow, #sc-ui').remove();
				sctxtarea.removeAttr('style');
			} else console.log('Cannot detect editor');
		} else if (window.CKEDITOR) {
			CKEDITOR.on('instanceReady', function () {
				RTE.getInstance().on('wysiwygModeReady', function () {
					$('#sc-shadow, #sc-ui').remove();
					sctxtarea.removeAttr('style');
				});
				RTE.getInstance().on('sourceModeReady',Scope.Sequencer('editor').loaded());
			});
		} else if (window.WikiaEditor) {
			if (WikiaEditor.getInstance && WikiaEditor.getInstance()) {
				if ('source' === WikiaEditor.getInstance().mode) Scope.Sequencer('editor').loaded();
				else if ('wysiwyg' === WikiaEditor.getInstance().mode) {
					$('#sc-shadow, #sc-ui').remove();
					sctxtarea.removeAttr('style');
				} else console.log('Cannot detect editor');
			} else if (GlobalTriggers) GlobalTriggers.on('WikiaEditorReady', Scope.Sequencer('editor').loaded());
			else console.log('Cannot detect editor');
		} else console.log('Cannot detect editor');
	}());

	/* Load libraries before actual script */
	Scope.Sequencer('editor').onload(function () {
		sctxtarea = WikiaEditor.getInstance().getEditbox();
		sel = sctxtarea.getSelection();
		console.log('Scope: Editor Loaded');
		for (var i in Scope.libraries) $.getScript(Scope.libraries[i], console.log('Scope: '+ i +' is ready'));
		Scope.Sequencer('lib').loaded();
		console.log('Loaded: Scope', Scope.version);
	}());

	/* Load modules before script */
	Scope.Sequencer('lib').onload(function () {
		for (var i in Scope.modules) $.getScript(Scope.modules[i], console.log('Scope Module: '+ i +' is ready'));
		$('span.cke_toolbar_expand').before('<img style="cursor:pointer;" id="sc-start" src="https://raw.github.com/Kangaroopower/Scope/master/Replace.png"/>');
		$('#sc-start').click($.pub('open'));
		console.log('Loaded: Scope', Scope.version);
	}());

	//Load the program but only on edit
	if (wgAction === 'edit') $(Scope.Sequencer('doc').loaded);
});