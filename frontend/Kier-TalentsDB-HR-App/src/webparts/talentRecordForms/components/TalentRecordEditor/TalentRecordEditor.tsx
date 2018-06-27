import * as React from 'react';
import {ITalentRecordEditorProps} from './ITalentRecordEditorProps';
import {escape} from '@microsoft/sp-lodash-subset';
import {
  Form,
  Icon,
  Input,
  Button,
  Layout,
  Divider,
  Select,
  Row,
  Col,
  Cascader,
  Tooltip,
  Spin,
  Tabs,
  Checkbox
} from 'antd';
import {FormProps} from "antd/lib/form/Form";
import {FormComponentProps} from 'antd/lib/form/Form';
import CascadeSelector from './controls/CascadeSelector';
import Selector from './controls/Selector';
import NewHireSwitch from "./controls/NewHireSwitch";
import SliderSelector from "./controls/SliderSelector";
import UserRemoteSelect from "./controls/UserSelector";
import OptionsSelector from "./controls/OptionsSelector";
import {IDigestCache, DigestCache} from '@microsoft/sp-http';
import {inject, observer} from "mobx-react";
import {Talent} from "../../../../stores/TalentsStore";
import {PreviousYearRating} from "./controls/PreviousYearRating";
import LoadingSpinner from "./controls/LoadingSpinner";
import EmployeeName from "./controls/EmployeeName";
import ManagerName from "./controls/ManagerName";
import AreaHeadName from "./controls/AreaHeadName";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const {Header, Content, Footer, Sider} = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject("store", "context")
@observer
class TalentRecordEditor extends React.Component<any, any> {

  handleSubmit = (e) => {
    console.log("Form Submitted")
  }
  OnBuinsessUnitChange = (newBusinessUnit: string []) => {
    this.props.store.Talent.changeBusinessUnit(newBusinessUnit);
  }
  OnFunctionChange = (newFunction: string) => {
    this.props.store.Talent.changeFunction(newFunction);
  }
  OnEmployeeIDChange = (newEmployeeId: string) => {
    this.props.store.Talent.changeEmployeeId(newEmployeeId);
  }
  OnGradeChange = (newGrade: string) => {
    this.props.store.Talent.changeGrade(newGrade);
  }

  OnGenderChange = (newGender: string) => {
    this.props.store.Talent.changeGender(newGender);
  }
  OnPositionChange = (newPosition) => {
    this.props.store.Talent.changePosition(newPosition.target.value);
  }
  OnMovementChange = (newMovement: string) => {
    this.props.store.Talent.changeMovement(newMovement);
  }
  OnFlightRiskChange = (newFlightRisk: string) => {
    this.props.store.Talent.changeFlightRisk(newFlightRisk);
  }
  OnBusinessRiskChange = (newBusinessRisk: string) => {
    this.props.store.Talent.changeBusinessRisk(newBusinessRisk);
  }
  OnPotentialRatingChange = (newPotentialRating: string) => {
    this.props.store.Talent.changePotentialRating(newPotentialRating);
  }
  OnPerformanceRatingChange = (newPerformanceRating: string) => {
    this.props.store.Talent.changePerformanceRating(newPerformanceRating);
  }
  OnDevelopmentRequirement01Change = (newRequirement: string[]) => {
    this.props.store.Talent.changeDevelopmentRequirement01(newRequirement);
  }
  OnDevelopmentRequirement02Change = (newRequirement: string[]) => {
    this.props.store.Talent.changeDevelopmentRequirement02(newRequirement);
  }
  OnEmployeeNameChange = (userId: any) => {
    //console.log("Employee Changed " + JSON.stringify(userId));
    this.props.store.Talent.changeEmployeeName(userId);
  }
  OnAreaHeadChange = (newHeadArea: any) => {
    this.props.store.Talent.changeAreaHead(newHeadArea);
  }
  OnManagerChange = (newManager: any) => {
    this.props.store.Talent.changeManager(newManager);
  }
  OnNotesChange = (notes: string) => {
    this.props.store.Talent.changeNotes(notes);
  }

