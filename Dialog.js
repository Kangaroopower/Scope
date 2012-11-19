$('head').append('<style id="sc-style" type="text/css">.scactive{background-Color:#08c;}#sc-shadow{left: 0px; top: 0px; border: 0px none; display: block; outline: none medium; margin: 0px; padding: 0px; resize: none; position: absolute; z-index: 0; font-family: Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace; font-size: 14px; line-height: 140%;; white-space: pre-wrap; background-color: transparent; color: transparent; overflow: auto; height: 529px;}#sc-ui{z-index: 1001;}#sc-find-text{background: transparent!important;border: none!important;box-shadow: none!important;font-size: 13px;height: 20px;margin: 0;outline: none!important;padding: 1px 0px!important;width: 140px;}#sc-replace-text{border-radius:4px !important;width: 180px;border-radius: 1px;border: 1px solid #D9D9D9;border-top: 1px solid silver;outline:none!important;font-size: 13px;height: 20px;padding: 1px 8px;}#sc-findwrapper{border-radius:4px;background: white;border: 1px solid #D9D9D9;border-top: 1px solid silver;padding: 0 8px;width: 258px;}#sc-replacewrapper{padding-bottom: 10px;text-align: left;width: 90px;}#sc-down{vertical-align: middle;}#sc-count{max-width: 120px;overflow: hidden;padding-right: 2px;text-align: right;}#sc-countwrapper{max-width: 120px;overflow: hidden;padding-right: 2px;text-align: right;}#sc-undo{height: 20px;cursor:pointer;vertical-align:middle;}#sc-start{cursor:pointer;}.sc-match{background-color:#700066;}#sc-cog{cursor:pointer;width:15px;height:15px;vertical-align:middle;}#sc-dropinner{border: solid 1px #CCC;border-radius:0.25em;background-color:white;box-shadow:0 0.25em 1em 0 rgba(0, 0, 0, 0.25);padding: 0.33em 0;z-index:100001;font-size:0.9em;}.sc-droption{cursor:pointer;}</style>');
$('head').append('/*! * Bootstrap v2.2.1 * * Copyright 2012 Twitter, Inc * Licensed under the Apache License v2.0 * http://www.apache.org/licenses/LICENSE-2.0 * * Designed and built with all the love in the world @twitter by @mdo and @fat. */.clearfix{*zoom:1;}.clearfix:before,.clearfix:after{display:table;content:"";line-height:0;}.clearfix:after{clear:both;}.hide-text{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0;}.input-block-level{display:block;width:100%;min-height:30px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;}.btn{display:inline-block;*display:inline;*zoom:1;padding:4px 12px;margin-bottom:0;font-size:14px;line-height:20px;*line-height:20px;text-align:center;vertical-align:middle;cursor:pointer;color:#333333;text-shadow:0 1px 1px rgba(255, 255, 255, 0.75);background-color:#f5f5f5;background-image:-moz-linear-gradient(top, #ffffff, #e6e6e6);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));background-image:-webkit-linear-gradient(top, #ffffff, #e6e6e6);background-image:-o-linear-gradient(top, #ffffff, #e6e6e6);background-image:linear-gradient(to bottom, #ffffff, #e6e6e6);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffffff", endColorstr="#ffe6e6e6", GradientType=0);border-color:#e6e6e6 #e6e6e6 #bfbfbf;border-color:rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);*background-color:#e6e6e6;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);border:1px solid #bbbbbb;*border:0;border-bottom-color:#a2a2a2;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;*margin-left:.3em;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);box-shadow:inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);}.btn:hover,.btn:active,.btn.active,.btn.disabled,.btn[disabled]{color:#333333;background-color:#e6e6e6;*background-color:#d9d9d9;}.btn:active,.btn.active{background-color:#cccccc \9;}.btn:first-child{*margin-left:0;}.btn:hover{color:#333333;text-decoration:none;background-color:#e6e6e6;*background-color:#d9d9d9;background-position:0 -15px;-webkit-transition:background-position 0.1s linear;-moz-transition:background-position 0.1s linear;-o-transition:background-position 0.1s linear;transition:background-position 0.1s linear;}.btn:focus{outline:thin dotted #333;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px;}.btn.active,.btn:active{background-color:#e6e6e6;background-color:#d9d9d9 \9;background-image:none;outline:0;-webkit-box-shadow:inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05);-moz-box-shadow:inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05);box-shadow:inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05);}.btn.disabled,.btn[disabled]{cursor:default;background-color:#e6e6e6;background-image:none;opacity:0.65;filter:alpha(opacity=65);-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;}.btn-large{padding:11px 19px;font-size:17.5px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;}.btn-large [class^="icon-"],.btn-large [class*=" icon-"]{margin-top:2px;}.btn-small{padding:2px 10px;font-size:11.9px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;}.btn-small [class^="icon-"],.btn-small [class*=" icon-"]{margin-top:0;}.btn-mini{padding:1px 6px;font-size:10.5px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;}.btn-block{display:block;width:100%;padding-left:0;padding-right:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;}.btn-block+.btn-block{margin-top:5px;}input[type="submit"].btn-block,input[type="reset"].btn-block,input[type="button"].btn-block{width:100%;}.btn-primary.active,.btn-warning.active,.btn-danger.active,.btn-success.active,.btn-info.active,.btn-inverse.active{color:rgba(255, 255, 255, 0.75);}.btn{border-color:#c5c5c5;border-color:rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.25);}.btn-primary{color:#ffffff;text-shadow:0 -1px 0 rgba(0, 0, 0, 0.25);background-color:#006dcc;background-image:-moz-linear-gradient(top, #0088cc, #0044cc);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0044cc));background-image:-webkit-linear-gradient(top, #0088cc, #0044cc);background-image:-o-linear-gradient(top, #0088cc, #0044cc);background-image:linear-gradient(to bottom, #0088cc, #0044cc);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff0088cc", endColorstr="#ff0044cc", GradientType=0);border-color:#0044cc #0044cc #002a80;border-color:rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);*background-color:#0044cc;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);}.btn-primary:hover,.btn-primary:active,.btn-primary.active,.btn-primary.disabled,.btn-primary[disabled]{color:#ffffff;background-color:#0044cc;*background-color:#003bb3;}.btn-primary:active,.btn-primary.active{background-color:#003399 \9;}.btn-warning{color:#ffffff;text-shadow:0 -1px 0 rgba(0, 0, 0, 0.25);background-color:#faa732;background-image:-moz-linear-gradient(top, #fbb450, #f89406);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#fbb450), to(#f89406));background-image:-webkit-linear-gradient(top, #fbb450, #f89406);background-image:-o-linear-gradient(top, #fbb450, #f89406);background-image:linear-gradient(to bottom, #fbb450, #f89406);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#fffbb450", endColorstr="#fff89406", GradientType=0);border-color:#f89406 #f89406 #ad6704;border-color:rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);*background-color:#f89406;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);}.btn-warning:hover,.btn-warning:active,.btn-warning.active,.btn-warning.disabled,.btn-warning[disabled]{color:#ffffff;background-color:#f89406;*background-color:#df8505;}.btn-warning:active,.btn-warning.active{background-color:#c67605 \9;}.btn-danger{color:#ffffff;text-shadow:0 -1px 0 rgba(0, 0, 0, 0.25);background-color:#da4f49;background-image:-moz-linear-gradient(top, #ee5f5b, #bd362f);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#ee5f5b), to(#bd362f));background-image:-webkit-linear-gradient(top, #ee5f5b, #bd362f);background-image:-o-linear-gradient(top, #ee5f5b, #bd362f);background-image:linear-gradient(to bottom, #ee5f5b, #bd362f);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffee5f5b", endColorstr="#ffbd362f", GradientType=0);border-color:#bd362f #bd362f #802420;border-color:rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);*background-color:#bd362f;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);}.btn-danger:hover,.btn-danger:active,.btn-danger.active,.btn-danger.disabled,.btn-danger[disabled]{color:#ffffff;background-color:#bd362f;*background-color:#a9302a;}.btn-danger:active,.btn-danger.active{background-color:#942a25 \9;}.btn-success{color:#ffffff;text-shadow:0 -1px 0 rgba(0, 0, 0, 0.25);background-color:#5bb75b;background-image:-moz-linear-gradient(top, #62c462, #51a351);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#62c462), to(#51a351));background-image:-webkit-linear-gradient(top, #62c462, #51a351);background-image:-o-linear-gradient(top, #62c462, #51a351);background-image:linear-gradient(to bottom, #62c462, #51a351);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff62c462", endColorstr="#ff51a351", GradientType=0);border-color:#51a351 #51a351 #387038;border-color:rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);*background-color:#51a351;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);}.btn-success:hover,.btn-success:active,.btn-success.active,.btn-success.disabled,.btn-success[disabled]{color:#ffffff;background-color:#51a351;*background-color:#499249;}.btn-success:active,.btn-success.active{background-color:#408140 \9;}.btn-info{color:#ffffff;text-shadow:0 -1px 0 rgba(0, 0, 0, 0.25);background-color:#49afcd;background-image:-moz-linear-gradient(top, #5bc0de, #2f96b4);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#5bc0de), to(#2f96b4));background-image:-webkit-linear-gradient(top, #5bc0de, #2f96b4);background-image:-o-linear-gradient(top, #5bc0de, #2f96b4);background-image:linear-gradient(to bottom, #5bc0de, #2f96b4);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff5bc0de", endColorstr="#ff2f96b4", GradientType=0);border-color:#2f96b4 #2f96b4 #1f6377;border-color:rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);*background-color:#2f96b4;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);}.btn-info:hover,.btn-info:active,.btn-info.active,.btn-info.disabled,.btn-info[disabled]{color:#ffffff;background-color:#2f96b4;*background-color:#2a85a0;}.btn-info:active,.btn-info.active{background-color:#24748c \9;}.btn-inverse{color:#ffffff;text-shadow:0 -1px 0 rgba(0, 0, 0, 0.25);background-color:#363636;background-image:-moz-linear-gradient(top, #444444, #222222);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#444444), to(#222222));background-image:-webkit-linear-gradient(top, #444444, #222222);background-image:-o-linear-gradient(top, #444444, #222222);background-image:linear-gradient(to bottom, #444444, #222222);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff444444", endColorstr="#ff222222", GradientType=0);border-color:#222222 #222222 #000000;border-color:rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);*background-color:#222222;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);}.btn-inverse:hover,.btn-inverse:active,.btn-inverse.active,.btn-inverse.disabled,.btn-inverse[disabled]{color:#ffffff;background-color:#222222;*background-color:#151515;}.btn-inverse:active,.btn-inverse.active{background-color:#080808 \9;}button.btn,input[type="submit"].btn{*padding-top:3px;*padding-bottom:3px;}button.btn::-moz-focus-inner,input[type="submit"].btn::-moz-focus-inner{padding:0;border:0;}button.btn.btn-large,input[type="submit"].btn.btn-large{*padding-top:7px;*padding-bottom:7px;}button.btn.btn-small,input[type="submit"].btn.btn-small{*padding-top:3px;*padding-bottom:3px;}button.btn.btn-mini,input[type="submit"].btn.btn-mini{*padding-top:1px;*padding-bottom:1px;}.btn-link,.btn-link:active,.btn-link[disabled]{background-color:transparent;background-image:none;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;}.btn-link{border-color:transparent;cursor:pointer;color:#0088cc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;}.btn-link:hover{color:#005580;text-decoration:underline;background-color:transparent;}.btn-link[disabled]:hover{color:#333333;text-decoration:none;}[class^="icon-"],[class*=" icon-"]{display:inline-block;width:14px;height:14px;*margin-right:.3em;line-height:14px;vertical-align:text-top;background-image:url("../img/glyphicons-halflings.png");background-position:14px 14px;background-repeat:no-repeat;margin-top:1px;}.icon-white,.nav-pills>.active>a>[class^="icon-"],.nav-pills>.active>a>[class*=" icon-"],.nav-list>.active>a>[class^="icon-"],.nav-list>.active>a>[class*=" icon-"],.navbar-inverse .nav>.active>a>[class^="icon-"],.navbar-inverse .nav>.active>a>[class*=" icon-"],.dropdown-menu>li>a:hover>[class^="icon-"],.dropdown-menu>li>a:hover>[class*=" icon-"],.dropdown-menu>.active>a>[class^="icon-"],.dropdown-menu>.active>a>[class*=" icon-"],.dropdown-submenu:hover>a>[class^="icon-"],.dropdown-submenu:hover>a>[class*=" icon-"]{background-image:url("../img/glyphicons-halflings-white.png");}.icon-glass{background-position:0 0;}.icon-music{background-position:-24px 0;}.icon-search{background-position:-48px 0;}.icon-envelope{background-position:-72px 0;}.icon-heart{background-position:-96px 0;}.icon-star{background-position:-120px 0;}.icon-star-empty{background-position:-144px 0;}.icon-user{background-position:-168px 0;}.icon-film{background-position:-192px 0;}.icon-th-large{background-position:-216px 0;}.icon-th{background-position:-240px 0;}.icon-th-list{background-position:-264px 0;}.icon-ok{background-position:-288px 0;}.icon-remove{background-position:-312px 0;}.icon-zoom-in{background-position:-336px 0;}.icon-zoom-out{background-position:-360px 0;}.icon-off{background-position:-384px 0;}.icon-signal{background-position:-408px 0;}.icon-cog{background-position:-432px 0;}.icon-trash{background-position:-456px 0;}.icon-home{background-position:0 -24px;}.icon-file{background-position:-24px -24px;}.icon-time{background-position:-48px -24px;}.icon-road{background-position:-72px -24px;}.icon-download-alt{background-position:-96px -24px;}.icon-download{background-position:-120px -24px;}.icon-upload{background-position:-144px -24px;}.icon-inbox{background-position:-168px -24px;}.icon-play-circle{background-position:-192px -24px;}.icon-repeat{background-position:-216px -24px;}.icon-refresh{background-position:-240px -24px;}.icon-list-alt{background-position:-264px -24px;}.icon-lock{background-position:-287px -24px;}.icon-flag{background-position:-312px -24px;}.icon-headphones{background-position:-336px -24px;}.icon-volume-off{background-position:-360px -24px;}.icon-volume-down{background-position:-384px -24px;}.icon-volume-up{background-position:-408px -24px;}.icon-qrcode{background-position:-432px -24px;}.icon-barcode{background-position:-456px -24px;}.icon-tag{background-position:0 -48px;}.icon-tags{background-position:-25px -48px;}.icon-book{background-position:-48px -48px;}.icon-bookmark{background-position:-72px -48px;}.icon-print{background-position:-96px -48px;}.icon-camera{background-position:-120px -48px;}.icon-font{background-position:-144px -48px;}.icon-bold{background-position:-167px -48px;}.icon-italic{background-position:-192px -48px;}.icon-text-height{background-position:-216px -48px;}.icon-text-width{background-position:-240px -48px;}.icon-align-left{background-position:-264px -48px;}.icon-align-center{background-position:-288px -48px;}.icon-align-right{background-position:-312px -48px;}.icon-align-justify{background-position:-336px -48px;}.icon-list{background-position:-360px -48px;}.icon-indent-left{background-position:-384px -48px;}.icon-indent-right{background-position:-408px -48px;}.icon-facetime-video{background-position:-432px -48px;}.icon-picture{background-position:-456px -48px;}.icon-pencil{background-position:0 -72px;}.icon-map-marker{background-position:-24px -72px;}.icon-adjust{background-position:-48px -72px;}.icon-tint{background-position:-72px -72px;}.icon-edit{background-position:-96px -72px;}.icon-share{background-position:-120px -72px;}.icon-check{background-position:-144px -72px;}.icon-move{background-position:-168px -72px;}.icon-step-backward{background-position:-192px -72px;}.icon-fast-backward{background-position:-216px -72px;}.icon-backward{background-position:-240px -72px;}.icon-play{background-position:-264px -72px;}.icon-pause{background-position:-288px -72px;}.icon-stop{background-position:-312px -72px;}.icon-forward{background-position:-336px -72px;}.icon-fast-forward{background-position:-360px -72px;}.icon-step-forward{background-position:-384px -72px;}.icon-eject{background-position:-408px -72px;}.icon-chevron-left{background-position:-432px -72px;}.icon-chevron-right{background-position:-456px -72px;}.icon-plus-sign{background-position:0 -96px;}.icon-minus-sign{background-position:-24px -96px;}.icon-remove-sign{background-position:-48px -96px;}.icon-ok-sign{background-position:-72px -96px;}.icon-question-sign{background-position:-96px -96px;}.icon-info-sign{background-position:-120px -96px;}.icon-screenshot{background-position:-144px -96px;}.icon-remove-circle{background-position:-168px -96px;}.icon-ok-circle{background-position:-192px -96px;}.icon-ban-circle{background-position:-216px -96px;}.icon-arrow-left{background-position:-240px -96px;}.icon-arrow-right{background-position:-264px -96px;}.icon-arrow-up{background-position:-289px -96px;}.icon-arrow-down{background-position:-312px -96px;}.icon-share-alt{background-position:-336px -96px;}.icon-resize-full{background-position:-360px -96px;}.icon-resize-small{background-position:-384px -96px;}.icon-plus{background-position:-408px -96px;}.icon-minus{background-position:-433px -96px;}.icon-asterisk{background-position:-456px -96px;}.icon-exclamation-sign{background-position:0 -120px;}.icon-gift{background-position:-24px -120px;}.icon-leaf{background-position:-48px -120px;}.icon-fire{background-position:-72px -120px;}.icon-eye-open{background-position:-96px -120px;}.icon-eye-close{background-position:-120px -120px;}.icon-warning-sign{background-position:-144px -120px;}.icon-plane{background-position:-168px -120px;}.icon-calendar{background-position:-192px -120px;}.icon-random{background-position:-216px -120px;width:16px;}.icon-comment{background-position:-240px -120px;}.icon-magnet{background-position:-264px -120px;}.icon-chevron-up{background-position:-288px -120px;}.icon-chevron-down{background-position:-313px -119px;}.icon-retweet{background-position:-336px -120px;}.icon-shopping-cart{background-position:-360px -120px;}.icon-folder-close{background-position:-384px -120px;}.icon-folder-open{background-position:-408px -120px;width:16px;}.icon-resize-vertical{background-position:-432px -119px;}.icon-resize-horizontal{background-position:-456px -118px;}.icon-hdd{background-position:0 -144px;}.icon-bullhorn{background-position:-24px -144px;}.icon-bell{background-position:-48px -144px;}.icon-certificate{background-position:-72px -144px;}.icon-thumbs-up{background-position:-96px -144px;}.icon-thumbs-down{background-position:-120px -144px;}.icon-hand-right{background-position:-144px -144px;}.icon-hand-left{background-position:-168px -144px;}.icon-hand-up{background-position:-192px -144px;}.icon-hand-down{background-position:-216px -144px;}.icon-circle-arrow-right{background-position:-240px -144px;}.icon-circle-arrow-left{background-position:-264px -144px;}.icon-circle-arrow-up{background-position:-288px -144px;}.icon-circle-arrow-down{background-position:-312px -144px;}.icon-globe{background-position:-336px -144px;}.icon-wrench{background-position:-360px -144px;}.icon-tasks{background-position:-384px -144px;}.icon-filter{background-position:-408px -144px;}.icon-briefcase{background-position:-432px -144px;}.icon-fullscreen{background-position:-456px -144px;}.btn-group{position:relative;display:inline-block;*display:inline;*zoom:1;font-size:0;vertical-align:middle;white-space:nowrap;*margin-left:.3em;}.btn-group:first-child{*margin-left:0;}.btn-group+.btn-group{margin-left:5px;}.btn-toolbar{font-size:0;margin-top:10px;margin-bottom:10px;}.btn-toolbar .btn+.btn,.btn-toolbar .btn-group+.btn,.btn-toolbar .btn+.btn-group{margin-left:5px;}.btn-group>.btn{position:relative;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;}.btn-group>.btn+.btn{margin-left:-1px;}.btn-group>.btn,.btn-group>.dropdown-menu{font-size:14px;}.btn-group>.btn-mini{font-size:11px;}.btn-group>.btn-small{font-size:12px;}.btn-group>.btn-large{font-size:16px;}.btn-group>.btn:first-child{margin-left:0;-webkit-border-top-left-radius:4px;-moz-border-radius-topleft:4px;border-top-left-radius:4px;-webkit-border-bottom-left-radius:4px;-moz-border-radius-bottomleft:4px;border-bottom-left-radius:4px;}.btn-group>.btn:last-child,.btn-group>.dropdown-toggle{-webkit-border-top-right-radius:4px;-moz-border-radius-topright:4px;border-top-right-radius:4px;-webkit-border-bottom-right-radius:4px;-moz-border-radius-bottomright:4px;border-bottom-right-radius:4px;}.btn-group>.btn.large:first-child{margin-left:0;-webkit-border-top-left-radius:6px;-moz-border-radius-topleft:6px;border-top-left-radius:6px;-webkit-border-bottom-left-radius:6px;-moz-border-radius-bottomleft:6px;border-bottom-left-radius:6px;}.btn-group>.btn.large:last-child,.btn-group>.large.dropdown-toggle{-webkit-border-top-right-radius:6px;-moz-border-radius-topright:6px;border-top-right-radius:6px;-webkit-border-bottom-right-radius:6px;-moz-border-radius-bottomright:6px;border-bottom-right-radius:6px;}.btn-group>.btn:hover,.btn-group>.btn:focus,.btn-group>.btn:active,.btn-group>.btn.active{z-index:2;}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0;}.btn-group>.btn+.dropdown-toggle{padding-left:8px;padding-right:8px;-webkit-box-shadow:inset 1px 0 0 rgba(255,255,255,.125), inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);-moz-box-shadow:inset 1px 0 0 rgba(255,255,255,.125), inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);box-shadow:inset 1px 0 0 rgba(255,255,255,.125), inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);*padding-top:5px;*padding-bottom:5px;}.btn-group>.btn-mini+.dropdown-toggle{padding-left:5px;padding-right:5px;*padding-top:2px;*padding-bottom:2px;}.btn-group>.btn-small+.dropdown-toggle{*padding-top:5px;*padding-bottom:4px;}.btn-group>.btn-large+.dropdown-toggle{padding-left:12px;padding-right:12px;*padding-top:7px;*padding-bottom:7px;}.btn-group.open .dropdown-toggle{background-image:none;-webkit-box-shadow:inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05);-moz-box-shadow:inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05);box-shadow:inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05);}.btn-group.open .btn.dropdown-toggle{background-color:#e6e6e6;}.btn-group.open .btn-primary.dropdown-toggle{background-color:#0044cc;}.btn-group.open .btn-warning.dropdown-toggle{background-color:#f89406;}.btn-group.open .btn-danger.dropdown-toggle{background-color:#bd362f;}.btn-group.open .btn-success.dropdown-toggle{background-color:#51a351;}.btn-group.open .btn-info.dropdown-toggle{background-color:#2f96b4;}.btn-group.open .btn-inverse.dropdown-toggle{background-color:#222222;}.btn .caret{margin-top:8px;margin-left:0;}.btn-mini .caret,.btn-small .caret,.btn-large .caret{margin-top:6px;}.btn-large .caret{border-left-width:5px;border-right-width:5px;border-top-width:5px;}.dropup .btn-large .caret{border-bottom-width:5px;}.btn-primary .caret,.btn-warning .caret,.btn-danger .caret,.btn-info .caret,.btn-success .caret,.btn-inverse .caret{border-top-color:#ffffff;border-bottom-color:#ffffff;}.btn-group-vertical{display:inline-block;*display:inline;*zoom:1;}.btn-group-vertical .btn{display:block;float:none;width:100%;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;}.btn-group-vertical .btn+.btn{margin-left:0;margin-top:-1px;}.btn-group-vertical .btn:first-child{-webkit-border-radius:4px 4px 0 0;-moz-border-radius:4px 4px 0 0;border-radius:4px 4px 0 0;}.btn-group-vertical .btn:last-child{-webkit-border-radius:0 0 4px 4px;-moz-border-radius:0 0 4px 4px;border-radius:0 0 4px 4px;}.btn-group-vertical .btn-large:first-child{-webkit-border-radius:6px 6px 0 0;-moz-border-radius:6px 6px 0 0;border-radius:6px 6px 0 0;}.btn-group-vertical .btn-large:last-child{-webkit-border-radius:0 0 6px 6px;-moz-border-radius:0 0 6px 6px;border-radius:0 0 6px 6px;}.alert{padding:8px 35px 8px 14px;margin-bottom:20px;text-shadow:0 1px 0 rgba(255, 255, 255, 0.5);background-color:#fcf8e3;border:1px solid #fbeed5;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;color:#c09853;}.alert h4{margin:0;}.alert .close{position:relative;top:-2px;right:-21px;line-height:20px;}.alert-success{background-color:#dff0d8;border-color:#d6e9c6;color:#468847;}.alert-danger,.alert-error{background-color:#f2dede;border-color:#eed3d7;color:#b94a48;}.alert-info{background-color:#d9edf7;border-color:#bce8f1;color:#3a87ad;}.alert-block{padding-top:14px;padding-bottom:14px;}.alert-block>p,.alert-block>ul{margin-bottom:0;}.alert-block p+p{margin-top:5px;}.dropup,.dropdown{position:relative;}.dropdown-toggle{*margin-bottom:-3px;}.dropdown-toggle:active,.open .dropdown-toggle{outline:0;}.caret{display:inline-block;width:0;height:0;vertical-align:top;border-top:4px solid #000000;border-right:4px solid transparent;border-left:4px solid transparent;content:"";}.dropdown .caret{margin-top:8px;margin-left:2px;}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;background-color:#ffffff;border:1px solid #ccc;border:1px solid rgba(0, 0, 0, 0.2);*border-right-width:2px;*border-bottom-width:2px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0, 0, 0, 0.2);-moz-box-shadow:0 5px 10px rgba(0, 0, 0, 0.2);box-shadow:0 5px 10px rgba(0, 0, 0, 0.2);-webkit-background-clip:padding-box;-moz-background-clip:padding;background-clip:padding-box;}.dropdown-menu.pull-right{right:0;left:auto;}.dropdown-menu .divider{*width:100%;height:1px;margin:9px 1px;*margin:-5px 0 5px;overflow:hidden;background-color:#e5e5e5;border-bottom:1px solid #ffffff;}.dropdown-menu li>a{display:block;padding:3px 20px;clear:both;font-weight:normal;line-height:20px;color:#333333;white-space:nowrap;}.dropdown-menu li>a:hover,.dropdown-menu li>a:focus,.dropdown-submenu:hover>a{text-decoration:none;color:#ffffff;background-color:#0081c2;background-image:-moz-linear-gradient(top, #0088cc, #0077b3);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0077b3));background-image:-webkit-linear-gradient(top, #0088cc, #0077b3);background-image:-o-linear-gradient(top, #0088cc, #0077b3);background-image:linear-gradient(to bottom, #0088cc, #0077b3);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff0088cc", endColorstr="#ff0077b3", GradientType=0);}.dropdown-menu .active>a,.dropdown-menu .active>a:hover{color:#333333;text-decoration:none;outline:0;background-color:#0081c2;background-image:-moz-linear-gradient(top, #0088cc, #0077b3);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0077b3));background-image:-webkit-linear-gradient(top, #0088cc, #0077b3);background-image:-o-linear-gradient(top, #0088cc, #0077b3);background-image:linear-gradient(to bottom, #0088cc, #0077b3);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff0088cc", endColorstr="#ff0077b3", GradientType=0);}.dropdown-menu .disabled>a,.dropdown-menu .disabled>a:hover{color:#999999;}.dropdown-menu .disabled>a:hover{text-decoration:none;background-color:transparent;background-image:none;cursor:default;}.open{*z-index:1000;}.open >.dropdown-menu{display:block;}.pull-right>.dropdown-menu{right:0;left:auto;}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{border-top:0;border-bottom:4px solid #000000;content:"";}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:1px;}.dropdown-submenu{position:relative;}.dropdown-submenu>.dropdown-menu{top:0;left:100%;margin-top:-6px;margin-left:-1px;-webkit-border-radius:0 6px 6px 6px;-moz-border-radius:0 6px 6px 6px;border-radius:0 6px 6px 6px;}.dropdown-submenu:hover>.dropdown-menu{display:block;}.dropup .dropdown-submenu>.dropdown-menu{top:auto;bottom:0;margin-top:0;margin-bottom:-2px;-webkit-border-radius:5px 5px 5px 0;-moz-border-radius:5px 5px 5px 0;border-radius:5px 5px 5px 0;}.dropdown-submenu>a:after{display:block;content:" ";float:right;width:0;height:0;border-color:transparent;border-style:solid;border-width:5px 0 5px 5px;border-left-color:#cccccc;margin-top:5px;margin-right:-10px;}.dropdown-submenu:hover>a:after{border-left-color:#ffffff;}.dropdown-submenu.pull-left{float:none;}.dropdown-submenu.pull-left>.dropdown-menu{left:-100%;margin-left:10px;-webkit-border-radius:6px 0 6px 6px;-moz-border-radius:6px 0 6px 6px;border-radius:6px 0 6px 6px;}.dropdown .dropdown-menu .nav-header{padding-left:20px;padding-right:20px;}.typeahead{margin-top:2px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}');
Scope.dialog = '<div id="sc-ui"><div style="z-index: 100;left: 650px;top: 80px;position: absolute;display:none;" id="sc-drop"></div><table cellspacing="0"><tbody><tr><td><table cellspacing="0"><tbody><tr><td style="padding-bottom: 5px;"><table cellpadding="0" cellspacing="0" id="sc-findwrapper"><tbody><tr><td><input type="text" id="sc-find-text" placeholder="Find..."></td><td id="sc-countwrapper"><span id="sc-count">&nbsp;</span><img src="https://raw.github.com/Kangaroopower/Scope/master/pics/downarrow.png" id="sc-down"/></td></tr></tbody></table></td>&nbsp;&nbsp;<td style="padding-bottom: 5px;"><input type="text" placeholder="Replace..." id="sc-replace-text"></td>&nbsp;&nbsp;<td style="padding-bottom: 5px;"><a id="sc-replace-button"class="wikia-button secondary">Replace</a>&nbsp;<a id="sc-rall-button" class="wikia-button">Replace All</a>&nbsp;<span class="dropdown"><img class="dropdown-toggle" data-toggle="dropdown" src="https://raw.github.com/Kangaroopower/Scope/master/pics/cog.png" id="sc-cog" /><ul class="dropdown-menu"><li><a class="sc-droption" id="sc-cs">Case Sensitive</a></li><li><a class="sc-droption" id="sc-reg" title="ONLY IF YOU KNOW WHAT YOU\'RE DOING">Use Regex</a></li></ul></span></td></tr></tbody></table></td></tr></tbody></table></div>';