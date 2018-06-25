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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var mobx_react_1 = require("mobx-react");
var Selector = /** @class */ (function (_super) {
    __extends(Selector, _super);
    function Selector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (value) {
            console.log(value);
            _this.props.changed(value);
        };
        _this.buildFunctionSelector = function () {
            var Option = antd_1.Select.Option;
            return (React.createElement(antd_1.Select, { disabled: _this.props.disabled, size: "small", onChange: _this.handleChange, placeholder: _this.props.placeholder }, _this.props.items.map(function (f) { return React.createElement(Option, { value: f.value }, f.label); })));
        };
        return _this;
    }
    Selector.prototype.render = function () {
        var initialValue = (this.props.value) ? this.props.value : [];
        var options = (this.props.value) ? {
            initialValue: initialValue,
            rules: [{ required: true, message: this.props.validationMessage }]
        } : {
            rules: [{ required: true, message: this.props.validationMessage }]
        };
        var element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.buildFunctionSelector());
        return element;
    };
    Selector = __decorate([
        mobx_react_1.observer
    ], Selector);
    return Selector;
}(React.Component));
exports.default = Selector;
//# sourceMappingURL=Selector.js.map