  OnIsLeaverChange = (e: any) => {
    this.props.store.Talent.changeIsLeaverFlag(e.target.checked);
    console.log("Is Leaver: " + e.target.checked);
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll({force: true}, (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    if (! hasErrors(this.props.form.getFieldsError()))
    this.props.store.TalentDataStore.SaveTalentRecord();
  }
  onUpdate = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll({force: true}, (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    if (! hasErrors(this.props.form.getFieldsError()))
    this.props.store.TalentDataStore.UpdateTalentRecord();
  }
  previousYearRatingRender = () => {
    console.log("HasPreviousRating : " + this.props.store.Talent.HasPreviousYearRating);
    return (this.props.store.Talent.HasPreviousYearRating) ? <PreviousYearRating form={this.props.form}/> : "";
  }

  constructor() {
    super();
    this.state = {
      formLayout: 'vertical',
    };
  }

  componentDidMount() {
    // this.props.form.validateFields();
  }

  render() {

    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    //const businessUnitsError = isFieldTouched('businessUnits') && getFieldError('businessUnits');
    const businessUnitsError = getFieldError('businessUnits');
    const businessFunctionError = getFieldError('businessFunctions');
    const areaHeadError = isFieldTouched('AreaHead') && getFieldError('AreaHead');
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


    const actionButton = (this.props.store.ViewStore.isEditing) ?
      <Button style={{marginLeft: 8}} type="primary" loading={this.props.store.IsSubmittingData} htmlType="button"
              onClick={this.onUpdate}  >Update Talent Record</Button> :
      <Button style={{marginLeft: 8}} type="primary" htmlType="button"
              onClick={this.onSubmit} loading={this.props.store.IsSubmittingData}>Add New Talent Record</Button>;
    const isLeaverCheckBox = (this.props.store.ViewStore.isEditing) ?
      <Row><Col span={24}><FormItem {...formItemLayout}><Checkbox onChange={this.OnIsLeaverChange}
                                                                  checked={this.props.store.Talent.IsLeaver}>This
        employee has
        left Kier</Checkbox></FormItem></Col></Row> : "";
    const talentForm = <div>
      {this.props.store.IsLoadingTalentData}


      <Row><Col span={24}>

        <Form layout="vertical" onSubmit={this.handleSubmit}
              style={{border: '0px solid black', padding: '0px 5px 10px 5px', marginBottom: '10px'}}>

              <Divider orientation="left">EMPLOYEE INFORMATION</Divider>
              {isLeaverCheckBox}
              <Row gutter={20}>
                <Col span={16}>
                  <FormItem validateStatus={businessUnitsError ? 'error' : 'success'} label={<span>
              Business Unit
                <Tooltip title="You have to select the Division->Unit->Stream->Location?">
                <Icon type="question-circle-o"
                />
              </Tooltip>
            </span>} {...formItemLayout}>


                    {getFieldDecorator('businessUnits', {
                      initialValue: this.props.store.Talent.BusinessUnits,
                      rules: [{
                        required: true, message: "Business unit cannot be left blank"
                      }]
                    })(
                      <CascadeSelector
                        items={this.props.store.LookupDataStore.BusinessUnitsLookupData}
                        item={this.props.store.Talent.BusinessUnits}
                        form={this.props.form}
                        placeholder="Please select a business unit"
                        validationMessage='Business unit cannot be left blank.'
                        controlId="businessUnits"
                        changed={this.OnBuinsessUnitChange}
                        required={true}
                        disabled={this.props.store.IsSubmittingData}
                      />
                    )}






                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="Function" {...formItemLayout}
                            validateStatus={businessFunctionError ? 'error' : 'success'}>
                    {getFieldDecorator('businessFunctions', {
                      initialValue: this.props.store.Talent.Function,
                      rules: [{
                        required: (!this.props.store.ViewStore.isEditing || (!this.props.store.Talent.IsLeaver && this.props.store.ViewStore.isEditing)),
                        message: "Business function" +
                        " cannot" +
                        " be" +
                        " left" +
                        " blank"
                      }]
                    })(
                      <Selector
                        items={this.props.store.LookupDataStore.BusinessFunctionsLookupData}
                        form={this.props.form}
                        value={this.props.store.Talent.Function}
                        placeholder='Please select a business function'
                        controlId="businessFunctions"
                        validationMessage='Business function cannot be left blank'
                        changed={this.OnFunctionChange}
disabled = {this.props.store.IsSubmittingData}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={8}> <FormItem label="Head of Area" {...formItemLayout}
                                         validateStatus={(getFieldError('AreaHead') ? 'error' : 'success')}>
                  {/*              {getFieldDecorator('AreaHead', {
                //initialValue: this.props.store.Talent.AreaHead,
                rules: [{required: true, message: 'Head of Area?'}],
              })(

              )}*/}

                  <UserRemoteSelect changed={this.OnAreaHeadChange}
                                    item={this.props.store.Talent.AreaHead}
                                    validationMessage={"Head of Area canno be left blank"}
                                    form={this.props.form}
                                    controlId="AreaHead"
                                    disabled={this.props.store.IsSubmittingData}/>
                </FormItem></Col>
                <Col span={8}><FormItem label="Manager's Name" {...formItemLayout}
                                        validateStatus={(getFieldError('managerName') ? 'error' : 'success')}>


                  {getFieldDecorator('managerName', {
                    //initialValue: this.props.store.Talent.Manager,
                    rules: [{
                      required: (!this.props.store.ViewStore.isEditing || (!this.props.store.Talent.IsLeaver && this.props.store.ViewStore.isEditing)),
                      message: 'manager name?'
                    }],
                  })(
                    <UserRemoteSelect changed={this.OnManagerChange} item={this.props.store.Talent.Manager}
                                      validationMessage={"Manager cannot be left blank"}
                                      form={this.props.form}
                                      controlId="managerName"
                                      disabled={this.props.store.IsSubmittingData}
                                      required={(!this.props.store.ViewStore.isEditing || (!this.props.store.Talent.IsLeaver && this.props.store.ViewStore.isEditing))}/>
                  )}


                  {/*<UserRemoteSelect
                    changed={this.OnManagerChange}
                    item={this.props.store.Talent.Manager}
                    validationMessage={"Manager cannot be left blank"}
                    form={this.props.form}
                    controlId="managerName"
                    disabled = {this.props.store.IsSubmittingData}
                    required={(!this.props.store.ViewStore.isEditing || (!this.props.store.Talent.IsLeaver && this.props.store.ViewStore.isEditing))}/>
*/}





                </FormItem></Col>
                <Col span={8}><FormItem label="Employee" {...formItemLayout}
                                        validateStatus={(getFieldError('employeeName') ? 'error' : 'success')}>


                  {getFieldDecorator('employeeName', {
                    //initialValue: this.props.store.Talent.Manager,
                    rules: [{required: true, message: 'manager name?'}],
                  })
                  (
                    <EmployeeName controlId={"employeeName"} item={this.props.store.Talent.Name}
                                  validationMessage={"Employee name cannot be left blank"} form={this.props.form}
                                  changed={this.OnEmployeeNameChange}
                                  disabled={this.props.store.IsSubmittingData || this.props.store.ViewStore.isEditing}/>)}



                </FormItem></Col>
              </Row>
              <Row gutter={20}>
                <Col span={8}><FormItem label="Employee ID" {...formItemLayout}
                                        validateStatus={(getFieldError('EmployeeId') ? 'error' : 'success')}>
                  {getFieldDecorator('EmployeeId', {
                    initialValue: this.props.store.Talent.EmployeeId,
                    rules: [{required: true, message: 'Employee ID cannot be left blank'}],
                  })(
                    <Input size="small" placeholder="Employee ID"
                           onChange={(e) => this.OnEmployeeIDChange(e.target.value)} disabled={this.props.store.ViewStore.isEditing || this.props.store.IsSubmittingData}/>
                  )}
                </FormItem></Col>
                <Col span={8}> <FormItem label="Grade" {...formItemLayout}
                                         validateStatus={(getFieldError('grade') ? 'error' : 'success')}>
                  {getFieldDecorator("grade", {
                    initialValue: this.props.store.Talent.Grade,
                    rules: [{
                      required: (!this.props.store.ViewStore.isEditing || (!this.props.store.Talent.IsLeaver && this.props.store.ViewStore.isEditing)),
                      message: "Grade cannot be left blank"
                    }]
                  })(<Selector
                    items={this.props.store.LookupDataStore.GradeLookupData}
                    form={this.props.form}
                    value={this.props.store.Talent.Grade}
                    placeholder='Please select a grade'
                    controlId="grade"
                    validationMessage='Grade cannot be left blank'
                    changed={this.OnGradeChange}
                    disabled = {this.props.store.IsSubmittingData}
                  />)}

                </FormItem></Col>
                <Col span={8}> <FormItem label="Position" {...formItemLayout}
                                         validateStatus={(getFieldError('position') ? 'error' : 'success')}>
                  {getFieldDecorator('position', {
                    initialValue: this.props.store.Talent.Position,
                    rules: [{
                      required: (!this.props.store.ViewStore.isEditing || (!this.props.store.Talent.IsLeaver && this.props.store.ViewStore.isEditing)),
                      message: 'Position cannot be left blank'
                    }]
                  })(
                    <Input size="small" placeholder="Position" onChange={this.OnPositionChange} disabled = {this.props.store.IsSubmittingData}/>
                  )}
                </FormItem></Col>
              </Row>
              <Row gutter={20}>
                <Col span={8}><FormItem label="Gender" {...formItemLayout}>
                  {getFieldDecorator("gender", {
                    initialValue: this.props.store.Talent.Gender,
                    rules: [{
                      required: (!this.props.store.ViewStore.isEditing || (!this.props.store.Talent.IsLeaver && this.props.store.ViewStore.isEditing)),
                      message: "Gender cannot be left blank"
                    }]
                  })(<Selector
                    items={[{value: "Male", label: "Male"}, {value: "Female", label: "Female"}]}
                    form={this.props.form}
                    value={this.props.store.Talent.Gender}
                    placeholder='Please specify a gender'
                    controlId="gender"
                    validationMessage='Gender cannot be left blank'
                    changed={this.OnGenderChange}
                    disabled = {this.props.store.IsSubmittingData}
                  />)}
                </FormItem></Col>
                <Col span={8}>

                </Col>
                <Col span={8}></Col>
              </Row>






              <Divider orientation="left">Useful Documents</Divider>
              <Row>

                <Col span={10}>
                  <a
                    href="https://kier.sharepoint.com/:p:/s/talent/EVIGam9BYrVEhTD1lmOA2pUB0_20JtGEPzhnvRTh1Gf9Aw?e=ccZcLn"><Icon
                    type="file-ppt" style={{fontSize: 16, color: '#08c'}}/>Talent Review 2018</a>
                </Col>
                <Col span={10}>
                  <a
                    href="https://kier.sharepoint.com/:p:/s/talent/EUUmpLGVHThNsmtkq7jD7RABIIm8gkWdUbxNW9-zoPcBBw?e=H9Vpjz"><Icon
                    type="file-ppt" style={{fontSize: 16, color: '#08c'}}/>Potential Definitions</a>
                </Col>

              </Row>
              {this.previousYearRatingRender()}
              <Divider orientation='left'>2018 Rating</Divider>
              <Row gutter={20}>
                <Col span={2}></Col>
                <Col span={15}><FormItem label={<span>
              Performance Rating
                <Tooltip title="Refere to Kier Performance Rating for more information">
                  <Icon type="question-circle-o"></Icon></Tooltip></span>}
                                         extra="For more information about the performance ratings, select rating on the slider and a tooltip will be displayed" {...formItemLayout}>


                  {getFieldDecorator("performance", {
                    initialValue: this.props.store.Talent.Performance,
                    rules: [{
                      required: (!this.props.store.ViewStore.isEditing || (!this.props.store.Talent.IsLeaver && this.props.store.ViewStore.isEditing)),
                      message: "Performance rating cannot be left blank"
                    }]
                  })(<SliderSelector
                    items={this.props.store.LookupDataStore.PerformanceRatingLookupData}
                    form={this.props.form}
                    value={this.props.store.Talent.Performance}
                    controlId="performance"
                    validationMessage="Please select a rating for the performance"
                    changed={this.OnPerformanceRatingChange}
                    formatter={this.props.store.LookupDataStore.formatPerformanceTip} disabled = {this.props.store.IsSubmittingData}
                    required={(!this.props.store.ViewStore.isEditing || (!this.props.store.Talent.IsLeaver && this.props.store.ViewStore.isEditing))}
                  />)}


                </FormItem></Col>

              </Row>
              <Row>
                <Col span={2}></Col>
                <Col span={15}><FormItem label="Potential Rating" {...formItemLayout}
                                         extra="For more information about the potential ratings, select rating on the slider and a tooltip will be displayed">

                  {getFieldDecorator("potential", {
                    initialValue: this.props.store.Talent.Potential,
                    rules: [{
                      required: (!this.props.store.ViewStore.isEditing || (!this.props.store.Talent.IsLeaver && this.props.store.ViewStore.isEditing)),
                      message: "Potential rating cannot be left blank"
                    }]
                  })(<SliderSelector
                    items={this.props.store.LookupDataStore.PotentialRatingLookupData}
                    form={this.props.form}
                    value={this.props.store.Talent.Potential}
                    controlId="potential"
                    validationMessage="Please select a rating for the potential"
                    changed={this.OnPotentialRatingChange}
                    formatter={this.props.store.LookupDataStore.formatPotentialTip} disabled = {this.props.store.IsSubmittingData}
                    required={(!this.props.store.ViewStore.isEditing || (!this.props.store.Talent.IsLeaver && this.props.store.ViewStore.isEditing))}/>)}


                </FormItem></Col>
              </Row>

              <Divider orientation='left'>Movement</Divider>
              <FormItem label="Movement Status" {...formItemLayout}
                        validateStatus={(getFieldError('movement') ? 'error' : 'success')}>
                {
                  getFieldDecorator('movement', {
                    initialValue: this.props.store.Talent.Movement,
                    rules: [{required: false, message: 'A movement status have to selected'}]
                  })(
                    <OptionsSelector
                      items={this.props.store.LookupDataStore.MovementLookupData}
                      form={this.props.form}
                      value={this.props.store.Talent.Movement}
                      controlId="movement"
                      validationMessage="Please select a movement status"
                      changed={this.OnMovementChange}
                      required={false}
                      disabled = {this.props.store.IsSubmittingData}
                    />
                  )
                }

              </FormItem>

              <Divider orientation='left'>Risk</Divider>
              <Row gutter={20}>
                <Col span={12}><FormItem label="Flight Risk" {...formItemLayout}
                                         validateStatus={(getFieldError('flightRisk') ? 'error' : 'success')}>
                  {
                    getFieldDecorator('flightRisk', {
                      initialValue: this.props.store.Talent.FlightRisk,
                      rules: [{required: false, message: 'flightRisk?'}]
                    })(<OptionsSelector
                      items={this.props.store.LookupDataStore.RiskLookupData}
                      form={this.props.form}
                      value={this.props.store.Talent.FlightRisk}
                      controlId="flightRisk"
                      validationMessage="Please select flight risk!"
                      changed={this.OnFlightRiskChange}
                      disabled = {this.props.store.IsSubmittingData}
                      required={false}
                    />)
                  }


                </FormItem></Col>
                <Col span={12}>{<FormItem label="Business Risk" {...formItemLayout}>

                  {
                    getFieldDecorator('businessRisk', {
                      initialValue: this.props.store.Talent.BusinessRisk,
                      rules: [{required: false, message: 'businessRisk?'}]
                    })(<OptionsSelector
                      items={this.props.store.LookupDataStore.RiskLookupData}
                      form={this.props.form}
                      value={this.props.store.Talent.BusinessRisk}
                      controlId="businessRisk"
                      validationMessage="Please select business risk!"
                      changed={this.OnBusinessRiskChange}
                      disabled = {this.props.store.IsSubmittingData}
                      required={false}
                    />)
                  }

                </FormItem>}</Col>
              </Row>

          <Divider orientation="left">Development Requirements</Divider>
          <Row gutter={20}>
            <Col span={24}>
              <a
                href="https://mykier/teams/hr/learninganddevelopment/"><Icon
                type="info-circle-o" style={{fontSize: 16, color: '#08c'}}/>  Click here for more information about Kier Learning and Development</a>
            </Col>
          </Row>
              <Row gutter={20}>
                <Col span={12}> <FormItem label="Development Requirements 1st" {...formItemLayout}>

                  <CascadeSelector
                    items={this.props.store.LookupDataStore.DevelopmentRequirementsLookupData}
                    form={this.props.form}
                    item={this.props.store.Talent.DevelopmentRequirement01}
                    placeholder="Please select a development requirement"
                    validationMessage='Please select a developement requirement!'
                    controlId="developmentRequirement_01"
                    changed={this.OnDevelopmentRequirement01Change}
                    required={false}
                    disabled = {this.props.store.IsSubmittingData}
                  />
                </FormItem></Col>

                <Col span={12}> <FormItem label="Development Requirements 2nd" {...formItemLayout}>
                  <CascadeSelector
                    items={this.props.store.LookupDataStore.DevelopmentRequirementsLookupData}
                    form={this.props.form}
                    item={this.props.store.Talent.DevelopmentRequirement02}
                    placeholder="Please select a development requirement"
                    validationMessage='Please select a developement requirement!'
                    controlId="developmentRequirement_02"
                    changed={this.OnDevelopmentRequirement02Change}
                    required={false}
                    disabled = {this.props.store.IsSubmittingData}
                  />
                </FormItem></Col>


              </Row>
              <Row>
                <Col span={24}>
                  <FormItem label="Notes" {...formItemLayout}>
                    {getFieldDecorator('devNotes', {
                      rules: [{required: false, message: 'Please fill in some comments'}],
                    })(
                      <Input.TextArea rows={5} onChange={(e) => this.OnNotesChange(e.target.value)} disabled = {this.props.store.IsSubmittingData}/>
                    )}
                  </FormItem>
                </Col>
              </Row>
        </Form>
      </Col></Row>

      <Row>
        <Col span={24}>
          <Row>
            <Col span={24} style={{textAlign: 'right'}}>
              {actionButton}
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

    </div>
    const loadingSpinner = <LoadingSpinner/>
    const {formLayout} = this.state;
    const content = (this.props.store.IsLoadingTalentData || this.props.store.IsLoadingReferenceData) ? loadingSpinner : talentForm;
    const Option = Select.Option;
    return (content);
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
