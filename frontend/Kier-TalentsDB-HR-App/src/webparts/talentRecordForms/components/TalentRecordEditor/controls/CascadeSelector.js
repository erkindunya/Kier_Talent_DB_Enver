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
var antd_1 = require("antd");
var React = require("react");
var mobx_react_1 = require("mobx-react");
var CascadeSelector = /** @class */ (function (_super) {
    __extends(CascadeSelector, _super);
    function CascadeSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BuildCascader = function () {
            return (React.createElement(antd_1.Cascader, { options: _this.props.items, placeholder: _this.props.placeholder, onChange: _this.OnChange, size: "small", changeOnSelect: true, disabled: _this.props.disabled }));
        };
        _this.OnChange = function (value) {
            _this.props.changed(value);
        };
        return _this;
    }
    CascadeSelector.prototype.render = function () {
        var initialValue = (this.props.item) ? this.props.item : [];
        var options = (this.props.item) ? {
            initialValue: initialValue,
            rules: [{ required: this.props.required, message: this.props.validationMessage }]
        } : {
            rules: [{ required: this.props.required, message: this.props.validationMessage }]
        };
        var element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.BuildCascader());
        return element;
    };
    CascadeSelector = __decorate([
        mobx_react_1.inject("store"),
        mobx_react_1.observer
    ], CascadeSelector);
    return CascadeSelector;
}(React.Component));
exports.default = CascadeSelector;
//# sourceMappingURL=CascadeSelector.js.map