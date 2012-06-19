/**
 * Find and Replace 2.0
 * 
 * Creates a Find and Replace Module
 *
 * @author Kangaroopower
 * @Shadow author Pecoes
 *
 * What's new:
 * - Highlight Matches
 * - Just find
 * - Regex vs non Regex
 * - Custom Editbutton
 * - Animations on open/close
 * - MAJOR CODE REWRITE
 * - Keyboard Shortcuts (Ctrl + Space to open/close)
 *
 */
$(function( ) {
	// Don't load twice...
	if ( typeof window.FindReplace != 'undefined' && typeof window.Frdev == 'undefined') {
		return false;
	}
	// Null value to prevent bugs
	var m;
	//Base for functions
	window.FindReplace = {
		version: "2.1.7",
		editorloaded: false,
		TextInputsLoaded: false,
		jQueryUILoaded: false,
		active: false,
		GUI: {},
		Actions: {},
		Shadow: {
			'matches': [],
			'highlighted': -1,
			'regex': null, 
			'replace': null,
			'numTraversed': 0
		}
	};
 
		/* Initialize the script */
		window.FindReplace.init = function () {
			if (skin !== "monobook") {
				$('span.cke_toolbar_expand').before('<a style="cursor:pointer;" onclick="window.FindReplace.GUI.initiate();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');	
			} else {
					$('#toolbar').append('<a style="cursor:pointer;" onclick="window.FindReplace.GUI.initiate();"><img title="Replace" src="http://images2.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png"></a>');
			}
			console.log('Loaded: FindReplace');
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
 
		/* GUI module and actions */
		window.FindReplace.GUI.initiate = function () {
			if (window.FindReplace.active !== true) {
				window.FindReplace.active =  true;
				var popupHTML = '<div id="fr-ui" style="display:none;z-index: 1000;background-color: white;padding: 4px;border: 1px solid rgb(170, 170, 170);border-top-left-radius: 6px;border-top-right-radius: 6px;border-bottom-right-radius: 6px;border-bottom-left-radius: 6px;text-align: left;font-size: 11px;color: black;display: block;position: absolute;top: 244px;left: 207px;" class="ui-draggable"><form action="#" method="get"><div style="font-weight: bold;border-bottom: 1px solid #aaaaaa;padding: 4px;"><span id="fr-title">Find and Replace</span><span style="float:right;text-transform:none;"><a title="Synch textarea contents" style="cursor:pointer;" onclick="window.FindReplace.Actions.find();"><i class="icon-refresh"></i></a>&nbsp;&nbsp;<a style="cursor:pointer;" onclick="window.FindReplace.GUI.close();"><i class="icon-remove"></i></a></span></div><div><div style="display: inline-block;padding: 4px;vertical-align: middle;"><div style="margin: 4px auto;"><div style="display: inline-block;width: 4em;">Find:</div><input id="fr-find-text" size="60" type="text"></div><div style="margin: 4px auto;"><div style="display: inline-block;width: 4em;">Replace:</div><input id="fr-replace-text" size="60" type="text" style="background-color: rgb(255, 255, 255);"></div><div style="margin: 14px auto 0;">Case Sensitive<input id="fr-cs" checked="" style="position: relative; top: 3px; " type="checkbox">&nbsp; | &nbsp;Regex<input id="fr-reg" style="position: relative; top: 3px; " type="checkbox"></div></div><div style="display: inline-block;padding: 4px;width: 110px;vertical-align: middle;"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="fr-replace" type="button" onclick="window.FindReplace.Actions.evaluate()" value="Replace"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="fr-replace-all" type="button" onclick="window.FindReplace.Actions.evaluate(\'rall\')" value="Replace All"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="fr-find-prev" type="button" onclick="window.FindReplace.Shadow.prev();" value="Find Previous"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="fr-find-next" type="button" onclick="window.FindReplace.Shadow.next();" value="Find Next"></div></div><div id="fr-status" style="text-align:center; font-weight: bold;border-top: 1px solid #aaaaaa;padding: 4px;">&nbsp;</div></form></div>';
				$( '#editform' ).prepend(popupHTML);
				$('#fr-ui').show('clip', 180);
				$('#fr-ui').css({left: 0, top: 0});
				window.FindReplace.GUI.waitForJQueryUI();
				$('input#fr-find-text').keyup(window.FindReplace.Actions.find);
				$('input#fr-cs').click(window.FindReplace.Actions.find);
				$('#fr-find-text').focus();
				window.FindReplace.Shadow.init();
				if (window.FindReplace.active !== false) {
					document.getElementById('fr-find-text').value = window.FindReplace.GUI.getSelected();
				}
			}
		};
 
		window.FindReplace.GUI.getSelected = function () {
			$('textarea')[0].focus();
			var sel = window.getSelection();
			return sel;
		};
 
		window.FindReplace.GUI.close = function () {
			$('#fr-ui').hide('clip', 200);
			window.FindReplace.active = false;
			window.FindReplace.Shadow.regex = null;
			window.FindReplace.Shadow.synch(); 
		};
 
		window.FindReplace.GUI.waitForJQueryUI = function() {
			if ('undefined' === typeof $('#fr-ui').draggable) {
				window.setTimeout(function () { window.FindReplace.GUI.waitForJQueryUI(); }, 200);
				return;
			}
			$('#fr-ui').draggable();
		};
 
		// Find and Replace Module
		window.FindReplace.Actions.replaceall = function (reg) {
			var txtoreplace = $('#fr-replace-text').val(),
				thematches = $('textarea')[0].value.match(reg).length;
			$('textarea')[0].value = $('textarea')[0].value.replace(reg, txtoreplace);
			if (thematches != "undefined") {
				$("#fr-status").html( thematches+' replacement(s) made!');
			} else {
				$("#fr-status").html( 'No replacements made!');
			}
		};
 
		window.FindReplace.Actions.replaceone = function (reg) {
			var txtoreplace = $('#fr-replace-text').val(),
				thematches =  $('textarea')[0].value.match(reg).length;
			$('textarea')[0].value = $('textarea')[0].value.replace(reg, txtoreplace);
			if (thematches != "undefined") {
				$("#fr-status").html('One replacement made');
			} else {
				$("#fr-status").html('No replacements made!');
			}	
		};
 
		window.FindReplace.Actions.find = function () {
			var regex,
				rawtxtofind = $('#fr-find-text').val();
			if (rawtxtofind !== "") {
				if ($('input#fr-reg').is(':checked')) {
					if ($('input#fr-cs').is(':checked')) {
						regex = RegExp(rawtxtofind, 'g');
					} else {
						regex = RegExp(rawtxtofind,'ig');
					}
				} else {
					if ($('input#fr-cs').is(':checked')) {
						regex = RegExp(window.FindReplace.Actions.escape(rawtxtofind), 'g');
					} else {
						regex = RegExp(window.FindReplace.Actions.escape(rawtxtofind),'ig');
					}				
				}
			} else {
				regex = null;
			}
			$('#fr-find-prev').attr('disabled', null === regex);
			$('#fr-find-next').attr('disabled', null === regex);
			window.FindReplace.Shadow.regex = regex;
			window.FindReplace.Shadow.synch();
		};
 
		window.FindReplace.Actions.evaluate = function (rall) {
			var regex,
				rawtxtofind = $('#fr-find-text').val();
			if ($('input#fr-reg').is(':checked')) {
				if (rall != undefined) {
					if ($('input#fr-cs').is(':checked')) {
						regex = RegExp(rawtxtofind, 'g');
						window.FindReplace.Actions.replaceall(regex);
					} else {
						regex = RegExp(rawtxtofind,'ig');
						window.FindReplace.Actions.replaceall(regex);
					}					
				} else {
					if ($('input#fr-cs').is(':checked')) {
						regex = RegExp(rawtxtofind);
						window.FindReplace.Actions.replaceone(regex);
					} else {
						regex = RegExp(rawtxtofind,'i');
						window.FindReplace.Actions.replaceone(regex);
					}					
				}
			} else {
				var txtofind = window.FindReplace.Actions.escape(rawtxtofind);
				if (rall != undefined) {
					if ($('input#fr-cs').is(':checked')) {
						regex = RegExp(txtofind, 'g');
						window.FindReplace.Actions.replaceall(regex);
					} else {
						regex = RegExp(txtofind, 'ig');
						window.FindReplace.Actions.replaceall(regex);
					}
				} else {
					if ($('input#fr-cs').is(':checked')) {
						regex = RegExp(txtofind);
						window.FindReplace.Actions.replaceone(regex);
					} else {
						regex = RegExp(txtofind, 'i');
						window.FindReplace.Actions.replaceone(regex);
					}
				}				
			}
		};
 
		window.FindReplace.Actions.escape = function (s) {
			return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
		};
 
		/* Shadow Module */
		window.FindReplace.Shadow.init = function () {
			WikiaEditor.getInstance().getEditbox().after('<div id="fr-shadow" style="width: 100%; left: 0px; top: 0px; border: 0px none; display: block; outline: none medium; margin: 0px; padding: 0px; resize: none; position: absolute; z-index: 0; font-family: Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace; font-size: 14px; line-height: normal; white-space: pre-wrap; background-color: transparent; color: transparent; overflow: auto; height: 529px; "></div>');
			var commonCSS = {
				width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
				outline: 'medium none', margin: 0, padding: 0, resize: 'none'
			};
			WikiaEditor.getInstance().getEditbox().css(commonCSS).css({
				position: 'relative', zIndex: '1',
				backgroundColor: 'transparent'
			});
			WikiaEditor.getInstance().getEditbox().scroll(function () {
				$('#fr-shadow').scrollTop(WikiaEditor.getInstance().getEditbox().scrollTop());
			});
			WikiaEditor.getInstance().getEditbox().focus();
			WikiaEditor.getInstance().getEditbox().keyup (window.FindReplace.Shadow.synch);
			WikiaEditor.getInstance().getEditbox().click (window.FindReplace.Shadow.synch);
			window.FindReplace.Shadow.synch();
		};
 
		window.FindReplace.Shadow.synch = function() {
			console.log('synching');
			window.FindReplace.Shadow.matches = [];
			if (window.FindReplace.Shadow.regex instanceof RegExp) {
				var s = WikiaEditor.getInstance().getEditbox().val();
				window.FindReplace.Shadow.regex.lastIndex = 0;
				while (m = window.FindReplace.Shadow.regex.exec(s)) {
					window.FindReplace.Shadow.matches.push({
						found: m[0], index: m.index, traversed: false
					});
					window.FindReplace.Shadow.regex.lastIndex = m.index + m[0].length;
				}
				$('#fr-status').html('found ' + window.FindReplace.Shadow.matches.length + ' matches');
			} else {
				$('#fr-status').html('&nbsp;');
			}
			$('#fr-shadow').html(function () {
				var s = WikiaEditor.getInstance().getEditbox().val();
				var r = '';
				for (var i = 0, start = 0; i < window.FindReplace.Shadow.matches.length; i++) {
					r += s.substr(start, window.FindReplace.Shadow.matches[i].index - start);
					start = window.FindReplace.Shadow.matches[i].index + window.FindReplace.Shadow.matches[i].found.length;
					r += '<span id="fr' + i + '" style="background-color:#700066;">' + window.FindReplace.Shadow.matches[i].found + '</span>';
				}
				if (s.substr(start+1).length > 0) {
					r += s.substr(start+1);
				}
				return r.length ? r : s;
			});
			$('#fr-shadow').css('height', WikiaEditor.getInstance().getEditbox());
			$('#fr-shadow').scrollTop(WikiaEditor.getInstance().getEditbox().scrollTop());
		};
 
		window.FindReplace.Shadow.highlight = function(high) {
			if (-1 !== window.FindReplace.Shadow.highlighted) {
				$('#fr' + window.FindReplace.Shadow.highlighted).css({backgroundColor:'#700066'});
			}
			$('#fr' + high).css({backgroundColor:'#0000FF'});
			window.FindReplace.Shadow.highlighted = high;
			WikiaEditor.getInstance().getEditbox().setSelection(window.FindReplace.Shadow.matches[high].index, window.FindReplace.Shadow.matches[high].index + window.FindReplace.Shadow.matches[high].found.length);
			if (window.FindReplace.Shadow.numTraversed === window.FindReplace.Shadow.matches.length) {
				for (var i = 0; i < window.FindReplace.Shadow.matches.length; i++) window.FindReplace.Shadow.matches[i].traversed = false;
				window.FindReplace.Shadow.numTraversed = 0;
			}
			if (!window.FindReplace.Shadow.matches[high].traversed) {
				window.FindReplace.Shadow.matches[high].traversed = true;
				window.FindReplace.Shadow.numTraversed++;
				$('#fr-status').html('match ' + window.FindReplace.Shadow.numTraversed + ' of ' + window.FindReplace.Shadow.matches.length);
			} 
		};
 
		window.FindReplace.Shadow.next = function  () {
			if (!window.FindReplace.Shadow.matches.length) return;
			WikiaEditor.getInstance().getEditbox().focus();
			var n = 0;
			var sel = WikiaEditor.getInstance().getEditbox().getSelection();
			for (var i = 0; i < window.FindReplace.Shadow.matches.length; i++) {
				if (sel.end < window.FindReplace.Shadow.matches[i].index + window.FindReplace.Shadow.matches[i].found.length) {
					n = i;
					break;
				}
			}
			window.FindReplace.Shadow.highlight(n);
		};
 
		window.FindReplace.Shadow.prev = function  () {
			if (!window.FindReplace.Shadow.matches.length) return;
			WikiaEditor.getInstance().getEditbox().focus();
			var p = window.FindReplace.Shadow.matches.length-1;
			var sel = WikiaEditor.getInstance().getEditbox().getSelection();
			for (var i = window.FindReplace.Shadow.matches.length-1; i >= 0; i--) {
				if (sel.start > window.FindReplace.Shadow.matches[i].index) {
					p = i;
					break;
				}
			}
			window.FindReplace.Shadow.highlight(p);
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