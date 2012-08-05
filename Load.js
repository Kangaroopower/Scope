/**
 * Find and Replace 2.0
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
		version: "2.63.2 Dev",
		editorloaded: false,
		librariesready: false,
		libraries: {
			'jQueryUI': 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js',
			'TextInputs': 'http://dev.wikia.com/index.php?title=textinputs_jquery.js&action=raw&ctype=text/javascript'
		},
		modulesReady: false,
		modules: {
			'Actions', 'https://raw.github.com/Kangaroopower/FindReplace/master/Actions.js',
			'GUI', 'https://raw.github.com/Kangaroopower/FindReplace/master/Gui.js',
			'Shadow', 'https://raw.github.com/Kangaroopower/FindReplace/master/Shadow.js'
		},
		active: false
	};
	var Scope = window.Scope;

		Scope.waitForEditor = function () {
			if (wgAction === "edit" && wgCanonicalNamespace !== ("Message_Wall" || "Thread") ) {
				if (typeof (WikiaEditor || WikiaEditor.getInstance || WikiaEditor.getInstance ||WikiaEditor.getInstance() || WikiaEditor.getInstance().mode) == 'undefined'  ||WikiaEditor.getInstance().mode !== 'source') {
					window.setTimeout(function () {
						console.log('waiting for editor...');
							Scope.waitForEditor();
						}, 500);
					return;
				} else {
					Scope.editorloaded = true;
					Scope.loadLibraries();
					console.log('Scope: Editor Loaded');
				}
			}
		};
 
		Scope.loadLibraries =  function () {
			if (Scope.librariesready !== true) {
				for (var i in Scope.libraries) {
					$.getScript(Scope.libraries[i], function () {
						console.log('Scope: '+ i +' is ready');
					});
				}
				Scope.librariesready = true;
				window.setTimeout(function () {
					console.log('Scope: waiting for libraries...');
						Scope.loadLibraries();
				}, 500);				
			} else {
				Scope.loadModules();
				console.log('Scope: Libraries Loaded');
			}
		};

		Scope.loadModules = function () {
			var Shadowready, GUIready, Actionsready;
			if (Scope.modulesReady !== true) {
				for (var i in Scope.modules) {
					$.getScript(Scope.modules[i], function () {
						console.log('Scope Module: '+ i +' is ready');
					});
				}
				Scope.modulesReady = true;
				window.setTimeout(function () {
					console.log('waiting for modules...');
					Scope.loadModules();
				}, 500);
			} else {
				$('span.cke_toolbar_expand').before('<a style="cursor:pointer;" onclick="Scope.GUI.initiate();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');	
				console.log('Scope: Modules Loaded');
				console.log('Loaded: Scope');
			}
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
			e.preventDefault();
			if (Scope.active === true) {
				Scope.GUI.close();
			} else {
				Scope.GUI.initiate();
			}
		}
	});

	if (wgAction === 'edit') $(document).ready(Scope.waitForEditor);
});