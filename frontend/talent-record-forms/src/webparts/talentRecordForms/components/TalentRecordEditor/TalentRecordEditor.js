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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var CascadeSelector_1 = require("./controls/CascadeSelector");
var Selector_1 = require("./controls/Selector");
var NewHireSwitch_1 = require("./controls/NewHireSwitch");
var SliderSelector_1 = require("./controls/SliderSelector");
var UserSelector_1 = require("./controls/UserSelector");
var OptionsSelector_1 = require("./controls/OptionsSelector");
;
var mobx_react_1 = require("mobx-react");
var FormItem = antd_1.Form.Item;
var Header = antd_1.Layout.Header, Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer, Sider = antd_1.Layout.Sider;
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(function (field) { return fieldsError[field]; });
}
var TalentRecordEditor = /** @class */ (function (_super) {
    __extends(TalentRecordEditor, _super);
    function TalentRecordEditor() {
        var _this = _super.call(this) || this;
        _this.handleSubmit = function (e) {
            console.log("Form Submitted");
        };
        _this.formatPerformanceTip = function (value) {
            //Todo : refactor to make it more intelligent
            if (value == 0)
                return 1;
            if (value == 25)
                return 2;
            if (value == 50)
                return 3;
            if (value == 75)
                return 4;
            if (value == 100)
                return 5;
            return value;
        };
        _this.formatPotentialTip = function (value) {
            //Todo : refactor to make it more intelligent
            if (value == 0)
                return 'A';
            if (value == 50)
                return 'B';
            if (value == 100)
                return 'C';
            return value;
        };
        _this.OnBuinsessUnitChange = function (newBusinessUnit) {
            _this.props.store.Talent.changeBusinessUnit(newBusinessUnit);
            console.log("Business Unit changed " + newBusinessUnit);
        };
        _this.OnFunctionChange = function (newFunction) {
        };
        _this.OnAreaHeadChange = function (newHeadArea) {
        };
        _this.OnEmployeeChange = function (newEmployeeName) {
        };
        _this.OnEmployeeIDChange = function (newEmployeeId) {
        };
        _this.OnGradeChange = function (newGrade) {
        };
        _this.OnPositionChange = function (newPosition) {
        };
        _this.OnMovementChange = function (newMovement) {
        };
        _this.OnFlightRiskChange = function (newFlightRisk) {
        };
        _this.OnBusinessRiskChange = function (newBusinessRisk) {
        };
        _this.OnPotentialRatingChange = function (newPotentialRating) {
        };
        _this.OnPerformanceRatingChange = function (newPerformanceRating) {
        };
        _this.OnDevelopmentRequirement01Change = function (newRequirement) {
        };
        _this.OnDevelopmentRequirement02Change = function (newRequirement) {
        };
        _this.onSubmit = function () {
            console.log("Submitting");
            _this.props.store.TalentDataStore.SaveTalentRecord();
        };
        _this.state = {
            formLayout: 'vertical',
        };
        return _this;
    }
    TalentRecordEditor.prototype.render = function () {
        var _a = this.props.form, getFieldDecorator = _a.getFieldDecorator, getFieldsError = _a.getFieldsError, getFieldError = _a.getFieldError, isFieldTouched = _a.isFieldTouched;
        var businessUnitsError = isFieldTouched('businessUnits') && getFieldError('businessUnits');
        var passwordError = isFieldTouched('password') && getFieldError('password');
        var formLayout = this.state.formLayout;
        var Option = antd_1.Select.Option;
        return (React.createElement("div", null,
            React.createElement(antd_1.Row, null,
                React.createElement(antd_1.Col, { span: 24 },
                    React.createElement(antd_1.Form, { layout: "vertical", onSubmit: this.handleSubmit, style: { border: '0px solid black', padding: '0px 5px 5px 5px' } },
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "Employee Information"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 16 },
                                React.createElement(FormItem, __assign({ label: React.createElement("span", null,
                                        "Business Unit\u00A0",
                                        React.createElement(antd_1.Tooltip, { title: "You have to select the Division->Unit->Stream->Location?" },
                                            React.createElement(antd_1.Icon, { type: "question-circle-o" }))) }, formItemLayout),
                                    React.createElement(CascadeSelector_1.default, { items: this.props.store.LookupDataStore.BusinessUnitsLookupData, value: this.props.store.Talent.BusinessUnits, form: this.props.form, placeholder: "Please select a business unit", validationMessage: 'Please select a business unit!', controlId: "businessUnits", changed: this.OnBuinsessUnitChange }))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Function" }, formItemLayout),
                                    React.createElement(Selector_1.default, { items: this.props.store.LookupDataStore.BusinessFunctionsLookupData, form: this.props.form, value: this.props.store.Talent.Function, placeholder: 'Please select a business function', controlId: "businessFunctions", validationMessage: 'Please select a function!', changed: this.OnFunctionChange })))),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Head of Area" }, formItemLayout), getFieldDecorator('AreaHead', {
                                    rules: [{ required: true, message: 'Head of Area?' }],
                                })(React.createElement(UserSelector_1.default, null)))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Manager's Name" }, formItemLayout), getFieldDecorator('managerName', {
                                    rules: [{ required: true, message: 'manager name?' }],
                                })(React.createElement(UserSelector_1.default, null)))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Employee" }, formItemLayout), getFieldDecorator('employee', {
                                    initialValue: "Khalil, Mohamed",
                                    rules: [{ required: true, message: 'employee name?' }],
                                })(React.createElement(UserSelector_1.default, null))))),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Employee ID" }, formItemLayout), getFieldDecorator('EmployeeId', {
                                    rules: [{ required: true, message: 'Employee ID?' }],
                                })(React.createElement(antd_1.Input, { size: "small", placeholder: "Employee ID" })))),
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Grade" }, formItemLayout),
                                    React.createElement(Selector_1.default, { items: this.props.store.LookupDataStore.GradeLookupData, form: this.props.form, value: this.props.store.Talent.Grade, placeholder: 'Please select a grade', controlId: "grade", validationMessage: 'Please select a grade!', changed: this.OnGradeChange }))),
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Position" }, formItemLayout), getFieldDecorator('position', {
                                    initialValue: "IT Developer",
                                    rules: [{ required: true, message: 'position?' }],
                                })(React.createElement(antd_1.Input, { size: "small", placeholder: "Position" }))))),
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "Performance & Potential Ratings"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 4 },
                                React.createElement(FormItem, __assign({ label: "New To Rate?" }, formItemLayout), getFieldDecorator('newToRate', {
                                    rules: [{ required: true, message: 'Too new to rate ?' }],
                                })(React.createElement(NewHireSwitch_1.default, null)))),
                            React.createElement(antd_1.Col, { span: 10 },
                                React.createElement(FormItem, __assign({ label: "Performance Rating" }, formItemLayout),
                                    React.createElement(SliderSelector_1.default, { items: this.props.store.LookupDataStore.PerformanceRatingLookupData, form: this.props.form, value: this.props.store.Talent.Performance, controlId: "performance", validationMessage: "Please select a rating for the performance", changed: this.OnPerformanceRatingChange, formatter: this.formatPerformanceTip }))),
                            React.createElement(antd_1.Col, { span: 10 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Potential Rating" }, formItemLayout),
                                    React.createElement(SliderSelector_1.default, { items: this.props.store.LookupDataStore.PotentialRatingLookupData, form: this.props.form, value: this.props.store.Talent.Potential, controlId: "potential", validationMessage: "Please select a rating for the potential", changed: this.OnPotentialRatingChange, formatter: this.formatPotentialTip })))),
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "Movement"),
                        React.createElement(FormItem, __assign({ label: "Movement Status" }, formItemLayout),
                            React.createElement(OptionsSelector_1.default, { items: this.props.store.LookupDataStore.MovementLookupData, form: this.props.form, value: this.props.store.Talent.Movement, controlId: "movement", validationMessage: "Please select a movement status", changed: this.OnMovementChange })),
                        React.createElement(antd_1.Divider, null, "Risk"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 12 },
                                React.createElement(FormItem, __assign({ label: "Flight Risk" }, formItemLayout),
                                    React.createElement(OptionsSelector_1.default, { items: this.props.store.LookupDataStore.RiskLookupData, form: this.props.form, value: this.props.store.Talent.FlightRisk, controlId: "flightRisk", validationMessage: "Please select flight risk!", changed: this.OnFlightRiskChange }))),
                            React.createElement(antd_1.Col, { span: 12 }, React.createElement(FormItem, __assign({ label: "Business Risk" }, formItemLayout),
                                React.createElement(OptionsSelector_1.default, { items: this.props.store.LookupDataStore.RiskLookupData, form: this.props.form, value: this.props.store.Talent.BusinessRisk, controlId: "businessRisk", validationMessage: "Please select business risk!", changed: this.OnBusinessRiskChange })))),
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "Development Requirements"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 12 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Development Requirements 1st" }, formItemLayout),
                                    React.createElement(CascadeSelector_1.default, { items: this.props.store.LookupDataStore.DevelopmentRequirementsLookupData, form: this.props.form, value: this.props.store.Talent.DevelopmentRequirement01, placeholder: "Please select a development requirement", validationMessage: 'Please select a developement requirement!', controlId: "developmentRequirement_01", changed: this.OnDevelopmentRequirement01Change }))),
                            React.createElement(antd_1.Col, { span: 12 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Development Requirements 2nd" }, formItemLayout),
                                    React.createElement(CascadeSelector_1.default, { items: this.props.store.LookupDataStore.DevelopmentRequirementsLookupData, form: this.props.form, value: this.props.store.Talent.DevelopmentRequirement02, placeholder: "Please select a development requirement", validationMessage: 'Please select a developement requirement!', controlId: "developmentRequirement_02", changed: this.OnDevelopmentRequirement01Change })))),
                        React.createElement(antd_1.Row, null,
                            React.createElement(antd_1.Col, { span: 24 },
                                React.createElement(FormItem, __assign({ label: "Notes" }, formItemLayout), getFieldDecorator('devNotes', {
                                    rules: [{ required: true, message: 'Please fill in some comments' }],
                                })(React.createElement(antd_1.Input.TextArea, { rows: 5 }))))),
                        React.createElement(antd_1.Row, null,
                            React.createElement(antd_1.Col, { span: 24 },
                                React.createElement(antd_1.Row, null,
                                    React.createElement(antd_1.Col, { span: 24, style: { textAlign: 'right' } },
                                        React.createElement(antd_1.Button, { type: "primary", htmlType: "submit", disabled: hasErrors(getFieldsError()), onClick: this.onSubmit }, "Submit"),
                                        React.createElement(antd_1.Button, { style: { marginLeft: 8 }, htmlType: "reset" }, "Clear"),
                                        React.createElement(antd_1.Button, { style: { marginLeft: 8 }, htmlType: "button" }, "Cancel"))))))))));
    };
    TalentRecordEditor = __decorate([
        mobx_react_1.inject("store", "context"),
        mobx_react_1.observer
    ], TalentRecordEditor);
    return TalentRecordEditor;
}(React.Component));
var wrappedForm = antd_1.Form.create()(TalentRecordEditor);
exports.default = wrappedForm;
/*const formItemLayout = formLayout === 'horizontal' ? {
  labelCol: { span: 4 },
  wrapperCol: { span: 7 },
} : null;*/
var formItemLayout = {};
//# sourceMappingURL=TalentRecordEditor.js.map