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
var PreviousYearRating_1 = require("./controls/PreviousYearRating");
var LoadingSpinner_1 = require("./controls/LoadingSpinner");
var FormItem = antd_1.Form.Item;
var Header = antd_1.Layout.Header, Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer, Sider = antd_1.Layout.Sider;
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(function (field) { return fieldsError[field]; });
}
var TalentRecordEditor = (function (_super) {
    __extends(TalentRecordEditor, _super);
    function TalentRecordEditor() {
        var _this = _super.call(this) || this;
        _this.handleSubmit = function (e) {
            console.log("Form Submitted");
        };
        _this.OnBuinsessUnitChange = function (newBusinessUnit) {
            _this.props.store.Talent.changeBusinessUnit(newBusinessUnit);
        };
        _this.OnFunctionChange = function (newFunction) {
            _this.props.store.Talent.changeFunction(newFunction);
        };
        _this.OnEmployeeIDChange = function (newEmployeeId) {
            _this.props.store.Talent.changeEmployeeId(newEmployeeId);
        };
        _this.OnGradeChange = function (newGrade) {
            _this.props.store.Talent.changeGrade(newGrade);
        };
        _this.OnPositionChange = function (newPosition) {
            _this.props.store.Talent.changePosition(newPosition.target.value);
        };
        _this.OnMovementChange = function (newMovement) {
            _this.props.store.Talent.changeMovement(newMovement);
        };
        _this.OnFlightRiskChange = function (newFlightRisk) {
            _this.props.store.Talent.changeFlightRisk(newFlightRisk);
        };
        _this.OnBusinessRiskChange = function (newBusinessRisk) {
            _this.props.store.Talent.changeBusinessRisk(newBusinessRisk);
        };
        _this.OnPotentialRatingChange = function (newPotentialRating) {
            _this.props.store.Talent.changePotentialRating(newPotentialRating);
        };
        _this.OnPerformanceRatingChange = function (newPerformanceRating) {
            _this.props.store.Talent.changePerformanceRating(newPerformanceRating);
        };
        _this.OnDevelopmentRequirement01Change = function (newRequirement) {
            _this.props.store.Talent.changeDevelopmentRequirement01(newRequirement);
        };
        _this.OnDevelopmentRequirement02Change = function (newRequirement) {
            _this.props.store.Talent.changeDevelopmentRequirement02(newRequirement);
        };
        _this.OnEmployeeNameChange = function (userId) {
            console.log("Employee Changed " + JSON.stringify(userId));
            _this.props.store.Talent.changeEmployeeName(userId);
        };
        _this.OnAreaHeadChange = function (newHeadArea) {
            _this.props.store.Talent.changeAreaHead(newHeadArea);
        };
        _this.OnManagerChange = function (newManager) {
            _this.props.store.Talent.changeManager(newManager);
        };
        _this.OnNotesChange = function (notes) {
            _this.props.store.Talent.changeNotes(notes);
        };
        _this.onSubmit = function (e) {
            console.log("Submitting");
            e.preventDefault();
            _this.props.form.validateFields(function (err, values) {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
            _this.props.store.TalentDataStore.SaveTalentRecord();
        };
        _this.onUpdate = function () {
            _this.props.store.TalentDataStore.UpdateTalentRecord();
        };
        _this.previousYearRatingRender = function () {
            return (_this.props.store.Talent.HasPreviousYearRating) ? React.createElement(PreviousYearRating_1.PreviousYearRating, { form: _this.props.form }) : "";
        };
        _this.state = {
            formLayout: 'vertical',
        };
        return _this;
    }
    TalentRecordEditor.prototype.componentDidMount = function () {
        // this.props.form.validateFields();
    };
    TalentRecordEditor.prototype.render = function () {
        var _this = this;
        var _a = this.props.form, getFieldDecorator = _a.getFieldDecorator, getFieldsError = _a.getFieldsError, getFieldError = _a.getFieldError, isFieldTouched = _a.isFieldTouched;
        //const businessUnitsError = isFieldTouched('businessUnits') && getFieldError('businessUnits');
        var businessUnitsError = getFieldError('businessUnits');
        var businessFunctionError = isFieldTouched('businessFunctions') && getFieldError('businessFunctions');
        var areaHeadError = isFieldTouched('AreaHead') && getFieldError('AreaHead');
        var formLayout = this.state.formLayout;
        var Option = antd_1.Select.Option;
        return ((this.props.store.isLoadingTalentData) ? React.createElement(LoadingSpinner_1.default, null) : React.createElement("div", null,
            React.createElement(antd_1.Row, null,
                React.createElement(antd_1.Col, { span: 24 },
                    React.createElement(antd_1.Form, { layout: "vertical", onSubmit: this.handleSubmit, style: { border: '0px solid black', padding: '0px 5px 5px 5px' } },
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "Employee Information"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 16 },
                                React.createElement(FormItem, __assign({ validateStatus: businessUnitsError ? 'error' : 'success', label: React.createElement("span", null,
                                        "Business Unit",
                                        React.createElement(antd_1.Tooltip, { title: "You have to select the Division->Unit->Stream->Location?" },
                                            React.createElement(antd_1.Icon, { type: "question-circle-o" }))) }, formItemLayout), getFieldDecorator("businessUnits", {
                                    initialValue: this.props.store.Talent.BusinessUnits,
                                    rules: [{ required: true, message: "Good bye" }]
                                })(React.createElement(CascadeSelector_1.default, { items: this.props.store.LookupDataStore.BusinessUnitsLookupData, value: this.props.store.Talent.BusinessUnits, form: this.props.form, placeholder: "Please select a business unit", validationMessage: 'Please select a business unit!', controlId: "businessUnits", changed: this.OnBuinsessUnitChange })))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Function" }, formItemLayout), getFieldDecorator('function', {
                                    initialValue: this.props.store.Talent.Function,
                                    rules: [{ required: true, message: "functions is required" }]
                                })(React.createElement(Selector_1.default, { items: this.props.store.LookupDataStore.BusinessFunctionsLookupData, form: this.props.form, value: this.props.store.Talent.Function, placeholder: 'Please select a business function', controlId: "businessFunctions", validationMessage: 'Please select a function!', changed: this.OnFunctionChange }))))),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Head of Area" }, formItemLayout), getFieldDecorator('AreaHead', {
                                    initialValue: this.props.store.Talent.AreaHead,
                                    rules: [{ required: true, message: 'Head of Area?' }],
                                })(React.createElement(UserSelector_1.default, { changed: this.OnAreaHeadChange })))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Manager's Name" }, formItemLayout), getFieldDecorator('managerName', {
                                    initialValue: this.props.store.Talent.Manager,
                                    rules: [{ required: true, message: 'manager name?' }],
                                })(React.createElement(UserSelector_1.default, { changed: this.OnManagerChange })))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Employee" }, formItemLayout), getFieldDecorator('employee', {
                                    initialValue: this.props.store.Talent.Name,
                                    rules: [{ required: true, message: 'employee name?' }]
                                })(React.createElement(UserSelector_1.default, { changed: this.OnEmployeeNameChange }))))),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Employee ID" }, formItemLayout), getFieldDecorator('EmployeeId', {
                                    initialValue: this.props.store.Talent.EmployeeId,
                                    rules: [{ required: true, message: 'Employee ID?' }],
                                })(React.createElement(antd_1.Input, { size: "small", placeholder: "Employee ID", onChange: function (e) { return _this.OnEmployeeIDChange(e.target.value); } })))),
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Grade" }, formItemLayout), getFieldDecorator("grade", {
                                    initialValue: this.props.store.Talent.Grade,
                                    rules: [{ required: true, message: "grade is missing" }]
                                })(React.createElement(Selector_1.default, { items: this.props.store.LookupDataStore.GradeLookupData, form: this.props.form, value: this.props.store.Talent.Grade, placeholder: 'Please select a grade', controlId: "grade", validationMessage: 'Please select a grade!', changed: this.OnGradeChange })))),
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Position" }, formItemLayout), getFieldDecorator('position', {
                                    initialValue: this.props.store.Talent.Position,
                                    rules: [{ required: true, message: 'position?' }]
                                })(React.createElement(antd_1.Input, { size: "small", placeholder: "Position", onChange: this.OnPositionChange }))))),
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "Performance & Potential Ratings"),
                        this.previousYearRatingRender(),
                        React.createElement(antd_1.Divider, null),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 4 },
                                React.createElement(FormItem, __assign({ label: "New To Rate?" }, formItemLayout), getFieldDecorator('newToRate', {
                                    rules: [{ required: true, message: 'Too new to rate ?' }]
                                })(React.createElement(NewHireSwitch_1.default, null)))),
                            React.createElement(antd_1.Col, { span: 10 },
                                React.createElement(FormItem, __assign({ label: "Performance Rating" }, formItemLayout),
                                    React.createElement(SliderSelector_1.default, { items: this.props.store.LookupDataStore.PerformanceRatingLookupData, form: this.props.form, value: this.props.store.Talent.Performance, controlId: "performance", validationMessage: "Please select a rating for the performance", changed: this.OnPerformanceRatingChange, formatter: this.props.store.LookupDataStore.formatPerformanceTip, disabled: false }))),
                            React.createElement(antd_1.Col, { span: 10 },
                                React.createElement(FormItem, __assign({ label: "Potential Rating" }, formItemLayout),
                                    React.createElement(SliderSelector_1.default, { items: this.props.store.LookupDataStore.PotentialRatingLookupData, form: this.props.form, value: this.props.store.Talent.Potential, controlId: "potential", validationMessage: "Please select a rating for the potential", changed: this.OnPotentialRatingChange, formatter: this.props.store.LookupDataStore.formatPotentialTip, disabled: false })))),
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "Movement"),
                        React.createElement(FormItem, __assign({ label: "Movement Status" }, formItemLayout), getFieldDecorator('movement', {
                            initialValue: this.props.store.Talent.FlightRisk,
                            rules: [{ required: true, message: 'movement?' }]
                        })(React.createElement(OptionsSelector_1.default, { items: this.props.store.LookupDataStore.MovementLookupData, form: this.props.form, value: this.props.store.Talent.Movement, controlId: "c", validationMessage: "Please select a movement status", changed: this.OnMovementChange }))),
                        React.createElement(antd_1.Divider, null, "Risk"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 12 },
                                React.createElement(FormItem, __assign({ label: "Flight Risk" }, formItemLayout), getFieldDecorator('flightRisk', {
                                    initialValue: this.props.store.Talent.FlightRisk,
                                    rules: [{ required: true, message: 'flightRisk?' }]
                                })(React.createElement(OptionsSelector_1.default, { items: this.props.store.LookupDataStore.RiskLookupData, form: this.props.form, value: this.props.store.Talent.FlightRisk, controlId: "flightRisk", validationMessage: "Please select flight risk!", changed: this.OnFlightRiskChange })))),
                            React.createElement(antd_1.Col, { span: 12 }, React.createElement(FormItem, __assign({ label: "Business Risk" }, formItemLayout), getFieldDecorator('businessRisk', {
                                initialValue: this.props.store.Talent.FlightRisk,
                                rules: [{ required: true, message: 'businessRisk?' }]
                            })(React.createElement(OptionsSelector_1.default, { items: this.props.store.LookupDataStore.RiskLookupData, form: this.props.form, value: this.props.store.Talent.BusinessRisk, controlId: "businessRisk", validationMessage: "Please select business risk!", changed: this.OnBusinessRiskChange }))))),
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "Development Requirements"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 12 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Development Requirements 1st" }, formItemLayout),
                                    React.createElement(CascadeSelector_1.default, { items: this.props.store.LookupDataStore.DevelopmentRequirementsLookupData, form: this.props.form, value: this.props.store.Talent.DevelopmentRequirement01, placeholder: "Please select a development requirement", validationMessage: 'Please select a developement requirement!', controlId: "developmentRequirement_01", changed: this.OnDevelopmentRequirement01Change }))),
                            React.createElement(antd_1.Col, { span: 12 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Development Requirements 2nd" }, formItemLayout),
                                    React.createElement(CascadeSelector_1.default, { items: this.props.store.LookupDataStore.DevelopmentRequirementsLookupData, form: this.props.form, value: this.props.store.Talent.DevelopmentRequirement02, placeholder: "Please select a development requirement", validationMessage: 'Please select a developement requirement!', controlId: "developmentRequirement_02", changed: this.OnDevelopmentRequirement02Change })))),
                        React.createElement(antd_1.Row, null,
                            React.createElement(antd_1.Col, { span: 24 },
                                React.createElement(FormItem, __assign({ label: "Notes" }, formItemLayout), getFieldDecorator('devNotes', {
                                    rules: [{ required: true, message: 'Please fill in some comments' }],
                                })(React.createElement(antd_1.Input.TextArea, { rows: 5, onChange: function (e) { return _this.OnNotesChange(e.target.value); } }))))),
                        React.createElement(antd_1.Row, null,
                            React.createElement(antd_1.Col, { span: 24 },
                                React.createElement(antd_1.Row, null,
                                    React.createElement(antd_1.Col, { span: 24, style: { textAlign: 'right' } },
                                        React.createElement(antd_1.Button, { style: { marginLeft: 8 }, type: "primary", htmlType: "button", disabled: hasErrors(getFieldsError()), onClick: this.onSubmit }, "Submit"),
                                        React.createElement(antd_1.Button, { style: { marginLeft: 8 }, type: "primary", htmlType: "button", disabled: hasErrors(getFieldsError()), onClick: this.onUpdate }, "Update"),
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
