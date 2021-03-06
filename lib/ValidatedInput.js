'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapLibInput = require('react-bootstrap/lib/Input');

var _reactBootstrapLibInput2 = _interopRequireDefault(_reactBootstrapLibInput);

var ValidatedInput = (function (_React$Component) {
    _inherits(ValidatedInput, _React$Component);

    function ValidatedInput() {
        _classCallCheck(this, ValidatedInput);

        _get(Object.getPrototypeOf(ValidatedInput.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ValidatedInput, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.context.Validator.registerInput(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.context.Validator.unregisterInput(this);
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var value = undefined;

            if (this.props.type === 'checkbox') {
                value = this.refs.input.getChecked();
            } else if (this.props.type === 'file') {
                value = this.refs.input.getInputDOMNode().files;
            } else {
                value = this.refs.input.getValue();
            }

            return value;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var validate = _props.validate;
            var errorHelp = _props.errorHelp;
            var validationEvent = _props.validationEvent;

            var props = _objectWithoutProperties(_props, ['validate', 'errorHelp', 'validationEvent']);

            return _react2['default'].createElement(
                _reactBootstrapLibInput2['default'],
                _extends({}, props, this._getValidatorProps(), {
                    ref: 'input' }),
                this.props.children
            );
        }
    }, {
        key: '_getDefaultValue',
        value: function _getDefaultValue() {
            var key = 'defaultValue',
                value = this.context.Validator.getValue(this.props.name);

            if (this.props.type === 'checkbox') {
                key = 'defaultChecked';
            }

            return { key: key, value: value };
        }
    }, {
        key: '_getValidation',
        value: function _getValidation() {
            var error = this.context.Validator.hasError(this.props.name),
                bsStyle = false,
                help = false;

            if (error) {
                bsStyle = 'error';

                if (typeof error === 'string') {
                    help = error;
                } else if (this.props.errorHelp) {
                    help = this.props.errorHelp;
                }
            }

            return { bsStyle: bsStyle, help: help };
        }
    }, {
        key: '_getValidatorProps',
        value: function _getValidatorProps() {
            var _this = this;

            var eventName = this.props.validationEvent ? this.props.validationEvent : this.context.Validator.validationEvent;

            var _getDefaultValue2 = this._getDefaultValue();

            var key = _getDefaultValue2.key;
            var value = _getDefaultValue2.value;

            var _getValidation2 = this._getValidation();

            var bsStyle = _getValidation2.bsStyle;
            var help = _getValidation2.help;
            var callback = function callback(event) {
                _this.context.Validator.updateInput(_this.props.name, _this.getValue());
                _this.context.Validator.validateInput(_this.props.name);

                return _this.props[eventName] && _this.props[eventName](event);
            };
            var newProps = {
                validationEvent: eventName
            };

            newProps[eventName] = callback;

            if (value) {
                newProps[key] = value;
            }

            if (bsStyle) {
                newProps.bsStyle = bsStyle;
            }

            if (help) {
                newProps.help = help;
            }

            return newProps;
        }
    }]);

    return ValidatedInput;
})(_react2['default'].Component);

exports['default'] = ValidatedInput;

ValidatedInput.propTypes = _Object$assign({}, _reactBootstrapLibInput2['default'].propTypes, {
    validationEvent: _react2['default'].PropTypes.oneOf(['', 'onChange', 'onBlur', 'onFocus']),
    validate: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.func, _react2['default'].PropTypes.string]),
    errorHelp: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.object])
});

ValidatedInput.contextTypes = {
    Validator: _react2['default'].PropTypes.object.isRequired
};

ValidatedInput.defaultProps = _reactBootstrapLibInput2['default'].defaultProps;
module.exports = exports['default'];