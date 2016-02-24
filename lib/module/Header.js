'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Header = _react2['default'].createClass({
  displayName: 'Header',

  propTypes: {
    formatter: _react.PropTypes.object,
    prefixCls: _react.PropTypes.string,
    gregorianTimePickerLocale: _react.PropTypes.object,
    locale: _react.PropTypes.object,
    disabledDate: _react.PropTypes.func,
    placeholder: _react.PropTypes.string,
    value: _react.PropTypes.object,
    hourOptions: _react.PropTypes.array,
    minuteOptions: _react.PropTypes.array,
    secondOptions: _react.PropTypes.array,
    onChange: _react.PropTypes.func,
    onClear: _react.PropTypes.func,
    showClear: _react.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    var value = this.props.value;
    return {
      str: value && this.props.formatter.format(value) || '',
      invalid: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    this.setState({
      str: value && nextProps.formatter.format(value) || '',
      invalid: false
    });
  },

  onInputChange: function onInputChange(event) {
    var str = event.target.value;
    this.setState({
      str: str
    });
    var value = null;
    var _props = this.props;
    var formatter = _props.formatter;
    var gregorianTimePickerLocale = _props.gregorianTimePickerLocale;
    var hourOptions = _props.hourOptions;
    var minuteOptions = _props.minuteOptions;
    var secondOptions = _props.secondOptions;
    var onChange = _props.onChange;

    if (str) {
      var originalValue = this.props.value;
      try {
        value = formatter.parse(str, {
          locale: gregorianTimePickerLocale,
          obeyCount: true
        });
      } catch (ex) {
        this.setState({
          invalid: true
        });
        return;
      }

      if (value) {
        if (hourOptions.indexOf(value.getHourOfDay()) < 0 || minuteOptions.indexOf(value.getMinutes()) < 0 || secondOptions.indexOf(value.getSeconds()) < 0) {
          this.setState({
            invalid: true
          });
          return;
        }

        if (originalValue && value) {
          if (originalValue.getHourOfDay() !== value.getHourOfDay() || originalValue.getMinutes() !== value.getMinutes() || originalValue.getSeconds() !== value.getSeconds()) {
            onChange(value);
          }
        } else if (originalValue !== value) {
          onChange(value);
        }
      } else {
        this.setState({
          invalid: true
        });
        return;
      }
    } else {
      onChange(null);
    }

    this.setState({
      invalid: false
    });
  },

  onClear: function onClear() {
    this.setState({ str: '' });
    this.props.onClear();
  },

  getClearButton: function getClearButton() {
    var _props2 = this.props;
    var locale = _props2.locale;
    var prefixCls = _props2.prefixCls;
    var showClear = _props2.showClear;

    if (!showClear) {
      return null;
    }
    return _react2['default'].createElement('a', { className: prefixCls + '-clear-btn', role: 'button', title: locale.clear, onMouseDown: this.onClear });
  },

  getInput: function getInput() {
    var _props3 = this.props;
    var prefixCls = _props3.prefixCls;
    var placeholder = _props3.placeholder;
    var _state = this.state;
    var invalid = _state.invalid;
    var str = _state.str;

    var invalidClass = invalid ? prefixCls + '-input-invalid' : '';
    return _react2['default'].createElement('input', { className: prefixCls + '-input  ' + invalidClass, value: str, placeholder: placeholder, onChange: this.onInputChange });
  },

  render: function render() {
    var prefixCls = this.props.prefixCls;

    return _react2['default'].createElement(
      'div',
      { className: prefixCls + '-input-wrap' },
      this.getInput(),
      this.getClearButton()
    );
  }
});

exports['default'] = Header;
module.exports = exports['default'];