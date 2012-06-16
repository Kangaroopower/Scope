$('document').ready(function( ) {
  // Don't load twice...
	if ( typeof window.FindReplace != 'undefined' && typeof window.Frdev == 'undefined') {
		return false;
	}
	//Base for functions
	window.FindReplace = {
		version: "2.29.9.9.7 Dev"
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
					$('#toolbar').append('<a href="#" onclick="window.FindReplace.GUI.initiate();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');
				}
			}
		};

		window.FindReplace.registerModule = function (module) {
			window.FindReplace.modules.push(module); 
		};
		
	$(document).ready(window.FindReplace.init);
 
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
	if (window.FindReplace.active === true) {
		$('input#fr-find-text').keyup(function (e) {
			e.preventDefault();
			window.FindReplace.Actions.find();
			// when Enter/Return are hit start a search:
			if (!e.ctrlKey && (10 === e.which || 13 === e.which) && $(this).val().length) {
				window.FindReplace.Shadow.next();
			} else {
				$(this).focus();
			}
		});
	}
});