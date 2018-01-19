'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initialized = false;

var Text = function (_React$Component) {
  _inherits(Text, _React$Component);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
  }

  _createClass(Text, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refreshMathJax();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.refreshMathJax();
    }
  }, {
    key: 'refreshMathJax',
    value: function refreshMathJax() {
      var _this2 = this;

      var MathJax = this.context.MathJax;

      if (!MathJax) {
        throw Error("MathJax not found in context for controls");
      }

      var temp = initialized;
      MathJax.Hub.Queue(function () {
        if (!temp) {
          // I have no idea why we need to do this, but first time we ever run MathJax, we need to Reprocess
          MathJax.Hub.Reprocess(_this2.div);
        }

        // Always do a PreProcess and Typeset afterwards
        try {
          MathJax.Hub.PreProcess(_this2.div);
          MathJax.Hub.Typeset(_this2.div);
        } catch (error) {
          //ignore
        }
      });
      initialized = true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          classes = _props.classes,
          options = _props.options;


      return _react2.default.createElement(
        'div',
        { ref: function ref(div) {
            return _this3.div = div;
          } },
        this.props.text
      );
    }
  }]);

  return Text;
}(_react2.default.Component);

Text.contextTypes = {
  MathJax: _propTypes2.default.object
};

exports.default = Text;