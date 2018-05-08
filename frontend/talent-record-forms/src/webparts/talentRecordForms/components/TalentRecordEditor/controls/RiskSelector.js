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
var RiskSelector = /** @class */ (function (_super) {
    __extends(RiskSelector, _super);
    function RiskSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (e) {
            console.log(e.target.value);
        };
        _this.buildRiskSelector = function () {
            var RadioButton = antd_1.Radio.Button;
            var RadioGroup = antd_1.Radio.Group;
            return (React.createElement(RadioGroup, { onChange: _this.handleChange }, _this.props.items.map(function (r) { return React.createElement(RadioButton, { value: r.value }, r.label); })));
        };
        return _this;
    }
    RiskSelector.prototype.render = function () {
        return this.buildRiskSelector();
    };
    RiskSelector = __decorate([
        mobx_react_1.observer
    ], RiskSelector);
    return RiskSelector;
}(React.Component));
exports.default = RiskSelector;
//# sourceMappingURL=RiskSelector.js.map