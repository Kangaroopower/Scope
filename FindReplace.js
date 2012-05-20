$('document').ready(function( ) {
  // Don't load twice...
	if ( typeof window.FindReplace != 'undefined' && typeof window.Frdev == 'undefined') {
		return false;
	}
	//Base for functions
	window.FindReplace = {
		version: "2.1.9 Dev",
		modules: [],
		active: false
	};
 
		/* Initialize the script */
		window.FindReplace.init = function () {
			importScriptURI('//ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js');
			importScriptPage('textinputs_jquery.js', 'dev');
			if (wgAction === "edit") {
					if ($('div#cke_toolbar_source_1') {
						$('div#cke_toolbar_source_1 > *:last').before('<a href="#" onclick="window.FindReplace.GUI.open();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');
					} else if($('div#toolbar')) {
						$('div#toolbar > *:last').before('<a href="#" onclick="window.FindReplace.GUI.open();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');
					} else {
						break;
					}
			}
		};

		window.FindReplace.registerModule = function (module) {
			window.FindReplace.modules.push(module); 
		};
});