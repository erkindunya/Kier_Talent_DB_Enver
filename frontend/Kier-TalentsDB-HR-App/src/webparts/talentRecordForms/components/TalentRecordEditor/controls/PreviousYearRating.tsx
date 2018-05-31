import * as React from 'react';
import {inject, observer} from "mobx-react";
import {Row, Col} from "antd";
import FormItem from "antd/es/form/FormItem";
import SliderSelector from "./SliderSelector";


@observer
@inject("store", "context")
export class PreviousYearRating extends React.Component<any, any> {

  render() {
    return (<Row gutter={20}>
      <Col span={4}><b>2017 Performance Rating</b></Col>
      <Col span={10}><FormItem label="Performance"><SliderSelector
        items={this.props.store.LookupDataStore.PerformanceRatingLookupData}
        form={this.props.form}
        value={this.props.store.Talent.PreviousYear.Performance}
        controlId="prevPerformance"
        validationMessage="Please select a rating for the performance"
        changed={() => {
        }}
        formatter={this.props.store.LookupDataStore.formatPerformanceTip}
        disabled={true}/></FormItem></Col>
      <Col span={10}><FormItem label="Performance"><SliderSelector
        items={this.props.store.LookupDataStore.PotentialRatingLookupData}
        form={this.props.form}
        value={this.props.store.Talent.PreviousYear.Potential}
        controlId="prevPerformance"
        validationMessage="Please select a rating for the performance"
        changed={() => {
        }}
        formatter={this.props.store.LookupDataStore.formatPotentialTip}
        disabled={true}/></FormItem></Col>
    </Row>)
  }
}
