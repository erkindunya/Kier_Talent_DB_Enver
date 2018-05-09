import * as React from 'react';
import {Slider} from "antd";
import {observer} from "mobx-react";

@observer
export default class SliderSelector extends React.Component<any, any> {

  BuildSelector = () => {
    return(
      <Slider marks={this.props.items} value={50} tipFormatter={this.props.formatter} step={null}/>
    )
  }


  render() {

    let initialValue = (this.props.item) ? this.props.converter(this.props.item) : 0;
    const options = (this.props.item) ? {
      initialValue: initialValue,
      rules: [{required: true, message: this.props.validationMessage}]
    } : {
      rules: [{required: true, message: this.props.validationMessage}]
    }

    const element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.BuildSelector());
    return element;
  }
}
