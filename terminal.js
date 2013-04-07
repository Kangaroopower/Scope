/*global mw:true, WikiaEditor:true, CKEDITOR:true, RTE:true, GlobalTriggers:true */
/**
 * Scope 3.0 Terminal
 * 
 * Creates a Find and Replace Terminal
 *
 * @author Kangaroopower
 *
 */
(function () {

	//Meta Vars
	var sctxt, undotext = '', version = "3.11 Terminal";

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
				RTE.getInstance().on('wysiwygModeReady', $('#sc-terminal').remove());
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
		if ($('#sc-terminal').length) return $('#sc-terminal').remove();
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
		var tokenized = $('#sc-text').val().split('/');
		if (tokenized[0].toLowerCase() === "#sanitize") {
			//escaping: courtesy of http://stackoverflow.com/questions/3446170/
			var escaped = tokenized[1].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
				secondsplit = tokenized[3].split(' ');
			//you skip an array piece for the replace because you want a "with" to be in between
			//eg: /a/ig with b
			replace(new RegExp(escaped, $.trim(secondsplit[0])), secondsplit[2]); 
		} else {
			var secondsplit = tokenized[2].split(' ');
			replace(new RegExp(tokenized[1], $.trim(secondsplit[0])), secondsplit[2]);
		}	
	}
 
	/* Does the replace */
	function replace (regex, rtxt) {
		undotext = sctxt.val();
		var count = sctxt.val().match(regex).length;
		sctxt.val(sctxt.val().replace(regex, rtxt));
		$("#sc-tcount").html('Done! '+ count + ' replacement(s) made!');
		if (!$('#sc-tundo').length) $('#sc-terminal').append('<img id="sc-tundo" style="height:20px;cursor:pointer;vertical-align:middle" src="//raw.github.com/Kangaroopower/Scope/master/pics/undo.png">');
		$('#sc-tundo').click(function () {
			sctxt.val(undotext);
			$("#sc-tcount").html('Undone!');
			$('#sc-tundo').remove();
		});
	}

	//Load on edit
	$(editor);
}());