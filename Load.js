/**
 * Find and Replace 2.5
 * 
 * Creates a Find and Replace Module
 *
 * @author Kangaroopower
 * @Shadow author Pecoes
 *
 */
$('document').ready(function( ) {
  // Don't load twice...
	if ( typeof window.Scope != 'undefined' && typeof window.Frdev == 'undefined') return false;
	
	//Base for functions
	window.Scope = {
		version: "3.0 Dev",
		libraries: {
			'jQueryUI': '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.22/jquery-ui.min.js',
			'TextInputs': 'http://dev.wikia.com/index.php?title=textinputs_jquery.js&action=raw&ctype=text/javascript',
			'Dialog': 'http://kangaroopower.wikia.com/index.php?title=MediaWiki:Scope.js/gui.js&action=raw&ctype=text/javascript'
		},
		modules: {
			'Actions', 'https://raw.github.com/Kangaroopower/FindReplace/master/Actions.js',
			'GUI', 'https://raw.github.com/Kangaroopower/FindReplace/master/Gui.js',
			'Shadow', 'https://raw.github.com/Kangaroopower/FindReplace/master/Shadow.js'
		},
		Shadow: {
			'matches': [],
			'highlighted': -1,
			'nTrav': 0
		}
	};
	//Vars
	var Scope = window.Scope, sctxtarea, sequence = {}, scfind = $('#sc-find').val();

		/* Load editor before everything else (and make sure it's in source mode!)*/
		Scope.load = function () {
			if (window.RTE && RTE.getInstance && RTE.getInstance()) {
				if ('source' === RTE.getInstance().mode) Scope.Sequencer('editor').loaded();
				} else if ('wysiwyg' === RTE.getInstance().mode) {
					$('#sc-shadow, #sc-ui').remove();
					sctxtarea.removeAttr('style');
				} else console.log('Cannot detect editor');
			} else if (window.CKEDITOR) {
				CKEDITOR.on('instanceReady', function () {
					RTE.getInstance().on('wysiwygModeReady',Scope.GUI.close());
					RTE.getInstance().on('sourceModeReady',Scope.Sequencer('editor').loaded());
				});
			} else if (window.WikiaEditor) {
				if (WikiaEditor.getInstance && WikiaEditor.getInstance()) {
					if ('source' === WikiaEditor.getInstance().mode) Scope.Sequencer('editor').loaded();
					} else if ('wysiwyg' === WikiaEditor.getInstance().mode) {
						$('#sc-shadow, #sc-ui').remove();
						sctxtarea.removeAttr('style');
					} else console.log('Cannot detect editor');
				} else if (GlobalTriggers) GlobalTriggers.on('WikiaEditorReady', Scope.Sequencer('editor').loaded());
				else console.log('Cannot detect editor');
			} else console.log('Cannot detect editor');
		};
 
		/* Load libraries before modules */
		Scope.Sequencer('editor').onload(function () {
			sctxtarea = WikiaEditor.getInstance().getEditbox();
			console.log('Scope: Editor Loaded');
			for (var i in Scope.libraries) $.getScript(Scope.libraries[i], console.log('Scope: '+ i +' is ready'));
			Scope.Sequencer('lib').loaded();
			console.log('Loaded: Scope', Scope.version);
		}());

		/* Load modules before script */
		Scope.Sequencer('lib').onload(function () {
			for (var i in Scope.modules) $.getScript(Scope.modules[i], console.log('Scope Module: '+ i +' is ready'));
			$('span.cke_toolbar_expand').before('<a style="cursor:pointer;" onclick="Scope.GUI.initiate();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');	
			console.log('Scope: Modules Loaded');
			Scope.Sequencer('modules').loaded();
			console.log('Loaded: Scope', Scope.version);
		}());

	/* Keyboard Shortcuts- Ctrl + Space to open and close the dialog */
	$(document).keydown(function (e) {
		if (e.which === 32 && e.ctrlKey) {
			e.preventDefault();
			if (document.querySelector('#sc-ui')) Scope.GUI.close();
			else Scope.GUI.initiate();
		}
	});

	if (wgAction === 'edit') $(document).ready(Scope.waitForEditor);
});