/* GUI */
Scope.GUI.initiate = function () {
	if (Scope.active !== true) {
		Scope.active =  true;
		var popupHTML = '<div id="sc-ui" style="display:none;z-index: 1000;background-color: white;padding: 4px;border: 1px solid rgb(170, 170, 170);border-top-left-radius: 6px;border-top-right-radius: 6px;border-bottom-right-radius: 6px;border-bottom-left-radius: 6px;text-align: left;font-size: 11px;color: black;display: block;position: absolute;top: 244px;left: 207px;" class="ui-draggable"><form action="#" method="get"><div style="font-weight: bold;border-bottom: 1px solid #aaaaaa;padding: 4px;"><span id="sc-title">Find and Replace</span><span style="float:right;text-transform:none;"><a title="Synch textarea contents" style="cursor:pointer;" onclick="Scope.Actions.find();"><i class="icon-refresh"></i></a>&nbsp;&nbsp;<a style="cursor:pointer;" onclick="Scope.GUI.close();"><i class="icon-remove"></i></a></span></div><div><div style="display: inline-block;padding: 4px;vertical-align: middle;"><div style="margin: 4px auto;"><div style="display: inline-block;width: 4em;">Find:</div><input id="sc-find-text" size="60" type="text"></div><div style="margin: 4px auto;"><div style="display: inline-block;width: 4em;">Replace:</div><input id="sc-replace-text" size="60" type="text" style="background-color: rgb(255, 255, 255);"></div><div style="margin: 14px auto 0;">Case Sensitive<input id="sc-cs" checked="" style="position: relative; top: 3px; " type="checkbox">&nbsp; | &nbsp;Regex<input id="sc-reg" style="position: relative; top: 3px; " type="checkbox"></div></div><div style="display: inline-block;padding: 4px;width: 110px;vertical-align: middle;"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="sc-replace" type="button" onclick="Scope.Actions.evaluate()" value="Replace"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="sc-replace-all" type="button" onclick="Scope.Actions.evaluate(\'rall\')" value="Replace All"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="sc-find-prev" type="button" onclick="Scope.Shadow.prev();" value="Find Previous"><input style="width: 100px;font-size: 10px;margin-bottom: 4px;" id="sc-find-next" type="button" onclick="Scope.Shadow.next();" value="Find Next"></div></div><div id="sc-status" style="text-align:center; font-weight: bold;border-top: 1px solid #aaaaaa;padding: 4px;">&nbsp;</div></form></div>';
		$( '#editform' ).prepend(popupHTML);
		$('#sc-ui').show('clip', 180);
		$('#sc-ui').css({left: 0, top: 0});
		$('#sc-ui').draggable();
		$('input#sc-find-text').keyup(Scope.Actions.find);
		$('input#sc-cs').click(Scope.Actions.find);
		$('#sc-find-text').focus();
		Scope.Shadow.init();
		$('#sc-find-text').value = WikiaEditor.getInstance().getEditbox().getSelection().text;
	}
};
 
Scope.GUI.close = function () {
	$('#sc-ui').hide('clip', 200);
	Scope.active = false;
	Scope.Shadow.regex = null;
	Scope.Shadow.synch(); 
	$('#sc-shadow').remove();
	WikiaEditor.getInstance().getEditbox().css({height: WikiaEditor.getInstance().getEditbox().height()});
};

Scope.registerModule("GUI", {});