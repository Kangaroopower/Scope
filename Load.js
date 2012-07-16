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
	if ( typeof window.Scope != 'undefined' && typeof window.Frdev == 'undefined') {
		return false;
	}
	//Base for functions
	window.Scope = {
		version: "2.25.8 Dev",
		editorloaded: false,
		librariesready: false,
		libraries: {
			'jQueryUI': 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js',
			'TextInputs': 'http://dev.wikia.com/index.php?title=textinputs_jquery.js&action=raw&ctype=text/javascript'
		},
		modulesReady: false,
		modules: {},
		active: false
	};
	var Scope = window.Scope;

		/* Initialize the script */
		Scope.init = function () {
			if (skin !== "monobook") {
				$('span.cke_toolbar_expand').before('<a style="cursor:pointer;" onclick="Scope.GUI.initiate();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');	
			} else {
				$('#toolbar').append('<a style="cursor:pointer;" onclick="Scope.GUI.initiate();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');
			}
			console.log('Loaded: Scope');
		};


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
				importStylesheetURI('http://kangaroopower.x10.mx/css/font-awesome.css');
				Scope.librariesready = true;
				window.setTimeout(function () {
					console.log('Scope: waiting for libraries...');
						Scope.loadLibraries();
				}, 500);				
			} else {
				Scope.init();
				console.log('Scope: Libraries Loaded');
			}
		};

		Scope.loadModules = function () {
			var Shadowready, GUIready, Actionsready;
			if (Scope.modulesReady !== true) {
				$.getScript('https://raw.github.com/Kangaroopower/FindReplace/master/Actions.js', function () {
					console.log('FindReplace Module: Actions is ready');
					Actionsready =  true;
				});
				$.getScript('https://raw.github.com/Kangaroopower/FindReplace/master/Gui.js', function () {
					console.log('FindReplace Module: GUI is ready');
					GUIready = true;
				});
				$.getScript('https://raw.github.com/Kangaroopower/FindReplace/master/Shadow.js', function () {
					console.log('FindReplace Module: Shadow is ready');
					Shadowready = true;
				});
				if (Actionsready === true && GUIready === true && Shadowready === true) {
					Scope.modulesReady = true;
				}
				window.setTimeout(function () {
					console.log('waiting for modules...');
						Scope.loadModules();
				}, 500);
			} else {
				Scope.init();
			}
		};

		Scope.registerModule = function (module, data) {
			Scope.modules[module] = data;
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