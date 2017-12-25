"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*eslint no-unsafe-finally: "off"*/
var pendingScripts = [];
var pendingCallbacks = [];
var needsProcess = false;

/**
 * Process math in a script node using MathJax
 * @param { MathJax } MathJax
 * @param { DOMNode } script
 * @param { Function } callback
 */
function processMath(MathJax, script, callback) {
  pendingScripts.push(script);
  pendingCallbacks.push(callback);

  if (!needsProcess) {
    needsProcess = true;
    setTimeout(function () {
      return doProcess(MathJax);
    }, 0);
  }
}

function doProcess(MathJax) {
  MathJax.Hub.Queue(function () {
    var oldElementScripts = MathJax.Hub.elementScripts;
    MathJax.Hub.elementScripts = function () {
      return pendingScripts;
    };

    try {
      return MathJax.Hub.Process(null, function () {
        // Trigger all of the pending callbacks before clearing them out.
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;
        var _iterator = void 0;
        var _step = void 0;

        try {
          // eslint-disable-next-line
          for (_iterator = pendingCallbacks[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var callback = _step.value;

            callback();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    } catch (err) {
      // IE8 requires `catch` in order to use `finally`
      throw err;
    } finally {
      MathJax.Hub.elementScripts = oldElementScripts;
    }
  });
}

exports.default = processMath;