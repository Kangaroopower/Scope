$('head').append('<style type="text/css">#sc-shadow{position:absolute;z-index:0;font-family:Consolas,Eupheima UCAS,Ayuthaya,Menlo,monospace;font-size:14px;line-height:normal;white-space:pre-wrap;background-color:transparent;color:transparent;overflow:auto;height:529px}#sc-ui{left: 247px;top: 50.5px;background: white;position: absolute;color: black;padding: 15px 22px;z-index: 1001;}#sc-find-text{background: transparent!important;border: none!important;box-shadow: none!important;font-size: 13px;height: 20px;margin: 0;outline: none!important;padding: 1px 0px!important;width: 100%;}#sc-replace-text{border-radius:4px !important;width: 330px;border-radius: 1px;border: 1px solid #D9D9D9;border-top: 1px solid silver;outline:none!important;font-size: 13px;height: 20px;padding: 1px 8px;}#sc-findwrapper{border-radius:4px;background: white;border: 1px solid #D9D9D9;border-top: 1px solid silver;min-width: 20px;padding: 0 8px;width: 100%;}#sc-replacewrapper{padding-bottom: 10px;text-align: left;width: 90px;}#sc-count{max-width: 120px;overflow: hidden;padding-right: 8px;text-align: right;}#sc-countwrapper{max-width: 120px;overflow: hidden;padding-right: 8px;text-align: right;}#sc-undo{cursor:pointer;vertical-align:middle;}input[type="checkbox"]{bottom: 2px;height: 13px;position: relative;vertical-align: middle;width: 13px;}input[type="radio"]{-webkit-appearance: none;-webkit-user-select: none;background-color: #EDEDED;border: 1px solid rgba(0, 0, 0, 0.25);border-radius: 2px;color: #444;}</style>');
Scope.dialog = '<div id="sc-ui"><div style="background-color:white;line-height: 1.4em;"><table cellspacing="0"><tbody><tr><td><table cellspacing="0"><tbody><tr><td style="padding-bottom:5px;text-align:left;width:90px;"><label>Find</label></td><td style="padding-bottom: 5px;"><table cellpadding="0" cellspacing="0" id="sc-findwrapper"><tbody><tr><td><input type="text" id="sc-find-text"></td><td id="sc-countwrapper"><span id="sc-count">&nbsp;</span></td></tr></tbody></table></td></tr><tr><td id="sc-replacewrapper"><label>Replace</label></td><td style="padding-bottom: 10px;"><input type="text" id="sc-replace-text"></td></tr></tbody></table></td></tr></tbody></table></div></div>';