/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, regexp:false, strict:true, trailing:false, maxcomplexity:10 */
/*global mw:true, WikiaEditor:true, CKEDITOR:true, RTE:true, GlobalTriggers:true */
/**
 * Scope 3.0 Terminal
 * 
 * Creates a Find and Replace Terminal
 * 
 * CURRENTLY NOT WORKING
 *
 * @author Kangaroopower
 *
 */
(function () {
	
	'use strict';

	//Meta Vars
	var sctxt, undotext = '', version = "3.12 Terminal";

	/* Logs stuff */
	var log = (window.console && function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('Scope Terminal:');
		return window.console.log.apply(window.console, args);
	}) || $.noop;

	/* Check if editor has loaded */
	function editor () {
		log('doc');
		if (mw.config.get('wgAction') !== 'edit'  && [1200,1201].indexOf(mw.config.get('wgNamespaceNumber')) !== -1 ) return;
		if (window.RTE && RTE.getInstance && RTE.getInstance()) {
			if (RTE.getInstance().mode === 'source') setup();
			else if(RTE.getInstance().mode === 'wysiwyg') $('#sc-terminal').remove();
			else log('Cannot detect editor');
		} else if (window.CKEDITOR) {
			CKEDITOR.on('instanceReady', function () {
				RTE.getInstance().on('wysiwygModeReady', function () {
					$('#sc-terminal').remove();
				});
				RTE.getInstance().on('sourceModeReady', setup);
			});
		} else if (window.WikiaEditor) {
			if (WikiaEditor.getInstance && WikiaEditor.getInstance()) {
				if (WikiaEditor.getInstance().mode === 'source') setup();
				else $('#sc-terminal').remove();
			} else if (GlobalTriggers) GlobalTriggers.on('WikiaEditorReady', setup);
			else log('Cannot detect editor');
		} else log('Cannot detect editor');
	}
 
	/* Set up script */
	function setup () {
		log('Editor Loaded');
		sctxt = WikiaEditor.getInstance().getEditbox();
		if (!$('#sc-terminal-start').length) $('span.cke_toolbar_expand').before('<img title="Scope Terminal" style="cursor:pointer;" id="sc-terminal-start" src="//raw.github.com/Kangaroopower/Scope/master/pics/Replace.png"/>');
		$('#sc-terminal-start').click(show);
		log('Loaded version:', version);
	}
 
	/* Opens and sets up gui */
	function show () {
		log('opening dialog');
		 if ($('#sc-terminal').length) {
			$('#sc-terminal').remove();
			return;
		 }
		$('span.cke_toolbar_expand').after('<div id="sc-terminal" style="z-index: 1001;padding-bottom: 5px;padding-top: 5px;"><input type="text" id="sc-text" placeholder="Find and Replace..." style="border-radius: 4px;background: white;border: 1px solid #D9D9D9;border-top: 1px solid silver;padding: 0 8px;width: 390px;height: 20px;outline: none!important;"><span id="sc-tcount" style="padding-left: 10px;"></span></div>');
		$('#sc-text').keydown(function (e) {
			if(e.which === 13) {
				e.preventDefault();
				evaluate();
			}
		});
	}

	/* Parses input from "terminal" */
	function evaluate () {
		$("#sc-text").css({"background-color": "white"});
		$("#sc-tcount").html("");

		var split1 = [], temp = [], split2, v = $('#sc-text').val();

		var index = v.indexOf("/"), revs = 0;

		while (index !== -1 && revs <= 2) {
			if (v.charAt(index - 1) !== "\\") {
				if (revs === 0) {
					split1.push(v.substring(0, index));
					index = index + 1;
				}
				if (revs === 1) {
					split1.push(v.substring(index, v.indexOf("/", index)));
					index = v.indexOf("/", index) + 1;
				}
				if (revs === 2) {
					split1.push(v.substring(index));
					index = -1
				}
				revs++;
			}
		}

        temp = split1;

		if ($("#sc-text").val().toLowerCase() === "#undo") {
			undo();
			undotext = sctxt.val();
			return;
		}

		if (typeof split1[1] === "undefined") {
			$("#sc-text").css({"background-color": "#f2dede"});
			$("#sc-tcount").html("Input Error");
			return false;
		}

		split2 = (temp[0].toLowerCase() === '#sanitize') ? temp[3].split(' ') : temp[2].split(' ');

		if (!/with/ig.test(v) || !/^\/.+\/(i|g|m)*$/.test("/" + split1[1] + "/" + $.trim(split2[0]))) {
			$("#sc-text").css({"background-color": "#f2dede"});
			$("#sc-tcount").html("Input Error");
			return false;
		}

		if ($.trim(split1[0].toLowerCase()) === '#sanitize') {
			//escaping: courztesy of http://stackoverflow.com/questions/3446170/
			var escaped = split1[1].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
			//you skip an array piece for the replace because you want a 'with' to be in between
			//eg: /a/ig with b
			replace(new RegExp(escaped, $.trim(split2[0])), split2[2]); 
		} else {
			replace(new RegExp(split1[1], $.trim(split2[0])), split2[2]);
		}	
	}

	/* Does undos */
	function undo () {
		sctxt.val(undotext);
		$("#sc-tcount").html('Undone!');
	}
 
	/* Does the replace */
	function replace (regex, rtxt) {
		var count = sctxt.val().match(regex).length;
		
		undotext = sctxt.val();
		sctxt.val(sctxt.val().replace(regex, rtxt));
		
		$("#sc-tcount").html('Done! '+ count + ' replacement(s) made!');
		if (!$('#sc-tundo').length) $('#sc-terminal').append('<img id="sc-tundo" style="height:20px;cursor:pointer;vertical-align:middle" src="//raw.github.com/Kangaroopower/Scope/master/pics/undo.png">');
		$('#sc-tundo').click(function () {
			undo();
			$('#sc-tundo').remove();
		});
	}

	//Load on edit
	$(editor);
}());