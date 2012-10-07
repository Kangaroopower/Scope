/*global mw:true, WikiaEditor:true, CKEDITOR:true, RTE:true, GlobalTriggers:true */
/**
 * Scope 3.0 Terminal
 * 
 * Creates a Find and Replace Terminal
 *
 * Notes:
 *		- Just an experriment.
 * 		- In Alpha
 *
 * @author Kangaroopower
 *
 */
(function () {

	//Meta Vars
	var sctxt, undotext = null, version = "3.0 Terminal";

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
		if (!$('#sc-terminal-start').length) $('span.cke_toolbar_expand').before('<img id="sc-terminal-start" src="//raw.github.com/Kangaroopower/Scope/master/util/Replace.png"/>');
		$('#sc-terminal-start').click(show);
		log('Loaded version:', version);
	}
 
	/* Opens and sets up gui */
	function show () {
		if ('')
		log('opening dialog');
		if ($('#sc-terminal').length) return $('#sc-terminal').remove();
		$('.cke_toolbar_expand').after('<div id="sc-terminal" style="z-index: 1001;"><table cellspacing="0"><tbody><tr><td><table cellspacing="0"><tbody><tr><td style="padding-bottom: 5px;"><table cellpadding="0" cellspacing="0" style="border-radius: 4px;background: white;border: 1px solid #D9D9D9;border-top: 1px solid silver;padding: 0 8px;width: 598px;"><tbody><tr><td><input type="text" id="sc-text" placeholder="Find and Replace..." style="width: 390px;border: none!important;height: 20px;outline: none!important;border-radius: 4px;"></td><td id="sc-tcount" style="max-width: 300px;overflow: hidden;padding-right: 2px;text-align: right;"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div>');
		$('#sc-text').keydown(function (e) {
			if(e.which === 13) {
				e.preventDefault();
				evaluate();
			}
		});
	}
 

	/* Parses input from "terminal" */
	function evaluate () {
		if ($('#sc-text').val() === '#undo') {
			if (undotext === null) {
				$('#sc-tcount').html('Could not perform undo');
			} else {
				sctxt.val(undotext);
				undotext = null;
			}
		} else {
			var tokenized = $('#sc-text').val().split('  '); //Temporary ugly solution
			for (var i = 0; i < tokenized.length; i++) {
				tokenized = tokenized[i].replace(/__/ig, '  ');
			}
			if (tokenized[0] === "#SANITIZE") {
				replace(new RegExp(tokenized[1].replace(/\[\-[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), (tokenized[2] || 'g')), tokenized[4]);
			} else {
				replace(new RegExp(tokenized[0], (tokenized[1] || 'g')), tokenized[3]);
			}
		}	
	}
 
	/* Does the replace */
	function replace (regex, rtxt) {
		undotext = sctxt.val();
		sctxt.val(sctxt.val().replace(regex, rtxt));
		$("#sc-tcount").html('Done!').attr('title', sctxt.val().match(evaluate()).length + ' replacement(s) made!');
	}

	//Load on edit
	$(editor);
}());