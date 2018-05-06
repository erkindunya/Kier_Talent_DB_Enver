import * as React from 'react';
import styles from './TalentRecordForms.module.scss';
import {ITalentRecordFormsProps} from './ITalentRecordFormsProps';
import {escape} from '@microsoft/sp-lodash-subset';
import {DefaultButton, IButtonProps} from 'office-ui-fabric-react/lib/Button';
import {Form, Icon, Input, Button, Layout, Divider, Select, Row, Col} from 'antd';
import {FormProps} from "antd/lib/form/Form";
import {FormComponentProps} from 'antd/lib/form/Form';
import BusinessUnitsCascader from './BusinessUnitsCascader';
import FunctionSelector from './FunctionSelector';
import RiskSelector from './RiskSelector';
import NewHireSwitch from "./NewHireSwitch";
import PerformanceRatingSlider from "./PerformanceRatingSlider";
import PotentialRatingSlider from "./PotentialRatingSlider";
import UserRemoteSelect from "./UserSelector";
import MovementStatusSelector from "./MovementStatusSelector";
import DevelopmentRequirementCascader from "./DevelopmentRequirementCascader";
import {inject, observer} from "mobx-react";

const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject("store")
@observer
class TalentRecordForms extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      formLayout: 'vertical',
    };
  }

  handleSubmit = (e) => {
    console.log("Form Submitted")
  }


  componentDidMount() {
    console.log(this.props.store.BusinessFunctions.functions.length);
  }

  render() {

    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const {formLayout} = this.state;
    const Option = Select.Option;
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
    return (
      <div>

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
        </Col></Row>
        <Row><Col span={24}>
          <Form layout="vertical" onSubmit={this.handleSubmit}
                style={{border: '2px solid black', padding: '0px 5px 5px 5px'}}>
            <Divider orientation='left'>Employee Information</Divider>
            <Row gutter={20}>
              <Col span={16}>
                <FormItem label="Business Unit" {...formItemLayout}>
                  {getFieldDecorator('businessUnit', {
                    rules: [{required: true, message: 'Please select a business unit!'}],
                  })(
                    <BusinessUnitsCascader items={this.props.store.BusinessUnits.businessUnits}/>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Function" {...formItemLayout}>
                  {getFieldDecorator('function', {
                    rules: [{required: true, message: 'Please select a function!'}],
                  })(
                    <FunctionSelector items={this.props.store.BusinessFunctions.functions}/>
                  )}
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
                {getFieldDecorator('grade', {
                  rules: [{required: true, message: 'grade?'}],
                })(
                  <Select showSearch placeholder="Select a grade">
                    <Option value="L1">L1</Option>
                    <Option value="L2">L2</Option>
                    <Option value="M1">M1</Option>
                    <Option value="M2">M2</Option>
                    <Option value="M3">M3</Option>
                  </Select>
                )}
              </FormItem></Col>
              <Col span={8}> <FormItem label="Position" {...formItemLayout}>
                {getFieldDecorator('position', {
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
                  <RiskSelector items={this.props.store.Risks.risksLookup}/>
                )}
              </FormItem></Col>
              <Col span={12}>{<FormItem label="Business Risk" {...formItemLayout}>
                {getFieldDecorator('businessRisk', {
                  rules: [{required: true, message: 'Please select business risk!'}],
                })(
                  <RiskSelector items={this.props.store.Risks.risksLookup}/>
                )}

              </FormItem>}</Col>
            </Row>

            <Divider>Development Requirements</Divider>
            <Row gutter={20}>
              <Col span={12}> <FormItem label="Development Requirements 1st" {...formItemLayout}>
                {getFieldDecorator('devReq1', {
                  rules: [{required: true, message: 'Please select a business unit!'}],
                })(
                  <DevelopmentRequirementCascader
                    items={this.props.store.DevelopmentRequirements.developmentRequirements}/>
                )}
              </FormItem></Col>
              <Col span={12}> <FormItem label="Development Requirements 2nd" {...formItemLayout}>
                {getFieldDecorator('devReq2', {
                  rules: [{required: true, message: 'Please select a business unit!'}],
                })(
                  <DevelopmentRequirementCascader
                    items={this.props.store.DevelopmentRequirements.developmentRequirements}/>
                )}
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

const wrappedForm = Form.create<ITalentRecordFormsProps>()(TalentRecordForms);
export default wrappedForm;
