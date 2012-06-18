/**
 * Find and Replace 2.0
 * 
 * Creates a Find and Replace Module
 *
 * @author Kangaroopower
 * @Shadow author Pecoes
 *
 * Adapt loadlibrary for modules
 */
$('document').ready(function( ) {
  // Don't load twice...
	if ( typeof window.FindReplace != 'undefined' && typeof window.Frdev == 'undefined') {
		return false;
	}
	//Base for functions
	window.FindReplace = {
		version: "2.1.5",
		editorloaded: false,
		TextInputsLoaded: false,
		jQueryUILoaded: false,
		modules: [],
		active: false
	};
 
		/* Initialize the script */
		window.FindReplace.init = function () {
			if (skin !== "monobook") {
				$('span.cke_toolbar_expand').before('<a href="#" onclick="window.FindReplace.GUI.initiate();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');	
			} else {
					$('#toolbar').append('<a href="#" onclick="window.FindReplace.GUI.initiate();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');
			}
			console.log('Loaded: FindReplace');
			importScriptURI('https://raw.github.com/Kangaroopower/FindReplace/master/Actions.js');
			importScriptURI('https://raw.github.com/Kangaroopower/FindReplace/master/Gui.js');
			importScriptURI('https://raw.github.com/Kangaroopower/FindReplace/master/Shadow.js');

		};


		window.FindReplace.waitForEditor = function () {
			if (wgAction === "edit" ) {
				if (typeof (WikiaEditor || WikiaEditor.getInstance || WikiaEditor.getInstance ||WikiaEditor.getInstance() || WikiaEditor.getInstance().mode) == 'undefined'  ||WikiaEditor.getInstance().mode !== 'source') {
					window.setTimeout(function () {
						console.log('waiting for editor...');
							window.FindReplace.waitForEditor();
						}, 500);
					return;
				} else {
					window.FindReplace.editorloaded = true;
					window.FindReplace.loadLibraries();
				}
			}
		};

		window.FindReplace.loadLibraries =  function () {
			if (window.FindReplace.jQueryUILoaded !== true && window.FindReplace.TextInputsLoaded !== true) {
				$.getScript('http://dev.wikia.com/index.php?title=textinputs_jquery.js&action=raw&ctype=text/javascript', function () {
					console.log('FindReplace: Textinputs is ready');
					window.FindReplace.TextInputsLoaded =  true;
				});
				$.getScript('https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js', function () {
					console.log('FindReplace: Jquery UI is ready');
					window.FindReplace.jQueryUILoaded = true;
				});
				importStylesheetURI('http://kangaroopower.x10.mx/css/font-awesome.css');
				window.setTimeout(function () {
					console.log('waiting for libraries...');
						window.FindReplace.loadLibraries();
				}, 500);				
			} else {
				window.FindReplace.init();
			}
		};

		window.FindReplace.registerModule = function (module) {
			window.FindReplace.modules.push(module); 
		};
 
	var isCtrl = false;
	$(document).keyup(function (e) {
		if(e.which === 17) { 
			isCtrl = false;
		}
	}).keydown(function (e) {
		if(e.which === 17) { 
			isCtrl = true;
		}
		if(e.which === 32 && isCtrl === true) {
			if (window.FindReplace.active === true) {
				window.FindReplace.GUI.close();
			} else {
				window.FindReplace.GUI.initiate();
			}
		}
	});

	if (wgAction === 'edit') $(document).ready(window.FindReplace.waitForEditor);
});