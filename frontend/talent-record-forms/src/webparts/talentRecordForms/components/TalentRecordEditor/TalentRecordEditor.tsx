import * as React from 'react';
import styles from './TalentRecordEditor.module.scss';
import {ITalentRecordEditorProps} from './ITalentRecordEditorProps';
import {escape} from '@microsoft/sp-lodash-subset';
import {DefaultButton, IButtonProps} from 'office-ui-fabric-react/lib/Button';
import {Form, Icon, Input, Button, Layout, Divider, Select, Row, Col, Cascader} from 'antd';
import {FormProps} from "antd/lib/form/Form";
import {FormComponentProps} from 'antd/lib/form/Form';
import CascadeSelector from './controls/CascadeSelector';
import Selector from './controls/Selector';
import RiskSelector from './controls/RiskSelector';
import NewHireSwitch from "./controls/NewHireSwitch";
import PerformanceRatingSlider from "./controls/PerformanceRatingSlider";
import PotentialRatingSlider from "./controls/PotentialRatingSlider";
import UserRemoteSelect from "./controls/UserSelector";
import MovementStatusSelector from "./controls/MovementStatusSelector";

;
import {inject, observer} from "mobx-react";
import {Talent} from "../../../../stores/TalentsStore";

const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject("store")
@observer
class TalentRecordEditor extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      formLayout: 'vertical',
    };
  }

  handleSubmit = (e) => {
    console.log("Form Submitted")
  }


  BuildBusinessUnitInitialValue = (talent) => {
    const {divison, unit, stream, location} = talent;
    return [divison, unit, stream, location]
  }

  //Todo : refactor Development Requirement builder
  BuildDevelopmentRequirement01Value = (talent) => {
    const {requirements_01_category, requirements_01_subcategory} = talent;
    return [requirements_01_category, requirements_01_subcategory];
  }

  BuildDevelopmentRequirement02Value = (talent) => {
    const {requirements_02_category, requirements_02_subcategory} = talent;
    return [requirements_02_category, requirements_02_subcategory];
  }

  BuildGradeValue = (talent) => {
    return (talent) ? talent.grade : "";
  }

  BuildFunctionValue = (talent) => {

    return (talent) ? talent.function : "";
  }


  render() {

    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const {formLayout} = this.state;
    const Option = Select.Option;
    return (
      <div>
        {/*{this.props.store.Talent.grade}
        <Row><Col span={24} style={{height: '112px', backgroundColor: "#078181"}}>
          <div style={{
            margin: '38px 54px 56px 32px',
            fontSize: '16px',
            fontWeight: 200,
            letterSpacing: '1px',
            lineHeight: '18px',
            backgroundColor: "#078181",
            color: 'white'
          }}>CREATE A <b>TALENT RECORD</b></div>
        </Col></Row>*/}
        <Row><Col span={24}>
          <Form layout="vertical" onSubmit={this.handleSubmit}
                style={{border: '0px solid black', padding: '0px 5px 5px 5px'}}>
            <Divider orientation='left'>Employee Information</Divider>
            <Row gutter={20}>
              <Col span={16}>
                <FormItem label="Business Unit" {...formItemLayout}>
                  <CascadeSelector
                    items={this.props.store.LookupDataStore.BusinessUnitsLookupData}
                    form={this.props.form}
                    item={this.props.store.Talent}
                    converter={this.BuildBusinessUnitInitialValue}
                    placeholder="Please select a business unit"
                    validationMessage='Please select a business unit!'
                    controlId="businessUnits"
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Function" {...formItemLayout}>
                  <Selector
                    items={this.props.store.LookupDataStore.BusinessFunctionsLookupData}
                    form={this.props.form}
                    item={this.props.store.Talent}
                    placeholder='Please select a business function'
                    controlId="businessFunctions"
                    validationMessage='Please select a function!'
                    converter={this.BuildFunctionValue}
                  />
                </FormItem>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={8}> <FormItem label="Head of Area" {...formItemLayout}>
                {getFieldDecorator('areaHead', {
                  rules: [{required: true, message: 'Head of Area?'}],
                })(
                  <UserRemoteSelect/>
                )}
              </FormItem></Col>
              <Col span={8}><FormItem label="Manager's Name" {...formItemLayout}>
                {getFieldDecorator('managerName', {
                  rules: [{required: true, message: 'manager name?'}],
                })(
                  <UserRemoteSelect/>
                )}
              </FormItem></Col>
              <Col span={8}><FormItem label="Employee" {...formItemLayout}>
                {getFieldDecorator('employee', {
                  rules: [{required: true, message: 'employee name?'}],
                })(
                  <UserRemoteSelect/>
                )}
              </FormItem></Col>
            </Row>


            <Row gutter={20}>
              <Col span={8}><FormItem label="Employee ID" {...formItemLayout}>
                {getFieldDecorator('employeeId', {
                  rules: [{required: true, message: 'Employee ID?'}],
                })(
                  <Input placeholder="Employee ID"/>
                )}
              </FormItem></Col>
              <Col span={8}> <FormItem label="Grade" {...formItemLayout}>
                <Selector
                  items={this.props.store.LookupDataStore.GradeLookupData}
                  form={this.props.form}
                  item={this.props.store.Talent}
                  placeholder='Please select a grade'
                  controlId="grade"
                  validationMessage='Please select a grade!'
                  converter={this.BuildGradeValue}
                />

              </FormItem></Col>
              <Col span={8}> <FormItem label="Position" {...formItemLayout}>
                {getFieldDecorator('position', {
                  /*initialValue: this.props.store.Talent.grade,*/
                  rules: [{required: true, message: 'position?'}],
                })(
                  <Input placeholder="Position"/>
                )}
              </FormItem></Col>
            </Row>

            <Divider>Performance & Potential Ratings</Divider>
            <Row><Col><FormItem label="Too New To Rate?" {...formItemLayout}>
              {getFieldDecorator('newToRate', {
                rules: [{required: true, message: 'Too new to rate ?'}],
              })(
                <NewHireSwitch/>
              )}
            </FormItem></Col></Row>

            <Row gutter={50}><Col span={11}><FormItem label="Performance Rating" {...formItemLayout}>
              {getFieldDecorator('performanceRating', {
                rules: [{required: true, message: 'Performance Rating ?'}],
              })(
                <PerformanceRatingSlider/>
              )}
            </FormItem></Col>
              <Col span={2}></Col><Col span={11}> <FormItem label="Potential Rating" {...formItemLayout}>
                {getFieldDecorator('potentialRating', {
                  rules: [{required: true, message: 'Potential Rating ?'}],
                })(
                  <PotentialRatingSlider/>
                )}
              </FormItem></Col></Row>


            <Divider>Movement</Divider>
            <FormItem label="Movement Status" {...formItemLayout}>
              {getFieldDecorator('movementStatus', {
                rules: [{required: true, message: 'movement Status?'}],
              })(
                <MovementStatusSelector/>
              )}
            </FormItem>

            <Divider>Risk</Divider>
            <Row gutter={20}>
              <Col span={12}><FormItem label="Flight Risk" {...formItemLayout}>
                {getFieldDecorator('flightRisk', {
                  rules: [{required: true, message: 'Please select flight risk!'}],
                })(
                  <RiskSelector items={this.props.store.LookupDataStore.RisksLookupData}/>
                )}
              </FormItem></Col>
              <Col span={12}>{<FormItem label="Business Risk" {...formItemLayout}>
                {getFieldDecorator('businessRisk', {
                  rules: [{required: true, message: 'Please select business risk!'}],
                })(
                  <RiskSelector items={this.props.store.LookupDataStore.RisksLookupData}/>
                )}

              </FormItem>}</Col>
            </Row>

            <Divider>Development Requirements</Divider>
            <Row gutter={20}>
              <Col span={12}> <FormItem label="Development Requirements 1st" {...formItemLayout}>

                <CascadeSelector
                  items={this.props.store.LookupDataStore.DevelopmentRequirementsLookupData}
                  form={this.props.form}
                  item={this.props.store.Talent}
                  converter={this.BuildDevelopmentRequirement01Value}
                  placeholder="Please select a development requirement"
                  validationMessage='Please select a developement requirement!'
                  controlId="developmentRequirement_01"
                />
              </FormItem></Col>
              <Col span={12}> <FormItem label="Development Requirements 2nd" {...formItemLayout}>
                <CascadeSelector
                  items={this.props.store.LookupDataStore.DevelopmentRequirementsLookupData}
                  form={this.props.form}
                  item={this.props.store.Talent}
                  converter={this.BuildDevelopmentRequirement02Value}
                  placeholder="Please select a development requirement"
                  validationMessage='Please select a developement requirement!'
                  controlId="developmentRequirement_02"
                />
              </FormItem></Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label="Notes" {...formItemLayout}>
                  {getFieldDecorator('devNotes', {
                    rules: [{required: true, message: 'Please select a business unit!'}],
                  })(
                    <Input.TextArea rows={5}/>
                  )}
                </FormItem>
              </Col>
            </Row>

          </Form>
        </Col></Row>
      </div>
    );


  }
}

const wrappedForm = Form.create<ITalentRecordEditorProps>()(TalentRecordEditor);
export default wrappedForm;
/*const formItemLayout = formLayout === 'horizontal' ? {
  labelCol: { span: 4 },
  wrapperCol: { span: 7 },
} : null;*/
const formItemLayout = {
  /* labelCol: {
     xs: {span: 40},
     sm: {span: 8},
   },
   wrapperCol: {
     xs: {span: 40},
     sm: {span: 16},
   },*/
};
