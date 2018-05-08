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
var DevelopmentRequirementCascader = /** @class */ (function (_super) {
    __extends(DevelopmentRequirementCascader, _super);
    function DevelopmentRequirementCascader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DevelopmentRequirementCascader.prototype.onChange = function (value) {
        console.log(value);
    };
    DevelopmentRequirementCascader.prototype.render = function () {
        return (React.createElement(antd_1.Cascader, { options: this.props.items, onChange: this.onChange, placeholder: "Please a development option" }));
    };
    DevelopmentRequirementCascader = __decorate([
        mobx_react_1.observer
    ], DevelopmentRequirementCascader);
    return DevelopmentRequirementCascader;
}(React.Component));
exports.default = DevelopmentRequirementCascader;
//# sourceMappingURL=DevelopmentRequirementCascader.js.map