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
var SliderSelector_1 = require("./controls/SliderSelector");
var UserSelector_1 = require("./controls/UserSelector");
var OptionsSelector_1 = require("./controls/OptionsSelector");
var mobx_react_1 = require("mobx-react");
var PreviousYearRating_1 = require("./controls/PreviousYearRating");
var LoadingSpinner_1 = require("./controls/LoadingSpinner");
var PersonSelector_1 = require("./controls/PersonSelector");
var FormItem = antd_1.Form.Item;
var TabPane = antd_1.Tabs.TabPane;
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
        _this.OnGenderChange = function (newGender) {
            _this.props.store.Talent.changeGender(newGender);
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
        _this.OnIsLeaverChange = function (e) {
            _this.props.store.Talent.changeIsLeaverFlag(e.target.checked);
            console.log("Is Leaver: " + e.target.checked);
        };
        _this.onSubmit = function (e) {
            e.preventDefault();
            _this.props.form.validateFields(function (err, values) {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
            if (!hasErrors(_this.props.form.getFieldsError()))
                _this.props.store.TalentDataStore.SaveTalentRecord();
        };
        _this.onUpdate = function (e) {
            e.preventDefault();
            _this.props.form.validateFields(function (err, values) {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
            if (!hasErrors(_this.props.form.getFieldsError()))
                _this.props.store.TalentDataStore.UpdateTalentRecord();
        };
        _this.previousYearRatingRender = function () {
            console.log("HasPreviousRating : " + _this.props.store.Talent.HasPreviousYearRating);
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
        var businessFunctionError = getFieldError('businessFunctions');
        var areaHeadError = isFieldTouched('AreaHead') && getFieldError('AreaHead');
        /* const x =getFieldDecorator('employee3', {
           //initialValue: this.props.store.Talent.Manager,
           rules: [{required: true, message: 'manager name?'}],
         })(
           <UserRemoteSelect changed={this.OnEmployeeNameChange} item={this.props.store.Talent.Name}
                             validationMessage={"Employee name cannot be left blank"}
                             form={this.props.form}
                             controlId="employee3"
                             disabled = {this.props.store.IsSubmittingData}/>
         );
     
         const employeeName = (this.props.store.ViewStoreس.isEditing)?y:x;
         const y = getFieldDecorator('employee', {
           initialValue: this.props.store.Talent.FullName,
           rules: [{required: true, message: 'manager name?'}],
         })(
           <Input id="employee" size="small"  placeholder="Employee Name" disabled={true}/>
         );*/
        var actionButton = (this.props.store.ViewStore.isEditing) ?
            React.createElement(antd_1.Button, { style: { marginLeft: 8 }, type: "primary", loading: this.props.store.IsSubmittingData, htmlType: "button", onClick: this.onUpdate }, "Update Talent Record") :
            React.createElement(antd_1.Button, { style: { marginLeft: 8 }, type: "primary", htmlType: "button", onClick: this.onSubmit, loading: this.props.store.IsSubmittingData }, "Add New Talent Record");
        var isLeaverCheckBox = (this.props.store.ViewStore.isEditing) ?
            React.createElement(antd_1.Row, null,
                React.createElement(antd_1.Col, { span: 24 },
                    React.createElement(FormItem, __assign({}, formItemLayout),
                        React.createElement(antd_1.Checkbox, { onChange: this.OnIsLeaverChange }, "This employee has left Kier")))) : "";
        var talentForm = React.createElement("div", null,
            this.props.store.IsLoadingTalentData,
            React.createElement(antd_1.Row, null,
                React.createElement(antd_1.Col, { span: 24 },
                    React.createElement(antd_1.Form, { layout: "vertical", onSubmit: this.handleSubmit, style: { border: '0px solid black', padding: '0px 5px 10px 5px', marginBottom: '10px' } },
                        React.createElement(antd_1.Divider, { orientation: "left" }, "EMPLOYEE INFORMATION"),
                        isLeaverCheckBox,
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 16 },
                                React.createElement(FormItem, __assign({ validateStatus: businessUnitsError ? 'error' : 'success', label: React.createElement("span", null,
                                        "Business Unit",
                                        React.createElement(antd_1.Tooltip, { title: "You have to select the Division->Unit->Stream->Location?" },
                                            React.createElement(antd_1.Icon, { type: "question-circle-o" }))) }, formItemLayout),
                                    React.createElement(CascadeSelector_1.default, { items: this.props.store.LookupDataStore.BusinessUnitsLookupData, item: this.props.store.Talent.BusinessUnits, form: this.props.form, placeholder: "Please select a business unit", validationMessage: 'Please select a business unit!', controlId: "businessUnits", changed: this.OnBuinsessUnitChange, required: true, disabled: this.props.store.IsSubmittingData }))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Function" }, formItemLayout, { validateStatus: businessFunctionError ? 'error' : 'success' }), getFieldDecorator('businessFunctions', {
                                    initialValue: this.props.store.Talent.Function,
                                    rules: [{ required: true, message: "Business function cannot be left blank" }]
                                })(React.createElement(Selector_1.default, { items: this.props.store.LookupDataStore.BusinessFunctionsLookupData, form: this.props.form, value: this.props.store.Talent.Function, placeholder: 'Please select a business function', controlId: "businessFunctions", validationMessage: 'Business function cannot be left blank', changed: this.OnFunctionChange, disabled: this.props.store.IsSubmittingData }))))),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Head of Area" }, formItemLayout, { validateStatus: (getFieldError('AreaHead') ? 'error' : 'success') }),
                                    React.createElement(UserSelector_1.default, { changed: this.OnAreaHeadChange, item: this.props.store.Talent.AreaHead, validationMessage: "Head of Area canno be left blank", form: this.props.form, controlId: "AreaHead", disabled: this.props.store.IsSubmittingData }))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Manager's Name" }, formItemLayout, { validateStatus: (getFieldError('managerName') ? 'error' : 'success') }), getFieldDecorator('managerName', {
                                    //initialValue: this.props.store.Talent.Manager,
                                    rules: [{ required: true, message: 'manager name?' }],
                                })(React.createElement(UserSelector_1.default, { changed: this.OnManagerChange, item: this.props.store.Talent.Manager, validationMessage: "Manager cannot be left blank", form: this.props.form, controlId: "managerName", disabled: this.props.store.IsSubmittingData })))),
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Employee" }, formItemLayout, { validateStatus: (getFieldError('employee') ? 'error' : 'success') }),
                                    React.createElement(PersonSelector_1.default, { controlId: "employee", item: this.props.store.Talent, validationMessage: "Employee" +
                                            " cannot be left blank", form: this.props.form, changed: this.OnEmployeeNameChange })))),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Employee ID" }, formItemLayout, { validateStatus: (getFieldError('EmployeeId') ? 'error' : 'success') }), getFieldDecorator('EmployeeId', {
                                    initialValue: this.props.store.Talent.EmployeeId,
                                    rules: [{ required: true, message: 'Employee ID cannot be left blank' }],
                                })(React.createElement(antd_1.Input, { size: "small", placeholder: "Employee ID", onChange: function (e) { return _this.OnEmployeeIDChange(e.target.value); }, disabled: this.props.store.ViewStore.isEditing || this.props.store.IsSubmittingData })))),
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Grade" }, formItemLayout, { validateStatus: (getFieldError('grade') ? 'error' : 'success') }), getFieldDecorator("grade", {
                                    initialValue: this.props.store.Talent.Grade,
                                    rules: [{ required: true, message: "Grade cannot be left blank" }]
                                })(React.createElement(Selector_1.default, { items: this.props.store.LookupDataStore.GradeLookupData, form: this.props.form, value: this.props.store.Talent.Grade, placeholder: 'Please select a grade', controlId: "grade", validationMessage: 'Grade cannot be left blank', changed: this.OnGradeChange, disabled: this.props.store.IsSubmittingData })))),
                            React.createElement(antd_1.Col, { span: 8 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Position" }, formItemLayout, { validateStatus: (getFieldError('position') ? 'error' : 'success') }), getFieldDecorator('position', {
                                    initialValue: this.props.store.Talent.Position,
                                    rules: [{ required: true, message: 'Position cannot be left blank' }]
                                })(React.createElement(antd_1.Input, { size: "small", placeholder: "Position", onChange: this.OnPositionChange, disabled: this.props.store.IsSubmittingData }))))),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 8 },
                                React.createElement(FormItem, __assign({ label: "Gender" }, formItemLayout), getFieldDecorator("gender", {
                                    initialValue: this.props.store.Talent.Gender,
                                    rules: [{ required: true, message: "Gender cannot be left blank" }]
                                })(React.createElement(Selector_1.default, { items: [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }], form: this.props.form, value: this.props.store.Talent.Gender, placeholder: 'Please specify a gender', controlId: "gender", validationMessage: 'Gender cannot be left blank', changed: this.OnGenderChange, disabled: this.props.store.IsSubmittingData })))),
                            React.createElement(antd_1.Col, { span: 8 }),
                            React.createElement(antd_1.Col, { span: 8 })),
                        React.createElement(antd_1.Divider, { orientation: "left" }, "Useful Documents"),
                        React.createElement(antd_1.Row, null,
                            React.createElement(antd_1.Col, { span: 10 },
                                React.createElement("a", { href: "https://kier.sharepoint.com/:p:/s/talent/EVIGam9BYrVEhTD1lmOA2pUB0_20JtGEPzhnvRTh1Gf9Aw?e=ccZcLn" },
                                    React.createElement(antd_1.Icon, { type: "file-ppt", style: { fontSize: 16, color: '#08c' } }),
                                    "Talent Review 2018")),
                            React.createElement(antd_1.Col, { span: 10 },
                                React.createElement("a", { href: "https://kier.sharepoint.com/:p:/s/talent/EUUmpLGVHThNsmtkq7jD7RABIIm8gkWdUbxNW9-zoPcBBw?e=H9Vpjz" },
                                    React.createElement(antd_1.Icon, { type: "file-ppt", style: { fontSize: 16, color: '#08c' } }),
                                    "Potential Definitions"))),
                        this.previousYearRatingRender(),
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "2018 Rating"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 2 }),
                            React.createElement(antd_1.Col, { span: 15 },
                                React.createElement(FormItem, __assign({ label: React.createElement("span", null,
                                        "Performance Rating",
                                        React.createElement(antd_1.Tooltip, { title: "Refere to Kier Performance Rating for more information" },
                                            React.createElement(antd_1.Icon, { type: "question-circle-o" }))), extra: "For more information about the performance ratings, select rating on the slider and a tooltip will be displayed" }, formItemLayout),
                                    React.createElement(SliderSelector_1.default, { items: this.props.store.LookupDataStore.PerformanceRatingLookupData, form: this.props.form, value: this.props.store.Talent.Performance, controlId: "performance", validationMessage: "Please select a rating for the performance", changed: this.OnPerformanceRatingChange, formatter: this.props.store.LookupDataStore.formatPerformanceTip, disabled: this.props.store.IsSubmittingData, required: true })))),
                        React.createElement(antd_1.Row, null,
                            React.createElement(antd_1.Col, { span: 2 }),
                            React.createElement(antd_1.Col, { span: 15 },
                                React.createElement(FormItem, __assign({ label: "Potential Rating" }, formItemLayout, { extra: "For more information about the potential ratings, select rating on the slider and a tooltip will be displayed" }),
                                    React.createElement(SliderSelector_1.default, { items: this.props.store.LookupDataStore.PotentialRatingLookupData, form: this.props.form, value: this.props.store.Talent.Potential, controlId: "potential", validationMessage: "Please select a rating for the potential", changed: this.OnPotentialRatingChange, formatter: this.props.store.LookupDataStore.formatPotentialTip, disabled: this.props.store.IsSubmittingData, required: true })))),
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "Movement"),
                        React.createElement(FormItem, __assign({ label: "Movement Status" }, formItemLayout, { validateStatus: (getFieldError('movement') ? 'error' : 'success') }), getFieldDecorator('movement', {
                            initialValue: this.props.store.Talent.Movement,
                            rules: [{ required: true, message: 'A movement status have to selected' }]
                        })(React.createElement(OptionsSelector_1.default, { items: this.props.store.LookupDataStore.MovementLookupData, form: this.props.form, value: this.props.store.Talent.Movement, controlId: "movement", validationMessage: "Please select a movement status", changed: this.OnMovementChange, disabled: this.props.store.IsSubmittingData }))),
                        React.createElement(antd_1.Divider, { orientation: 'left' }, "Risk"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 12 },
                                React.createElement(FormItem, __assign({ label: "Flight Risk" }, formItemLayout, { validateStatus: (getFieldError('flightRisk') ? 'error' : 'success') }), getFieldDecorator('flightRisk', {
                                    initialValue: this.props.store.Talent.FlightRisk,
                                    rules: [{ required: true, message: 'flightRisk?' }]
                                })(React.createElement(OptionsSelector_1.default, { items: this.props.store.LookupDataStore.RiskLookupData, form: this.props.form, value: this.props.store.Talent.FlightRisk, controlId: "flightRisk", validationMessage: "Please select flight risk!", changed: this.OnFlightRiskChange, disabled: this.props.store.IsSubmittingData })))),
                            React.createElement(antd_1.Col, { span: 12 }, React.createElement(FormItem, __assign({ label: "Business Risk" }, formItemLayout), getFieldDecorator('businessRisk', {
                                initialValue: this.props.store.Talent.BusinessRisk,
                                rules: [{ required: true, message: 'businessRisk?' }]
                            })(React.createElement(OptionsSelector_1.default, { items: this.props.store.LookupDataStore.RiskLookupData, form: this.props.form, value: this.props.store.Talent.BusinessRisk, controlId: "businessRisk", validationMessage: "Please select business risk!", changed: this.OnBusinessRiskChange, disabled: this.props.store.IsSubmittingData }))))),
                        React.createElement(antd_1.Divider, { orientation: "left" }, "Development Requirements"),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 24 },
                                React.createElement("a", { href: "https://mykier/teams/hr/learninganddevelopment/" },
                                    React.createElement(antd_1.Icon, { type: "info-circle-o", style: { fontSize: 16, color: '#08c' } }),
                                    "  Click here for more information about Kier Learning and Development"))),
                        React.createElement(antd_1.Row, { gutter: 20 },
                            React.createElement(antd_1.Col, { span: 12 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Development Requirements 1st" }, formItemLayout),
                                    React.createElement(CascadeSelector_1.default, { items: this.props.store.LookupDataStore.DevelopmentRequirementsLookupData, form: this.props.form, item: this.props.store.Talent.DevelopmentRequirement01, placeholder: "Please select a development requirement", validationMessage: 'Please select a developement requirement!', controlId: "developmentRequirement_01", changed: this.OnDevelopmentRequirement01Change, required: false, disabled: this.props.store.IsSubmittingData }))),
                            React.createElement(antd_1.Col, { span: 12 },
                                " ",
                                React.createElement(FormItem, __assign({ label: "Development Requirements 2nd" }, formItemLayout),
                                    React.createElement(CascadeSelector_1.default, { items: this.props.store.LookupDataStore.DevelopmentRequirementsLookupData, form: this.props.form, item: this.props.store.Talent.DevelopmentRequirement02, placeholder: "Please select a development requirement", validationMessage: 'Please select a developement requirement!', controlId: "developmentRequirement_02", changed: this.OnDevelopmentRequirement02Change, required: false, disabled: this.props.store.IsSubmittingData })))),
                        React.createElement(antd_1.Row, null,
                            React.createElement(antd_1.Col, { span: 24 },
                                React.createElement(FormItem, __assign({ label: "Notes" }, formItemLayout), getFieldDecorator('devNotes', {
                                    rules: [{ required: false, message: 'Please fill in some comments' }],
                                })(React.createElement(antd_1.Input.TextArea, { rows: 5, onChange: function (e) { return _this.OnNotesChange(e.target.value); }, disabled: this.props.store.IsSubmittingData })))))))),
            React.createElement(antd_1.Row, null,
                React.createElement(antd_1.Col, { span: 24 },
                    React.createElement(antd_1.Row, null,
                        React.createElement(antd_1.Col, { span: 24, style: { textAlign: 'right' } },
                            actionButton,
                            React.createElement(antd_1.Button, { style: { marginLeft: 8 }, htmlType: "reset" }, "Clear"),
                            React.createElement(antd_1.Button, { style: { marginLeft: 8 }, htmlType: "button" }, "Cancel"))))));
        var loadingSpinner = React.createElement(LoadingSpinner_1.default, null);
        var formLayout = this.state.formLayout;
        var content = (this.props.store.IsLoadingTalentData || this.props.store.IsLoadingReferenceData) ? loadingSpinner : talentForm;
        var Option = antd_1.Select.Option;
        return (content);
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