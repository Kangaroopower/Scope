/* GUI */
window.FindReplace.GUI.initiate = function () {
	if (window.FindReplace.active !== true) {
		window.FindReplace.active =  true;
		var popupHTML = '<div id="fr-ui" style="display:none;z-index: 1000;background-color: white;padding: 4px;border: 1px solid rgb(170, 170, 170);border-top-left-radius: 6px;border-top-right-radius: 6px;border-bottom-right-radius: 6px;border-bottom-left-radius: 6px;text-align: left;font-size: 11px;color: black;display: block;position: absolute;top: 244px;left: 207px;" class="ui-draggable"><form action="#" method="get"><div style="font-weight: bold;border-bottom: 1px solid #aaaaaa;padding: 4px;"><span id="fr-title">Find and Replace</span><span style="float:right;text-transform:none;"><a title="Synch textarea contents" href=#" onclick="window.FindReplace.Actions.find();"><i class="icon-refresh"></i></a>&nbsp;&nbsp;<a href=#" onclick="window.FindReplace.GUI.close();"><i class="icon-remove"></i></a></span></div><div><div style="display: inline-block;padding: 4px;vertical-align: middle;"><div style="margin: 4px auto;"><div style="display: inline-block;width: 4em;">Find:</div><input id="fr-find-text" size="60" type="text"></div><div style="margin: 4px auto;"><div style="display: inline-block;width: 4em;">Replace:</div><input id="fr-replace-text" size="60" type="text" style="background-color: rgb(255, 255, 255);"></div><div style="margin: 14px auto 0;">Case Sensitive<input id="fr-cs" checked="" style="position: relative; top: 3px; " type="checkbox">&nbsp; | &nbsp;Regex<input id="fr-reg" checked="" style="position: relative; top: 3px; " type="checkbox"></div></div><div style="display: inline-block;padding: 4px;width: 110px;vertical-align: middle;"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="fr-replace" type="button" onclick="window.FindReplace.Actions.evaluate()" value="Replace"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="fr-replace-all" type="button" onclick="window.FindReplace.Actions.evaluate(\'rall\')" value="Replace All"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="fr-find-prev" type="button" onclick="window.FindReplace.Shadow.prev();" value="Find Previous"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="fr-find-next" type="button" onclick="window.FindReplace.Shadow.next();" value="Find Next"></div></div><div id="fr-status" style="text-align:center; font-weight: bold;border-top: 1px solid #aaaaaa;padding: 4px;">&nbsp;</div></form></div>';		$('#editform').prepend(popupHTML);
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

//Broken
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

window.FindReplace.registerModule("GUI");