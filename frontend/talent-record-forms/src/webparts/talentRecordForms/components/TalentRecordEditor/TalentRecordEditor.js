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
var BusinessUnitsCascader_1 = require("./controls/BusinessUnitsCascader");
var FunctionSelector_1 = require("./controls/FunctionSelector");
var RiskSelector_1 = require("./controls/RiskSelector");
var NewHireSwitch_1 = require("./controls/NewHireSwitch");
var PerformanceRatingSlider_1 = require("./controls/SliderSelector");
var PotentialRatingSlider_1 = require("./controls/SliderSelector");
var UserSelector_1 = require("./controls/UserSelector");
var MovementStatusSelector_1 = require("./controls/MovementStatusSelector");
var DevelopmentRequirementCascader_1 = require("./controls/DevelopmentRequirementCascader");
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
        _this.state = {
            formLayout: 'vertical',
        };
        return _this;
    }
    TalentRecordEditor.prototype.componentDidMount = function () {
        //console.log(this.props.store.BusinessFunctions.items.length);
    };
    TalentRecordEditor.prototype.render = function () {
        var _a = this.props.form, getFieldDecorator = _a.getFieldDecorator, getFieldsError = _a.getFieldsError, getFieldError = _a.getFieldError, isFieldTouched = _a.isFieldTouched;
        var userNameError = isFieldTouched('userName') && getFieldError('userName');
        var passwordError = isFieldTouched('password') && getFieldError('password');
        var formLayout = this.state.formLayout;
        var Option = antd_1.Select.Option;
        /*const formItemLayout = formLayout === 'horizontal' ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 7 },
        } : null;*/
        var formItemLayout = {};
        return (React.createElement("div", null,
            React.createElement(antd_1.Row, null,
                React.createElement(antd_1.Col, { span: 24, style: { height: '112px', backgroundColor: "#078181" } },
                    React.createElement("div", { style: {
                            margin: '38px 54px 56px 32px',
                            fontSize: '16px',
                            fontWeight: 200,
                            letterSpacing: '1px',
                            lineHeight: '18px',
                            backgroundColor: "#078181",
                            color: 'white'
                        } },
                        "CREATE A ",
                        React.createElement("b", null, "TALENT RECORD")))),
            React.createElement(antd_1.Row, null,
                React.createElement(antd_1.Col, { span: 24 },
                    React.createElement(antd_1.Form, { layout: "vertical", onSubmit: this.handleSubmit, style: { border: '2px solid black', padding: '0px 5px 5px 5px' } },
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "Employee Information"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 16 },
                                React.createElement(FormItem, __assign({ label: "Business Unit" }, formItemLayout), getFieldDecorator('businessUnit', {
                                    rules: [{ required: true, message: 'Please select a business unit!' }],
                                })(React.createElement(BusinessUnitsCascader_1.default, { items: this.props.store.LookupDataStore.BusinessUnitsLookupData })))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Function" }, formItemLayout), getFieldDecorator('function', {
                                    rules: [{ required: true, message: 'Please select a function!' }],
                                })(React.createElement(FunctionSelector_1.default, { items: this.props.store.LookupDataStore.BusinessFunctionsLookupData }))))),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Head of Area" }, formItemLayout), getFieldDecorator('areaHead', {
                                    rules: [{ required: true, message: 'Head of Area?' }],
                                })(React.createElement(UserSelector_1.default, null)))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Manager's Name" }, formItemLayout), getFieldDecorator('managerName', {
                                    rules: [{ required: true, message: 'manager name?' }],
                                })(React.createElement(UserSelector_1.default, null)))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Employee" }, formItemLayout), getFieldDecorator('employee', {
                                    rules: [{ required: true, message: 'employee name?' }],
                                })(React.createElement(UserSelector_1.default, null))))),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Employee ID" }, formItemLayout), getFieldDecorator('employeeId', {
                                    rules: [{ required: true, message: 'Employee ID?' }],
                                })(React.createElement(antd_1.Input, { placeholder: "Employee ID" })))),
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Grade" }, formItemLayout), getFieldDecorator('grade', {
                                    rules: [{ required: true, message: 'grade?' }],
                                })(React.createElement(antd_1.Select, { showSearch: true, placeholder: "Select a grade" },
                                    React.createElement(Option, { value: "L1" }, "L1"),
                                    React.createElement(Option, { value: "L2" }, "L2"),
                                    React.createElement(Option, { value: "M1" }, "M1"),
                                    React.createElement(Option, { value: "M2" }, "M2"),
                                    React.createElement(Option, { value: "M3" }, "M3"))))),
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Position" }, formItemLayout), getFieldDecorator('position', {
                                    rules: [{ required: true, message: 'position?' }],
                                })(React.createElement(antd_1.Input, { placeholder: "Position" }))))),
                        React.createElement(antd_1.Divider, null, "Performance & Potential Ratings"),
                        React.createElement(antd_1.Row, null,
                            React.createElement(antd_1.Col, null,
                                React.createElement(FormItem, __assign({ label: "Too New To Rate?" }, formItemLayout), getFieldDecorator('newToRate', {
                                    rules: [{ required: true, message: 'Too new to rate ?' }],
                                })(React.createElement(NewHireSwitch_1.default, null))))),
                        React.createElement(antd_1.Row, { gutter: 50 },
                            React.createElement(antd_1.Col, { span: 11 },
                                React.createElement(FormItem, __assign({ label: "Performance Rating" }, formItemLayout), getFieldDecorator('performanceRating', {
                                    rules: [{ required: true, message: 'Performance Rating ?' }],
                                })(React.createElement(PerformanceRatingSlider_1.default, null)))),
                            React.createElement(antd_1.Col, { span: 2 }),
                            React.createElement(antd_1.Col, { span: 11 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Potential Rating" }, formItemLayout), getFieldDecorator('potentialRating', {
                                    rules: [{ required: true, message: 'Potential Rating ?' }],
                                })(React.createElement(PotentialRatingSlider_1.default, null))))),
                        React.createElement(antd_1.Divider, null, "Movement"),
                        React.createElement(FormItem, __assign({ label: "Movement Status" }, formItemLayout), getFieldDecorator('movementStatus', {
                            rules: [{ required: true, message: 'movement Status?' }],
                        })(React.createElement(MovementStatusSelector_1.default, null))),
                        React.createElement(antd_1.Divider, null, "Risk"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 12 },
                                React.createElement(FormItem, __assign({ label: "Flight Risk" }, formItemLayout), getFieldDecorator('flightRisk', {
                                    rules: [{ required: true, message: 'Please select flight risk!' }],
                                })(React.createElement(RiskSelector_1.default, { items: this.props.store.LookupDataStore.RisksLookupData })))),
                            React.createElement(antd_1.Col, { span: 12 }, React.createElement(FormItem, __assign({ label: "Business Risk" }, formItemLayout), getFieldDecorator('businessRisk', {
                                rules: [{ required: true, message: 'Please select business risk!' }],
                            })(React.createElement(RiskSelector_1.default, { items: this.props.store.LookupDataStore.RisksLookupData }))))),
                        React.createElement(antd_1.Divider, null, "Development Requirements"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 12 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Development Requirements 1st" }, formItemLayout), getFieldDecorator('devReq1', {
                                    rules: [{ required: true, message: 'Please select a business unit!' }],
                                })(React.createElement(DevelopmentRequirementCascader_1.default, { items: this.props.store.LookupDataStore.DevelopmentRequirementsLookupData })))),
                            React.createElement(antd_1.Col, { span: 12 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Development Requirements 2nd" }, formItemLayout), getFieldDecorator('devReq2', {
                                    rules: [{ required: true, message: 'Please select a business unit!' }],
                                })(React.createElement(DevelopmentRequirementCascader_1.default, { items: this.props.store.LookupDataStore.DevelopmentRequirementsLookupData }))))),
                        React.createElement(antd_1.Row, null,
                            React.createElement(antd_1.Col, { span: 24 },
                                React.createElement(FormItem, __assign({ label: "Notes" }, formItemLayout), getFieldDecorator('devNotes', {
                                    rules: [{ required: true, message: 'Please select a business unit!' }],
                                })(React.createElement(antd_1.Input.TextArea, { rows: 5 }))))))))));
    };
    TalentRecordEditor = __decorate([
        mobx_react_1.inject("store"),
        mobx_react_1.observer
    ], TalentRecordEditor);
    return TalentRecordEditor;
}(React.Component));
var wrappedForm = antd_1.Form.create()(TalentRecordEditor);
exports.default = wrappedForm;
//# sourceMappingURL=TalentRecordEditor.js.map
