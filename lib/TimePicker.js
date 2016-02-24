'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcTrigger = require('rc-trigger');

var _rcTrigger2 = _interopRequireDefault(_rcTrigger);

var _rcUtil = require('rc-util');

var _modulePanel = require('./module/Panel');

var _modulePanel2 = _interopRequireDefault(_modulePanel);

var _utilPlacements = require('./util/placements');

var _utilPlacements2 = _interopRequireDefault(_utilPlacements);

var _mixinCommonMixin = require('./mixin/CommonMixin');

var _mixinCommonMixin2 = _interopRequireDefault(_mixinCommonMixin);

function noop() {}

function refFn(field, component) {
  this[field] = component;
}

var Picker = _react2['default'].createClass({
  displayName: 'Picker',

  propTypes: {
    prefixCls: _react.PropTypes.string,
    inputClassName: _react.PropTypes.string,
    locale: _react.PropTypes.object,
    value: _react.PropTypes.object,
    children: _react.PropTypes.func,
    disabled: _react.PropTypes.bool,
    defaultValue: _react.PropTypes.object,
    open: _react.PropTypes.bool,
    align: _react.PropTypes.object,
    placement: _react.PropTypes.any,
    transitionName: _react.PropTypes.string,
    placeholder: _react.PropTypes.string,
    formatter: _react.PropTypes.object,
    hourOptions: _react.PropTypes.array,
    minuteOptions: _react.PropTypes.array,
    secondOptions: _react.PropTypes.array,
    onChange: _react.PropTypes.func,
    onOpen: _react.PropTypes.func,
    onClose: _react.PropTypes.func
  },

  mixins: [_mixinCommonMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      open: false,
      align: {},
      placement: 'bottomLeft',
      onChange: noop,
      onOpen: noop,
      onClose: noop
    };
  },

  getInitialState: function getInitialState() {
    this.savePanelRef = refFn.bind(this, 'panelInstance');
    var _props = this.props;
    var open = _props.open;
    var defaultValue = _props.defaultValue;
    var value = _props.value;

    return {
      open: open,
      value: value || defaultValue
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    var open = nextProps.open;

    if (value !== undefined) {
      this.setState({
        value: value
      });
    }
    if (open !== undefined) {
      this.setState({ open: open });
    }
  },

  onPanelChange: function onPanelChange(value) {
    this.setValue(value);
  },

  onPanelClear: function onPanelClear() {
    this.setValue(null);
    this.setOpen(false);
  },

  onVisibleChange: function onVisibleChange(open) {
    var _this = this;

    this.setOpen(open, function () {
      if (open) {
        _reactDom2['default'].findDOMNode(_this.refs.picker).blur();
        _reactDom2['default'].findDOMNode(_this.panelInstance).focus();
      }
    });
  },

  setValue: function setValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value: value
      });
    }
    this.props.onChange(value);
  },

  getPanel: function getPanel() {
    var _props2 = this.props;
    var prefixCls = _props2.prefixCls;
    var defaultValue = _props2.defaultValue;
    var locale = _props2.locale;
    var formatter = _props2.formatter;
    var placeholder = _props2.placeholder;
    var hourOptions = _props2.hourOptions;
    var minuteOptions = _props2.minuteOptions;
    var secondOptions = _props2.secondOptions;

    return _react2['default'].createElement(_modulePanel2['default'], {
      prefixCls: prefixCls,
      defaultValue: defaultValue,
      locale: locale,
      formatter: formatter,
      placeholder: placeholder,
      hourOptions: hourOptions,
      minuteOptions: minuteOptions,
      secondOptions: secondOptions
    });
  },

  getPanelElement: function getPanelElement() {
    var panel = this.getPanel();
    var extraProps = {
      ref: this.savePanelRef,
      value: this.state.value,
      onChange: (0, _rcUtil.createChainedFunction)(panel.props.onChange, this.onPanelChange),
      onClear: (0, _rcUtil.createChainedFunction)(panel.props.onClear, this.onPanelClear)
    };

    return _react2['default'].cloneElement(panel, extraProps);
  },

  setOpen: function setOpen(open, callback) {
    var _props3 = this.props;
    var onOpen = _props3.onOpen;
    var onClose = _props3.onClose;

    if (this.state.open !== open) {
      this.setState({
        open: open
      }, callback);
      var _event = {
        open: open
      };
      if (open) {
        onOpen(_event);
      } else {
        onClose(_event);
      }
    }
  },

  render: function render() {
    var _props4 = this.props;
    var prefixCls = _props4.prefixCls;
    var placeholder = _props4.placeholder;
    var placement = _props4.placement;
    var align = _props4.align;
    var disabled = _props4.disabled;
    var transitionName = _props4.transitionName;
    var formatter = _props4.formatter;
    var inputClassName = _props4.inputClassName;
    var _state = this.state;
    var open = _state.open;
    var value = _state.value;

    return _react2['default'].createElement(
      _rcTrigger2['default'],
      {
        prefixCls: prefixCls + '-panel',
        popup: this.getPanelElement(),
        popupAlign: align,
        builtinPlacements: _utilPlacements2['default'],
        popupPlacement: placement,
        action: disabled ? [] : ['click'],
        destroyPopupOnHide: true,
        popupTransitionName: transitionName,
        popupVisible: open,
        onPopupVisibleChange: this.onVisibleChange
      },
      _react2['default'].createElement(
        'span',
        { className: '' + prefixCls },
        _react2['default'].createElement('input', { className: inputClassName, ref: 'picker', type: 'text', placeholder: placeholder, readOnly: true,
          disabled: disabled, value: value && formatter.format(value) }),
        _react2['default'].createElement('span', { className: prefixCls + '-icon' })
      )
    );
  }
});

exports['default'] = Picker;
module.exports = exports['default'];