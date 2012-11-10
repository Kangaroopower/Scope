/**
 * Based off Rangyinputs http://code.google.com/p/rangyinputs/
 * Modified for Shadow
 */
(function() {
	var UNDEF = "undefined";
	var getSelection, setSelection;

	// Trio of isHost* functions taken from Peter Michaux's article:
	// http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
	function isHostMethod(object, property) {
		var t = typeof object[property];
		return t === "function" || (!!(t == "object" && object[property])) || t == "unknown";
	}

	function isHostProperty(object, property) {
		return typeof(object[property]) != UNDEF;
	}

	function isHostObject(object, property) {
		return !!(typeof(object[property]) == "object" && object[property]);
	}

	function fail(reason) {
		if (window.console && window.console.log) {
			window.console.log("RangyInputs not supported in your browser. Reason: " + reason);
		}
	}

	function adjustOffsets(el, start, end) {
		if (start < 0) {
			start += el.value.length;
		}
		if (typeof end == UNDEF) {
			end = start;
		}
		if (end < 0) {
			end += el.value.length;
		}
		return { start: start, end: end };
	}

	function makeSelection(el, start, end) {
		return {
			start: start,
			end: end,
			length: end - start,
			text: el.value.slice(start, end)
		};
	}

	function getBody() {
		return isHostObject(document, "body") ? document.body : document.getElementsByTagName("body")[0];
	}

	$(document).ready(function() {
		var testTextArea = document.createElement("textarea");
        testTextArea.style.display = 'none';

		getBody().appendChild(testTextArea);

		if (isHostProperty(testTextArea, "selectionStart") && isHostProperty(testTextArea, "selectionEnd")) {
			getSelection = function(el) {
				var start = el.selectionStart, end = el.selectionEnd;
				return makeSelection(el, start, end);
			};

			setSelection = function(el, startOffset, endOffset) {
				var offsets = adjustOffsets(el, startOffset, endOffset);
				el.selectionStart = offsets.start;
				el.selectionEnd = offsets.end;
			};
		} else if (isHostMethod(testTextArea, "createTextRange") && isHostObject(document, "selection") &&
				   isHostMethod(document.selection, "createRange")) {

			getSelection = function(el) {
				var start = 0, end = 0, normalizedValue, textInputRange, len, endRange;
				var range = document.selection.createRange();

				if (range && range.parentElement() == el) {
					len = el.value.length;

					normalizedValue = el.value.replace(/\r\n/g, "\n");
					textInputRange = el.createTextRange();
					textInputRange.moveToBookmark(range.getBookmark());
					endRange = el.createTextRange();
					endRange.collapse(false);
					if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
						start = end = len;
					} else {
						start = -textInputRange.moveStart("character", -len);
						start += normalizedValue.slice(0, start).split("\n").length - 1;
						if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
							end = len;
						} else {
							end = -textInputRange.moveEnd("character", -len);
							end += normalizedValue.slice(0, end).split("\n").length - 1;
						}
					}
				}

				return makeSelection(el, start, end);
			};

			// Moving across a line break only counts as moving one character in a TextRange, whereas a line break in
			// the textarea value is two characters. This function corrects for that by converting a text offset into a
			// range character offset by subtracting one character for every line break in the textarea prior to the
			// offset
			var offsetToRangeCharacterMove = function(el, offset) {
				return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
			};

			setSelection = function(el, startOffset, endOffset) {
				var offsets = adjustOffsets(el, startOffset, endOffset);
				var range = el.createTextRange();
				var startCharMove = offsetToRangeCharacterMove(el, offsets.start);
				range.collapse(true);
				if (offsets.start == offsets.end) {
					range.move("character", startCharMove);
				} else {
					range.moveEnd("character", offsetToRangeCharacterMove(el, offsets.end));
					range.moveStart("character", startCharMove);
				}
				range.select();
			};
		} else {
			getBody().removeChild(testTextArea);
			fail("No means of finding text input caret position");
			return;
		}

		// Clean up
		getBody().removeChild(testTextArea);

		Element.prototype.getSelection = getSelection;
		Element.prototype.setSelection = setSelection;
	});
})(jQuery);