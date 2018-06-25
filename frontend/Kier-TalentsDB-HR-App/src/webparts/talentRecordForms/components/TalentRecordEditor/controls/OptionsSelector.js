"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var OptionsSelector = /** @class */ (function (_super) {
    __extends(OptionsSelector, _super);
    function OptionsSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (e) {
            console.log(e.target.value);
            _this.props.changed(e.target.value);
        };
        _this.buildSelector = function () {
            var RadioButton = antd_1.Radio.Button;
            var RadioGroup = antd_1.Radio.Group;
            var content = "Welcome Welceom";
            return (React.createElement(RadioGroup, { size: "small", onChange: _this.handleChange, disabled: _this.props.disbaled }, _this.props.items.map(function (i) { return React.createElement(antd_1.Radio, { value: i.value }, i.label); })));
        };
        return _this;
    }
    OptionsSelector.prototype.render = function () {
        var initialValue = (this.props.value) ? this.props.value : [];
        var options = (this.props.value) ? {
            initialValue: initialValue,
            rules: [{ required: true, message: this.props.validationMessage }]
        } : {
            rules: [{ required: true, message: this.props.validationMessage }]
        };
        var element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.buildSelector());
        return element;
    };
    return OptionsSelector;
}(React.Component));
exports.default = OptionsSelector;
//# sourceMappingURL=OptionsSelector.js.map