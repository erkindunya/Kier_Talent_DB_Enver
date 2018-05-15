import * as React from 'react';
import {ITalentRecordEditorProps} from './ITalentRecordEditorProps';
import {escape} from '@microsoft/sp-lodash-subset';
import {Form, Icon, Input, Button, Layout, Divider, Select, Row, Col, Cascader, Tooltip} from 'antd';
import {FormProps} from "antd/lib/form/Form";
import {FormComponentProps} from 'antd/lib/form/Form';
import CascadeSelector from './controls/CascadeSelector';
import Selector from './controls/Selector';
import NewHireSwitch from "./controls/NewHireSwitch";
import SliderSelector from "./controls/SliderSelector";
import UserRemoteSelect from "./controls/UserSelector";
import OptionsSelector from "./controls/OptionsSelector";
import {IDigestCache, DigestCache} from '@microsoft/sp-http';

;
import {inject, observer} from "mobx-react";
import {Talent} from "../../../../stores/TalentsStore";

const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject("store", "context")
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



  formatPerformanceTip = (value) => {
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
  }

  formatPotentialTip = (value) => {
    //Todo : refactor to make it more intelligent
    if (value == 0)
      return 'A';
    if (value == 50)
      return 'B';
    if (value == 100)
      return 'C';
    return value;
  }

  OnBuinsessUnitChange = (newBusinessUnit: string []) => {
    this.props.store.Talent.changeBusinessUnit(newBusinessUnit);
    console.log(`Business Unit changed ${newBusinessUnit}`);
  }

  OnFunctionChange = (newFunction: string) => {

  }

  OnAreaHeadChange = (newHeadArea: string) => {

  }
  OnEmployeeChange = (newEmployeeName: string) => {

  }
  OnEmployeeIDChange = (newEmployeeId: string) => {

  }

  OnGradeChange = (newGrade: string) => {

  }

  OnPositionChange = (newPosition: string) => {

  }

  OnMovementChange = (newMovement: string) => {

  }

  OnFlightRiskChange = (newFlightRisk: string) => {

  }

  OnBusinessRiskChange = (newBusinessRisk: string) => {

  }
  OnPotentialRatingChange = (newPotentialRating: string) => {

  }
  OnPerformanceRatingChange = (newPerformanceRating: string) => {

  }
  OnDevelopmentRequirement01Change = (newRequirement: string[]) => {

  }
  OnDevelopmentRequirement02Change = (newRequirement: string[]) => {

  }

  render() {

    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

    const businessUnitsError = isFieldTouched('businessUnits') && getFieldError('businessUnits');
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
                <FormItem label={<span>
              Business Unit&nbsp;
                  <Tooltip title="You have to select the Division->Unit->Stream->Location?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>} {...formItemLayout}>
                  <CascadeSelector
                    items={this.props.store.LookupDataStore.BusinessUnitsLookupData}
                    value={this.props.store.Talent.BusinessUnits}
                    form={this.props.form}
                    placeholder="Please select a business unit"
                    validationMessage='Please select a business unit!'
                    controlId="businessUnits"
                    changed={this.OnBuinsessUnitChange}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Function" {...formItemLayout}>
                  <Selector
                    items={this.props.store.LookupDataStore.BusinessFunctionsLookupData}
                    form={this.props.form}
                    value={this.props.store.Talent.Function}
                    placeholder='Please select a business function'
                    controlId="businessFunctions"
                    validationMessage='Please select a function!'
                    changed={this.OnFunctionChange}
                  />
                </FormItem>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={8}> <FormItem label="Head of Area" {...formItemLayout}>
                {getFieldDecorator('AreaHead', {
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
                  initialValue: "Khalil, Mohamed",
                  rules: [{required: true, message: 'employee name?'}],
                })(
                  <UserRemoteSelect/>
                )}
              </FormItem></Col>
            </Row>


            <Row gutter={20}>
              <Col span={8}><FormItem label="Employee ID" {...formItemLayout}>
                {getFieldDecorator('EmployeeId', {
                  rules: [{required: true, message: 'Employee ID?'}],
                })(
                  <Input size="small" placeholder="Employee ID"/>
                )}
              </FormItem></Col>
              <Col span={8}> <FormItem label="Grade" {...formItemLayout}>
                <Selector
                  items={this.props.store.LookupDataStore.GradeLookupData}
                  form={this.props.form}
                  value={this.props.store.Talent.Grade}
                  placeholder='Please select a grade'
                  controlId="grade"
                  validationMessage='Please select a grade!'
                  changed={this.OnGradeChange}
                />

              </FormItem></Col>
              <Col span={8}> <FormItem label="Position" {...formItemLayout}>
                {getFieldDecorator('position', {
                  initialValue: "IT Developer",
                  rules: [{required: true, message: 'position?'}],
                })(
                  <Input size="small" placeholder="Position"/>
                )}
              </FormItem></Col>
            </Row>

            <Divider orientation='left'>Performance & Potential Ratings</Divider>
            <Row gutter={20}><Col span={4}><FormItem label="New To Rate?" {...formItemLayout}>
              {getFieldDecorator('newToRate', {
                rules: [{required: true, message: 'Too new to rate ?'}],
              })(
                <NewHireSwitch/>
              )}
            </FormItem></Col>

              <Col span={10}><FormItem label="Performance Rating" {...formItemLayout}>

              <SliderSelector
                items={this.props.store.LookupDataStore.PerformanceRatingLookupData}
                form={this.props.form}
                value={this.props.store.Talent.Performance}
                controlId="performance"
                validationMessage="Please select a rating for the performance"
                changed={this.OnPerformanceRatingChange}
                formatter={this.formatPerformanceTip}
              />
            </FormItem></Col>
              <Col span={10}> <FormItem label="Potential Rating" {...formItemLayout}>
                <SliderSelector
                  items={this.props.store.LookupDataStore.PotentialRatingLookupData}
                  form={this.props.form}
                  value={this.props.store.Talent.Potential}
                  controlId="potential"
                  validationMessage="Please select a rating for the potential"
                  changed={this.OnPotentialRatingChange}
                  formatter={this.formatPotentialTip}/>
              </FormItem></Col></Row>


            <Divider orientation='left'>Movement</Divider>
            <FormItem label="Movement Status" {...formItemLayout}>
              <OptionsSelector
                items={this.props.store.LookupDataStore.MovementLookupData}
                form={this.props.form}
                value={this.props.store.Talent.Movement}
                controlId="movement"
                validationMessage="Please select a movement status"
                changed={this.OnMovementChange}
              />
            </FormItem>

            <Divider>Risk</Divider>
            <Row gutter={20}>
              <Col span={12}><FormItem label="Flight Risk" {...formItemLayout}>
                <OptionsSelector
                  items={this.props.store.LookupDataStore.RiskLookupData}
                  form={this.props.form}
                  value={this.props.store.Talent.FlightRisk}
                  controlId="flightRisk"
                  validationMessage="Please select flight risk!"
                  changed={this.OnFlightRiskChange}
                />

              </FormItem></Col>

              <Col span={12}>{<FormItem label="Business Risk" {...formItemLayout}>

                <OptionsSelector
                  items={this.props.store.LookupDataStore.RiskLookupData}
                  form={this.props.form}
                  value={this.props.store.Talent.BusinessRisk}
                  controlId="businessRisk"
                  validationMessage="Please select business risk!"
                  changed={this.OnBusinessRiskChange}
                />
              </FormItem>}</Col>
            </Row>


            <Divider orientation='left'>Development Requirements</Divider>
            <Row gutter={20}>
              <Col span={12}> <FormItem label="Development Requirements 1st" {...formItemLayout}>

                <CascadeSelector
                  items={this.props.store.LookupDataStore.DevelopmentRequirementsLookupData}
                  form={this.props.form}
                  value={this.props.store.Talent.DevelopmentRequirement01}
                  placeholder="Please select a development requirement"
                  validationMessage='Please select a developement requirement!'
                  controlId="developmentRequirement_01"
                  changed={this.OnDevelopmentRequirement01Change}
                />
              </FormItem></Col>

              <Col span={12}> <FormItem label="Development Requirements 2nd" {...formItemLayout}>
                <CascadeSelector
                  items={this.props.store.LookupDataStore.DevelopmentRequirementsLookupData}
                  form={this.props.form}
                  value={this.props.store.Talent.DevelopmentRequirement02}
                  placeholder="Please select a development requirement"
                  validationMessage='Please select a developement requirement!'
                  controlId="developmentRequirement_02"
                  changed={this.OnDevelopmentRequirement01Change}
                />
              </FormItem></Col>


            </Row>
            <Row>
              <Col span={24}>
                <FormItem label="Notes" {...formItemLayout}>
                  {getFieldDecorator('devNotes', {
                    rules: [{required: true, message: 'Please fill in some comments'}],
                  })(
                    <Input.TextArea rows={5}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>


                <Row>
                  <Col span={24} style={{textAlign: 'right'}}>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>Submit</Button>
                    <Button style={{marginLeft: 8}} htmlType="reset">
                      Clear
                    </Button>
                    <Button style={{marginLeft: 8}} htmlType="button">
                      Cancel
                    </Button>
                  </Col>
                </Row>
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
