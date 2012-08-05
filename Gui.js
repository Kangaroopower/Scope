/* GUI */
Scope.GUI.initiate = function () {
	if (Scope.active !== true) {
		Scope.active =  true;
		$('head').append('<style type="text/css">#sc-ui{left: 247px;top: 50.5px;box-shadow: 0 4px 16px rgba(0, 0, 0, .2);background: white;background-clip: padding-box;border: 1px solid #ACACAC;outline: 0;position: absolute;color: black;padding: 15px 22px;z-index: 1001;}#sc-ui-inner{cursor: default;font-size: 13px;margin: 0 0 14px;font-weight: bold;}.sc-button{background-color: whiteSmoke;background-image: -webkit-linear-gradient(top,whiteSmoke,#F1F1F1);background-image: -moz-linear-gradient(top,whiteSmoke,#F1F1F1);background-image: -ms-linear-gradient(top,whiteSmoke,#F1F1F1);background-image: -o-linear-gradient(top,whiteSmoke,#F1F1F1);background-image: linear-gradient(top,whiteSmoke,#F1F1F1);color: #333;border: 1px solid gainsboro;-webkit-user-select: none;border-top-right-radius: 0;border-bottom-right-radius: 0;margin-right: 0px;z-index: 1;border-radius: 2px;cursor: pointer;font-size: 11px;font-weight: bold;text-align: center;height: 27px;line-height: 27px;min-width: 54px;outline: 0px;padding: 0 8px;position: relative;display: -moz-inline-box;display: inline-block;margin-right: 16px;}#sc-find-text{background: transparent!important;border: none!important;box-shadow: none!important;font-size: 13px;height: 20px;margin: 0;outline: none!important;padding: 1px 0px!important;width: 100%;}#sc-replace-text{width: 330px;border-radius: 1px;border: 1px solid #D9D9D9;border-top: 1px solid silver;outline:none!important;font-size: 13px;height: 20px;padding: 1px 8px;}#sc-operator{width: 107px;border-radius: 1px;border: 1px solid #D9D9D9;border-top: 1px solid silver;outline:none!important;font-size: 13px;height: 20px;padding: 1px 3px;}#sc-findwrapper{position: relative;display: inline-block;width: 348px;}#sc-findinnerwrapper{background: white;border: 1px solid #D9D9D9;border-top: 1px solid silver;min-width: 20px;padding: 0 8px;width: 100%;}#sc-replacewrapper{padding-bottom: 10px;text-align: left;width: 90px;}#sc-count{max-width: 120px;overflow: hidden;padding-right: 8px;text-align: right;}#sc-countwrapper{max-width: 120px;overflow: hidden;padding-right: 8px;text-align: right;}#sc-status{text-align:center;font-weight: bold;padding:4px;font-size: 11;}</style>');
		var popupHTML = '<div id="sc-ui" style="left: 248px;top: 34.5px;"><div id="sc-ui-inner">Find and replace<span style="float:right;text-transform:none;"><a style="cursor:pointer;" onclick="Scope.GUI.close();"><img title="close" src="http://upload.wikimedia.org/wikipedia/commons/b/b6/Chrome_close_button.png"></a></span></div><div style="background-color: white;line-height: 1.4em;border-bottom: 1px solid #AAA;"><table cellspacing="0"><tbody><tr><td><table cellspacing="0"><tbody><tr><td style="padding-bottom: 5px;text-align: left;width: 90px;"><label>Find</label></td><td style="padding-bottom: 5px;"><div id="findwrapper"><table cellpadding="0" cellspacing="0" id="sc-findinnerwrapper"><tbody><tr><td><input type="text" id="sc-find-text"></td><td id="sc-countwrapper"><span id="sc-count"> </span></td></tr></tbody></table></div></td></tr><tr><td id="sc-replacewrapper"><label>Replace</label></td><td style="padding-bottom: 10px;"><input type="text" id="sc-replace-text"></td></tr><tr><td></td><td><input type="checkbox" id="sc-cs"><label style="padding-left: 2px;">Match case</label><input type="checkbox" id="sc-reg"><label style="padding-left: 2px;">Regex</label><img src="https://github.com/Kangaroopower/Scope/raw/master/cog.png" style="vertical-align:middle;" height="20px" width="20px" title="Operators"><select id="sc-op" style="width: 57px;"><option value="None">None</option><option value="and">and</option><option value="but">alone</option></select>&nbsp;<input id="sc-operator" disabled="disabled" type="text"></td></tr></tbody></table></td></tr><tr><td><div style="margin-top: 20px;position: relative;margin-bottom: 5px;"><div><div onclick="Scope.Actions.params()" class="sc-button">Replace</div><div onclick="Scope.Actions.params(\'rall\')" class="sc-button">Replace all</div></div><div style="position: absolute;top: 0px;right: 0px;"><div onclick="Scope.Shadow.prev();" id="sc-find-prev" class="sc-button">Prev</div><div onclick="Scope.Shadow.next();" id="sc-find-next" class="sc-button">Next</div></div></div></td></tr></tbody></table></div><div id="sc-status">&nbsp;</div></div>';
		$( '#editform' ).prepend(popupHTML);
		$('#sc-ui').show('clip', 180);
		$('#sc-ui').draggable();
		$('input#sc-find-text').keyup(Scope.Actions.find);
		$('#sc-operator').keyup(Scope.Actions.find);
		$('input#sc-cs').click(Scope.Actions.find);
		$('#sc-op').change(function () {
			Scope.Actions.find();
			if ($("#sc-op option:selected").val() === "but") {
				$("#sc-operator").val('');
				$("#sc-operator").attr('disabled', 'disabled');
			} else {
				$("#sc-operator").attr('disabled', false);
			}
		});
		$('#sc-find-text').focus();
		Scope.Shadow.init();
		$('#sc-find-text').val(WikiaEditor.getInstance().getEditbox().getSelection().text);
	}
};
 
Scope.GUI.close = function () {
	$('#sc-ui').hide('clip', 200);
	Scope.active = false;
	Scope.Shadow.regex = null;
	Scope.Actions.operator = null;
	Scope.Actions.undotext = null;
	Scope.Shadow.synch(); 
	$('#sc-shadow').remove();
	var eh = WikiaEditor.getInstance().getEditbox().height();
	WikiaEditor.getInstance().getEditbox().removeAttr('style')
	WikiaEditor.getInstance().getEditbox().css({height: eh});
};