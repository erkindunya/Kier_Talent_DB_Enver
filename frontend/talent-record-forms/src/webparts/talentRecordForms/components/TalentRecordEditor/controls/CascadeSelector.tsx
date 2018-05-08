import {Cascader} from 'antd';
import * as React from 'react';
import {observer} from "mobx-react";

@observer
export default class CascadeSelector extends React.Component<any, any> {

  buildCascader = () => {
    return (
      <Cascader options={this.props.items}
                placeholder={this.props.placeholder}/>
    )
  }

  onChange(value) {
    console.log(value);
  }

  render() {

    let initialValue = (this.props.item) ? this.props.converter(this.props.item) : [];
    console.log(`${this.props.controlId} value`, initialValue);

    const options = (this.props.item) ? {
      initialValue: initialValue,
      rules: [{required: true, message: this.props.validationMessage}]
    } : {
      rules: [{required: true, message: this.props.validationMessage}]
    }

    const element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.buildCascader());
    return element;

  }
}


