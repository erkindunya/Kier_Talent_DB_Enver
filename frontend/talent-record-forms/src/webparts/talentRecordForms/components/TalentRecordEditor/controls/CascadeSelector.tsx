import {Cascader} from 'antd';
import * as React from 'react';
import {inject, observer} from "mobx-react";

@inject("store")
@observer
export default class CascadeSelector extends React.Component<any, any> {

  BuildCascader = () => {
    return (
      <Cascader options={this.props.items}
                placeholder={this.props.placeholder}
                onChange={this.OnChange}
                size="small"
      />
    )
  }

  OnChange = (value) => {
    this.props.changed(value);
  }

  render() {

    let initialValue = (this.props.value) ? this.props.value : [];

    const options = (this.props.value) ? {
      initialValue: initialValue,
      rules: [{required: true, message: this.props.validationMessage}]
    } : {
      rules: [{required: true, message: this.props.validationMessage}]
    }

    const element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.BuildCascader());
    return element;

  }
}


