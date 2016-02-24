'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var formatOption = function formatOption(option) {
  if (option < 10) {
    return '0' + option;
  }
  return '' + option;
};

var Combobox = _react2['default'].createClass({
  displayName: 'Combobox',

  propTypes: {
    formatter: _react.PropTypes.object,
    prefixCls: _react.PropTypes.string,
    value: _react.PropTypes.object,
    onChange: _react.PropTypes.func,
    showHour: _react.PropTypes.bool,
    showSecond: _react.PropTypes.bool,
    hourOptions: _react.PropTypes.array,
    minuteOptions: _react.PropTypes.array,
    secondOptions: _react.PropTypes.array
  },

  onItemChange: function onItemChange(type, itemValue) {
    var _props = this.props;
    var value = _props.value;
    var onChange = _props.onChange;

    if (type === 'hour') {
      value.setHourOfDay(itemValue);
    } else if (type === 'minute') {
      value.setMinutes(itemValue);
    } else {
      value.setSeconds(itemValue);
    }
    onChange(value);
  },

  getHourSelect: function getHourSelect(hour) {
    var _props2 = this.props;
    var prefixCls = _props2.prefixCls;
    var hourOptions = _props2.hourOptions;
    var showHour = _props2.showHour;

    if (!showHour) {
      return null;
    }
    return _react2['default'].createElement(_Select2['default'], {
      prefixCls: prefixCls,
      options: hourOptions.map(function (option) {
        return formatOption(option);
      }),
      selectedIndex: hourOptions.indexOf(hour),
      type: 'hour',
      onSelect: this.onItemChange
    });
  },

  getMinuteSelect: function getMinuteSelect(minute) {
    var _props3 = this.props;
    var prefixCls = _props3.prefixCls;
    var minuteOptions = _props3.minuteOptions;

    return _react2['default'].createElement(_Select2['default'], {
      prefixCls: prefixCls,
      options: minuteOptions.map(function (option) {
        return formatOption(option);
      }),
      selectedIndex: minuteOptions.indexOf(minute),
      type: 'minute',
      onSelect: this.onItemChange
    });
  },

  getSectionSelect: function getSectionSelect(second) {
    var _props4 = this.props;
    var prefixCls = _props4.prefixCls;
    var secondOptions = _props4.secondOptions;
    var showSecond = _props4.showSecond;

    if (!showSecond) {
      return null;
    }
    return _react2['default'].createElement(_Select2['default'], {
      prefixCls: prefixCls,
      options: secondOptions.map(function (option) {
        return formatOption(option);
      }),
      selectedIndex: secondOptions.indexOf(second),
      type: 'second',
      onSelect: this.onItemChange
    });
  },

  render: function render() {
    var _props5 = this.props;
    var prefixCls = _props5.prefixCls;
    var value = _props5.value;

    return _react2['default'].createElement(
      'div',
      { className: prefixCls + '-combobox' },
      this.getHourSelect(value.getHourOfDay()),
      this.getMinuteSelect(value.getMinutes()),
      this.getSectionSelect(value.getSeconds())
    );
  }
});

exports['default'] = Combobox;
module.exports = exports['default'];