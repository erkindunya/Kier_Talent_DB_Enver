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
var mobx_react_1 = require("mobx-react");
var antd_1 = require("antd");
var FormItem_1 = require("antd/es/form/FormItem");
var SliderSelector_1 = require("./SliderSelector");
var PreviousYearRating = /** @class */ (function (_super) {
    __extends(PreviousYearRating, _super);
    function PreviousYearRating() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreviousYearRating.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(antd_1.Divider, { orientation: "left" }, "2017 Performance Rating"),
            React.createElement(antd_1.Row, { gutter: 20 },
                React.createElement(antd_1.Col, { span: 2 }),
                React.createElement(antd_1.Col, { span: 15 },
                    React.createElement(FormItem_1.default, { label: "Performance" },
                        React.createElement(SliderSelector_1.default, { items: this.props.store.LookupDataStore.PerformanceRatingLookupData, form: this.props.form, value: this.props.store.Talent.PreviousYear.Performance, controlId: "prevPerformance", validationMessage: "Please select a rating for the performance", changed: function () {
                            }, formatter: this.props.store.LookupDataStore.formatPerformanceTip, disabled: true, required: false })))),
            React.createElement(antd_1.Row, { gutter: 20 },
                React.createElement(antd_1.Col, { span: 2 }),
                React.createElement(antd_1.Col, { span: 10 },
                    React.createElement(FormItem_1.default, { label: "Performance" },
                        React.createElement(SliderSelector_1.default, { items: this.props.store.LookupDataStore.PotentialRatingLookupData, form: this.props.form, value: this.props.store.Talent.PreviousYear.Potential, controlId: "prevPerformance", validationMessage: "Please select a rating for the performance", changed: function () {
                            }, formatter: this.props.store.LookupDataStore.formatPotentialTip, disabled: true, required: false }))))));
    };
    PreviousYearRating = __decorate([
        mobx_react_1.observer,
        mobx_react_1.inject("store", "context")
    ], PreviousYearRating);
    return PreviousYearRating;
}(React.Component));
exports.PreviousYearRating = PreviousYearRating;
//# sourceMappingURL=PreviousYearRating.js.map