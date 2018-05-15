import * as React from 'react';
import {Slider} from "antd";
import {observer} from "mobx-react";
import {invert} from '@microsoft/sp-lodash-subset'

@observer
export default class SliderSelector extends React.Component<any, any> {

  BuildSelector = () => {
    return(
      <Slider marks={this.props.items} tipFormatter={this.props.formatter} step={null}/>
    )
  }


  render() {

    let initialValue = (this.props.value) ? invert(this.props.items)[this.props.value] : 0;
    const options = (this.props.value) ? {
      initialValue: initialValue,
      rules: [{required: true, message: this.props.validationMessage}]
    } : {
      rules: [{required: true, message: this.props.validationMessage}]
    }

    const element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.BuildSelector());
    return element;
  }
}
