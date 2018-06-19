import * as React from 'react';
import {inject, observer} from "mobx-react";
import {Row, Col, Divider} from "antd";
import FormItem from "antd/es/form/FormItem";
import SliderSelector from "./SliderSelector";


@observer
@inject("store", "context")
export class PreviousYearRating extends React.Component<any, any> {

  render() {
    return (
      <div>
        <Divider orientation="left">2017 Performance Rating</Divider>
        <Row gutter={20}>
          <Col span={2}></Col>
          <Col span={15}><FormItem label="Performance"><SliderSelector
        items={this.props.store.LookupDataStore.PerformanceRatingLookupData}
        form={this.props.form}
        value={this.props.store.Talent.PreviousYear.Performance}
        controlId="prevPerformance"
        validationMessage="Please select a rating for the performance"
        changed={() => {
        }}
        formatter={this.props.store.LookupDataStore.formatPerformanceTip}
        disabled={true}
        required={false}/></FormItem></Col>

        </Row>
        <Row gutter={20}>
          <Col span={2}></Col>
          <Col span={10}><FormItem label="Performance"><SliderSelector
            items={this.props.store.LookupDataStore.PotentialRatingLookupData}
            form={this.props.form}
            value={this.props.store.Talent.PreviousYear.Potential}
            controlId="prevPerformance"
            validationMessage="Please select a rating for the performance"
            changed={() => {
            }}
            formatter={this.props.store.LookupDataStore.formatPotentialTip}
            disabled={true}
          required={false}/></FormItem></Col>
        </Row>
      </div>)
  }
}
