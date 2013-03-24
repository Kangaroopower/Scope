/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true*/
/*global mediaWiki:true*/
 
(function (module, mw, $) {
 
    'use strict';
 
    if (sessionStorage && sessionStorage.getItem('noShadow')) return;
 
    // $.browser is deprecated but unfortunately needed
    var browser = $.browser || (function () {
        var uaMatch = function(ua) {
                ua = ua.toLowerCase();
                var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                    /(msie) ([\w.]+)/.exec(ua) ||
                    ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                    [];
 
                return {
                    browser: match[1] || '',
                    version: match[2] || '0'
                };
            },
            matched = uaMatch(window.navigator.userAgent),
            browser = {};
 
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }
 
        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }
 
        return browser;
    }());
 
    function Shadow ($textarea) {
 
        this.__callbacks = $.Callbacks();
 
        this.$shadow = $('<div class="shadow"></div>')
        .insertAfter($textarea)
        .css({
            zIndex:         '1',
            whiteSpace:     'pre-wrap',
            overflowX:      'hidden',
            overflowY:      'auto',
            outline:        'none',
            position:        'absolute',
            margin:         '0',
            padding:        '0',
            cursor:         'text',
            borderColor:    'transparent',
            borderWidth:    $textarea.css('border-width'),
            color:          $textarea.css('color'),
            fontSize:       $textarea.css('font-size'),
            fontFamily:     $textarea.css('font-family'),
            fontWeight:     $textarea.css('font-weight'),
            fontStyle:      $textarea.css('font-style'),
            lineHeight:     $textarea.css('line-height'),
            letterSpacing:  $textarea.css('letter-spacing'),
            textAlign:      $textarea.css('text-align'),
            wordSpacing:    $textarea.css('word-spacing'),
            resize:         $textarea.css('resize')
            /*
            quotes
            punctuation-trim
            text-decoration
            text-indent
            text-justify
            text-outline
            text-overflow
            text-shadow
            text-transform
            text-wrap
            word-break
            word-wrap
            */
        });
 
        if (browser.mozilla) {
            this.$shadow.css('padding', '1px 0 0 2px');
        }
 
        //$('#shadow-demo').find('textarea')
 
        this.$textarea = $textarea
        .css({
            //color: 'transparent',
            backgroundColor: 'transparent',
            color: 'blue',
            position: 'relative',
            zIndex: '2'
        });
 
        this.__width  = 0;
        this.__height = 0;
        if ($textarea.css('resize') !== 'none') {
            $textarea
            .mousedown($.proxy(function () {
                this.$shadow.css('display', 'none');
            }, this))
            .mouseup($.proxy(function () {
                this.__resize();
                this.$shadow.css('display', 'block');
            }, this));
        }
        this.__resize();
 
        $textarea
        .scroll($.proxy(this.__scroll, this));
        this.__scroll();
 
        $textarea
        .on('propertychange keydown input paste', $.proxy(this.synch, this));
        if (browser.msie) {
            $textarea
            .on('keyup', $.proxy(this.synch, this));
        }
        this.synch();
    }
 
    // public methods:
 
    Shadow.prototype.selection = function (start, end) {
        if (start === undefined) {
            return this.$textarea.getSelection();
        } else {
            start = Math.round(start);
            end = end !== undefined ? Math.round(end) : start;
            this.$textarea.getSelection(start, end);
            if (start === end) {
                this.$textarea.collapseSelection();
            }
            return this;
        }
    };
 
    Shadow.prototype.subscribe = function (callback) {
        if ($.isFunction(callback)) {
            this.__callbacks.add(callback);
        }
    };
 
    Shadow.prototype.unsubscribe = function (callback) {
        this.__callbacks.remove(callback);
    };
 
    Shadow.prototype.span = function (start, end) {
        // ...
    };
 
    // private methods
 
    var T_TEXT = 1,
        T_ENTITY = 2;
 
    var ENTITIES = {
        '<': '&lt;', '&': '&amp;', '>': '&gt;'
    };
 
    Shadow.prototype.__tokenize = function (text) {
        var start = 0, end = 0, len;
        this.tokens = text.split(/([<&>])/);
        for (var t, i = 0; i < this.tokens.length; i++) {
            t = this.tokens[i];
            this.tokens[i] = {
                text: t,
                type: T_TEXT,
                start: start,
                length: t.length
            };
            start += t.length;
            if (t.length === 1 && ENTITIES[t]) {
                this.tokens[i].type = T_ENTITY;
                this.tokens[i].alt  = ENTITIES[t];
            }
        }
    };
 
    Shadow.prototype.__render = function () {
        var out = '';
        for (var t, i = 0; i < this.tokens.length; i++) {
            t = this.tokens[i];
            switch (t.type) {
                case T_TEXT:
                    out += t.text;
                    break;
                case T_ENTITY:
                    out += t.alt;
                    break;
            }
        }
        return out;
    };
 
    Shadow.prototype.__resize = function () {
        var w = this.$textarea.width(),
            h = this.$textarea.height();
        if (this.__width === w && this.__height === h) return;
        var offset = this.$textarea.offset(),
            offsetParent = this.$textarea.offsetParent().offset(),
            l = offset.left - offsetParent.left,
            t = offset.top  - offsetParent.top;
        if (browser.webkit) {
            var border = parseInt(this.$textarea.css('border-width'), 10);
            l += border * 2 + 1;
            t += border * 2 + 1;
        }
        this.$shadow.css({
            left:   l + 'px',
            top:    t + 'px',
            width:  w  + 'px',
            height: h + 'px'
        });
        this.__width  = w;
        this.__height = h;
    };
 
    Shadow.prototype.__scroll = function () {
        this.$shadow.scrollTop(this.$textarea.scrollTop());
    };
 
    Shadow.prototype.__ieFix = function () {
        if (!browser.msie) return;
        var textHeight = this.$textarea[0].scrollHeight;
        if (textHeight > this.$textarea.height()) {
            $('#buffer').remove();
            $('<div>&nbsp;</div>')
            .attr('id', 'buffer')
            .css({
                color: 'transparent',
                background: 'transparent',
                border: 'none',
                width: '12px',
                height: textHeight + 'px',
                float: 'right',
                top: 0,
                right: 0
            })
            .prependTo(this.$shadow);
        }
        this.__scroll();
    };
 
    Shadow.prototype.synch = function () {
        var value = this.$textarea.val(),
            last = value[value.length - 1],
            postfix = { "\r":1,"\n":1 }[last] ?  '&nbsp;' : '';
        this.__tokenize(value);
        this.__callbacks.fire(value);
        this.$shadow.html(this.__render() + postfix);
        this.__ieFix();
    };
 
    function cast (target) {
        var $textarea, shadow;
        if (target instanceof jQuery) {
            $textarea = target.first();
            if (!($textarea[0] instanceof HTMLTextAreaElement)) {
                throw new Error('not a textarea');
            }
        } else if (target instanceof HTMLTextAreaElement) {
            $textarea = $(target);
        } else {
            throw new Error('not a textarea');
        }
        shadow = $textarea.data('shadow');
        if (!shadow || !(shadow instanceof Shadow)) {
            shadow = new Shadow($textarea);
            $textarea.data('shadow', shadow);
        }
        return shadow;
    }
 
    module.cast = cast;
 
}((window.dev = window.dev || {}).shadow = window.dev.shadow || {}, mediaWiki, jQuery));