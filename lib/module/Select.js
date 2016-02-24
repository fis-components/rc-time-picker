'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var scrollTo = function scrollTo(element, to, duration) {
  // jump to target if duration zero
  if (duration <= 0) {
    element.scrollTop = to;
    return;
  }
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
};

var Select = _react2['default'].createClass({
  displayName: 'Select',

  propTypes: {
    prefixCls: _react.PropTypes.string,
    options: _react.PropTypes.array,
    selectedIndex: _react.PropTypes.number,
    type: _react.PropTypes.string,
    onSelect: _react.PropTypes.func
  },

  componentDidMount: function componentDidMount() {
    // jump to selected option
    this.scrollToSelected(0);
  },

  componentDidUpdate: function componentDidUpdate() {
    // smooth scroll to selected option
    this.scrollToSelected(200);
  },

  onSelect: function onSelect(event) {
    // do nothing when select selected option
    if (event.target.getAttribute('class') === 'selected') {
      return;
    }
    // change combobox selection
    var _props = this.props;
    var onSelect = _props.onSelect;
    var type = _props.type;

    var value = parseInt(event.target.innerHTML, 10);
    onSelect(type, value);
  },

  getOptions: function getOptions() {
    var _this = this;

    var _props2 = this.props;
    var options = _props2.options;
    var selectedIndex = _props2.selectedIndex;

    return options.map(function (item, index) {
      var cls = (0, _classnames2['default'])({ selected: selectedIndex === index });
      var ref = selectedIndex === index ? 'selected' : null;
      return _react2['default'].createElement(
        'li',
        { ref: ref, className: cls, key: index, onClick: _this.onSelect },
        item
      );
    });
  },

  scrollToSelected: function scrollToSelected(duration) {
    // move to selected item
    var select = _reactDom2['default'].findDOMNode(this);
    var list = _reactDom2['default'].findDOMNode(this.refs.list);
    var index = this.props.selectedIndex - 2;
    if (index < 0) {
      index = 0;
    }
    var topOption = list.children[index];
    var to = topOption.offsetTop - select.offsetTop;
    scrollTo(select, to, duration);
  },

  render: function render() {
    if (this.props.options.length === 0) {
      return null;
    }

    var prefixCls = this.props.prefixCls;

    return _react2['default'].createElement(
      'div',
      { className: prefixCls + '-select' },
      _react2['default'].createElement(
        'ul',
        { ref: 'list' },
        this.getOptions()
      )
    );
  }
});

exports['default'] = Select;
module.exports = exports['default'];