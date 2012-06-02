$('document').ready(function( ) {
  // Don't load twice...
	if ( typeof window.FindReplace != 'undefined' && typeof window.Frdev == 'undefined') {
		return false;
	}
	//Base for functions
	window.FindReplace = {
		version: "2.28.5 Dev"
		modules: [],
		active: false
	};
 
		/* Initialize the script */
		window.FindReplace.init = function () {
			importScriptURI('//ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js');
			importScriptPage('textinputs_jquery.js', 'dev');
			if (wgAction === "edit") {
				if (skin !== "monobook") {
					$('span.cke_toolbar_expand').before('<a href="#" onclick="window.FindReplace.GUI.initiate();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');	
				} else {
					$('#toolbar').after('<a href="#" onclick="window.FindReplace.GUI.initiate();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');
				}
			}
		};

		window.FindReplace.registerModule = function (module) {
			window.FindReplace.modules.push(module); 
		};
		
	$(document).ready(window.FindReplace.init);
});