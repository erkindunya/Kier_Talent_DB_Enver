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
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
var SliderSelector = /** @class */ (function (_super) {
    __extends(SliderSelector, _super);
    function SliderSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (value) {
            _this.props.changed(_this.props.items[value]);
        };
        _this.BuildSelector = function () {
            return (React.createElement(antd_1.Slider, { disabled: _this.props.disabled, onChange: _this.handleChange, marks: _this.props.items, tipFormatter: _this.props.formatter, step: null }));
        };
        return _this;
    }
    SliderSelector.prototype.render = function () {
        var initialValue = (this.props.value) ? sp_lodash_subset_1.invert(this.props.items)[this.props.value] : 0;
        var options = (this.props.value) ? {
            initialValue: initialValue,
            rules: [{ required: this.props.required, message: this.props.validationMessage }]
        } : {
            rules: [{ required: this.props.required, message: this.props.validationMessage }]
        };
        var element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.BuildSelector());
        return element;
    };
    SliderSelector = __decorate([
        mobx_react_1.observer
    ], SliderSelector);
    return SliderSelector;
}(React.Component));
exports.default = SliderSelector;
//# sourceMappingURL=SliderSelector.js.map