'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _localeEn_US = require('../locale/en_US');

var _localeEn_US2 = _interopRequireDefault(_localeEn_US);

var _utilIndex = require('../util/index');

exports['default'] = {
  propTypes: {
    prefixCls: _react.PropTypes.string,
    locale: _react.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-time-picker',
      locale: _localeEn_US2['default']
    };
  },

  getFormatter: function getFormatter() {
    var formatter = this.props.formatter;
    var locale = this.props.locale;
    if (formatter) {
      if (formatter === this.lastFormatter) {
        return this.normalFormatter;
      }
      this.normalFormatter = (0, _utilIndex.getFormatter)(formatter, locale);
      this.lastFormatter = formatter;
      return this.normalFormatter;
    }
    if (!this.showSecond) {
      if (!this.notShowSecondFormatter) {
        this.notShowSecondFormatter = (0, _utilIndex.getFormatter)('HH:mm', locale);
      }
      return this.notShowSecondFormatter;
    }
    if (!this.showHour) {
      if (!this.notShowHourFormatter) {
        this.notShowHourFormatter = (0, _utilIndex.getFormatter)('mm:ss', locale);
      }
      return this.notShowHourFormatter;
    }
    if (!this.normalFormatter) {
      this.normalFormatter = (0, _utilIndex.getFormatter)('HH:mm:ss', locale);
    }
    return this.normalFormatter;
  }
};
module.exports = exports['default'];