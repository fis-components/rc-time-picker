'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _gregorianCalendar = require('gregorian-calendar');

var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);

var _gregorianCalendarLibLocaleZh_CN = require('gregorian-calendar/lib/locale/zh_CN');

var _gregorianCalendarLibLocaleZh_CN2 = _interopRequireDefault(_gregorianCalendarLibLocaleZh_CN);

var _mixinCommonMixin = require('../mixin/CommonMixin');

var _mixinCommonMixin2 = _interopRequireDefault(_mixinCommonMixin);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Combobox = require('./Combobox');

var _Combobox2 = _interopRequireDefault(_Combobox);

function noop() {}

function generateOptions(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(i);
  }
  return arr;
}

var Panel = _react2['default'].createClass({
  displayName: 'Panel',

  propTypes: {
    prefixCls: _react.PropTypes.string,
    value: _react.PropTypes.object,
    locale: _react.PropTypes.object,
    placeholder: _react.PropTypes.string,
    formatter: _react.PropTypes.object,
    hourOptions: _react.PropTypes.array,
    minuteOptions: _react.PropTypes.array,
    secondOptions: _react.PropTypes.array,
    onChange: _react.PropTypes.func,
    onClear: _react.PropTypes.func
  },

  mixins: [_mixinCommonMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      hourOptions: generateOptions(24),
      minuteOptions: generateOptions(60),
      secondOptions: generateOptions(60),
      onChange: noop,
      onClear: noop
    };
  },

  getInitialState: function getInitialState() {
    var value = this.props.value;
    if (!value) {
      value = new _gregorianCalendar2['default'](_gregorianCalendarLibLocaleZh_CN2['default']);
      value.setTime(Date.now());
    }
    return {
      value: value
    };
  },

  componentWillMount: function componentWillMount() {
    var formatter = this.props.formatter;
    var pattern = formatter.originalPattern;
    if (pattern === 'HH:mm') {
      this.showSecond = false;
    } else if (pattern === 'mm:ss') {
      this.showHour = false;
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    if (value) {
      this.setState({
        value: value
      });
    }
  },

  onChange: function onChange(newValue) {
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  },

  onClear: function onClear() {
    this.props.onClear();
  },

  showHour: true,
  showSecond: true,

  render: function render() {
    var _props = this.props;
    var locale = _props.locale;
    var prefixCls = _props.prefixCls;
    var placeholder = _props.placeholder;
    var hourOptions = _props.hourOptions;
    var minuteOptions = _props.minuteOptions;
    var secondOptions = _props.secondOptions;

    var value = this.state.value;
    var cls = (0, _classnames2['default'])({ 'narrow': !this.showHour || !this.showSecond });

    return _react2['default'].createElement(
      'div',
      { className: prefixCls + '-panel-inner ' + cls },
      _react2['default'].createElement(_Header2['default'], {
        prefixCls: prefixCls,
        gregorianTimePickerLocale: value.locale,
        locale: locale,
        value: value,
        formatter: this.getFormatter(),
        placeholder: placeholder,
        hourOptions: hourOptions,
        minuteOptions: minuteOptions,
        secondOptions: secondOptions,
        onChange: this.onChange,
        onClear: this.onClear,
        showClear: true
      }),
      _react2['default'].createElement(_Combobox2['default'], {
        prefixCls: prefixCls,
        value: value,
        formatter: this.getFormatter(),
        onChange: this.onChange,
        showHour: this.showHour,
        showSecond: this.showSecond,
        hourOptions: hourOptions,
        minuteOptions: minuteOptions,
        secondOptions: secondOptions
      })
    );
  }
});

exports['default'] = Panel;
module.exports = exports['default'];